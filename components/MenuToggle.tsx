'use client'

import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MenuToggleProps {
  activeMenu: 'regular' | 'midnight'
  setActiveMenu: (menu: 'regular' | 'midnight') => void
}

export default function MenuToggle({ activeMenu, setActiveMenu }: MenuToggleProps) {
  const [isNightTime, setIsNightTime] = useState(false)

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours()
      setIsNightTime(hour >= 23 || hour < 3)
    }
    checkTime()
    const interval = setInterval(checkTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50 px-4 py-3 border-b-2 border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveMenu('regular')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
              activeMenu === 'regular' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sun className="w-5 h-5" />
            Regular Menu
          </button>
          
          <button
            onClick={() => setActiveMenu('midnight')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all relative ${
              activeMenu === 'midnight' 
                ? 'bg-gray-900 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Moon className="w-5 h-5" />
            Midnight Box
            {isNightTime && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                OPEN NOW
              </span>
            )}
          </button>
        </div>

        {activeMenu === 'midnight' && (
          <div className="hidden md:block text-sm font-semibold text-gray-700">
            🌙 11 PM - 3 AM • FREE DELIVERY ALL NIGHT
          </div>
        )}
      </div>
    </div>
  )
}
