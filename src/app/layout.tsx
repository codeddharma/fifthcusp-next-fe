import type { Metadata } from 'next'
import Script from 'next/script'
import { Poppins, Cormorant_Garamond, Inter } from 'next/font/google'
import { UserProvider } from '@/context/UserContext'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Fifth Cusp',
  description:
    'Discover your cosmic blueprint with The Fifth Cusp — astrology, numerology, tarot, vastu, and manifestation services.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <UserProvider>{children}</UserProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
