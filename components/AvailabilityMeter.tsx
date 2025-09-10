'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function AvailabilityMeter() {
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
      setBoxesLeft(12) // Default fallback
    } finally {
      setLoading(false)
    }
  }

  const getStatus = () => {
    if (!boxesLeft || boxesLeft === 0) return 'soldout'
    if (boxesLeft <= 3) return 'critical'
    if (boxesLeft <= 10) return 'low'
    return 'good'
  }

  const status = getStatus()
  const percentage = boxesLeft ? (boxesLeft / 20) * 100 : 0

  if (loading) {
    return (
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-gray-200 h-16 rounded-lg max-w-4xl mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {status === 'soldout' ? (
                <XCircle className="w-6 h-6 text-red-500" />
              ) : status === 'critical' ? (
                <AlertCircle className="w-6 h-6 text-red-500 animate-pulse" />
              ) : status === 'low' ? (
                <AlertCircle className="w-6 h-6 text-orange-500" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
              
              <div>
                <p className="font-black text-lg">
                  {status === 'soldout' ? (
                    <span className="text-red-600">SOLD OUT TODAY</span>
                  ) : status === 'critical' ? (
                    <span className="text-red-600">ONLY {boxesLeft} LEFT - ORDER NOW!</span>
                  ) : status === 'low' ? (
                    <span className="text-orange-600">{boxesLeft} Boxes Available</span>
                  ) : (
                    <span className="text-green-600">{boxesLeft} FuelBox Meals Available Today</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  {status === 'soldout' 
                    ? "New batch tomorrow at 6 AM"
                    : "Limited to 20 boxes daily • Fresh made this morning"
                  }
                </p>
              </div>
            </div>

            {boxesLeft !== null && boxesLeft > 0 && (
              <div className="text-right">
                <div className="text-3xl font-black text-gray-900">
                  {boxesLeft}/20
                </div>
                <div className="text-xs text-gray-500">Remaining</div>
              </div>
            )}
          </div>

          {/* Visual Progress Bar */}
          {boxesLeft !== null && boxesLeft > 0 && (
            <div className="relative">
              <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 flex items-center justify-end pr-2
                    ${status === 'critical' ? 'bg-red-500 animate-pulse' : ''}
                    ${status === 'low' ? 'bg-orange-500' : ''}
                    ${status === 'good' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
                  `}
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-white text-xs font-bold">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
              
              {/* Markers */}
              <div className="absolute top-0 left-0 w-full h-6 flex items-center">
                <div className="absolute left-[25%] w-px h-4 bg-gray-400 opacity-50"></div>
                <div className="absolute left-[50%] w-px h-4 bg-gray-400 opacity-50"></div>
                <div className="absolute left-[75%] w-px h-4 bg-gray-400 opacity-50"></div>
              </div>
            </div>
          )}

          {/* Urgency Message */}
          {status === 'critical' && (
            <div className="mt-2 text-center">
              <p className="text-red-600 font-bold text-sm animate-pulse">
                ⚠️ Selling out fast! These are the last few boxes for today!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
