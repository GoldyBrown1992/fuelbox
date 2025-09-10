import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasSinglePrice: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE,
    hasSubscriptionPrice: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION,
    singlePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE?.substring(0, 10) + '...',
    subscriptionPrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION?.substring(0, 10) + '...'
  })
}
