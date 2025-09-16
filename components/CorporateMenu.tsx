'use client'

import { useState } from 'react'
import { Plus, Minus, Check, X, Loader2 } from 'lucide-react'

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
  
  const [loading, setLoading] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('12:00')
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)

  // ... keep all your existing state and functions ...

  const handleCorporateCheckout = async () => {
    if (!companyName || !contactName || !phoneNumber || !deliveryAddress || !deliveryDate) {
      alert('Please fill in all delivery details')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceType: 'corporate',
          productName: `Corporate FuelBox - ${boxes.length} boxes`,
          quantity: boxes.length,
          totalPrice: boxes.length * 20,
          boxes: boxes.map((box, idx) => ({
            boxNumber: idx + 1,
            protein: box.protein,
            sauce: box.sauce,
            spiceLevel: box.spiceLevel,
            veggies: box.veggies.join(', ')
          })),
          companyName: companyName,
          customerName: contactName,
          phoneNumber: phoneNumber,
          customerEmail: `${phoneNumber.replace(/\D/g, '')}@corporate.surreykitchen.com`,
          deliveryAddress: deliveryAddress,
          deliveryDate: deliveryDate,
          deliveryTime: deliveryTime,
          fulfillment: 'corporate-delivery'
        })
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      {/* Keep all your existing header and box builder code... */}
      
      {/* Add this checkout form before the sticky footer */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black mb-4">Delivery Information</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="(604) 123-4567"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Business St, Vancouver"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">
                    Delivery Time *
                  </label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleCorporateCheckout}
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Updated Sticky Footer */}
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
            onClick={() => boxes.length >= 10 && setShowCheckoutForm(true)}
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
