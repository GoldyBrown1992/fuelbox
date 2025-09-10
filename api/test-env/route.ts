import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia'
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceType, quantity = 1, fulfillment, pickupLocation } = body

    console.log('Checkout request:', { priceType, quantity, fulfillment, pickupLocation })

    // Get the appropriate price ID
    const priceId = priceType === 'subscription'
      ? process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
      : process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE

    console.log('Using price ID:', priceId)

    if (!priceId) {
      throw new Error(`Price ID not configured for ${priceType}`)
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key not configured')
    }

    // Create Stripe checkout session
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

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Checkout error details:', error)
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
