'use client'

import { useState } from 'react'
import { Check, Zap, TrendingUp, Package, Loader2 } from 'lucide-react'

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
        {/* Main Product Section */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative h-96 md:h-full bg-gradient-to-br from-amber-400 to-green-400 p-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <div className="w-64 h-64 mx-auto bg-white rounded-full shadow-2xl flex items-center justify-center animate-float">
                <div className="text-center">
                  <Package className="w-24 h-24 mx-auto mb-4 text-amber-500" />
                  <p className="text-4xl font-black text-gray-900">FUEL</p>
                  <p className="text-6xl font-black text-green-500">BOX</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span className="font-bold">Ready in 3 Minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-12">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-amber-600 to-green-600 bg-clip-text text-transparent">
                Performance Meal
              </h1>
              <p className="text-xl text-gray-600">The Ultimate High-Protein Power Meal</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
                <p className="text-3xl font-black text-amber-600">100g</p>
                <p className="text-sm font-semibold text-gray-700">PROTEIN</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                <p className="text-3xl font-black text-green-600">1200</p>
                <p className="text-sm font-semibold text-gray-700">CALORIES</p>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-6">
              <p className="font-bold text-gray-900 mb-3">Every Box Contains:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Grilled Chicken Breast (60g protein)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Wild-Caught Salmon (25g protein)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Grass-Fed Beef (15g protein)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Sweet Potato & Quinoa Blend</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Organic Vegetables & Avocado</span>
                </li>
              </ul>
            </div>

            {/* Fulfillment Options */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="font-bold text-gray-900 mb-3">Fulfillment Method:</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  onClick={() => setFulfillment('delivery')}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    fulfillment === 'delivery'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🚚 Delivery
                </button>
                <button
                  onClick={() => setFulfillment('pickup')}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    fulfillment === 'pickup'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📍 Pickup
                </button>
              </div>
              
              {fulfillment === 'pickup' && (
                <div className="animate-slide-up">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Select Location:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPickupLocation('downtown')}
                      className={`p-2 rounded text-sm font-medium transition-all ${
                        pickupLocation === 'downtown'
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Downtown
                    </button>
                    <button
                      onClick={() => setPickupLocation('westside')}
                      className={`p-2 rounded text-sm font-medium transition-all ${
                        pickupLocation === 'westside'
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Westside
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector (Single Purchase Only) */}
            <div className="mb-6">
              <p className="font-bold text-gray-900 mb-3">Quantity:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold transition-colors"
                >
                  +
                </button>
                <span className="text-sm text-gray-600 ml-2">(Max 5 per order)</span>
              </div>
            </div>

            {/* Pricing Options */}
            <div className="space-y-3">
              {/* Single Purchase */}
              <button
                onClick={() => handleCheckout('single')}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-5 px-6 rounded-2xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading === 'single' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Order Now - ${(20 * quantity).toFixed(2)}
                  </span>
                )}
              </button>

              {/* Subscription */}
              <button
                onClick={() => handleCheckout('subscription')}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 px-6 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed relative overflow-hidden"
              >
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  SAVE $100
                </div>
                {loading === 'subscription' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span>
                    <span className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Subscribe & Save - $499.99/mo
                    </span>
                    <span className="text-sm opacity-90">25 meals per month</span>
                  </span>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                🔒 Secure Checkout
              </span>
              <span className="flex items-center gap-1">
                💳 Powered by Stripe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
