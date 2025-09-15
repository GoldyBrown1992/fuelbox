'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, MapPin } from 'lucide-react'

const drinkOptions = ['Coke', 'Pepsi', 'Sprite', 'Root Beer', 'Dr Pepper', 'Cream Soda']

const menuItems = [
  {
    id: 'classic-box',
    stripePriceId: 'price_1S7jekHHRq5TjW227rRf1qsQ',
    name: 'Classic Box',
    price: 30,
    description: '1 Pizza Wrap, 2 Tacos, 1 Loaded Fries',
    icon: '🍕',
    servings: '1 person',
    drinks: 0
  },
  {
    id: 'family-box',
    stripePriceId: 'price_1S7jevHHRq5TjW226NlDjIbO',
    name: 'Family Box',
    price: 55,
    description: '2 Pizza Wraps, 4 Tacos, 2 Loaded Fries',
    icon: '👨‍👩‍👧‍👦',
    servings: '2-3 people',
    drinks: 0
  },
  {
    id: 'party-box',
    stripePriceId: 'price_1S7jfBHHRq5TjW22NBFU3sN4',
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
  const [drinkSelections, setDrinkSelections] = useState<{[key: string]: string[]}>({})
  const [showDrinkModal, setShowDrinkModal] = useState<string | null>(null)
  const [locationType, setLocationType] = useState<'sfu' | 'other' | ''>('')
  const [locationDetails, setLocationDetails] = useState('')
  const [otherAddress, setOtherAddress] = useState('')
  
  const addressInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (locationType === 'other' && addressInputRef.current && typeof window !== 'undefined' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          componentRestrictions: { country: 'ca' },
          fields: ['formatted_address'],
          types: ['address'],
          bounds: {
            north: 49.2057,
            south: 49.0583,
            east: -122.5937,
            west: -122.8489
          } // Surrey area bounds
        }
      )

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.formatted_address) {
          setOtherAddress(place.formatted_address)
        }
      })

      return () => {
        window.google.maps.event.clearInstanceListeners(autocomplete)
      }
    }
  }, [locationType])

  const handleCheckout = async (item: any) => {
    const quantity = quantities[item.id] || 1
    
    if (!locationType) {
      alert('Please select a delivery location')
      return
    }
    
    if (locationType === 'sfu' && !locationDetails) {
      alert('Please enter building/room details for SFU delivery')
      return
    }
    
    if (locationType === 'other' && !otherAddress) {
      alert('Please enter delivery address')
      return
    }
    
    if (item.drinks > 0 && (!drinkSelections[item.id] || drinkSelections[item.id].length !== item.drinks)) {
      setShowDrinkModal(item.id)
      return
    }

    setLoading(item.id)
    
    const deliveryAddress = locationType === 'sfu' 
      ? `SFU Surrey - ${locationDetails}`
      : otherAddress
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: 'midnight',
          priceId: item.stripePriceId,
          quantity: quantity,
          productName: item.name,
          fulfillment: 'delivery',
          drinks: drinkSelections[item.id] || [],
          deliveryAddress: deliveryAddress
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
    <>
      {/* Location Selection */}
      <div className="max-w-4xl mx-auto mb-6 bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-600" />
          Delivery Location
        </h3>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {
              setLocationType('sfu')
              setOtherAddress('')
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              locationType === 'sfu' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            SFU Surrey
          </button>
          <button
            onClick={() => {
              setLocationType('other')
              setLocationDetails('')
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              locationType === 'other' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Other Location
          </button>
        </div>

        {locationType === 'sfu' && (
          <div>
            <input
              type="text"
              placeholder="Enter building, room number, floor (e.g., Podium 2400, 2nd floor)"
              value={locationDetails}
              onChange={(e) => setLocationDetails(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <p className="text-green-600 text-sm mt-2">✓ Free delivery to SFU Surrey</p>
          </div>
        )}

        {locationType === 'other' && (
          <div>
            <input
              ref={addressInputRef}
              type="text"
              placeholder="Start typing your address..."
              value={otherAddress}
              onChange={(e) => setOtherAddress(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <p className="text-gray-600 text-sm mt-2">
              {otherAddress.toLowerCase().includes('surrey central') 
                ? '✓ Free delivery' 
                : '📍 $5-10 delivery fee may apply'}
            </p>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="max-w-4xl mx-auto mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
        <p className="font-bold text-green-800">
          🚚 FREE Delivery to SFU Surrey & Surrey Central • $5-10 delivery outside Surrey Central
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden relative flex flex-col">
            {item.badge && (
              <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {item.badge}
              </div>
            )}

            <div className="p-8 text-center flex flex-col flex-grow">
              <div className="text-7xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-black mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-sm text-gray-500 mb-4">Serves {item.servings}</p>

              <div className="text-4xl font-black text-red-600 mb-6">${item.price}</div>

              <div className="flex-grow"></div>

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

              <button
                onClick={() => handleCheckout(item)}
                disabled={loading === item.id || !locationType}
                className="w-full py-4 rounded-full font-bold text-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white transition-all transform hover:scale-105 disabled:opacity-50"
              >
                {loading === item.id ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  `Order Now - $${item.price * (quantities[item.id] || 1)}`
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drink Modal */}
      {showDrinkModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-black mb-4">Select Two 2L Drinks</h3>
            <p className="text-sm text-gray-600 mb-4">You can select the same drink twice</p>
            
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm font-semibold mb-1">Selected:</p>
              {drinkSelections[showDrinkModal]?.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {drinkSelections[showDrinkModal].map((drink, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white rounded text-sm">
                      {drink}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">None selected</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {drinkOptions.map(drink => (
                <button
                  key={drink}
                  onClick={() => {
                    const current = drinkSelections[showDrinkModal] || []
                    if (current.length < 2) {
                      setDrinkSelections({
                        ...drinkSelections,
                        [showDrinkModal]: [...current, drink]
                      })
                    }
                  }}
                  disabled={(drinkSelections[showDrinkModal]?.length || 0) >= 2}
                  className={`p-3 rounded-lg font-semibold ${
                    (drinkSelections[showDrinkModal]?.length || 0) >= 2
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {drink}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDrinkSelections({
                    ...drinkSelections,
                    [showDrinkModal!]: []
                  })
                }}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold"
              >
                Clear
              </button>
              <button
                onClick={() => setShowDrinkModal(null)}
                disabled={(drinkSelections[showDrinkModal]?.length || 0) !== 2}
                className="flex-1 py-3 bg-green-500 text-white rounded-lg font-bold disabled:bg-gray-300"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
