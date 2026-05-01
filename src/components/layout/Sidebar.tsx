'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'


const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'ENERGY', path: '/energy' },
  { name: 'ASTROLOGY', path: '/astrology' },
  { name: 'VASTU', path: '/vastu' },
  { name: 'MANIFESTATION', path: '/manifestation' },
  { name: 'MATERIAL', path: '/wealth-architecture' },
  { name: 'TAROT READING', path: '/tarot-reading' },
  { name: 'CAREERS', path: '/careers' },
  { name: 'BLOGS', path: '/blogs' },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) setOpen(false)
    }
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('login')
    setIsLoggedIn(false)
    setOpen(false)
    router.push('/login')
  }

  return (
    <>
      {/* Hamburger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="hamburger-btn"
          aria-label="Open menu"
        >
          ☰
        </button>
      )}

      {/* Mobile overlay */}
      {open && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <div
        ref={sidebarRef}
        className={`sidebar-custom flex flex-col ${open ? 'open' : ''}`}
      >
        <button className="close-sidebar-btn" onClick={() => setOpen(false)}>✕</button>

        <div
          className="sidebar-title cursor-pointer mt-8"
          onClick={() => { router.push('/'); setOpen(false) }}
        >
          THE FIFTH CUSP
        </div>

        <nav className="flex-1 overflow-y-auto">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`sidebar-link ${pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1rem' }}>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="sidebar-link"
              style={{ color: '#f87171', width: '100%', textAlign: 'left' }}
            >
              LOGOUT
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="sidebar-link"
            >
              YOUR ACCOUNT
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
