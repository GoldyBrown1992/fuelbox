'use client'

import { MapPin, Clock, Truck } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500">
      <div className="container mx-auto px-4 py-16 md:py-20 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-black mb-4">
          SURREY'S ONLY 24-7 KITCHEN
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 font-semibold max-w-3xl mx-auto">
          Hot and toasty wraps, crispy tacos, loade fries and party boxes delivered all day
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm uppercase tracking-wider">24/7 Service</div>
          </div>
          <div className="text-center">
            <Truck className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm uppercase tracking-wider">Fast Delivery</div>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm uppercase tracking-wider">Surrey Central</div>
          </div>
        </div>

        <button 
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
        >
          Order Now
        </button>

        <div className="mt-8 text-white/90 text-sm">
          Free delivery to SFU Surrey • Delivery fees apply outside Surrey Central
        </div>
      </div>
    </section>
  )
}
