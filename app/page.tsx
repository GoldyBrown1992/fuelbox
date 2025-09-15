'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import BenefitsBar from '@/components/BenefitsBar'
import MenuSelector from '@/components/MenuSelector'
import ProductCard from '@/components/ProductCard'
import MidnightProductCard from '@/components/MidnightProductCard'
import FuelComparison from '@/components/FuelComparison'
import BottomNav from '@/components/BottomNav'

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<'day' | 'night'>('day')
  
  // Auto-detect time and set appropriate menu
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 23 || hour < 5) {
      setActiveMenu('night')
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <BenefitsBar />
        <Hero activeMenu={activeMenu} />
        
        {/* Menu Toggle - Sticky */}
        <div className="sticky top-0 z-40 bg-white shadow-md">
          <MenuSelector activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>

        {/* Product Section */}
        <section id="product" className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              {activeMenu === 'day' ? 'Power Your Day' : 'Fuel Your Night'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {activeMenu === 'day' 
                ? 'High-protein meals designed for peak performance. Fresh grilled, perfectly balanced.'
                : 'Satisfying late-night meals that hit the spot. Same quality, different vibe.'}
            </p>
          </div>
          
          {activeMenu === 'day' ? <ProductCard /> : <MidnightProductCard />}
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="container mx-auto px-4 py-12 bg-gray-50">
          <FuelComparison activeMenu={activeMenu} />
        </section>
      </main>
      
      <BottomNav />
    </>
  )
}
