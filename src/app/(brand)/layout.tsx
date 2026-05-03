import Navbar from '@/components/layout/Navbar/Navbar'
import Footer from '@/components/layout/Footer'
import StarField from '@/components/layout/StarField'
import { root } from './layout.css'

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StarField />
      <Navbar />
      <main className={root}>{children}</main>
      <Footer />
    </>
  )
}
