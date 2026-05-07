'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const primaryLinks = [
  { name: 'Home', path: '/' },
  { name: 'Energy', path: '/energy' },
  { name: 'Astrology', path: '/astrology' },
  { name: 'Vastu', path: '/vastu' },
  { name: 'Manifestation', path: '/manifestation' },
  { name: 'Material', path: '/wealth-architecture' },
  { name: 'Tarot Reading', path: '/tarot-reading' },
  { name: 'Blogs', path: '/blogs' },
]

const logo = {
  src: '/assets/The Fifth Cusp_Logo.png',
  alt: 'The Fifth Cusp',
  width: 44,
  height: 44,
}

const navItemBase =
  'inline-flex items-center min-h-[40px] rounded-full text-text-faint text-[13px] font-bold tracking-[0.04em] uppercase transition-[background,color,transform] duration-200'

const navItemHover = 'hover:bg-(--color-purple-22) hover:text-white hover:-translate-y-px'

const activeClass = 'bg-(--color-purple-26) text-white'

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav className="navbar">
      {/* Inner row */}
      <div className="flex w-full max-w-[calc(100svw-100px)] items-center justify-between gap-6 mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-3"
          aria-label="The Fifth Cusp home"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="w-11 h-11 rounded-full object-cover shadow-(--shadow-nav-logo)"
            priority
          />
          <div className="hidden nav:inline-flex flex-col leading-[1.1]">
            <span className="bg-gradient-to-br from-white to-brand-lavender bg-clip-text text-transparent text-[15px] font-extrabold tracking-[0.08em] whitespace-nowrap">
              THE FIFTH CUSP
            </span>
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-brand-purple">
              Align with your cosmic destiny
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden nav:flex items-center justify-end gap-2">
          {primaryLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${navItemBase} px-[14px] ${navItemHover} ${pathname === item.path ? activeClass : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex nav:hidden w-[42px] h-[42px] items-center justify-center border border-white/[0.22] rounded-[10px] bg-white/[0.08] text-white cursor-pointer"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      {isMobileMenuOpen && (
        <div className="nav:hidden absolute top-[72px] left-0 right-0 grid gap-[14px] px-4 py-[14px] pb-[18px] border-b border-white/[0.12] bg-(--color-bg-panel-solid) shadow-(--shadow-mobile-panel) backdrop-blur-[18px]">
          <div className="grid gap-1">
            {primaryLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${navItemBase} px-3 ${navItemHover} ${pathname === item.path ? activeClass : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
