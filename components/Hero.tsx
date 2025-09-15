'use client'

import { Zap, Clock, Truck } from 'lucide-react'

interface HeroProps {
  activeMenu: 'day' | 'night'
}

export default function Hero({ activeMenu }: HeroProps) {
  return (
    <section className={`relative overflow-hidden transition-all ${
      activeMenu === 'day' 
        ? 'bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500'
        : 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
    }`}>
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="block">FUELBOX</span>
            <span className="block text-3xl md:text-5xl mt-2 opacity-90">
              {activeMenu === 'day' ? 'DAY FUEL' : 'NIGHT FUEL'}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl mb-8 font-semibold max-w-3xl mx-auto">
            {activeMenu === 'day' 
              ? 'Performance meals when you need to perform. 100g protein. Fresh grilled daily.'
              : 'Satisfying meals when you need satisfaction. Free delivery. Open till 3 AM.'}
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mb-8">
            {activeMenu === 'day' ? (
              <>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black">100g</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">Protein</div>
                </div>
                <div className="border-l-2 border-white/30"></div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black">$20</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">Per Meal</div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black">FREE</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">Delivery</div>
                </div>
                <div className="border-l-2 border-white/30"></div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black">3 AM</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">Open Till</div>
                </div>
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Order Now</span>
              <Zap className="w-5 h-5" />
            </button>
          </div>

          {/* Service Info */}
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap text-white/90 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{activeMenu === 'day' ? '6 AM - 10 PM' : '11 PM - 3 AM'}</span>
            </div>
            <div>•</div>
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              <span>{activeMenu === 'day' ? 'Pickup & Delivery' : 'Free Delivery'}</span>
            </div>
            <div>•</div>
            <div>Surrey, Delta, Langley</div>
          </div>
        </div>
      </div>
    </section>
  )
}
