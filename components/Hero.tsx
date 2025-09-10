'use client'

import { Zap, Star, Flame } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '60px 60px' }}></div>

      {/* Compact Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <span className="text-xl">🍕</span>
            <span className="font-bold text-sm">PIZZA WITHOUT THE GUILT</span>
            <span className="text-xl">🍕</span>
          </div>

          {/* Main Headline - Compact */}
          <h1 className="text-4xl md:text-6xl font-black mb-3">
            <span className="block">FUELBOX</span>
            <span className="block text-5xl md:text-7xl text-yellow-300">PIZZA WRAP</span>
          </h1>

          {/* Big Number */}
          <div className="text-6xl md:text-8xl font-black text-white mb-3 animate-pulse">
            108g PROTEIN
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl mb-6 text-white/95 font-semibold max-w-2xl mx-auto">
            All your pizza cravings. None of the guilt. 4x the protein of regular pizza.
          </p>

          {/* Value Props - Horizontal */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm">
              <Flame className="w-4 h-4 text-yellow-300" />
              <span className="font-semibold">1,085 Calories</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="font-semibold">Complete Meal</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="font-semibold">$20 Only</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              Order Now →
            </button>
            <button 
              onClick={() => document.getElementById('nutrition')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black/20 backdrop-blur text-white border-2 border-white/50 px-8 py-3 rounded-full font-bold text-lg hover:bg-black/30 transition-colors"
            >
              See Nutrition Facts
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
