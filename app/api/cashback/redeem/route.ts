import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { phone, amount, orderId } = await req.json()
    
    const phoneClean = phone.replace(/\D/g, '')
    
    const user = await prisma.user.findUnique({
      where: { phone: phoneClean }
    })
    
    if (!user || user.cashbackBalance < amount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })
    }
    
    // Create transaction
    await prisma.cashbackTransaction.create({
      data: {
        userId: user.id,
        type: 'redeemed',
        amount: -amount,
        orderId: orderId,
        description: `Redeemed on order ${orderId}`
      }
    })
    
    // Update user balance
    await prisma.user.update({
      where: { id: user.id },
      data: {
        cashbackBalance: user.cashbackBalance - amount,
        totalRedeemed: user.totalRedeemed + amount
      }
    })
    
    return NextResponse.json({
      success: true,
      amountRedeemed: amount,
      newBalance: user.cashbackBalance - amount
    })
    
  } catch (error) {
    console.error('Redeem cashback error:', error)
    return NextResponse.json({ error: 'Failed to redeem cashback' }, { status: 500 })
  }
}
