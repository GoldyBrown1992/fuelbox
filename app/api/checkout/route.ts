import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia'
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceType, quantity = 1, fulfillment, pickupLocation } = body

    // Debug logging
    console.log('=== CHECKOUT DEBUG ===')
    console.log('Request body:', body)
    console.log('Price type requested:', priceType)
    
    // Get the appropriate price ID
    const priceId = priceType === 'subscription'
      ? process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
      : process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE

    console.log('Selected price ID:', priceId)
    console.log('Checkout mode:', priceType === 'subscription' ? 'subscription' : 'payment')

    if (!priceId) {
      throw new Error(`Price ID not configured for ${priceType}`)
    }

    // Verify the price exists in Stripe
    try {
      const price = await stripe.prices.retrieve(priceId)
      console.log('Price details from Stripe:', {
        id: price.id,
        type: price.type,
        recurring: price.recurring,
        amount: price.unit_amount,
        currency: price.currency
      })
    } catch (priceError) {
      console.error('Failed to retrieve price from Stripe:', priceError)
      throw new Error(`Invalid price ID: ${priceId}`)
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: priceType === 'subscription' ? 1 : quantity,
        },
      ],
      mode: priceType === 'subscription' ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      metadata: {
        priceType,
        quantity: quantity.toString(),
        fulfillment,
        pickupLocation: pickupLocation || 'N/A',
      }
    })

    console.log('Checkout session created:', session.id)
    return NextResponse.json({ url: session.url })
    
  } catch (error: any) {
    console.error('=== CHECKOUT ERROR ===')
    console.error('Error message:', error.message)
    console.error('Error type:', error.type)
    console.error('Full error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error.message,
        type: error.type
      },
      { status: 500 }
    )
  }
}
