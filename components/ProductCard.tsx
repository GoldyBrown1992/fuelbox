'use client'

import { useState } from 'react'
import { Loader2, Clock, Truck, Calendar } from 'lucide-react'

export default function ProductCard() {
  const [loading, setLoading] = useState(false)
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription'>('single')
  const [quantity, setQuantity] = useState(1)
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup')
  const [pickupLocation, setPickupLocation] = useState('Surrey Central')

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: purchaseType,
          quantity: purchaseType === 'subscription' ? 1 : quantity,
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
  const totalPrice = purchaseType === 'single' 
    ? (20 * quantity) + (fulfillment === 'delivery' ? deliveryFee : 0)
    : 499.99

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Order Window Notice */}
      <div className="bg-amber-500 text-white p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Clock className="w-4 h-4" />
          <span>Order by 10 AM for same-day pickup (12 PM onwards)</span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h2 className="text-3xl font-black mb-6">Choose Your Plan</h2>
        
        {/* Purchase Type Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setPurchaseType('single')}
            className={`p-4 rounded-xl border-2 transition-all ${
              purchaseType === 'single'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-bold text-lg">Single Box</div>
            <div className="text-2xl font-black text-green-600">$20</div>
            <div className="text-sm text-gray-600">One-time purchase</div>
          </button>

          <button
            onClick={() => setPurchaseType('subscription')}
            className={`p-4 rounded-xl border-2 transition-all relative ${
              purchaseType === 'subscription'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              SAVE $100+
            </div>
            <div className="font-bold text-lg">Monthly Plan</div>
            <div className="text-2xl font-black text-green-600">$499.99/mo</div>
            <div className="text-sm text-gray-600">30 days of meals</div>
            <div className="text-xs text-green-600 font-semibold mt-1">FREE DELIVERY</div>
          </button>
        </div>

        {/* Quantity (Single Purchase Only) */}
        {purchaseType === 'single' && (
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} box{num > 1 ? 'es' : ''}</option>
              ))}
            </select>
          </div>
        )}

        {/* Fulfillment Method */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Fulfillment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFulfillment('pickup')}
              className={`p-3 rounded-xl border-2 transition-all ${
                fulfillment === 'pickup'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Clock className="w-5 h-5 mx-auto mb-1" />
              <div className="font-semibold">Pickup</div>
              <div className="text-xs text-gray-600">Ready at 12 PM</div>
            </button>

            <button
              onClick={() => setFulfillment('delivery')}
              className={`p-3 rounded-xl border-2 transition-all ${
                fulfillment === 'delivery'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Truck className="w-5 h-5 mx-auto mb-1" />
              <div className="font-semibold">Delivery</div>
              <div className="text-xs text-gray-600">
                {purchaseType === 'subscription' ? 'FREE' : '+$5 fee'}
              </div>
            </button>
          </div>
        </div>

        {/* Pickup Location (if pickup selected) */}
        {fulfillment === 'pickup' && (
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Pickup Location</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
            >
              <option value="Surrey Central">Surrey Central - 12 PM onwards</option>
              <option value="King George">King George Station - 12 PM onwards</option>
              <option value="Newton">Newton Exchange - 12 PM onwards</option>
            </select>
            <p className="text-xs text-gray-600 mt-2">
              <Clock className="w-3 h-3 inline mr-1" />
              Order by 10 AM for same-day pickup
            </p>
          </div>
        )}

        {/* Delivery Info (if delivery selected) */}
        {fulfillment === 'delivery' && (
          <div className="mb-6 p-4 bg-amber-50 rounded-xl">
            <p className="text-sm">
              <Truck className="w-4 h-4 inline mr-1" />
              {purchaseType === 'subscription' 
                ? "FREE delivery included with monthly plan (30 days)"
                : "Delivery fee: $5 (FREE with monthly plan)"}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Delivery available in Surrey, Delta, and Langley
            </p>
          </div>
        )}

        {/* Subscription Benefits */}
        {purchaseType === 'subscription' && (
          <div className="mb-6 p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-sm mb-2 text-green-800">Monthly Plan Benefits:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 30 days of meals (huge savings)</li>
              <li>• FREE delivery (save $150/month)</li>
              <li>• Priority pickup slots</li>
              <li>• Cancel anytime</li>
            </ul>
          </div>
        )}

        {/* Order Summary */}
        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${purchaseType === 'single' ? (20 * quantity).toFixed(2) : '499.99'}</span>
          </div>
          {fulfillment === 'delivery' && purchaseType === 'single' && (
            <div className="flex justify-between mb-2 text-sm">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-green-600">
              ${totalPrice.toFixed(2)}
              {purchaseType === 'subscription' && '/month'}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {purchaseType === 'subscription' ? 'Start Monthly Plan' : 'Order Now'}
              {fulfillment === 'delivery' && purchaseType === 'subscription' && ' - Free Delivery'}
            </>
          )}
        </button>

        {/* Important Notes */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Orders must be placed by 10 AM for same-day service</p>
          <p>Pickup available from 12 PM at selected locations</p>
        </div>
      </div>
    </div>
  )
}
