'use client'

import { Sun, Moon, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MenuSelectorProps {
  activeMenu: 'day' | 'night'
  setActiveMenu: (menu: 'day' | 'night') => void
}

export default function MenuSelector({ activeMenu, setActiveMenu }: MenuSelectorProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isNightHours, setIsNightHours] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      const hour = now.getHours()
      setIsNightHours(hour >= 23 || hour < 5)
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const hour = currentTime.getHours()
    setIsNightHours(hour >= 23 || hour < 5)
  }, [currentTime])

  return (
    <div className="bg-white py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setActiveMenu('day')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all ${
                activeMenu === 'day'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sun className="w-5 h-5" />
              Day Menu
              <span className="text-sm font-normal">(6 AM - 10 PM)</span>
            </button>

            <button
              onClick={() => setActiveMenu('night')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all relative ${
                activeMenu === 'night'
                  ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Moon className="w-5 h-5" />
              Night Menu
              <span className="text-sm font-normal">(11 PM - 3 AM)</span>
              {isNightHours && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  OPEN
                </span>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
            {isNightHours && <span className="text-red-600 font-bold">• Night Menu Available</span>}
          </div>
        </div>

        {/* Active Menu Info Bar */}
        <div className={`mt-4 p-3 rounded-lg ${
          activeMenu === 'day' 
            ? 'bg-yellow-50 text-yellow-900' 
            : 'bg-gray-900 text-white'
        }`}>
          <p className="text-center font-semibold">
            {activeMenu === 'day' 
              ? '🌅 Day Menu: High-protein performance meals • Pickup/Delivery available'
              : '🌙 Night Menu: Late-night satisfaction • FREE delivery all night • $30 minimum'}
          </p>
        </div>
      </div>
    </div>
  )
}
