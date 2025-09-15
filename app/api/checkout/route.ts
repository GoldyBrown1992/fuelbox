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
      apiVersion: '2025-02-24.acacia'
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
            price: priceId,
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
        },
        shipping_address_collection: {
          allowed_countries: ['CA'],
        },
      })
      
      console.log('Midnight session created:', session.id)
      return NextResponse.json({ url: session.url })
    }

    // Handle regular FuelBox items
    const regularPriceId = priceType === 'subscription'
      ? process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
      : process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE

    console.log('Price type:', priceType)
