'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  activeNavLink,
  brand,
  brandLogo,
  brandText,
  desktopNav,
  dropdown,
  dropdownItem,
  dropdownMenu,
  dropdownTrigger,
  mobileMenu,
  mobileMenuButton,
  mobilePanel,
  navLink,
  navbarInner,
  serviceChevron,
} from './NavBar.css'

const primaryLinks = [
  { name: 'Home', path: '/' },
  { name: 'Careers', path: '/careers' },
  { name: 'Blogs', path: '/blogs' },
]

const serviceLinks = [
  { name: 'Energy', path: '/energy' },
  { name: 'Astrology', path: '/astrology' },
  { name: 'Vastu', path: '/vastu' },
  { name: 'Manifestation', path: '/manifestation' },
  { name: 'Material', path: '/wealth-architecture' },
  { name: 'Tarot Reading', path: '/tarot-reading' },
]

const logo = {
  src: '/assets/The Fifth Cusp_Logo.png',
  alt: 'The Fifth Cusp',
  width: 44,
  height: 44,
}

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isServicesActive = serviceLinks.some((item) => item.path === pathname)

  return (
    <nav className="navbar">
      <div className={navbarInner}>
        <Link href="/" className={brand} aria-label="The Fifth Cusp home">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={brandLogo}
            priority
          />
          <span className={brandText}>THE FIFTH CUSP</span>
        </Link>

        <div className={desktopNav}>
          {primaryLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${navLink} ${pathname === item.path ? activeNavLink : ''}`}
            >
              {item.name}
            </Link>
          ))}

          <div className={dropdown}>
            <button
              type="button"
              className={`${dropdownTrigger} ${isServicesActive ? activeNavLink : ''}`}
            >
              Services
              <ChevronDown size={16} className={serviceChevron} />
            </button>
            <div className={dropdownMenu}>
              {serviceLinks.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${dropdownItem} ${pathname === item.path ? activeNavLink : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className={mobileMenuButton}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={mobilePanel}>
          <div className={mobileMenu}>
            {primaryLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${navLink} ${pathname === item.path ? activeNavLink : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <div className={mobileMenu}>
              {serviceLinks.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${dropdownItem} ${pathname === item.path ? activeNavLink : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
