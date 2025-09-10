'use client'

import { useState } from 'react'
import { Check, Zap, TrendingUp, Loader2, Leaf } from 'lucide-react'

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
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-100">
        {/* Compact Grid Layout */}
        <div className="grid md:grid-cols-5 gap-0">
          {/* Product Image Section */}
          <div className="md:col-span-2 bg-gradient-to-br from-green-500 to-emerald-500 p-8 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative z-10 text-center text-white">
              {/* Product Visual */}
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 mb-4">
                <div className="text-7xl mb-2">🍕</div>
                <div className="text-5xl">🥚🥛🍇</div>
              </div>
              <div>
                <p className="text-3xl font-black mb-1">FUELBOX</p>
                <p className="text-lg font-semibold">Pizza Wrap Meal</p>
                <div className="mt-2 inline-block bg-white/30 backdrop-blur px-3 py-1 rounded-full">
                  <p className="text-sm font-bold">108g PROTEIN</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:col-span-3 p-6 md:p-8">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                  FuelBox Pizza Wrap
                </h2>
                <Leaf className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-lg text-gray-600">Complete Performance Meal • Fresh Daily</p>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-green-50 px-3 py-2 rounded-lg text-center border border-green-200">
                <p className="text-xl font-black text-green-600">108g</p>
                <p className="text-xs text-gray-600">Protein</p>
              </div>
              <div className="bg-emerald-50 px-3 py-2 rounded-lg text-center border border-emerald-200">
                <p className="text-xl font-black text-emerald-600">1,085</p>
                <p className="text-xs text-gray-600">Calories</p>
              </div>
              <div className="bg-teal-50 px-3 py-2 rounded-lg text-center border border-teal-200">
                <p className="text-xl font-black text-teal-600">67g</p>
                <p className="text-xs text-gray-600">Carbs</p>
              </div>
              <div className="bg-cyan-50 px-3 py-2 rounded-lg text-center border border-cyan-200">
                <p className="text-xl font-black text-cyan-600">37g</p>
                <p className="text-xs text-gray-600">Fats</p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-100">
              <p className="font-bold text-gray-900 mb-2">Your Complete Meal Box:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Pizza Wrap (200g grilled chicken)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>3 Whole Eggs (your choice)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Oikos Greek Yogurt (100g)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Fresh Fruit Bowl (150g)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>355ml Bottled Water</span>
                </div>
              </div>
            </div>

            {/* Fulfillment Options */}
            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setFulfillment('delivery')}
                  className={`flex-1 p-2 rounded-lg font-semibold text-sm transition-all ${
                    fulfillment === 'delivery'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🚚 Free Delivery
                </button>
                <button
                  onClick={() => setFulfillment('pickup')}
                  className={`flex-1 p-2 rounded-lg font-semibold text-sm transition-all ${
                    fulfillment === 'pickup'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📍 Pickup
                </button>
              </div>
              
              {fulfillment === 'pickup' && (
                <div className="flex gap-2 animate-slide-up">
                  <button
                    onClick={() => setPickupLocation('downtown')}
                    className={`flex-1 p-1.5 rounded text-xs font-medium transition-all ${
                      pickupLocation === 'downtown'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    Downtown Surrey
                  </button>
                  <button
                    onClick={() => setPickupLocation('westside')}
                    className={`flex-1 p-1.5 rounded text-xs font-medium transition-all ${
                      pickupLocation === 'westside'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    King George Blvd
                  </button>
                </div>
              )}
            </div>

            {/* Quantity & Order Section */}
            <div className="space-y-3">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">(Max 5)</span>
                </div>
              </div>

              {/* Order Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleCheckout('single')}
                  disabled={loading !== null}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-75 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  {loading === 'single' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      Order Now - ${(20 * quantity).toFixed(0)}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleCheckout('subscription')}
                  disabled={loading !== null}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-75 relative shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                    SAVE
                  </div>
                  {loading === 'subscription' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Subscribe $499/mo
                    </span>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-500" />
                  Secure Checkout
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-500" />
                  Fresh Daily
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-500" />
                  Ready in 3 mins
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
