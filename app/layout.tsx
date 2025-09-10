import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FuelBox Pizza Wrap Meal - 108g Protein | Pizza Without The Guilt',
  description: 'Get 100g of premium protein. Complete meal with a gourmet wrap, 3 eggs, Greek yogurt and fresh fruit. Only 20 boxes available daily. Order now!',
  keywords: 'pizza wrap, high protein meals, 108g protein, meal delivery, healthy pizza, athlete nutrition, performance meals',
  metadataBase: new URL('https://fuelbox.netlify.app'),
  openGraph: {
    title: 'FuelBox Pizza Wrap - 100g Protein',
    description: 'Pizza without the guilt. 108g protein, complete nutrition, fresh daily.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FuelBox Pizza Wrap - 100g Protein',
    description: 'Pizza flavor with 4x the protein. Limited to 20 daily.',
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
      </body>
    </html>
  )
}
