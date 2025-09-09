import Hero from '@/components/Hero'
import ScarcityInventory from '@/components/ScarcityInventory'
import ProductCard from '@/components/ProductCard'
import NutritionCards from '@/components/NutritionCards'
import InfluencerSection from '@/components/InfluencerSection'
import BottomNav from '@/components/BottomNav'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 pb-20 md:pb-0">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* Scarcity Counter - Sticky on mobile */}
          <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-200 md:relative md:bg-transparent md:border-0">
            <ScarcityInventory />
          </div>

          {/* Main Product Card */}
          <section className="container mx-auto px-4 py-8">
            <ProductCard />
          </section>

          {/* Nutrition Information */}
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-8 bg-gradient-to-r from-amber-600 to-green-600 bg-clip-text text-transparent">
              Perfectly Balanced Macros
            </h2>
            <NutritionCards />
          </section>

          {/* Social Proof */}
          <section className="container mx-auto px-4 py-8">
            <InfluencerSection />
          </section>

          {/* Trust Badges */}
          <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-2">🚚</div>
                <p className="font-bold text-sm">Free Delivery</p>
                <p className="text-xs text-gray-600">Orders over $100</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-2">❄️</div>
                <p className="font-bold text-sm">Fresh Daily</p>
                <p className="text-xs text-gray-600">Never frozen</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-2">💪</div>
                <p className="font-bold text-sm">100g Protein</p>
                <p className="text-xs text-gray-600">Guaranteed</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-2">⭐</div>
                <p className="font-bold text-sm">5-Star Rated</p>
                <p className="text-xs text-gray-600">500+ Reviews</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-8">Common Questions</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <details className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg group">
                <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                  How do I heat the meal?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Microwave for 3-4 minutes or oven at 350°F for 15 minutes. Each meal comes with detailed heating instructions.
                </p>
              </details>
              <details className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg group">
                <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                  What&apos;s the protein source?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Premium blend of grilled chicken breast (60g), wild-caught salmon (25g), and grass-fed beef (15g).
                </p>
              </details>
              <details className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg group">
                <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                  Can I freeze the meals?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes! Meals stay fresh for 5 days refrigerated or up to 3 months frozen. Thaw overnight before heating.
                </p>
              </details>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="container mx-auto px-4 py-12 mb-20 md:mb-12">
            <div className="bg-gradient-to-r from-amber-500 to-green-500 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Ready to Fuel Your Gains?
              </h2>
              <p className="text-xl mb-8 opacity-95">
                Join thousands of athletes who trust FuelBox for their protein needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                  Order Now - $20
                </button>
                <button className="bg-black/20 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black/30 transition-colors">
                  Subscribe & Save
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
