'use client'

import { useState } from 'react'
import { Loader2, Flame, Clock, TrendingUp } from 'lucide-react'

const midnightItems = [
  {
    id: 'midnight-box',
    stripeProductId: 'prod_T3ngKfvtEiOJ6m',
    stripePriceId: 'price_1S7g5AHHRq5TjW22st91zcS1',
    name: 'Midnight Box',
    price: 30,
    description: 'XXL loaded chicken wrap glazed in signature sauce, golden fries, wings (1/2 lb), 2 tacos, drink',
    badge: '🔥 Most Popular Tonight',
    popular: true,
  },
  {
    id: 'double-midnight',
    stripeProductId: 'prod_T3npC86D5kFkb3',
    stripePriceId: 'price_1S7gDPHHRq5TjW22bswkLYsc',
    name: 'Double Midnight Box',
    price: 55,
    originalPrice: 60,
    description: '2x Midnight Boxes - perfect for sharing or one hungry night owl',
    badge: 'Save $5',
  },
  {
    id: 'party-Box',
    stripeProductId: 'prod_T3npOaPHtDjdAV',
    stripePriceId: 'price_1S7gDoHHRq5TjW229HOABSaC',
    name: 'Party Box',
    price: 199,
    originalPrice: 250,
    description: '5 XXL wraps, 2 lbs wings, large fries, 10 drinks - feeds 10 people',
    badge: 'BEST VALUE - Save $51',
    popular: true,
  }
]

export default function MidnightProductCard() {
  const [loading, setLoading] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<{[key: string]: number}>({})

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: quantity
    }))
  }

  const handleCheckout = async (item: any) => {
    setLoading(item.id)
    const quantity = quantities[item.id] || 1
    
    try {
      // Direct Stripe checkout for midnight items
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: 'midnight',
          priceId: item.stripePriceId,
          quantity: quantity,
          fulfillment: 'delivery',
          productName: item.name
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
      {/* Night Time Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6 mb-8 text-center">
        <h2 className="text-3xl font-black mb-2">
          🌙 MIDNIGHT BOX MENU 🌙
        </h2>
        <p className="text-lg opacity-90">11 PM - 3 AM • FREE DELIVERY • $30 MINIMUM</p>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 inline mr-2" />
            Open Till 3 AM
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            🚚 Free Delivery on All Orders
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {midnightItems.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-2xl shadow-xl overflow-hidden relative ${
              item.popular ? 'ring-4 ring-red-500' : ''
            }`}
          >
            {/* Badge */}
            {item.badge && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {item.badge}
                </div>
              </div>
            )}

            {/* Food Image Placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-black">
              <div className="flex items-center justify-center h-full">
                <span className="text-7xl">
                  {item.id === 'midnight-box' && '🌮'}
                  {item.id === 'double-midnight' && '🍔'}
                  {item.id === 'party-Box' && '🎉'}
                </span>
              </div>
              {item.popular && (
                <div className="absolute top-4 right-4">
                  <Flame className="w-8 h-8 text-red-500 drop-shadow-lg" />
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-2xl font-black text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-gray-900">${item.price}</span>
                {item.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${item.originalPrice}</span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Quantity:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => handleQuantityChange(item.id, num)}
                      className={`w-12 h-12 rounded-lg font-bold transition-all ${
                        (quantities[item.id] || 1) === num 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={() => handleCheckout(item)}
                disabled={loading === item.id}
                className="w-full py-4 rounded-full font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all transform hover:scale-105 disabled:opacity-50"
              >
                {loading === item.id ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  `Order Now - $${item.price * (quantities[item.id] || 1)}`
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 text-center">
        <p className="text-lg font-bold text-gray-900">
          📦 $30 Minimum Order • Free Delivery 11 PM - 3 AM
        </p>
      </div>
    </div>
  )
}
