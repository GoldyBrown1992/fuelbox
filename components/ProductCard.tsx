'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function ProductCard() {
  const [loading, setLoading] = useState(false)
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription'>('single')
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup')
  const [pickupLocation, setPickupLocation] = useState('Surrey Central')
  const [quantity, setQuantity] = useState(1)

  const handleCheckout = async (type: 'single' | 'subscription') => {
    setLoading(true)
    setPurchaseType(type)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: type,
          quantity: type === 'subscription' ? 1 : quantity,
          fulfillment,
          pickupLocation: fulfillment === 'pickup' ? pickupLocation : null
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

  const deliveryFee = purchaseType === 'subscription' ? 0 : 5
  const singleTotal = (20 * quantity) + (fulfillment === 'delivery' ? deliveryFee : 0)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black mb-1">FuelBox Pizza Wrap</h2>
<p className="text-xl font-bold text-green-600 mb-2">Meal Kit</p>
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

      {/* Fulfillment Options */}
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFulfillment('pickup')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              fulfillment === 'pickup' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📍 Pickup
          </button>
          <button
            onClick={() => setFulfillment('delivery')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              fulfillment === 'delivery' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🚚 Delivery {fulfillment === 'delivery' && '(+$5)'}
          </button>
        </div>

        {fulfillment === 'pickup' && (
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="Surrey Central">Surrey Central - 12 PM onwards</option>
            <option value="King George">King George Station - 12 PM onwards</option>
            <option value="Newton">Newton Exchange - 12 PM onwards</option>
          </select>
        )}

        {fulfillment === 'delivery' && (
          <p className="text-sm text-gray-600 bg-amber-50 p-3 rounded-lg">
            Delivery: $5 fee (FREE with monthly subscription!)
          </p>
        )}
      </div>

      {/* Quantity for single purchase */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">Quantity:</label>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => setQuantity(num)}
              className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                quantity === num 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Purchase Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleCheckout('single')}
          disabled={loading && purchaseType === 'single'}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && purchaseType === 'single' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
              Processing...
            </>
          ) : (
            `Order Now - $${singleTotal}`
          )}
        </button>

        <button
          onClick={() => handleCheckout('subscription')}
          disabled={loading && purchaseType === 'subscription'}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
            SAVE
          </span>
          {loading && purchaseType === 'subscription' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
              Processing...
            </>
          ) : (
            <>
              Subscribe $499/mo
              {fulfillment === 'delivery' && <span className="text-sm"> (Free Delivery!)</span>}
            </>
          )}
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        <p>Order by 10 AM for same-day service • Pickup from 12 PM</p>
        <p className="font-semibold text-green-600 mt-1">Monthly plan includes 30 days of meals</p>
      </div>
    </div>
  )
}
