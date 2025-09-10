'use client'

import { useState } from 'react'
import { Check, Zap, TrendingUp, Loader2, Pizza } from 'lucide-react'

export default function ProductCard() {
  const [loading, setLoading] = useState<'single' | 'subscription' | null>(null)
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery')
  const [pickupLocation, setPickupLocation] = useState<'downtown' | 'westside'>('downtown')
  const [quantity, setQuantity] = useState(1)

  const handleCheckout = async (type: 'single' | 'subscription') => {
    setLoading(type)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: type,
          quantity: type === 'single' ? quantity : 1,
          fulfillment,
          pickupLocation: fulfillment === 'pickup' ? pickupLocation : null
        })
      })
      
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Compact Grid Layout */}
        <div className="grid md:grid-cols-5 gap-0">
          {/* Product Image - Smaller */}
          <div className="md:col-span-2 bg-gradient-to-br from-red-400 to-orange-400 p-6 flex items-center justify-center relative h-64 md:h-auto">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              {/* Pizza Emoji as Placeholder */}
              <div className="text-8xl md:text-9xl animate-float mb-4">
                🍕
              </div>
              <div className="bg-white/90 rounded-full px-4 py-2 inline-block">
                <p className="font-black text-gray-900 text-lg">PIZZA WRAP</p>
                <p className="text-sm text-gray-600">108g Protein</p>
              </div>
            </div>
          </div>

          {/* Product Details - Compact */}
          <div className="md:col-span-3 p-6 md:p-8">
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-black mb-2 text-gray-900">
                FuelBox Pizza Wrap
              </h2>
              <p className="text-lg text-gray-600">Eat Pizza. Build Muscle. Zero Guilt.</p>
            </div>

            {/* What's Included - Compact List */}
            <div className="mb-4">
              <p className="font-bold text-gray-900 mb-2">Your Complete Meal:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍕</span>
                  <span className="text-gray-700">Flame-Grilled Pizza Wrap (200g chicken)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🥚</span>
                  <span className="text-gray-700">3 Whole Eggs (boiled/pan-fried)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🥛</span>
                  <span className="text-gray-700">Oikos Greek Yogurt (100g)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍇</span>
                  <span className="text-gray-700">Fresh Fruit Bowl (berries & grapes)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">💧</span>
                  <span className="text-gray-700">355ml Bottled Water</span>
                </div>
              </div>
            </div>

            {/* Key Stats - Horizontal */}
            <div className="flex gap-3 mb-4">
              <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                <p className="text-2xl font-black text-red-600">108g</p>
                <p className="text-xs font-semibold text-gray-700">PROTEIN</p>
              </div>
              <div className="bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
                <p className="text-2xl font-black text-orange-600">1,085</p>
                <p className="text-xs font-semibold text-gray-700">CALORIES</p>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <p className="text-2xl font-black text-green-600">67g</p>
                <p className="text-xs font-semibold text-gray-700">CARBS</p>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <p className="text-2xl font-black text-blue-600">37g</p>
                <p className="text-xs font-semibold text-gray-700">FATS</p>
              </div>
            </div>

            {/* Fulfillment Options - Compact */}
            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setFulfillment('delivery')}
                  className={`flex-1 p-2 rounded-lg font-semibold text-sm transition-all ${
                    fulfillment === 'delivery'
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🚚 Delivery
                </button>
                <button
                  onClick={() => setFulfillment('pickup')}
                  className={`flex-1 p-2 rounded-lg font-semibold text-sm transition-all ${
                    fulfillment === 'pickup'
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📍 Pickup
                </button>
              </div>
              
              {fulfillment === 'pickup' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setPickupLocation('downtown')}
                    className={`flex-1 p-1.5 rounded text-xs font-medium transition-all ${
                      pickupLocation === 'downtown'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    Downtown
                  </button>
                  <button
                    onClick={() => setPickupLocation('westside')}
                    className={`flex-1 p-1.5 rounded text-xs font-medium transition-all ${
                      pickupLocation === 'westside'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    Westside
                  </button>
                </div>
              )}
            </div>

            {/* Quantity & Order Buttons - Horizontal Layout */}
            <div className="flex gap-3 items-center">
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-sm"
                >
                  -
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Order Buttons */}
              <div className="flex-1 flex gap-2">
                <button
                  onClick={() => handleCheckout('single')}
                  disabled={loading !== null}
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-75"
                >
                  {loading === 'single' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span>Order ${(20 * quantity).toFixed(0)}</span>
                  )}
                </button>

                <button
                  onClick={() => handleCheckout('subscription')}
                  disabled={loading !== null}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-75 relative"
                >
                  {loading === 'subscription' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span>Subscribe $499/mo</span>
                  )}
                </button>
              </div>
            </div>

            {/* Trust Line */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>🔒 Secure Checkout</span>
              <span>💳 Powered by Stripe</span>
              <span>⚡ Ready in 3 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
