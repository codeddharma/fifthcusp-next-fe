import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StarField from '@/components/layout/StarField'
import QueryProvider from '@/providers/QueryProvider'
import { Toaster } from 'sonner'
import { root } from './layout.css'

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <StarField />
      <Navbar />
      <main className={root}>
        <div className="relative min-h-screen overflow-x-hidden text-white">
          <div className="relative z-[2] flex min-h-screen flex-col pt-6 px-4 sm:px-6 lg:px-0">
            {children}
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </QueryProvider>
  )
}
