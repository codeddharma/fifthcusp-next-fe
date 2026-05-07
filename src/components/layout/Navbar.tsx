'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

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

const navItemBase =
  'inline-flex items-center min-h-[40px] rounded-full text-text-faint text-[13px] font-bold tracking-[0.04em] uppercase transition-[background,color,transform] duration-200'

const navItemHover = 'hover:bg-(--color-purple-22) hover:text-white hover:-translate-y-px'

const activeClass = 'bg-(--color-purple-26) text-white'

const dropdownItemClass =
  'flex min-h-[30px] py-2 px-3 rounded-lg text-text-faint text-[13px] font-bold tracking-[0.04em] uppercase transition-[background,color] duration-200 hover:bg-(--color-purple-24) hover:text-white'

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }, [pathname])

  const isServicesActive = serviceLinks.some((item) => item.path === pathname)

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

          {/* Desktop Services dropdown — opens on hover via group */}
          <div className="relative inline-flex items-center group">
            <button
              type="button"
              className={`${navItemBase} gap-1.5 px-[14px] border-0 bg-transparent cursor-pointer ${navItemHover} ${isServicesActive ? activeClass : ''}`}
            >
              Services
              <ChevronDown
                size={16}
                className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </button>

            {/* Dropdown menu */}
            <div className="absolute top-[calc(100%+12px)] right-0 grid w-[230px] gap-1 p-2.5 border border-white/[0.16] rounded-xl bg-(--color-bg-panel) shadow-(--shadow-dropdown) backdrop-blur-[18px] opacity-0 invisible translate-y-2 pointer-events-none transition-[opacity,transform,visibility] duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
              {serviceLinks.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${dropdownItemClass} ${pathname === item.path ? activeClass : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
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

            {/* Services accordion */}
            <div>
              <button
                type="button"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between min-h-[40px] px-3 rounded-full text-[13px] font-bold tracking-[0.04em] uppercase transition-[background,color] duration-200 hover:bg-(--color-purple-22) hover:text-white ${isServicesActive ? activeClass : 'text-text-faint'}`}
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isServicesOpen && (
                <div className="grid gap-1 pl-3 pt-1">
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`${dropdownItemClass} ${pathname === item.path ? activeClass : ''}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
