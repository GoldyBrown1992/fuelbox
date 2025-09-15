import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  console.log('=== CHECKOUT API START ===')

  try {
    // Ensure Stripe secret key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('ERROR: STRIPE_SECRET_KEY is not set!')
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      )
    }

    // Initialize Stripe client (let it use your account’s default API version)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // Parse request body
    const body = await req.json()
    console.log('Request body:', body)

    const {
      priceType,
      quantity = 1,
      fulfillment = '',
      pickupLocation = '',
      priceId,
      productName,
    } = body

    // Guard: App URL must exist
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error('ERROR: NEXT_PUBLIC_APP_URL is not set!')
      return NextResponse.json(
        { error: 'App URL not configured' },
        { status: 500 }
      )
    }

    // Handle Midnight Box orders
    if (priceType === 'midnight') {
      if (!priceId) {
        return NextResponse.json(
          { error: 'Missing priceId for midnight order' },
          { status: 400 }
        )
      }

      console.log('Processing Midnight Box order:', productName)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        metadata: {
          orderType: 'midnight',
          productName: productName || 'Unknown',
          quantity: String(quantity),
        },
        shipping_address_collection: {
          allowed_countries: ['CA'],
        },
      })

      console.log('Midnight session created:', session.id)
      return NextResponse.json({ url: session.url })
    }

    // Handle regular FuelBox orders
    const regularPriceId =
      priceType === 'subscription'
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE

    if (!regularPriceId) {
      console.error(`ERROR: No price ID found for ${priceType}`)
      return NextResponse.json(
        { error: `Price not configured for ${priceType}` },
        { status: 500 }
      )
    }

    console.log('Price type:', priceType)
    console.log('Selected price ID:', regularPriceId)

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
        quantity: String(quantity),
        fulfillment: fulfillment || 'N/A',
        pickupLocation: pickupLocation || 'N/A',
      },
    })

    console.log('Session created successfully:', session.id)
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('=== STRIPE ERROR ===')
    console.error('Error message:', error.message)

    return NextResponse.json(
      {
        error: 'Checkout failed',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
