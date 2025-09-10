import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set')
      return NextResponse.json(
        { error: 'Stripe configuration error' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia'
    })

    const body = await req.json()
    const { priceType, quantity = 1, fulfillment, pickupLocation } = body

    const priceId = priceType === 'subscription'
      ? process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
      : process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE

    if (!priceId) {
      console.error(`Price ID not found for ${priceType}`)
      return NextResponse.json(
        { error: `Price not configured for ${priceType}` },
        { status: 500 }
      )
    }

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
    console.error('Checkout error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 }
    )
  }
}
