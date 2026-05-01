'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name?: string
}

interface UserContextValue {
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  login: (token: string, user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedEmail = localStorage.getItem('email')
    if (storedToken) {
      setToken(storedToken)
      if (storedEmail) setUser({ id: '', email: storedEmail })
    }
  }, [])

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('email', newUser.email)
    // Also set cookie for middleware auth check
    document.cookie = `token=${newToken}; path=/; SameSite=Lax`
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setToken(null)
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, token, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside UserProvider')
  return ctx
}
