'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, MapPin, Clock } from 'lucide-react'

const KITCHEN_LOCATION = 'SFU Surrey, 250-13450 102 Ave, Surrey, BC V3T 0A3'

const drinkOptions = ['Coke', 'Pepsi', 'Sprite', 'Root Beer', 'Dr Pepper', 'Cream Soda']
const wingFlavors = ['Tandoori', 'Honey Garlic', 'Garlic Parmesan']

const menuItems = [
  {
    id: 'classic-box',
    stripePriceId: 'price_1S7jekHHRq5TjW227rRf1qsQ',
    name: 'Classic Box',
    price: 30,
    description: '1 Pizza melt, 2 Tacos, 1 Loaded Fries',
    icon: '🍕',
    servings: '1 person',
    drinks: 0,
    hasSpice: true,
    hasWings: false
  },
  {
    id: 'duo-box',
    stripePriceId: 'price_1S7jevHHRq5TjW226NlDjIbO',
    name: 'Duo Box',
    price: 55,
    description: '2 Pizza melts, 4 Tacos, 2 Loaded Fries',
    icon: '👯',
    servings: '2 people',
    drinks: 0,
    hasSpice: true,
    hasWings: false
  },
  {
    id: 'party-box',
    stripePriceId: 'price_1S7jfBHHRq5TjW22NBFU3sN4',
    name: 'Party Box',
    price: 199,
    description: '10 Half-melts, 20 Tacos, 30 Wings, 2 XL Fries, 2 × 2L Pops',
    icon: '🎉',
    servings: '10 people',
    drinks: 2,
    badge: 'BEST VALUE',
    hasSpice: true,
    hasWings: true
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
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [deliveryFee, setDeliveryFee] = useState<number>(0)
  const [estimatedTime, setEstimatedTime] = useState<string>('')
  const [distance, setDistance] = useState<number>(0)
  const [spiceLevels, setSpiceLevels] = useState<{[key: string]: number}>({})
  const [wingSelections, setWingSelections] = useState<{[key: string]: {[flavor: string]: number}}>({})
  
  const addressInputRef = useRef<HTMLInputElement>(null)

  // Calculate delivery details using Distance Matrix API
  const calculateDeliveryDetails = async (address: string) => {
    if (!window.google || !address) return

    const service = new window.google.maps.DistanceMatrixService()
    
    try {
      const response = await new Promise<any>((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [KITCHEN_LOCATION],
          destinations: [address],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (result: any, status: any) => {
          if (status === 'OK') resolve(result)
          else reject(status)
        })
      })

      if (response.rows[0].elements[0].status === 'OK') {
        const distanceInKm = response.rows[0].elements[0].distance.value / 1000
        const durationInMin = Math.ceil(response.rows[0].elements[0].duration.value / 60)
        
        setDistance(distanceInKm)
        
        // Calculate delivery fee based on distance
        let fee = 0
        if (distanceInKm <= 5) {
          fee = 0
        } else if (distanceInKm <= 10) {
          fee = 5
        } else if (distanceInKm <= 20) {
          fee = 15
        } else {
          fee = -1 // Don't deliver over 20km
        }
        
        setDeliveryFee(fee)
        
        // Estimate total time (driving + 20 min prep)
        const totalTime = durationInMin + 20
        setEstimatedTime(`${totalTime}-${totalTime + 10} minutes`)
      }
    } catch (error) {
      console.error('Distance calculation failed:', error)
      // Fallback to simple calculation
      const lower = address.toLowerCase()
      if (lower.includes('surrey central') || lower.includes('sfu')) {
        setDeliveryFee(0)
      } else if (lower.includes('surrey')) {
        setDeliveryFee(5)
      } else {
        setDeliveryFee(15)
      }
    }
  }

  // Setup autocomplete with distance calculation
  useEffect(() => {
    if (locationType === 'other' && addressInputRef.current && typeof window !== 'undefined' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          componentRestrictions: { country: 'ca' },
          fields: ['formatted_address'],
          types: ['address']
        }
      )

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.formatted_address) {
          setOtherAddress(place.formatted_address)
          calculateDeliveryDetails(place.formatted_address)
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

    if (deliveryFee === -1) {
      alert('Sorry, we don\'t deliver to this area. Maximum delivery distance is 20km.')
      return
    }

    if (!customerName) {
      alert('Please enter your name')
      return
    }

    if (!phoneNumber) {
      alert('Please enter your phone number')
      return
    }
    
    const phoneRegex = /^[\d\s\-\(\)]+$/
    if (!phoneRegex.test(phoneNumber) || phoneNumber.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid phone number')
      return
    }
    
    if (item.hasWings) {
      const totalWings = Object.values(wingSelections[item.id] || {}).reduce((a, b) => a + b, 0)
      if (totalWings !== 30) {
        alert('Please select exactly 30 wings')
        return
      }
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
          deliveryAddress: deliveryAddress,
          customerName: customerName,
          phoneNumber: phoneNumber,
          customerEmail: `${phoneNumber.replace(/\D/g, '')}@order.surreykitchen.com`,
          deliveryInstructions: deliveryInstructions,
          deliveryFee: deliveryFee,
          estimatedTime: estimatedTime,
          distance: distance,
          spiceLevel: spiceLevels[item.id] ?? 1,
          wingFlavor: wingSelections[item.id] || {}
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
      {/* Delivery Information */}
      <div className="max-w-4xl mx-auto mb-6 bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-600" />
          Delivery Information
        </h3>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {
              setLocationType('sfu')
              setOtherAddress('')
              setDeliveryFee(0)
              setEstimatedTime('25-35 minutes')
              setDistance(0)
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
              setDeliveryFee(0)
              setEstimatedTime('')
              setDistance(0)
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
            <div className="mt-2 p-2 bg-green-50 rounded-lg">
              <p className="text-green-600 text-sm font-semibold">✓ Free delivery to SFU Surrey</p>
              <p className="text-gray-600 text-sm">Estimated delivery: 25-35 minutes</p>
            </div>
          </div>
        )}

        {locationType === 'other' && (
          <div>
            <input
              ref={addressInputRef}
              type="text"
              placeholder="Start typing your address..."
              value={otherAddress}
              onChange={(e) => {
                setOtherAddress(e.target.value)
                // Also trigger calculation for manual typing
                if (e.target.value.length > 10) {
                  calculateDeliveryDetails(e.target.value)
                }
              }}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
            
            {/* Live delivery details */}
            {otherAddress && distance > 0 && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Distance:</span> {distance.toFixed(1)} km
                  </div>
                  <div>
                    <span className="font-semibold">Delivery:</span> 
                    {deliveryFee === 0 && <span className="text-green-600"> Free</span>}
                    {deliveryFee > 0 && <span> ${deliveryFee}</span>}
                    {deliveryFee === -1 && <span className="text-red-600"> Too far</span>}
                  </div>
                  {estimatedTime && (
                    <div className="col-span-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      <span className="font-semibold">Estimated:</span> {estimatedTime}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Name, Phone and Instructions */}
        {locationType && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Name *
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="(604) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Delivery Instructions (optional)
              </label>
              <textarea
                placeholder="Buzzer code, meet in lobby, leave at door, etc."
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                rows={2}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="max-w-4xl mx-auto mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
        <p className="font-bold text-green-800">
          🚚 FREE Delivery within 5km of Surrey Central
        </p>
        <p className="text-xs text-green-700 mt-1">
          No hidden fees • Prices include tax • What you see is what you pay
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

              {/* Spice Level Selector */}
{item.hasSpice && (
  <div className="mb-4">
    <label className="text-sm font-semibold text-gray-600 mb-2 block">Spice Level:</label>
    <div className="flex justify-between gap-1">
      <button
        onClick={() => setSpiceLevels({...spiceLevels, [item.id]: 0})}
        className={`flex-1 py-2 px-1 rounded-lg transition-all flex flex-col items-center ${
          (spiceLevels[item.id] ?? 1) === 0 
            ? 'bg-gray-200 ring-2 ring-gray-500' 
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <span className="text-xl md:text-2xl">❌</span>
        <span className="text-[10px] md:text-xs font-bold mt-1">None</span>
      </button>
      
      <button
        onClick={() => setSpiceLevels({...spiceLevels, [item.id]: 1})}
        className={`flex-1 py-2 px-1 rounded-lg transition-all flex flex-col items-center ${
          (spiceLevels[item.id] ?? 1) === 1 
            ? 'bg-green-100 ring-2 ring-green-500' 
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <span className="text-xl md:text-2xl">🌶️</span>
        <span className="text-[10px] md:text-xs font-bold mt-1">Mild</span>
      </button>
      
      <button
        onClick={() => setSpiceLevels({...spiceLevels, [item.id]: 2})}
        className={`flex-1 py-2 px-1 rounded-lg transition-all flex flex-col items-center ${
          (spiceLevels[item.id] ?? 1) === 2 
            ? 'bg-yellow-100 ring-2 ring-yellow-500' 
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="flex">
          <span className="text-[10px] md:text-xs">🌶️🌶️</span>
        </div>
        <span className="text-[10px] md:text-xs font-bold mt-1">Spicy</span>
      </button>
      
      <button
        onClick={() => setSpiceLevels({...spiceLevels, [item.id]: 3})}
        className={`flex-1 py-2 px-1 rounded-lg transition-all flex flex-col items-center ${
          (spiceLevels[item.id] ?? 1) === 3 
            ? 'bg-orange-100 ring-2 ring-orange-500' 
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="flex">
          <span className="text-[10px] md:text-xs">🌶️🌶️🌶️</span>
        </div>
        <span className="text-[10px] md:text-xs font-bold mt-1">Hot</span>
      </button>
    </div>
  </div>
)}

              {/* Wing Flavor Selector - Only for Party Box */}
              {item.hasWings && (
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">
                    Wing Flavors (30 wings total):
                  </label>
                  <div className="space-y-2">
                    {wingFlavors.map(flavor => (
                      <div key={flavor} className="flex items-center justify-between">
                        <span className="text-sm">{flavor}:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const current = (wingSelections[item.id] && wingSelections[item.id][flavor]) || 0
                              if (current > 0) {
                                setWingSelections({
                                  ...wingSelections,
                                  [item.id]: {
                                    ...(wingSelections[item.id] || {}),
                                    [flavor]: current - 1
                                  }
                                })
                              }
                            }}
                            className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 text-sm font-bold"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            max="30"
                            value={(wingSelections[item.id] && wingSelections[item.id][flavor]) || 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0
                              const otherFlavors = Object.entries(wingSelections[item.id] || {})
                                .filter(([f]) => f !== flavor)
                                .reduce((sum, [, count]) => sum + count, 0)
                              
                              if (value >= 0 && value + otherFlavors <= 30) {
                                setWingSelections({
                                  ...wingSelections,
                                  [item.id]: {
                                    ...(wingSelections[item.id] || {}),
                                    [flavor]: value
                                  }
                                })
                              }
                            }}
                            className="w-12 text-center text-sm font-bold border rounded"
                          />
                          <button
                            onClick={() => {
                              const current = (wingSelections[item.id] && wingSelections[item.id][flavor]) || 0
                              const total = Object.values(wingSelections[item.id] || {}).reduce((a, b) => a + b, 0)
                              if (total < 30) {
                                setWingSelections({
                                  ...wingSelections,
                                  [item.id]: {
                                    ...(wingSelections[item.id] || {}),
                                    [flavor]: current + 1
                                  }
                                })
                              }
                            }}
                            className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-gray-600 font-semibold">
                      Selected: {Object.values(wingSelections[item.id] || {}).reduce((a, b) => a + b, 0)}/30
                    </p>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Quantity:</label>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      const current = quantities[item.id] || 1
                      if (current > 1) setQuantities({...quantities, [item.id]: current - 1})
                    }}
                    className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-xl"
                    disabled={!quantities[item.id] || quantities[item.id] <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-xl">
                    {quantities[item.id] || 1}
                  </span>
                  <button
                    onClick={() => {
                      const current = quantities[item.id] || 1
                      if (current < 10) setQuantities({...quantities, [item.id]: current + 1})
                    }}
                    className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-xl"
                  >
                    +
                  </button>
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
