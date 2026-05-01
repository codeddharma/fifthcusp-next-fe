import Navbar from '@/components/layout/Navbar/Navbar'
import Footer from '@/components/layout/Footer'
import { root } from './layout.css'

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={root} style={{ paddingTop: '72px' }}>{children}</main>
      <Footer />
    </>
  )
}
