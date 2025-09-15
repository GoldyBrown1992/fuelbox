import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  console.log('=== CHECKOUT API START ===')
  
  try {
    // Check environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('ERROR: STRIPE_SECRET_KEY is not set!')
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia'
    })

    const body = await req.json()
    console.log('Request body:', body)
    
    const { priceType, quantity = 1, fulfillment, pickupLocation, priceId, productName } = body

    // Handle Midnight Box items
    if (priceType === 'midnight') {
      console.log('Processing Midnight Box order:', productName)
      console.log('Using price ID:', priceId)
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId, // Direct price ID from the midnight item
            quantity: quantity,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        metadata: {
          orderType: 'midnight',
          productName: productName,
          quantity: quantity.toString(),
          fulfillment: 'delivery', // Always delivery for midnight
        },
        shipping_address_collection: {
          allowed_countries: ['CA'],
        },
      })
      
      console.log('Midnight session created:', session.id)
      return NextResponse.json({ url: session.url })
    }

    // Handle regular FuelBox items (existing code)
    const regularPriceId = priceType === 'subscription'
      ? process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
      : process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE

    console.log('Price type:', priceType)
    console.log('Selected price ID:', regularPriceId)
    console.log('Checkout mode:', priceType === 'subscription' ? 'subscription' : 'payment')

    if (!regularPriceId) {
      console.error(`ERROR: No price ID found for ${priceType}`)
      console.error('NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION:', process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION)
      console.error('NEXT_PUBLIC_STRIPE_PRICE_SINGLE:', process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE)
      return NextResponse.json(
        { error: `Price not configured for ${priceType}` },
        { status: 500 }
      )
    }

    // Create Stripe session for regular items
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: regularPriceId,
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

    console.log('Session created successfully:', session.id)
    return NextResponse.json({ url: session.url })

  } catch (error: any) {
    console.error('=== STRIPE ERROR ===')
    console.error('Error message:', error.message)
    console.error('Error type:', error.type)
    console.error('Full error:', JSON.stringify(error, null, 2))
    
    return NextResponse.json(
      { 
        error: 'Checkout failed',
        details: error.message,
        type: error.type
      },
      { status: 500 }
    )
  }
}
