'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, TrendingDown, Flame } from 'lucide-react'

export default function ScarcityInventory() {
  const [boxesLeft, setBoxesLeft] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    fetchInventory()
    // Refresh inventory every 30 seconds
    const interval = setInterval(fetchInventory, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory')
      const data = await response.json()
      setBoxesLeft(data.boxesRemaining)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to fetch inventory:', error)
      // Fallback to show some boxes available
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
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-gray-200 h-12 rounded-lg max-w-md mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <div className={`
          max-w-2xl mx-auto rounded-2xl p-4 flex items-center justify-between
          ${urgencyLevel === 'critical' ? 'bg-red-500 animate-pulse' : ''}
          ${urgencyLevel === 'high' ? 'bg-orange-500' : ''}
          ${urgencyLevel === 'normal' ? 'bg-gradient-to-r from-amber-500 to-green-500' : ''}
          text-white shadow-xl
        `}>
          <div className="flex items-center gap-3">
            {urgencyLevel === 'critical' ? (
              <AlertCircle className="w-6 h-6 animate-shake" />
            ) : urgencyLevel === 'high' ? (
              <TrendingDown className="w-6 h-6" />
            ) : (
              <Flame className="w-6 h-6" />
            )}
            
            <div>
              <p className="font-black text-lg md:text-xl">
                {boxesLeft === 0 ? (
                  "SOLD OUT TODAY!"
                ) : boxesLeft && boxesLeft <= 3 ? (
                  `⚠️ ONLY ${boxesLeft} ${boxesLeft === 1 ? 'BOX' : 'BOXES'} LEFT!`
                ) : (
                  `${boxesLeft} Boxes Available Today`
                )}
              </p>
              <p className="text-xs md:text-sm opacity-90">
                {boxesLeft === 0 
                  ? "Check back tomorrow at 6 AM"
                  : "Limited to 20 boxes per day • First come, first served"
                }
              </p>
            </div>
          </div>

          {boxesLeft !== null && boxesLeft > 0 && (
            <div className="flex flex-col items-end">
              <div className="text-3xl md:text-4xl font-black">
                {boxesLeft}/20
              </div>
              <div className="text-xs opacity-75">
                Updated {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>

        {/* Visual Progress Bar */}
        {boxesLeft !== null && boxesLeft > 0 && (
          <div className="max-w-2xl mx-auto mt-3">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 
                  ${urgencyLevel === 'critical' ? 'bg-red-500 animate-pulse' : ''}
                  ${urgencyLevel === 'high' ? 'bg-orange-500' : ''}
                  ${urgencyLevel === 'normal' ? 'bg-gradient-to-r from-amber-400 to-green-400' : ''}
                `}
                style={{ width: `${(boxesLeft / 20) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Urgency Messages */}
        {urgencyLevel === 'critical' && boxesLeft && boxesLeft > 0 && (
          <div className="max-w-2xl mx-auto mt-3 text-center">
            <p className="text-red-600 font-bold animate-pulse">
              🔥 Selling fast! Order now before we're sold out!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
