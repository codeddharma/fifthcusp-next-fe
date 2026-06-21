'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { fetchAllServices } from '@/lib/api/services.api'
import type { Service } from '@/types/service.type'

function matches(service: Service, q: string): boolean {
  const haystack = `${service.title} ${service.subtitle} ${service.description}`.toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

export default function SearchBar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: services } = useQuery({
    queryKey: ['services', 'all'],
    queryFn: fetchAllServices,
    staleTime: 5 * 60 * 1000,
    enabled: open,
  })

  const results = useMemo(() => {
    const q = query.trim()
    if (!q || !services) return []
    return services.filter((s) => s.pages?.length && matches(s, q)).slice(0, 8)
  }, [query, services])

  // Focus the input when the search opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleSelect = (service: Service) => {
    setOpen(false)
    setQuery('')
    router.push(`/${service.pages[0]}#service-${service.sku}`)
  }

  return (
    <div ref={containerRef} className="relative">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search services"
          className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full text-text-faint transition-colors duration-200 hover:bg-(--color-purple-22) hover:text-white"
        >
          <Search size={18} />
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5">
          <Search size={16} className="text-text-faint" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services…"
            className="w-44 bg-transparent text-sm text-white placeholder-white/40 outline-none sm:w-56"
          />
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setOpen(false)
            }}
            aria-label="Close search"
            className="text-text-faint hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {open && query.trim() && (
        <div className="absolute right-0 z-50 mt-2 max-h-[60vh] w-[300px] overflow-y-auto rounded-xl border border-white/10 bg-(--color-bg-panel-solid) shadow-(--shadow-mobile-panel) backdrop-blur-[18px]">
          {results.length > 0 ? (
            results.map((s) => (
              <button
                key={s._id}
                type="button"
                onClick={() => handleSelect(s)}
                className="flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors hover:bg-white/[0.06]"
              >
                <span className="text-sm font-semibold text-white">{s.title}</span>
                {s.subtitle && <span className="text-xs text-white/50">{s.subtitle}</span>}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-white/50">No services found.</p>
          )}
        </div>
      )}
    </div>
  )
}
