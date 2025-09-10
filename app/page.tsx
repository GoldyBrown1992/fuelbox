import Hero from '@/components/Hero'
import ScarcityInventory from '@/components/ScarcityInventory'
import ProductCard from '@/components/ProductCard'
import NutritionComparison from '@/components/NutritionComparison'
import BottomNav from '@/components/BottomNav'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        {/* Pizza-themed background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Compact Hero + Scarcity in one section */}
        <div className="relative z-10">
          <Hero />
          
          {/* Sticky Scarcity Counter */}
          <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-red-200">
            <ScarcityInventory />
          </div>

          {/* Main Product Section - More Compact */}
          <section id="product" className="container mx-auto px-4 py-6">
            <ProductCard />
          </section>

          {/* Nutrition Comparison */}
          <section id="nutrition" className="container mx-auto px-4 py-6">
            <NutritionComparison />
          </section>

          {/* Trust & CTA Section - Compact */}
          <section className="container mx-auto px-4 py-8 mb-20 md:mb-8">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Trust Badges */}
              <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-lg mb-4">Why Choose FuelBox?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍕</span>
                    <div>
                      <p className="font-semibold">Pizza Flavor, Zero Guilt</p>
                      <p className="text-sm text-gray-600">All the taste, 4x the protein</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💪</span>
                    <div>
                      <p className="font-semibold">108g Premium Protein</p>
                      <p className="text-sm text-gray-600">Chicken, eggs, Greek yogurt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <p className="font-semibold">Fresh Daily Delivery</p>
                      <p className="text-sm text-gray-600">Never frozen, made fresh</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="font-semibold">Ready in 3 Minutes</p>
                      <p className="text-sm text-gray-600">Microwave & enjoy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
                <h3 className="text-2xl font-black mb-3">
                  Limited Daily Supply!
                </h3>
                <p className="mb-4 opacity-95">
                  Only 20 Pizza Wraps made fresh each day. When they're gone, they're gone.
                </p>
                <button 
                  onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  Order Now - $20
                </button>
                <p className="text-sm mt-3 text-center opacity-90">
                  🔥 Selling fast today
                </p>
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
