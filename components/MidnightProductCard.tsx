'use client'

import { useState } from 'react'
import { Loader2, Flame, Clock } from 'lucide-react'

const midnightItems = [
  {
    id: 'midnight-box',
    name: 'Midnight Box',
    price: 30,
    description: 'XXL loaded chicken wrap glazed in signature sauce, golden fries, wings (1/2 lb), 2 tacos, drink',
    badge: '🔥 432 ordered tonight',
    popular: true
  },
  {
    id: 'party-pack',
    name: 'Party Pack (10 people)',
    price: 199,
    originalPrice: 250,
    description: '5 XXL wraps, 2
