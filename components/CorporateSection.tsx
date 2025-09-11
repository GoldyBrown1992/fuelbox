'use client'

export default function CorporateSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            High-Performance Teams Eat High-Performance Meals
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fuel your workplace with 100g protein meals. Better nutrition = Better results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white text-center">
            <div className="text-5xl font-black text-green-400 mb-2">10+</div>
            <p className="font-bold mb-2">Minimum Order</p>
            <p className="text-sm text-gray-300">Perfect for teams and meetings</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white text-center">
            <div className="text-5xl font-black text-green-400 mb-2">10%</div>
            <p className="font-bold mb-2">Corporate Discount</p>
            <p className="text-sm text-gray-300">Plus free delivery to your office</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white text-center">
            <div className="text-5xl font-black text-green-400 mb-2">100g</div>
            <p className="font-bold mb-2">Protein Per Meal</p>
            <p className="text-sm text-gray-300">No afternoon crash guaranteed</p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="mailto:corporate@fuelbox.ca?subject=Corporate%20Order%20Inquiry"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
          >
            Get Corporate Pricing → corporate@fuelbox.ca
          </a>
        </div>
      </div>
    </section>
  )
}
