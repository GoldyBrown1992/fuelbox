import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  console.log('=== CHECKOUT API START ===')
  
  try {
    const body = await req.json()
    console.log('Request body:', body)
    
    // Skip database for midnight items
    if (body.priceType === 'midnight') {
      console.log('Midnight order - skipping inventory check')
      
      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
      }
      
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-02-24.acacia'  // Change back to 2025
      })
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: body.priceId,
          quantity: body.quantity || 1,
        }],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      })
      
      return NextResponse.json({ url: session.url })
    }
    
    // Rest of your regular checkout code...
  } catch (error: any) {
    console.error('Checkout error:', error.message)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
