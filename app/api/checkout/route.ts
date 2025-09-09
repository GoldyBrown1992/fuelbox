import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia'
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceType, quantity = 1, fulfillment, pickupLocation } = body

    // Get the appropriate price ID
    const priceId = priceType === 'subscription'
      ? process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
      : process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE

    if (!priceId) {
      throw new Error('Price ID not configured')
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
      },
      // Collect customer information
      billing_address_collection: 'required',
      shipping_address_collection: fulfillment === 'delivery' 
        ? {
            allowed_countries: ['US', 'CA'],
          }
        : undefined,
      customer_email: undefined, // Stripe will collect this
      phone_number_collection: {
        enabled: true,
      },
      // Custom fields for additional info
      custom_fields: [
        {
          key: 'delivery_notes',
          label: {
            type: 'custom',
            custom: 'Delivery Instructions (optional)',
          },
          type: 'text',
          optional: true,
        },
      ],
      // Subscription settings
      subscription_data: priceType === 'subscription'
        ? {
            trial_period_days: 0,
            metadata: {
              fulfillment,
              pickupLocation: pickupLocation || 'N/A',
            },
          }
        : undefined,
      // Promotional codes
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
