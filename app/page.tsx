'use client'

import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      
      <section id="menu" className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Choose Your Box
          </h2>
          <p className="text-lg text-gray-600">
            Fresh grilled wraps, tacos & loaded fries. Ready in minutes.
          </p>
        </div>
        <ProductCard />
      </section>

       </main>
  )
}
