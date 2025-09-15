'use client'

import { Check, TrendingUp, Moon, Sun } from 'lucide-react'

interface FuelComparisonProps {
  activeMenu: 'day' | 'night'
}

export default function FuelComparison({ activeMenu }: FuelComparisonProps) {
  if (activeMenu === 'day') {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
          Day Fuel vs Typical Meal Prep
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* FuelBox Day */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-yellow-400">
            <div className="text-center mb-4">
              <Sun className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-xl font-black">FuelBox Day Meal</h3>
              <p className="text-3xl font-black text-green-600 mt-2">$20</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>100g protein (complete meal kit)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Fresh grilled daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>1,000 balanced calories</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Ready in 3 minutes</span>
              </div>
            </div>
          </div>

          {/* Competitor */}
          <div className="bg-white rounded-2xl shadow-xl p-6 opacity-75">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <h3 className="text-xl font-black text-gray-700">Typical Meal Prep</h3>
              <p className="text-3xl font-black text-gray-600 mt-2">$15-18</p>
            </div>
            
            <div className="space-y-2 text-gray-600">
              <div>• Only 40-60g protein</div>
              <div>• Frozen or day-old</div>
              <div>• 600 calories (not enough)</div>
              <div>• Bland, repetitive flavors</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
        Why Choose FuelBox Night Menu?
      </h2>
      
      <div className="bg-gradient-to-r from-gray-800 to-black text-white rounded-2xl p-8">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Moon className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
            <h3 className="font-bold text-lg mb-2">Open Late</h3>
            <p>11 PM - 3 AM when others are closed</p>
          </div>
          <div>
            <TrendingUp className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
            <h3 className="font-bold text-lg mb-2">Still Quality</h3>
            <p>Same grilled chicken, just loaded differently</p>
          </div>
          <div>
            <Check className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
            <h3 className="font-bold text-lg mb-2">Free Delivery</h3>
            <p>No fees, no minimum for night orders</p>
          </div>
        </div>
      </div>
    </div>
  )
}
