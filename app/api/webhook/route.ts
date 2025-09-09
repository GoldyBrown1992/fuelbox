import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia'
})

const prisma = new PrismaClient()

// IMPORTANT: We need the raw body for Stripe webhook verification
export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Get full session details with line items
        const fullSession = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ['line_items', 'customer']
          }
        )

        // Extract metadata
        const metadata = fullSession.metadata || {}
        const lineItems = fullSession.line_items?.data || []
        const customer = fullSession.customer as Stripe.Customer | null

        // Create order in database
        const order = await prisma.order.create({
          data: {
            email: fullSession.customer_email || customer?.email || '',
            name: fullSession.customer_details?.name || customer?.name || '',
            phone: fullSession.customer_details?.phone || customer?.phone || null,
            productType: metadata.priceType || 'single',
            quantity: parseInt(metadata.quantity || '1'),
            amount: fullSession.amount_total || 0,
            fulfillmentType: metadata.fulfillment || 'delivery',
            pickupLocation: metadata.pickupLocation !== 'N/A' ? metadata.pickupLocation : null,
            deliveryAddress: fullSession.shipping_details?.address?.line1 || null,
            deliveryCity: fullSession.shipping_details?.address?.city || null,
            deliveryState: fullSession.shipping_details?.address?.state || null,
            deliveryZip: fullSession.shipping_details?.address?.postal_code || null,
            stripeSessionId: fullSession.id,
            stripeCustomerId: fullSession.customer as string || null,
            stripePriceId: lineItems[0]?.price?.id || '',
            paymentStatus: 'paid',
            stripeSubscriptionId: fullSession.subscription as string || null,
            subscriptionStatus: fullSession.subscription ? 'active' : null,
            notes: fullSession.custom_fields?.find(f => f.key === 'delivery_notes')?.text?.value || null
          }
        })

        // Update inventory (deduct boxes sold)
        if (metadata.priceType === 'single') {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          const inventory = await prisma.inventory.findFirst({
            where: {
              date: {
                gte: today,
                lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
              }
            }
          })

          if (inventory) {
            await prisma.inventory.update({
              where: { id: inventory.id },
              data: {
                boxesSold: inventory.boxesSold + parseInt(metadata.quantity || '1'),
                boxesRemaining: Math.max(0, inventory.boxesRemaining - parseInt(metadata.quantity || '1'))
              }
            })
          }
        }

        console.log('Order created:', order.id)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Update subscription status in database
        await prisma.order.updateMany({
          where: {
            stripeSubscriptionId: subscription.id
          },
          data: {
            subscriptionStatus: subscription.status
          }
        })

        console.log('Subscription updated:', subscription.id)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Mark subscription as canceled
        await prisma.order.updateMany({
          where: {
            stripeSubscriptionId: subscription.id
          },
          data: {
            subscriptionStatus: 'canceled'
          }
        })

        console.log('Subscription canceled:', subscription.id)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update order status if payment failed
        const order = await prisma.order.findFirst({
          where: {
            stripeSessionId: paymentIntent.id
          }
        })

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              paymentStatus: 'failed'
            }
          })
        }

        console.log('Payment failed:', paymentIntent.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
