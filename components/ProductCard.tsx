'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function ProductCard() {
  const [loading, setLoading] = useState(false)
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription'>('single')

  const handleCheckout = async (type: 'single' | 'subscription') => {
    setLoading(true)
    setPurchaseType(type)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: type,
          quantity: 1,
          fulfillment: 'pickup',
          pickupLocation: 'Surrey Central'
        })
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black mb-2">FuelBox Pizza Wrap</h2>
        <p className="text-gray-600">Complete Performance Meal • Fresh Daily</p>
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">100g</div>
            <div className="text-xs text-gray-600">Protein</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">1,000</div>
            <div className="text-xs text-gray-600">Calories</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">65g</div>
            <div className="text-xs text-gray-600">Carbs</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">35g</div>
            <div className="text-xs text-gray-600">Fats</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleCheckout('single')}
          disabled={loading && purchaseType === 'single'}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && purchaseType === 'single' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            '🍕 Order Now - $20'
          )}
        </button>

        <button
          onClick={() => handleCheckout('subscription')}
          disabled={loading && purchaseType === 'subscription'}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative"
        >
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
            SAVE
          </span>
          {loading && purchaseType === 'subscription' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            '📅 Subscribe $499/mo'
          )}
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>✓ Secure Checkout</p>
        <p>✓ Fresh Daily</p>
        <p>✓ Ready in 3 mins</p>
      </div>
    </div>
  )
}
