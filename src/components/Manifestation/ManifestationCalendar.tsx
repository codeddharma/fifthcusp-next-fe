'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import api from '@/lib/api/axiosInstance'

interface CalendarDate {
  date: string // ISO date string e.g. "2025-05-15"
  label: string
  eventType?: string
  description?: string
}

async function fetchManifestationDates(): Promise<CalendarDate[]> {
  try {
    const res = await api.get('/v1/manifestation-calendar')
    return res.data.data || []
  } catch {
    return []
  }
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const EVENT_TYPE_META: Record<string, { label: string; emoji: string }> = {
  grahan: { label: 'Grahan', emoji: '🌑' },
  'solar-eclipse': { label: 'Solar Eclipse', emoji: '🌞' },
  'lunar-eclipse': { label: 'Lunar Eclipse', emoji: '🌕' },
  'full-moon': { label: 'Full Moon', emoji: '🌕' },
  'new-moon': { label: 'New Moon', emoji: '🌑' },
  festival: { label: 'Festival', emoji: '✨' },
  other: { label: 'Event', emoji: '✨' },
}

function typeMeta(type?: string) {
  return (type && EVENT_TYPE_META[type]) || EVENT_TYPE_META.other
}

const pad = (n: number) => String(n).padStart(2, '0')
const dayKey = (year: number, month: number, day: number) => `${year}-${pad(month + 1)}-${pad(day)}`

// Parse "YYYY-MM-DD" into local calendar parts (TZ-safe — no UTC shift).
function parseYmd(s: string) {
  const [y, m, d] = s.slice(0, 10).split('-').map(Number)
  return { y, m: m - 1, d }
}

function formatFullDate(key: string) {
  const { y, m, d } = parseYmd(key)
  return new Date(y, m, d).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export default function ManifestationCalendar() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const { data: specialDates = [] } = useQuery({
    queryKey: ['manifestation-calendar'],
    queryFn: fetchManifestationDates,
  })

  // Group every event by its normalised "YYYY-MM-DD" key (a day can hold several).
  const eventsByKey = useMemo(() => {
    const map = new Map<string, CalendarDate[]>()
    for (const ev of specialDates) {
      const { y, m, d } = parseYmd(ev.date)
      const key = dayKey(y, m, d)
      const list = map.get(key)
      if (list) list.push(ev)
      else map.set(key, [ev])
    }
    return map
  }, [specialDates])

  // Events that fall within the month currently in view, for the list below.
  const monthEvents = useMemo(() => {
    return specialDates
      .map((ev) => ({ ev, parsed: parseYmd(ev.date) }))
      .filter(({ parsed }) => parsed.y === viewYear && parsed.m === viewMonth)
      .sort((a, b) => a.parsed.d - b.parsed.d)
  }, [specialDates, viewYear, viewMonth])

  const cells = buildCalendarGrid(viewYear, viewMonth)
  const selectedEvents = selectedKey ? eventsByKey.get(selectedKey) ?? [] : []

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) }
    else setViewMonth((m) => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) }
    else setViewMonth((m) => m + 1)
  }

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()

  return (
    <section className="mx-auto max-w-2xl px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-2 text-center text-3xl font-bold tracking-wide text-white sm:text-4xl">
          MANIFESTATION CALENDAR
        </h2>
        <p className="mb-10 text-center text-sm text-[#c4b5fd]">
          Highlighted dates carry elevated manifestation energy
        </p>

        {/* Calendar card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
          {/* Month navigation */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#c4b5fd] transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-base font-semibold text-white">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              onClick={nextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#c4b5fd] transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day headers */}
          <div className="mb-2 grid grid-cols-7 text-center">
            {DAY_NAMES.map((d) => (
              <span key={d} className="text-xs font-semibold uppercase tracking-wider text-[#a855f7]">
                {d}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {cells.map((day, i) => {
              if (!day) return <span key={i} />

              const key = dayKey(viewYear, viewMonth, day)
              const dayEvents = eventsByKey.get(key)
              const highlighted = !!dayEvents?.length
              const todayCell = isToday(day)
              const isSelected = selectedKey === key

              if (!highlighted) {
                return (
                  <div
                    key={i}
                    className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors
                      ${todayCell ? 'bg-[#a855f7]/30 font-bold text-white ring-1 ring-[#a855f7]' : 'text-[#c4b5fd]'}
                    `}
                  >
                    {day}
                  </div>
                )
              }

              return (
                <div key={i} className="group relative mx-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedKey(isSelected ? null : key)}
                    aria-label={`${day} — ${dayEvents!.map((e) => e.label).join(', ')}`}
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors hover:bg-white/10
                      ${todayCell ? 'font-bold text-white ring-1 ring-[#a855f7]' : 'text-white'}
                      ${isSelected ? 'bg-[#a855f7] text-white' : 'bg-[#a855f7]/20'}
                    `}
                  >
                    {day}
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#a855f7]" />
                  </button>

                  {/* Hover tooltip (desktop) */}
                  <span
                    className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#1a1033] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 sm:block"
                  >
                    {dayEvents!.map((e) => (
                      <span key={e.label} className="block">
                        {typeMeta(e.eventType).emoji} {e.label}
                      </span>
                    ))}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#c4b5fd]/70">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#a855f7]" />
              Manifestation day — tap for details
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full ring-1 ring-[#a855f7]" />
              Today
            </span>
          </div>
        </div>

        {/* Selected-day detail panel */}
        <AnimatePresence initial={false}>
          {selectedKey && selectedEvents.length > 0 && (
            <motion.div
              key={selectedKey}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-[#a855f7]/30 bg-[#a855f7]/10 p-5 backdrop-blur-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-[#c4b5fd]">{formatFullDate(selectedKey)}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedKey(null)}
                    className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[#c4b5fd] transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close details"
                  >
                    <X size={15} />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {selectedEvents.map((ev) => (
                    <div key={ev.label}>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">{ev.label}</h3>
                        <span className="rounded-full bg-[#a855f7]/30 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#e9d5ff]">
                          {typeMeta(ev.eventType).emoji} {typeMeta(ev.eventType).label}
                        </span>
                      </div>
                      {ev.description && (
                        <div
                          className="rich-html text-sm leading-relaxed text-[#c4b5fd]"
                          dangerouslySetInnerHTML={{ __html: ev.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* This month's events */}
        {monthEvents.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#a855f7]">
              {MONTH_NAMES[viewMonth]} events
            </p>
            <ul className="flex flex-col gap-2">
              {monthEvents.map(({ ev, parsed }) => {
                const key = dayKey(parsed.y, parsed.m, parsed.d)
                const isSelected = selectedKey === key
                return (
                  <li key={`${key}-${ev.label}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedKey(isSelected ? null : key)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors
                        ${isSelected
                          ? 'border-[#a855f7]/50 bg-[#a855f7]/15'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'}
                      `}
                    >
                      <span className="flex h-10 w-10 flex-none flex-col items-center justify-center rounded-lg bg-[#a855f7]/20 text-white">
                        <span className="text-sm font-bold leading-none">{parsed.d}</span>
                        <span className="text-[9px] uppercase tracking-wide text-[#c4b5fd]">
                          {MONTH_NAMES[parsed.m].slice(0, 3)}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-white">
                          {ev.label}
                        </span>
                        <span className="text-xs text-[#c4b5fd]">
                          {typeMeta(ev.eventType).emoji} {typeMeta(ev.eventType).label}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </motion.div>
    </section>
  )
}
