import type { Metadata } from 'next'
import Script from 'next/script'
import { UserProvider } from '@/context/UserContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Fifth Cusp',
  description:
    'Discover your cosmic blueprint with The Fifth Cusp — astrology, numerology, tarot, vastu, and manifestation services.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UserProvider>{children}</UserProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
