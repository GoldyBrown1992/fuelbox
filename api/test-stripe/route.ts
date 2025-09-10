import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    secretKeyLength: process.env.STRIPE_SECRET_KEY?.length,
    lastChars: process.env.STRIPE_SECRET_KEY?.slice(-4),
    subscriptionPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
  })
}
