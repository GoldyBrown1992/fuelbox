import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: "Surrey's Only 24-7 Kitchen | Hot Wraps, Tacos & Party Boxes",
  description: 'Fresh grilled wraps, tacos, loaded fries delivered 24/7. Free delivery to SFU Surrey. Classic Box $30, Family Box $55, Party Box $199.',
  keywords: 'surrey food delivery, 24 hour delivery, sfu surrey delivery, wraps, tacos, loaded fries, party catering, late night food',
  metadataBase: new URL('https://fuelbox.netlify.app'),
  openGraph: {
    title: "Surrey's Only 24-7 Kitchen",
    description: 'Hot wraps, tacos & loaded fries delivered all day. Free delivery to SFU Surrey.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Surrey's Only 24-7 Kitchen",
    description: 'Fresh grilled food delivered 24/7. Free SFU Surrey delivery.',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍕</text></svg>" />
      </head>
      <body className="antialiased">
        {children}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
