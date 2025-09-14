'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import BenefitsBar from '@/components/BenefitsBar'
import AvailabilityMeter from '@/components/AvailabilityMeter'
import ProductCard from '@/components/ProductCard'
import MidnightProductCard from '@/components/MidnightProductCard'
import MenuToggle from '@/components/MenuToggle'
import TrainingDayComparison from '@/components/TrainingDayComparison'
import BottomNav from '@/components/BottomNav'

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<'regular' | 'midnight'>('regular')

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

          {/* Menu Toggle */}
          <MenuToggle activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

          {/* Main Product Section - Conditional Rendering */}
          <section id="product" className="container mx-auto px-4 py-8">
            {activeMenu === 'regular' ? (
              <ProductCard />
            ) : (
              <MidnightProductCard />
            )}
          </section>

          {/* Training Day Comparison - Only show for regular menu */}
          {activeMenu === 'regular' && (
            <section id="comparison" className="container mx-auto px-4 py-8">
              <TrainingDayComparison />
            </section>
          )}

          {/* Why FuelBox Section - Conditional Content */}
          <section className="container mx-auto px-4 py-8 mb-20 md:mb-8">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-black text-center mb-6 text-gray-900">
                {activeMenu === 'regular' 
                  ? 'The Smart Choice for Athletes'
                  : 'Late Night Cravings Done Right'}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {activeMenu === 'regular' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {/* Late Night */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">🌙</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Open Till 3 AM</h3>
                      <p className="text-gray-600 text-sm">
                        Satisfying late-night cravings when you need it most.
                      </p>
                    </div>

                    {/* Free Delivery */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">🚚</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Free Delivery All Night</h3>
                      <p className="text-gray-600 text-sm">
                        No delivery fees, no minimum order after 11 PM.
                      </p>
                    </div>

                    {/* Loaded */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">🔥</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Loaded & Satisfying</h3>
                      <p className="text-gray-600 text-sm">
                        XXL portions that actually fill you up.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Final CTA */}
              <div className={`mt-8 ${activeMenu === 'regular' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-800 to-gray-900'} rounded-2xl p-6 text-white text-center`}>
                <p className="text-2xl font-black mb-3">
                  {activeMenu === 'regular' 
                    ? 'Stop Overpaying for Less Protein'
                    : 'Your Late Night Feast Awaits'}
                </p>
                <p className="mb-4 opacity-95">
                  {activeMenu === 'regular'
                    ? 'Why pay $15 for 35g protein when you can get 100g for $20?'
                    : 'Free delivery all night • No minimum order • Open till 3 AM'}
                </p>
                <button 
                  onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg inline-block"
                >
                  {activeMenu === 'regular' ? 'Order Your FuelBox Now →' : 'Order Midnight Box Now →'}
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
