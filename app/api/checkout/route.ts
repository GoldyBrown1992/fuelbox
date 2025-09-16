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

    // Initialize Stripe client
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
      // Fields for all delivery orders
      customerName,
      phoneNumber,
      customerEmail,
      deliveryAddress,
      deliveryInstructions,
      deliveryFee = 0,
      estimatedTime,
      distance,
      // Fields for midnight orders
      drinks = [],
      spiceLevel,
      wingFlavor = {},
      // Fields for corporate orders
      companyName,
      deliveryDate,
      deliveryTime,
      boxes = [],
      totalPrice
    } = body

    // Guard: App URL must exist
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error('ERROR: NEXT_PUBLIC_APP_URL is not set!')
      return NextResponse.json(
        { error: 'App URL not configured' },
        { status: 500 }
      )
    }

    // Handle Corporate orders
    if (priceType === 'corporate') {
      console.log('Processing Corporate order for:', companyName)
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'cad',
              product_data: {
                name: productName || `Corporate FuelBox - ${quantity} boxes`,
                description: `Corporate lunch delivery for ${companyName}\nDelivery: ${deliveryDate} at ${deliveryTime}`,
              },
              unit_amount: 2000, // $20 per box
            },
            quantity: quantity,
          }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        customer_email: customerEmail,
        metadata: {
          orderType: 'corporate',
          companyName: companyName || '',
          contactName: customerName || '',
          phoneNumber: phoneNumber || '',
          deliveryAddress: deliveryAddress || '',
          deliveryDate: deliveryDate || '',
          deliveryTime: deliveryTime || '',
          totalBoxes: String(quantity),
          boxDetails: JSON.stringify(boxes).substring(0, 400), // Stripe has metadata limits
        },
      })

      console.log('Corporate session created:', session.id)
      return NextResponse.json({ url: session.url })
    }

    // Handle Midnight/24-7 Box orders
    if (priceType === 'midnight') {
      if (!priceId) {
        return NextResponse.json(
          { error: 'Missing priceId for midnight order' },
          { status: 400 }
        )
      }

      console.log('Processing Midnight Box order:', productName)

      const lineItems = [
        {
          price: priceId,
          quantity,
        }
      ]

      // Add delivery fee if applicable
      if (deliveryFee > 0) {
        lineItems.push({
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Delivery Fee',
              description: `Delivery to ${deliveryAddress}`,
            },
            unit_amount: deliveryFee * 100, // Convert to cents
          },
          quantity: 1,
        })
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        customer_email: customerEmail,
        metadata: {
          orderType: 'midnight',
          productName: productName || 'Unknown',
          quantity: String(quantity),
          customerName: customerName || '',
          phoneNumber: phoneNumber || '',
          deliveryAddress: deliveryAddress || '',
          deliveryInstructions: deliveryInstructions || '',
          deliveryFee: String(deliveryFee),
          estimatedTime: estimatedTime || '',
          distance: String(distance || 0),
          spiceLevel: String(spiceLevel || 1),
          drinks: JSON.stringify(drinks),
          wingFlavor: JSON.stringify(wingFlavor),
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
    console.error('Error stack:', error.stack)
    
    return NextResponse.json(
      {
        error: 'Checkout failed',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
