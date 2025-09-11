'use client'

import Hero from '@/components/Hero'
import BenefitsBar from '@/components/BenefitsBar'
import AvailabilityMeter from '@/components/AvailabilityMeter'
import ProductCard from '@/components/ProductCard'
import TrainingDayComparison from '@/components/TrainingDayComparison'
import BottomNav from '@/components/BottomNav'
import CorporateSection from '@/components/CorporateSection'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Healthy Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Benefits Bar - Right at the top */}
          <BenefitsBar />
          
          {/* Hero Section */}
          <Hero />
          
          {/* Live Availability Meter - Sticky */}
          <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-green-200 shadow-sm">
            <AvailabilityMeter />
          </div>

          {/* Main Product Section */}
          <section id="product" className="container mx-auto px-4 py-8">
            <ProductCard />
          </section>

          import CorporateSection from '@/components/CorporateSection'

// Then in your page layout, after the product section:
<section id="product" className="py-12 md:py-16">
  <ProductCard />
</section>

{/* ADD THIS NEW SECTION */}
<CorporateSection />

<section id="comparison" className="py-12 md:py-16 bg-gray-50">
  <TrainingDayComparison />
</section>

          {/* Training Day Comparison */}
          <section id="comparison" className="container mx-auto px-4 py-8">
            <TrainingDayComparison />
          </section>

          {/* Why FuelBox Section */}
          <section className="container mx-auto px-4 py-8 mb-20 md:mb-8">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-black text-center mb-6 text-gray-900">
                The Smart Choice for Athletes
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Value */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Unbeatable Value</h3>
                  <p className="text-gray-600 text-sm">
                    100g protein for $20.
                  </p>
                </div>

                {/* Convenience */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">⏱️</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Ready in Minutes</h3>
                  <p className="text-gray-600 text-sm">
                    No prep, no cleanup. Just heat and fuel your gains.
                  </p>
                </div>

                {/* Fresh */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Fresh Daily</h3>
                  <p className="text-gray-600 text-sm">
                    Made fresh every morning. Never frozen. Limited to 20 boxes.
                  </p>
                </div>
              </div>

              {/* Final CTA */}
              <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center">
                <p className="text-2xl font-black mb-3">
                  Stop Overpaying for Less Protein
                </p>
                <p className="mb-4 opacity-95">
                  Why pay $15 for 35g protein when you can get 108g for $20?
                </p>
                <button 
                  onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg inline-block"
                >
                  Order Your FuelBox Now →
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </>
  )
}
