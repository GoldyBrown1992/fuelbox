import { Check, X, TrendingUp } from 'lucide-react'

export default function TrainingDayComparison() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Why Pay More for Less Protein?
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* FuelBox */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border-3 border-green-500 relative transform hover:scale-[1.02] transition-transform">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            🏆 WINNER - BEST VALUE
          </div>
          
          <div className="text-center mb-6 pt-4">
            <h3 className="text-2xl font-black text-gray-900 mb-2">FuelBox Pizza Wrap</h3>
            <p className="text-gray-600">Complete Performance Meal</p>
          </div>

          <div className="space-y-4">
            {/* Price */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Price</span>
                <span className="text-2xl font-black text-green-600">$20</span>
              </div>
            </div>

            {/* Protein */}
            <div className="bg-green-100 rounded-xl p-4 border-2 border-green-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-700">PROTEIN</span>
                <span className="text-3xl font-black text-green-700">108g</span>
              </div>
              <div className="text-xs text-green-600 mt-1">
                Pizza wrap + 3 eggs + Greek yogurt
              </div>
            </div>

            {/* What You Get */}
            <div className="space-y-2">
              <p className="font-bold text-gray-700 mb-2">Complete Meal Includes:</p>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Flame-grilled Pizza Wrap (200g chicken)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>3 Whole Eggs (18g protein)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Greek Yogurt (10g protein)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Fresh Fruit Bowl</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Bottled Water</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">1,085</p>
                <p className="text-xs text-gray-600">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">67g</p>
                <p className="text-xs text-gray-600">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">37g</p>
                <p className="text-xs text-gray-600">Fats</p>
              </div>
            </div>

            {/* Value Badge */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-3 text-center">
              <p className="font-black">$0.185 per gram of protein</p>
            </div>
          </div>
        </div>

        {/* Typical Meal Plan */}
        <div className="bg-white rounded-3xl shadow-xl p-6 opacity-95 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-bold">
            Typical Meal Plan
          </div>
          
          <div className="text-center mb-6 pt-4">
            <h3 className="text-2xl font-black text-gray-900 mb-2">Typical Bowl/Wrap</h3>
            <p className="text-gray-600">King George Blvd Location</p>
          </div>

          <div className="space-y-4">
            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Price</span>
                <span className="text-2xl font-black text-gray-600">$15</span>
              </div>
            </div>

            {/* Protein */}
            <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-red-600">PROTEIN</span>
                <span className="text-3xl font-black text-red-600">35g</span>
              </div>
              <div className="text-xs text-red-500 mt-1">
                Standard 4oz chicken portion
              </div>
            </div>

            {/* What You Get */}
            <div className="space-y-2">
              <p className="font-bold text-gray-700 mb-2">What You Get:</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Just the bowl/wrap (no extras)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Standard 4oz protein portion</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>No eggs included</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>No yogurt or fruit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Drinks sold separately</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">~600</p>
                <p className="text-xs text-gray-600">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">~50g</p>
                <p className="text-xs text-gray-600">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">~20g</p>
                <p className="text-xs text-gray-600">Fats</p>
              </div>
            </div>

            {/* Value Badge */}
            <div className="bg-gray-200 text-gray-700 rounded-xl p-3 text-center">
              <p className="font-black">$0.43 per gram of protein</p>
              <p className="text-xs mt-1 text-red-600">2.3X MORE EXPENSIVE!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <TrendingUp className="w-12 h-12 mx-auto mb-3 text-green-200" />
            <p className="text-4xl font-black mb-2">3X</p>
            <p className="font-semibold">More Protein</p>
            <p className="text-sm opacity-90 mt-1">108g vs 35g</p>
          </div>
          <div>
            <span className="text-5xl mb-3 block">💰</span>
            <p className="text-4xl font-black mb-2">$5</p>
            <p className="font-semibold">More Only</p>
            <p className="text-sm opacity-90 mt-1">Complete meal vs single item</p>
          </div>
          <div>
            <span className="text-5xl mb-3 block">🎯</span>
            <p className="text-4xl font-black mb-2">56%</p>
            <p className="font-semibold">Better Value</p>
            <p className="text-sm opacity-90 mt-1">Per gram of protein</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-2xl font-black mb-4">
            "Other meal plan services cannot compete with us!"
          </p>
          <button 
            onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg inline-block"
          >
            Order FuelBox Instead →
          </button>
        </div>
      </div>
    </div>
  )
}
