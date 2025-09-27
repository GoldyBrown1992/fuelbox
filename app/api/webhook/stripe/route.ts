import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers() // Add await here
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    // Process cashback if applicable
    const metadata = session.metadata
    if (metadata?.phoneNumber && metadata?.cashbackEarned) {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cashback/earn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: metadata.phoneNumber,
          amount: session.amount_total! / 100, // Convert from cents
          orderId: session.id,
          isNewUser: metadata.isNewUser === 'true'
        })
      })
    }
    
    if (metadata?.cashbackApplied && parseFloat(metadata.cashbackApplied) > 0) {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cashback/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: metadata.phoneNumber,
          amount: parseFloat(metadata.cashbackApplied),
          orderId: session.id
        })
      })
    }
  }

  return NextResponse.json({ received: true })
}
