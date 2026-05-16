'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import api from '@/lib/api/axiosInstance'

interface CalendarDate {
  date: string // ISO date string e.g. "2025-05-15"
  label?: string
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

  const { data: specialDates = [] } = useQuery({
    queryKey: ['manifestation-calendar'],
    queryFn: fetchManifestationDates,
  })

  const highlightedDays = new Set(
    specialDates
      .map((d) => {
        const dt = new Date(d.date)
        if (dt.getFullYear() === viewYear && dt.getMonth() === viewMonth)
          return dt.getDate()
        return null
      })
      .filter(Boolean) as number[],
  )

  const cells = buildCalendarGrid(viewYear, viewMonth)

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
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-base font-semibold text-white">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              onClick={nextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#c4b5fd] transition-colors hover:bg-white/10 hover:text-white"
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

              const highlighted = highlightedDays.has(day)
              const todayCell = isToday(day)

              return (
                <div
                  key={i}
                  className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors
                    ${todayCell ? 'bg-[#a855f7]/30 font-bold text-white ring-1 ring-[#a855f7]' : 'text-[#c4b5fd] hover:bg-white/10'}
                  `}
                >
                  {day}
                  {highlighted && (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#a855f7]" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 flex items-center justify-center gap-5 text-xs text-[#c4b5fd]/70">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#a855f7]" />
              Manifestation day
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full ring-1 ring-[#a855f7]" />
              Today
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
