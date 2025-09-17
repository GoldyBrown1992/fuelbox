import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { phone, pin } = await req.json()
    
    // Find user by phone
    const user = await prisma.user.findUnique({
      where: { phone: phone.replace(/\D/g, '') }
    })
    
    if (!user) {
      return NextResponse.json({ 
        exists: false,
        message: 'No account found' 
      })
    }
    
    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return NextResponse.json({ 
        error: 'Account temporarily locked',
        lockedUntil: user.lockedUntil 
      }, { status: 403 })
    }
    
    // If PIN provided, verify it
    if (pin && user.pinHash) {
      const isValid = await bcrypt.compare(pin, user.pinHash)
      
      if (!isValid) {
        // Increment failed attempts
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedAttempts: user.failedAttempts + 1,
            lockedUntil: user.failedAttempts >= 4 
              ? new Date(Date.now() + 60 * 60 * 1000) // Lock for 1 hour
              : null
          }
        })
        
        return NextResponse.json({ 
          error: 'Invalid PIN',
          attemptsRemaining: 5 - user.failedAttempts - 1 
        }, { status: 401 })
      }
      
      // Reset failed attempts on success
      await prisma.user.update({
        where: { id: user.id },
        data: { failedAttempts: 0 }
      })
      
      return NextResponse.json({
        exists: true,
        verified: true,
        cashbackBalance: user.cashbackBalance,
        totalEarned: user.totalEarned
      })
    }
    
    return NextResponse.json({
      exists: true,
      verified: false,
      requiresPin: !!user.pinHash
    })
    
  } catch (error) {
    console.error('Cashback check error:', error)
    return NextResponse.json({ error: 'Failed to check cashback' }, { status: 500 })
  }
}
