'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const drinkOptions = ['Coke', 'Pepsi', 'Sprite', 'Root Beer', 'Dr Pepper', 'Cream Soda']

const menuItems = [
  {
    id: 'classic-box',
    stripePriceId: 'price_1S7jekHHRq5TjW227rRf1qsQ',
    name: 'Classic Box',
    price: 30,
    description: '1 Pizza Wrap, 2 Tacos, 1 Loaded Fries',
    icon: '🍕',
    servings: '1 person',
    drinks: 0
  },
  {
    id: 'family-box',
    stripePriceId: 'price_1S7jevHHRq5TjW226NlDjIbO',
    name: 'Family Box',
    price: 55,
    description: '2 Pizza Wraps, 4 Tacos, 2 Loaded Fries',
    icon: '👨‍👩‍👧‍👦',
    servings: '2-3 people',
    drinks: 0
  },
  {
    id: 'party-box',
    stripePriceId: 'price_1S7jfBHHRq5TjW22NBFU3sN4',
    name: 'Party Box',
    price: 199,
    description: '10 Half-Wraps, 20 Tacos, 30 Wings, 2 XL Fries, 2 × 2L Pops',
    icon: '🎉',
    servings: '10 people',
    drinks: 2,
    badge: 'BEST VALUE'
  }
]

export default function ProductCard() {
  const [loading, setLoading] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<{[key: string]: number}>({})
  const [drinkSelections, setDrinkSelections] = useState<{[key: string]: string[]}>({})
  const [showDrinkModal, setShowDrinkModal] = useState<string | null>(null)

  const handleCheckout = async (item: any) => {
    const quantity = quantities[item.id] || 1
    
    // Check if drinks need to be selected for party box
    if (item.drinks > 0 && (!drinkSelections[item.id] || drinkSelections[item.id].length !== item.drinks)) {
      setShowDrinkModal(item.id)
      return
    }

    setLoading(item.id)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: 'midnight',
          priceId: item.stripePriceId,
          quantity: quantity,
          productName: item.name,
          fulfillment: 'delivery',
          drinks: drinkSelections[item.id] || []
        })
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      {/* Info Banner */}
      <div className="max-w-4xl mx-auto mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
        <p className="font-bold text-green-800">
          🚚 FREE Delivery to SFU Surrey & Surrey Central • $5-10 delivery outside Surrey
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
            {item.badge && (
              <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {item.badge}
              </div>
            )}

            <div className="p-8 text-center">
              <div className="text-7xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-black mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-sm text-gray-500 mb-4">Serves {item.servings}</p>

              <div className="text-4xl font-black text-red-600 mb-6">${item.price}</div>

              {/* Quanti
