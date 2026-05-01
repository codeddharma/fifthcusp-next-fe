'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, X } from 'lucide-react'
import { loginBtn } from './NavBar.css'

const menuItems = [
  { label: 'My Profile', path: '/profile' },
  { label: 'My Kundli & Reports', path: '/kundli' },
  { label: 'My Orders', path: '/bookings' },
  { label: 'Energy Reading', path: '/energy-reading' },
  { label: 'Affirmations', path: '/affirmations' },
  { label: 'My Booking', path: '/booking-consultations' },
  { label: 'My Wallet', path: '/wallet' },
]

const remedyItems = [
  { label: 'Remedies & Alignment Tracker', path: '/remedy-journey' },
  { label: 'Ask a Follow-up Query', path: '/astro-chat' },
  { label: 'My Learning & Growth', path: '/learning-growth' },
  { label: 'Call Scheduling', path: '/call-scheduling' },
  { label: 'My Wealth Tools', path: '/wealth-tools' },
]

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setIsLoggedIn(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
      if (
        confirmRef.current &&
        !confirmRef.current.contains(e.target as Node) &&
        showLogoutConfirm
      ) {
        setShowLogoutConfirm(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showLogoutConfirm])

  const performLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('login')
    setIsLoggedIn(false)
    setShowLogoutConfirm(false)
    router.push('/login')
  }

  return (
    <>
      <nav className="navbar">
        {!isLoggedIn && <button className={loginBtn}>LOGIN</button>}

        {isLoggedIn && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              <User size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-64 bg-black border border-white/20 shadow-xl z-50">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-xs tracking-widest text-white/50">INSIDE THE CUSP</p>
                  <p className="text-sm text-white mt-1">
                    {typeof window !== 'undefined'
                      ? localStorage.getItem('email') || 'Welcome'
                      : 'Welcome'}
                  </p>
                </div>

                <div className="py-2">
                  <p className="px-4 py-1 text-xs tracking-widest text-white/40">ACCOUNT</p>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-white/10 py-2">
                  <p className="px-4 py-1 text-xs tracking-widest text-white/40">FEATURES</p>
                  {remedyItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-white/10 py-2">
                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setShowLogoutConfirm(true)
                      setMenuOpen(false)
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            ref={confirmRef}
            className="relative bg-black border border-white/20 p-8 w-80 text-white shadow-2xl"
          >
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
            <p className="text-sm text-white/60 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2 border border-white/30 text-sm hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={performLogout}
                className="flex-1 py-2 bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
