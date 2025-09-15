'use client'

import { useState } from 'react'
import { Loader2, Users, MapPin } from 'lucide-react'

const drinkOptions = ['Coke', 'Pepsi', 'Sprite', 'Root Beer', 'Dr Pepper', 'Cream Soda']

const menuItems = [
  {
    id: 'classic-box',
    stripePriceId: 'price_1S7g5AHHRq5TjW22st91zcS1', // Update with your actual price ID
    name: 'Classic Box',
    price: 30,
    description: '1 Pizza Wrap, 2 Tacos, 1 Loaded Fries',
    icon: '🍕',
    servings: '1 person',
    drinks: 0
  },
  {
    id: 'family-box',
    stripePriceId: 'price_1S7gDPHHRq5TjW22bswkLYsc', // Update with your actual price ID
    name: 'Family Box',
    price: 55,
    description: '2 Pizza Wraps, 4 Tacos, 2 Loaded Fries',
    icon: '👨‍👩‍👧‍👦',
    servings: '2-3 people',
    drinks: 0
  },
  {
    id: 'party-box',
    stripePriceId: 'price_1S7gDoHHRq5TjW229HOABSaC',
    name: 'Party Box',
    price: 199,
    description: '10 Half-Wraps, 20 Tacos, 30 Wings, 2 XL Fries, 2 × 2L Pops',
    icon: '🎉',
    servings: '10 people',
    drinks: 2,
    badge: 'BEST VALUE'
  }
]

export default function ProductCard() {
  const [loading, setLoading] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<{[key: string]: number}>({})
  const [address, setAddress] = useState('')
  const [drinkSelections, setDrinkSelections] = useState<{[key: string]: string[]}>({})
  const [showDrinkModal, setShowDrinkModal] = useState<string | null>(null)
  const [deliveryFee, setDeliveryFee] = useState(0)

  const calculateDeliveryFee = (address: string) => {
    // Simple logic for now - you can integrate Google Maps API later
    const lowerAddress = address.toLowerCase()
    if (lowerAddress.includes('sfu') || lowerAddress.includes('surrey central')) {
      setDeliveryFee(0)
    } else if (lowerAddress.includes('surrey')) {
      setDeliveryFee(5)
    } else {
      setDeliveryFee(10)
    }
  }

  const handleCheckout = async (item: any) => {
    const quantity = quantities[item.id] || 1
    
    // Check if drinks need to be selected for party box
    if (item.drinks > 0 && (!drinkSelections[item.id] || drinkSelections[item.id].length !== item.drinks)) {
      setShowDrinkModal(item.id)
      return
    }

    setLoading(item.id)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: 'box',
          priceId: item.stripePriceId,
          quantity: quantity,
          productName: item.name,
          drinks: drinkSelections[item.id] || [],
          address: address,
          deliveryFee: deliveryFee
        })
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      {/* Delivery Address */}
      <div className="max-w-2xl mx-auto mb-8 bg-white rounded-xl shadow-md p-6">
        <label className="block text-sm font-bold mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Delivery Address
        </label>
        <input
          type="text"
          placeholder="Enter your address (e.g., SFU Surrey, Surrey Central)"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value)
            calculateDeliveryFee(e.target.value)
          }}
          className="w-full p-3 border rounded-lg"
        />
        {deliveryFee === 0 && address && (
          <p className="text-green-600 text-sm mt-2">✓ Free delivery to your area!</p>
        )}
        {deliveryFee > 0 && (
          <p className="text-gray-600 text-sm mt-2">Delivery fee: ${deliveryFee}</p>
        )}
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
            {item.badge && (
              <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {item.badge}
              </div>
            )}

            <div className="p-8 text-center">
              <div className="text-7xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-black mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-sm text-gray-500 mb-4">Serves {item.servings}</p>

              <div className="text-4xl font-black text-red-600 mb-6">${item.price}</div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Quantity:</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => setQuantities({...quantities, [item.id]: num})}
                      className={`w-12 h-12 rounded-lg font-bold transition-all ${
                        (quantities[item.id] || 1) === num 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drink Selection for Party Box */}
              {item.drinks > 0 && (
                <button
                  onClick={() => setShowDrinkModal(item.id)}
                  className="w-full mb-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200"
                >
                  Select 2L Drinks (2)
                  {drinkSelections[item.id]?.length === 2 && 
                    <span className="text-green-600"> ✓</span>
                  }
                </button>
              )}

              {/* Order Button */}
              <button
                onClick={() => handleCheckout(item)}
                disabled={loading === item.id || !address}
                className="w-full py-4 rounded-full font-bold text-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white transition-all transform hover:scale-105 disabled:opacity-50"
              >
                {loading === item.id ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <>
                    Order Now
                    {deliveryFee > 0 && ` (+$${deliveryFee} delivery)`}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drink Modal for Party Box */}
      {showDrinkModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-black mb-4">Select Two 2L Drinks</h3>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {drinkOptions.map(drink => (
                <button
                  key={drink}
                  onClick={() => {
                    const current = drinkSelections[showDrinkModal] || []
                    if (current.includes(drink)) {
                      setDrinkSelections({
                        ...drinkSelections,
                        [showDrinkModal]: current.filter(d => d !== drink)
                      })
                    } else if (current.length < 2) {
                      setDrinkSelections({
                        ...drinkSelections,
                        [showDrinkModal]: [...current, drink]
                      })
                    }
                  }}
                  className={`p-3 rounded-lg font-semibold ${
                    drinkSelections[showDrinkModal]?.includes(drink)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {drink}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowDrinkModal(null)}
              disabled={(drinkSelections[showDrinkModal]?.length || 0) !== 2}
              className="w-full py-3 bg-green-500 text-white rounded-lg font-bold disabled:bg-gray-300"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
