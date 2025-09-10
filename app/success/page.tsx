'use client'

import { useEffect, useState, Suspense } from 'react'
import { CheckCircle, Package, Truck, Clock, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Wrap the component that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            >
              <div 
                className={`w-2 h-2 ${
                  i % 3 === 0 ? 'bg-amber-400' : i % 3 === 1 ? 'bg-green-400' : 'bg-yellow-400'
                } rounded-full`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-2xl mb-6">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Your FuelBox is being prepared with care
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white bg-opacity-90 backdrop-blur rounded-3xl shadow-xl p-8 mb-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="font-mono text-lg font-bold text-gray-900">
                {sessionId ? sessionId.slice(-8).toUpperCase() : 'FB-' + Math.random().toString(36).substr(2, 8).toUpperCase()}
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900">Order Placed</p>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900">Preparing Your Meal</p>
                  <p className="text-sm text-gray-500">Within 2 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900">Out for Delivery</p>
                  <p className="text-sm text-gray-500">Tomorrow by 12 PM</p>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-gradient-to-r from-amber-50 to-green-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>You'll receive an email confirmation shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Our team will prepare your fresh meal with 100g of premium protein</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>You'll get a notification when your order is out for delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Heat for 3-4 minutes and enjoy your gains!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-white bg-opacity-90 backdrop-blur rounded-3xl shadow-xl p-8 mb-8">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              💪 Pro Tips for Maximum Gains
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-xl">
                <p className="font-semibold text-amber-900 mb-1">Best Time to Eat</p>
                <p className="text-sm text-amber-700">
                  30-60 minutes post-workout for optimal protein synthesis
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="font-semibold text-green-900 mb-1">Storage Tip</p>
                <p className="text-sm text-green-700">
                  Keep refrigerated. Can be frozen for up to 3 months
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="font-semibold text-blue-900 mb-1">Heating Instructions</p>
                <p className="text-sm text-blue-700">
                  Microwave 3-4 mins or oven at 350°F for 15 mins
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="font-semibold text-purple-900 mb-1">Hydration</p>
                <p className="text-sm text-purple-700">
                  Drink 16-20oz of water with your meal for better digestion
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all"
            >
              Print Receipt
            </button>
          </div>

          {/* Support */}
          <div className="text-center mt-12 text-gray-600">
            <p className="mb-2">Questions about your order?</p>
            <p className="font-semibold">
              Email us at{' '}
              <a href="mailto:support@fuelbox.com" className="text-amber-600 hover:text-amber-700">
                support@fuelbox.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-2xl mb-6 animate-pulse">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <p className="text-xl text-gray-600">Loading your order confirmation...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

// Force dynamic rendering to prevent prerender errors
export const dynamic = 'force-dynamic'
