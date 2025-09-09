import { Zap, Star, Trophy } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-green-500">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-float animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center text-white">
          {/* Logo/Brand */}
          <div className="mb-6 inline-block">
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full">
              <Trophy className="w-6 h-6 text-yellow-300" />
              <span className="font-bold text-sm">
                #1 RATED PERFORMANCE MEAL
              </span>
              <Trophy className="w-6 h-6 text-yellow-300" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-4 animate-scale-in">
            <span className="block text-white text-shadow-lg">FUEL</span>
            <span className="block text-8xl md:text-9xl bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              100g
            </span>
            <span className="block text-white text-shadow-lg">PROTEIN</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/95 font-semibold">
            The Only Meal You Need to Dominate Your Day
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">1200 Calories</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">85g Carbs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">35g Healthy Fats</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl hover:shadow-3xl"
            >
              Order Now - $20
            </button>
            <button 
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black/20 backdrop-blur text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold text-lg hover:bg-black/30 transition-colors"
            >
              Subscribe & Save $100
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <span className="font-semibold ml-2">4.9/5</span>
            </div>
            <div className="h-6 w-px bg-white/30"></div>
            <div className="font-semibold">
              500+ Athletes Fueled
            </div>
            <div className="h-6 w-px bg-white/30"></div>
            <div className="font-semibold">
              Only 20/Day
            </div>
          </div>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white" fillOpacity="0.1"/>
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 40C840 50 960 70 1080 80C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white" fillOpacity="0.2"/>
          <path d="M0 120L60 100C120 80 240 40 360 20C480 0 600 0 720 15C840 30 960 60 1080 75C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"/>
        </svg>
      </div>
    </section>
  )
}
