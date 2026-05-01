import Link from 'next/link'
import Image from 'next/image'
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image src="/assets/logo.png" alt="The Fifth Cusp" width={48} height={48} />
            <div>
              <h2 className="text-lg font-bold tracking-widest">THE FIFTH CUSP</h2>
              <p className="text-xs text-white/50">Align with your cosmic destiny</p>
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Guiding you through cosmic pathways of Astrology, Numerology, Vastu, Tarot, and
            Manifestation.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs tracking-widest text-white/40 mb-3">PAGES</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Languages</Link></li>
              <li><Link href="/manifestation" className="hover:text-white transition-colors">Well Beings</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs tracking-widest text-white/40 mb-3">SERVICES</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/energy" className="hover:text-white transition-colors">Energy</Link></li>
              <li><Link href="/manifestation" className="hover:text-white transition-colors">Manifestation</Link></li>
              <li><Link href="/vastu" className="hover:text-white transition-colors">Vastu</Link></li>
              <li><Link href="/wealth-architecture" className="hover:text-white transition-colors">Material</Link></li>
              <li><Link href="/tarot-reading" className="hover:text-white transition-colors">Tarot Reading</Link></li>
            </ul>
          </div>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs tracking-widest text-white/40">STAY CONNECTED</h3>
          <div className="flex gap-4 text-lg">
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
              <FaWhatsapp />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
              <FaInstagram />
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <a href="mailto:enquiry@thefifthcusp.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <FaEnvelope /> enquiry@thefifthcusp.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
              <FaPhoneAlt /> +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
        <span>© {currentYear} THE FIFTH CUSP. All rights reserved.</span>
        <span>DEVELOPED BY INFYLE TECHNOLOGIES</span>
      </div>
    </footer>
  )
}
