'use client'

import { useState } from 'react'
import { Plus, Minus, Check, X } from 'lucide-react'

type Box = {
  id: number
  protein: string
  sauce: string
  spiceLevel: string
  veggies: string[]
}

function CorporateMenu() {
  const [boxes, setBoxes] = useState<Box[]>([{ 
    id: 1, 
    protein: 'Grilled Chicken', 
    sauce: 'Garlic Aioli',
    spiceLevel: 'mild',
    veggies: []
  }])
  
  const proteins = [
    { value: 'Grilled Chicken', emoji: '🍗' },
    { value: 'Meat Lovers', emoji: '🥩' },
    { value: 'Beyond Meat', emoji: '🌱' }
  ]

  const sauces = ['Garlic Aioli', 'Spicy Mayo', 'Honey Garlic', "Nando's Perinaise"]
  const spiceLevels = ['Mild', 'Spicy', 'Hot']
  const veggieOptions = [
    { value: 'Sautéed Onions', emoji: '🧅' },
    { value: 'Red Peppers', emoji: '🫑' },
    { value: 'Spinach', emoji: '🥬' }
  ]
  
  const addBox = () => {
    setBoxes([...boxes, { 
      id: Date.now(), 
      protein: 'Grilled Chicken',
      sauce: 'Garlic Aioli',
      spiceLevel: 'mild',
      veggies: []
    }])
  }

  const removeBox = (id: number) => {
    if (boxes.length > 1) {
      setBoxes(boxes.filter(box => box.id !== id))
    }
  }

  const updateBox = (id: number, field: keyof Box, value: any) => {
    setBoxes(boxes.map(box => 
      box.id === id ? { ...box, [field]: value } : box
    ))
  }

  const toggleVeggie = (id: number, veggie: string) => {
    const box = boxes.find(b => b.id === id)
    if (box) {
      const newVeggies = box.veggies.includes(veggie)
        ? box.veggies.filter(v => v !== veggie)
        : [...box.veggies, veggie]
      updateBox(id, 'veggies', newVeggies)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-8 mb-6 text-white shadow-xl">
        <h2 className="text-4xl font-black mb-3">FuelBox Corporate</h2>
        <div className="flex flex-wrap gap-6 text-base">
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur rounded-full px-4 py-2">
            <span className="text-2xl">💰</span>
            <span className="font-semibold">$20/box</span>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur rounded-full px-4 py-2">
            <span className="text-2xl">📦</span>
            <span className="font-semibold">Min 10 boxes</span>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur rounded-full px-4 py-2">
            <span className="text-2xl">🚚</span>
            <span className="font-semibold">Free Vancouver delivery</span>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 mb-6">
        <p className="text-sm font-bold text-green-900 mb-3">Every box includes:</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <span className="text-3xl">🥤</span>
            <p className="text-xs font-medium mt-1 text-gray-700">Water</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <span className="text-3xl">🍓</span>
            <p className="text-xs font-medium mt-1 text-gray-700">Fruit Cup</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <span className="text-3xl">🥛</span>
            <p className="text-xs font-medium mt-1 text-gray-700">Greek Yogurt</p>
          </div>
        </div>
      </div>

      {/* Box Builder */}
      <div className="space-y-4 mb-6">
        {boxes.map((box, index) => (
          <div key={box.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 relative hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-bold bg-gray-100 px-3 py-1 rounded-full">
                Box #{index + 1}
              </span>
              {boxes.length > 1 && (
                <button
                  onClick={() => removeBox(box.id)}
                  className="text-red-500 hover:bg-red-50 rounded-full p-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Protein Selection */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Protein</label>
              <div className="grid grid-cols-3 gap-2">
                {proteins.map(({ value, emoji }) => (
                  <button
                    key={value}
                    onClick={() => updateBox(box.id, 'protein', value)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      box.protein === value
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-2xl">{emoji}</span>
                      <span className="text-xs font-semibold">{value}</span>
                      {box.protein === value && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Veggie Add-ons */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">
                Add Veggies <span className="text-gray-400 normal-case">(optional)</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {veggieOptions.map(({ value, emoji }) => (
                  <button
                    key={value}
                    onClick={() => toggleVeggie(box.id, value)}
                    className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                      box.veggies.includes(value)
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white border-gray-200 hover:border-green-400 text-gray-700'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span className="text-xs font-medium">{value}</span>
                    {box.veggies.includes(value) && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sauce Selection */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Sauce</label>
              <div className="grid grid-cols-2 gap-2">
                {sauces.map(sauce => (
                  <button
                    key={sauce}
                    onClick={() => updateBox(box.id, 'sauce', sauce)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      box.sauce === sauce
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
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
              <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Spice Level</label>
              <div className="grid grid-cols-3 gap-2">
                {spiceLevels.map((level, idx) => (
                  <button
                    key={level}
                    onClick={() => updateBox(box.id, 'spiceLevel', level.toLowerCase())}
                    className={`py-3 px-3 rounded-xl text-sm font-bold transition-all ${
                      box.spiceLevel === level.toLowerCase()
                        ? idx === 0 ? 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-800 ring-2 ring-green-500'
                          : idx === 1 ? 'bg-gradient-to-br from-yellow-100 to-orange-100 text-yellow-800 ring-2 ring-yellow-500'
                          : 'bg-gradient-to-br from-red-100 to-orange-100 text-red-800 ring-2 ring-red-500'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>{'🌶️'.repeat(idx + 1)}</span>
                      <span>{level}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Add Box Button */}
        <button 
          onClick={addBox}
          className="w-full py-5 border-2 border-dashed border-blue-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="flex items-center justify-center gap-3 text-blue-600 font-bold">
            <div className="bg-blue-100 rounded-full p-2 group-hover:bg-blue-200 transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <span>Add Another Box</span>
          </div>
        </button>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl rounded-t-3xl p-5 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-gray-500 text-sm">Total boxes</span>
              <p className="text-3xl font-black">{boxes.length}</p>
            </div>
            <div className="text-right">
              <span className="text-gray-500 text-sm">Total price</span>
              <p className="text-3xl font-black">${boxes.length * 20}</p>
            </div>
          </div>
          
          <button 
            disabled={boxes.length < 10}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all transform ${
              boxes.length < 10
                ? 'bg-gray-200 text-gray-400'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {boxes.length < 10 
              ? `Add ${10 - boxes.length} more boxes (minimum 10)` 
              : 'Continue to Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CorporateMenu
