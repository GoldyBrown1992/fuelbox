import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { phone, amount, orderId, isNewUser } = await req.json()
    
    const phoneClean = phone.replace(/\D/g, '')
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phone: phoneClean }
    })
    
    if (!user) {
      user = await prisma.user.create({
        data: { phone: phoneClean }
      })
    }
    
    // Calculate cashback (5% of amount)
    const cashbackEarned = amount * 0.05
    
    // Create transaction
    await prisma.cashbackTransaction.create({
      data: {
        userId: user.id,
        type: 'earned',
        amount: cashbackEarned,
        orderId: orderId,
        description: `5% cashback on order ${orderId}`
      }
    })
    
    // Update user balance
    await prisma.user.update({
      where: { id: user.id },
      data: {
        cashbackBalance: user.cashbackBalance + cashbackEarned,
        totalEarned: user.totalEarned + cashbackEarned
      }
    })
    
    return NextResponse.json({
      success: true,
      cashbackEarned,
      newBalance: user.cashbackBalance + cashbackEarned,
      isNewUser: !user.pinHash
    })
    
  } catch (error) {
    console.error('Earn cashback error:', error)
    return NextResponse.json({ error: 'Failed to process cashback' }, { status: 500 })
  }
}
