export default function NutritionComparison() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-black text-center mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        Pizza Without The Guilt
      </h2>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* FuelBox Nutrition */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-500 relative">
          <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            WINNER 🏆
          </div>
          <h3 className="text-xl font-black mb-4 text-gray-900">FuelBox Pizza Wrap</h3>
          
          {/* Nutrition Facts Style */}
          <div className="border-t-4 border-b-4 border-black py-2 mb-3">
            <p className="text-3xl font-black">Nutrition Facts</p>
            <p className="text-sm">Serving Size: 1 Box</p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b pb-1">
              <span className="font-bold">Calories</span>
              <span className="font-black text-lg">1,085</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-600">Protein</span>
              <span className="font-black text-2xl text-green-600">108g</span>
            </div>
            <div className="flex justify-between">
              <span>Total Carbs</span>
              <span className="font-semibold">67g</span>
            </div>
            <div className="flex justify-between">
              <span>Total Fat</span>
              <span className="font-semibold">37g</span>
            </div>
            <div className="flex justify-between">
              <span>Fiber</span>
              <span className="font-semibold">6g</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-4 h-4" />
              <span className="text-sm font-semibold">Complete meal with fruits & yogurt</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-4 h-4" />
              <span className="text-sm font-semibold">Keeps you full for 4-5 hours</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-4 h-4" />
              <span className="text-sm font-semibold">Perfect post-workout meal</span>
            </div>
          </div>

          <div className="mt-4 bg-green-50 rounded-lg p-3">
            <p className="text-center font-bold text-green-700">
              💪 4X MORE PROTEIN
            </p>
          </div>
        </div>

        {/* Domino's Pizza */}
        <div className="bg-white rounded-2xl shadow-xl p-6 opacity-90">
          <h3 className="text-xl font-black mb-4 text-gray-900">3 Slices Domino's Veggie</h3>
          
          {/* Nutrition Facts Style */}
          <div className="border-t-4 border-b-4 border-black py-2 mb-3">
            <p className="text-3xl font-black">Nutrition Facts</p>
            <p className="text-sm">Serving Size: 3 Slices</p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b pb-1">
              <span className="font-bold">Calories</span>
              <span className="font-black text-lg">680</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-red-600">Protein</span>
              <span className="font-black text-2xl text-red-600">27g</span>
            </div>
            <div className="flex justify-between">
              <span>Total Carbs</span>
              <span className="font-semibold">84g</span>
            </div>
            <div className="flex justify-between">
              <span>Total Fat</span>
              <span className="font-semibold">28g</span>
            </div>
            <div className="flex justify-between">
              <span>Fiber</span>
              <span className="font-semibold">3g</span>
            </div>
          </div>

          {/* Downsides */}
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex items-center gap-2 text-red-600">
              <X className="w-4 h-4" />
              <span className="text-sm">Still hungry after eating</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <X className="w-4 h-4" />
              <span className="text-sm">Low protein for the calories</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <X className="w-4 h-4" />
              <span className="text-sm">No fruits or complete nutrition</span>
            </div>
          </div>

          <div className="mt-4 bg-red-50 rounded-lg p-3">
            <p className="text-center font-bold text-red-700">
              ❌ NOT ENOUGH PROTEIN
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white text-center">
        <p className="text-2xl font-black mb-2">
          "This isn't just a wrap. It's pizza flavor packed with 108g protein to fuel your day — without the guilt."
        </p>
        <p className="opacity-90">
          For just $2-5 more than regular pizza, get 4X the protein and actually feel satisfied.
        </p>
      </div>
    </div>
  )
}

// Add these imports at the top of the file
import { Check, X } from 'lucide-react'
