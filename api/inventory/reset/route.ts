import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Reset today's inventory to 20
    const inventory = await prisma.inventory.upsert({
      where: {
        date: today
      },
      update: {
        boxesSold: 0,
        boxesRemaining: 20
      },
      create: {
        date: today,
        totalAvailable: 20,
        boxesSold: 0,
        boxesRemaining: 20
      }
    })

    return NextResponse.json({
      success: true,
      inventory
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reset inventory' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
