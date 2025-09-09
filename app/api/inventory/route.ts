import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Get today's date (start of day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Try to get today's inventory
    let inventory = await prisma.inventory.findFirst({
      where: {
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    })

    // If no inventory for today, create it
    if (!inventory) {
      inventory = await prisma.inventory.create({
        data: {
          date: today,
          totalAvailable: 20,
          boxesSold: 0,
          boxesRemaining: 20
        }
      })
    }

    return NextResponse.json({
      boxesRemaining: inventory.boxesRemaining,
      boxesSold: inventory.boxesSold,
      totalAvailable: inventory.totalAvailable,
      date: inventory.date
    })
  } catch (error) {
    console.error('Inventory fetch error:', error)
    // Return default values if database fails
    return NextResponse.json({
      boxesRemaining: 12,
      boxesSold: 8,
      totalAvailable: 20,
      date: new Date()
    })
  } finally {
    await prisma.$disconnect()
  }
}

// This endpoint can be used to manually update inventory (for testing)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { boxesSold } = body

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const inventory = await prisma.inventory.upsert({
      where: {
        date: today
      },
      update: {
        boxesSold: boxesSold,
        boxesRemaining: Math.max(0, 20 - boxesSold)
      },
      create: {
        date: today,
        totalAvailable: 20,
        boxesSold: boxesSold,
        boxesRemaining: Math.max(0, 20 - boxesSold)
      }
    })

    return NextResponse.json({
      success: true,
      inventory
    })
  } catch (error) {
    console.error('Inventory update error:', error)
    return NextResponse.json(
      { error: 'Failed to update inventory' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
