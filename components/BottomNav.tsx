'use client'

import { Home, ShoppingCart, BarChart3, Leaf } from 'lucide-react'
import { useState } from 'react'

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('home')

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
      id: 'order',
      label: 'Order',
      icon: <ShoppingCart className="w-5 h-5" />,
      action: () => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'compare',
      label: 'Compare',
      icon: <BarChart3 className="w-5 h-5" />,
      action: () => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'nutrition',
      label: 'Nutrition',
      icon: <Leaf className="w-5 h-5" />,
      action: () => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-200 md:hidden z-50">
      <div className="grid grid-cols-4 gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              tab.action()
            }}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-t from-green-50 to-white text-green-600'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <div className={`${activeTab === tab.id ? 'scale-110' : ''} transition-transform`}>
              {tab.icon}
            </div>
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
