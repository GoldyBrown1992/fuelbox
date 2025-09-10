'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, TrendingDown, Pizza } from 'lucide-react'

export default function ScarcityInventory() {
  const [boxesLeft, setBoxesLeft] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInventory()
    const interval = setInterval(fetchInventory, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory')
      const data = await response.json()
      setBoxesLeft(data.boxesRemaining)
    } catch (error) {
      console.error('Failed to fetch inventory:', error)
      setBoxesLeft(12)
    } finally {
      setLoading(false)
    }
  }

  const getUrgencyLevel = () => {
    if (!boxesLeft) return 'normal'
    if (boxesLeft <= 3) return 'critical'
    if (boxesLeft <= 10) return 'high'
    return 'normal'
  }

  const urgencyLevel = getUrgencyLevel()

  if (loading) {
    return (
      <div className="py-3">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-gray-200 h-10 rounded-lg max-w-md mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-3">
      <div className="container mx-auto px-4">
        <div className={`
          max-w-4xl mx-auto rounded-xl px-4 py-2 flex items-center justify-between
          ${urgencyLevel === 'critical' ? 'bg-red-500 animate-pulse' : ''}
          ${urgencyLevel === 'high' ? 'bg-orange-500' : ''}
          ${urgencyLevel === 'normal' ? 'bg-gradient-to-r from-red-500 to-orange-500' : ''}
          text-white shadow-lg
        `}>
          <div className="flex items-center gap-3">
            <Pizza className="w-5 h-5" />
            <div className="flex items-center gap-2">
              <p className="font-black text-sm md:text-base">
                {boxesLeft === 0 ? (
                  "SOLD OUT TODAY!"
                ) : boxesLeft && boxesLeft <= 3 ? (
                  `⚠️ ONLY ${boxesLeft} LEFT!`
                ) : (
                  `${boxesLeft} Pizza Wraps Available`
                )}
              </p>
              {boxesLeft !== null && boxesLeft > 0 && (
                <span className="text-xs opacity-90 hidden md:inline">
                  • Limited to 20/day
                </span>
              )}
            </div>
          </div>

          {boxesLeft !== null && boxesLeft > 0 && (
            <div className="flex items-center gap-2">
              <div className="text-2xl font-black">
                {boxesLeft}/20
              </div>
              {/* Progress bar */}
              <div className="w-20 bg-white/30 rounded-full h-2 overflow-hidden hidden md:block">
                <div 
                  className={`h-full bg-white transition-all duration-500`}
                  style={{ width: `${(boxesLeft / 20) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
