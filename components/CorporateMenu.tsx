'use client'

import { useState } from 'react'
import { Plus, Minus, Check } from 'lucide-react'

function CorporateMenu() {
  const [boxes, setBoxes] = useState([{ 
    id: 1, 
    protein: 'Grilled Chicken', 
    sauce: 'Garlic Aioli',
    spiceLevel: 'mild'
  }])
  
  const proteins = [
    { value: 'Grilled Chicken', emoji: '🍗' },
    { value: 'Meat Lovers', emoji: '🥩' },
    { value: 'Beyond Meat', emoji: '🌱' },
    { value: 'Veggies', emoji: '🥗' }
  ]

  const sauces = ['Garlic Aioli', 'Spicy Mayo', 'Honey Garlic', 'Ranch']
  const spiceLevels = ['Mild', 'Spicy', 'Hot']
  
  const addBox = () => {
    setBoxes([...boxes, { 
      id: boxes.length + 1, 
      protein: 'Grilled Chicken',
      sauce: 'Garlic Aioli',
      spiceLevel: 'mild'
    }])
  }

  const removeBox = (id: number) => {
    if (boxes.length > 1) {
      setBoxes(boxes.filter(box => box.id !== id))
    }
  }

  const updateBox = (id: number, field: string, value: string) => {
    setBoxes(boxes.map(box => 
      box.id === id ? { ...box, [field]: value } : box
    ))
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white">
        <h2 className="text-3xl font-bold mb-2">FuelBox Corporate</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span>$20/box</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <span>Min 10 boxes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚚</span>
            <span>Free Vancouver delivery</span>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold text-green-800 mb-2">Every box includes:</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded-lg p-2">
            <span className="text-2xl">🥤</span>
            <p className="text-xs mt-1">Water</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            <span className="text-2xl">🍓</span>
            <p className="text-xs mt-1">Fruit Cup</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            <span className="text-2xl">🥛</span>
            <p className="text-xs mt-1">Greek Yogurt</p>
          </div>
        </div>
      </div>

      {/* Box Builder */}
      <div className="space-y-3 mb-6">
        {boxes.map((box, index) => (
          <div key={box.id} className="bg-white rounded-xl shadow-sm border p-4 relative">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-bold text-gray-600">Box #{index + 1}</span>
              {boxes.length > 1 && (
                <button
                  onClick={() => removeBox(box.id)}
                  className="text-red-500 hover:bg-red-50 rounded-full p-1"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Protein Selection */}
            <div className="mb-3">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">PROTEIN</label>
              <div className="grid grid-cols-2 gap-2">
                {proteins.map(({ value, emoji }) => (
                  <button
                    key={value}
                    onClick={() => updateBox(box.id, 'protein', value)}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      box.protein === value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{emoji}</span>
                      <span className="text-sm font-medium">{value}</span>
                      {box.protein === value && (
                        <Check className="w-4 h-4 text-blue-500 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sauce Selection */}
            <div className="mb-3">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">SAUCE</label>
              <div className="flex gap-1 flex-wrap">
                {sauces.map(sauce => (
                  <button
                    key={sauce}
                    onClick={() => updateBox(box.id, 'sauce', sauce)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      box.sauce === sauce
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {sauce}
                  </button>
                ))}
              </div>
            </div>

            {/* Spice Level */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">SPICE</label>
              <div className="flex gap-1">
                {spiceLevels.map((level, idx) => (
                  <button
                    key={level}
                    onClick={() => updateBox(box.id, 'spiceLevel', level.toLowerCase())}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      box.spiceLevel === level.toLowerCase()
                        ? idx === 0 ? 'bg-green-100 text-green-700 ring-2 ring-green-500'
                          : idx === 1 ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500'
                          : 'bg-red-100 text-red-700 ring-2 ring-red-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-1">{'🌶️'.repeat(idx + 1)}</span>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Add Box Button */}
        <button 
          onClick={addBox}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-blue-600">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Another Box</span>
          </div>
        </button>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 bg-white border-t shadow-lg rounded-t-2xl p-4 -mx-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">
              <span className="text-2xl font-bold text-black">{boxes.length}</span> boxes
            </span>
            <span className="text-2xl font-bold">
              ${boxes.length * 20}
            </span>
          </div>
          
          <button 
            disabled={boxes.length < 10}
            className={`w-full py-4 rounded-full font-bold text-lg transition-all transform ${
              boxes.length < 10
                ? 'bg-gray-200 text-gray-400'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {boxes.length < 10 
              ? `Add ${10 - boxes.length} more (min 10)` 
              : 'Continue to Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CorporateMenu
