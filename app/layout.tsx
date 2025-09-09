import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FuelBox - 100g Protein Performance Meals | Premium Meal Delivery',
  description: 'Get 100g of premium protein in every meal. Perfect for athletes, bodybuilders, and fitness enthusiasts. Only 20 boxes available daily. Order now!',
  keywords: 'high protein meals, 100g protein, meal delivery, bodybuilding meals, athlete nutrition, performance meals',
  openGraph: {
    title: 'FuelBox - 100g Protein Performance Meals',
    description: 'The ultimate high-protein meal with 100g protein, 1200 calories, perfectly balanced macros. Limited to 20 boxes daily.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FuelBox - 100g Protein Performance Meals',
    description: 'The ultimate high-protein meal for serious athletes. 100g protein, 1200 calories.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🥗</text></svg>" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
