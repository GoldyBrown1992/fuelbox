'use client'

import { Zap, Leaf, Target } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-700">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <Leaf className="w-5 h-5 text-green-300" />
            <span className="font-bold text-sm">FRESH • HEALTHY • POWERFUL</span>
            <Leaf className="w-5 h-5 text-green-300" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="block text-white">FUELBOX</span>
            <span className="block text-5xl md:text-7xl text-yellow-300">PIZZA WRAP</span>
<span className="block text-2xl md:text-3xl text-white/90 mt-2">MEAL KIT</span>
            </span>
          </h1>

          {/* Hero Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div>
              <div className="text-5xl md:text-6xl font-black text-green-300">108g</div>
              <div className="text-sm font-semibold uppercase tracking-wider">Protein</div>
            </div>
            <div className="border-l-2 border-white/30"></div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-green-300">$20</div>
              <div className="text-sm font-semibold uppercase tracking-wider">Only</div>
            </div>
          </div>

          {/* Value Proposition */}
          <p className="text-xl md:text-2xl mb-8 text-white/95 font-semibold max-w-3xl mx-auto">
            3X More Protein Than our competitors. Better Price. Better Fuel.
          </p>

          {/* Quick Benefits */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <span className="text-sm font-medium">Complete Meal</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <span className="text-sm font-medium">Pizza Flavor</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <span className="text-sm font-medium">Fresh Daily</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <span className="text-sm font-medium">1,085 Calories</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Order Now</span>
              <Zap className="w-5 h-5 text-green-600" />
            </button>
            <button 
              onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-800/50 backdrop-blur text-white border-2 border-white/50 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-800/70 transition-colors flex items-center justify-center gap-2"
            >
              <span>Compare to Typical Meal Plan</span>
              <Target className="w-5 h-5" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-6 text-white/80 text-sm">
            <div>⭐⭐⭐⭐⭐ 5.0 Rating</div>
            <div>|</div>
            <div>Surrey's #1 Protein Meal</div>
            <div>|</div>
            <div>Limited Daily</div>
          </div>
        </div>
      </div>
    </section>
  )
}
