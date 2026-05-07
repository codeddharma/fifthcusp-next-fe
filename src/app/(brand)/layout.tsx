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
      <main className={root}>{children}</main>
      <Footer />
      <Toaster position="top-right" richColors />
    </QueryProvider>
  )
}
