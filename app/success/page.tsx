'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [showPinSetup, setShowPinSetup] = useState(false)
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [cashbackInfo, setCashbackInfo] = useState<any>(null)
  const [pinError, setPinError] = useState('')

  useEffect(() => {
    // Check for pending cashback in sessionStorage
    const pending = sessionStorage.getItem('pendingCashback')
    if (pending) {
      const data = JSON.parse(pending)
      setCashbackInfo(data)
      if (data.isNewUser) {
        setShowPinSetup(true)
      }
      sessionStorage.removeItem('pendingCashback')
    }
  }, [])

  const handleSetPin = async () => {
    if (pin !== confirmPin) {
      setPinError('PINs do not match')
      return
    }
    
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setPinError('PIN must be 4 digits')
      return
    }

    try {
      const response = await fetch('/api/cashback/set-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cashbackInfo.phone,
          pin: pin
        })
      })

      if (response.ok) {
        setShowPinSetup(false)
      }
    } catch (error) {
      setPinError('Failed to set PIN')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-black mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Your food is being prepared and will be delivered soon.
        </p>

        {cashbackInfo && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-lg font-bold text-yellow-800">
              🎉 You earned ${cashbackInfo.earned?.toFixed(2)} cashback!
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              Use it on your next order
            </p>
          </div>
        )}

        {showPinSetup && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">Create Your Cashback PIN</h3>
            <p className="text-sm text-gray-600 mb-4">
              Set a 4-digit PIN to secure your cashback rewards
            </p>
            
            <input
              type="password"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              className="w-full p-3 border rounded-lg mb-3 text-center text-xl tracking-widest"
            />
            
            <input
              type="password"
              maxLength={4}
              placeholder="Confirm PIN"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              className="w-full p-3 border rounded-lg mb-3 text-center text-xl tracking-widest"
            />
            
            {pinError && (
              <p className="text-red-600 text-sm mb-3">{pinError}</p>
            )}
            
            <button
              onClick={handleSetPin}
              disabled={pin.length !== 4 || confirmPin.length !== 4}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold disabled:opacity-50"
            >
              Set PIN
            </button>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Order number:</span>
            <span className="font-semibold">{searchParams.get('session_id')?.slice(-8)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Estimated delivery:</span>
            <span className="font-semibold">30-45 minutes</span>
          </div>
        </div>

        <Link 
          href="/"
          className="inline-block w-full py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
        >
          Order Again
        </Link>
        
        <p className="text-xs text-gray-500 mt-4">
          Questions? Call us at (604) 123-4567
        </p>
      </div>
    </div>
  )
}
