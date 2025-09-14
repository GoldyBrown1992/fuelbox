'use client'

import { useState } from 'react'
import { Loader2, Flame, Clock, Users, TrendingUp } from 'lucide-react'

const midnightItems = [
  {
    id: 'midnight-box',
    name: 'Midnight Box',
    price: 30,
    description: 'XXL loaded chicken wrap glazed in signature sauce, golden fries, wings (1/2 lb), 2 tacos, drink',
    badge: '🔥 432 ordered tonight',
    icon: '🌙',
    popular: true
  },
  {
    id: 'party-pack',
    name: 'Party Pack (10 people)',
    price: 199,
    originalPrice: 250,
    description: '5 XXL wraps, 2 lbs wings, large fries, 10 drinks',
    badge: 'BEST VALUE - Save $51',
    icon: '🎉',
    popular: true
  },
  {
    id: 'double-midnight',
    name: 'Double Midnight Box',
    price: 55,
    description: '2x Midnight Boxes - perfect for 2 people',
    badge: 'Save $5',
    icon: '👥'
  },
  {
    id: 'loaded-wrap',
    name: 'Loaded Chicken Wrap',
    price: 12,
    description: 'Double crispy chicken, melted cheese, spicy sauce',
    icon: '🌯'
  },
  {
    id: 'wings-fries',
    name: 'Wings & Loaded Fries',
    price: 15,
    description: '1 lb wings with choice of sauce + cheese fries',
    icon: '🍗'
  },
  {
    id: 'loaded-fries',
    name: 'Cheesy Loaded Fries',
    price: 8,
    description: 'Extra cheese, bacon, jalapeños',
    icon: '🍟'
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
      // For now, just simulate checkout
      // You'll need to update your checkout API to handle midnight items
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: 'midnight',
          itemName: item.name,
          price: item.price * quantity,
          quantity: quantity,
          fulfillment: 'delivery',
          pickupLocation: null
        })
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      // For demo purposes
      alert(`Order placed: ${quantity}x ${item.name} - Total: $${item.price * quantity}`)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      {/* Night Time Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6 mb-8 text-center">
        <h2 className="text-3xl font-black mb-2 flex items-center justify-center gap-3">
          <span>🌙</span>
          MIDNIGHT BOX MENU
          <span>🌙</span>
        </h2>
        <p className="text-lg opacity-90">11 PM - 3 AM • FREE DELIVERY ALL NIGHT • NO MINIMUM</p>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 inline mr-2" />
            Open Till 3 AM
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4 inline mr-2" />
            1,247 Orders Tonight
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            🚚 Free Delivery
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {midnightItems.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-2xl shadow-xl overflow-hidden relative border-2 ${
              item.popular ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            {/* Badge */}
            {item.badge && (
              <div className="absolute -top-3 left-4 z-10">
                <div className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  {item.badge}
                </div>
              </div>
            )}

            {/* Card Content */}
            <div className="p-6">
              {/* Icon and Title */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl">{item.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900">{item.name}</h3>
                  {item.popular && (
                    <div className="flex items-center gap-1 mt-1">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-red-500 font-semibold">POPULAR TONIGHT</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              {/* Price */}
              <div className="mb-4">
                {item.originalPrice && (
                  <span className="text-gray-400 line-through text-lg mr-2">${item.originalPrice}</span>
                )}
                <span className="text-3xl font-black text-gray-900">${item.price}</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Quantity:</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => handleQuantityChange(item.id, num)}
                      className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
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
                className={`w-full py-3 rounded-full font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  item.popular 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white'
                }`}
              >
                {loading === item.id ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <>
                    Order Now - ${item.price * (quantities[item.id] || 1)}
                    {item.id === 'party-pack' && ' 🎉'}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Late Night Promise */}
      <div className="mt-12 bg-gradient-to-r from-gray-800 to-black text-white rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-black mb-4">
          Why Choose Midnight Box?
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-2">🚚</div>
            <h4 className="font-bold mb-1">Free Delivery All Night</h4>
            <p className="text-sm opacity-90">No delivery fees between 11 PM - 3 AM</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-bold mb-1">30-Min Delivery</h4>
            <p className="text-sm opacity-90">Hot food, delivered fast when you need it</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🔥</div>
            <h4 className="font-bold mb-1">Made Fresh</h4>
            <p className="text-sm opacity-90">Cooked to order, never sitting around</p>
          </div>
        </div>
      </div>
    </div>
  )
}
