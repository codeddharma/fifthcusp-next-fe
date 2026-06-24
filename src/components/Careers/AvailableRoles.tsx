'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Briefcase, ChevronDown, CalendarDays, IndianRupee } from 'lucide-react'
import api from '@/lib/api/axiosInstance'
import { CAREERS_CONTENT } from '@/app/(brand)/careers/careers.constants'

interface Career {
  id?: string
  _id?: string
  title: string
  description: string
  department: string
  location: string
  employmentType: string
  experienceLevel: string
  experienceYears: number
  skills: string[]
  qualifications: string[]
  responsibilities: string[]
  salaryMin: number
  salaryMax: number
  applicationDeadline: string
}

interface CareersResponse {
  success: boolean
  data: Career[]
}

async function fetchCareers(): Promise<Career[]> {
  const res = await api.get<CareersResponse>('/v1/careers', {
    params: { isActive: true, isClosed: false },
  })
  return res.data.data
}

function formatSalary(n: number) {
  return `₹${(n / 1000).toFixed(0)}k`
}

function formatDeadline(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#a855f7]/40 bg-[#a855f7]/10 px-3 py-0.5 text-xs font-medium capitalize text-[#c4b5fd]">
      {children}
    </span>
  )
}

function CareerCard({ career, index }: { career: Career; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-[#a855f7]/30"
    >
      {/* Header row — always visible */}
      <button
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
        onClick={() => setOpen((p) => !p)}
      >
        <div className="flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge>{career.department}</Badge>
            <Badge>{career.employmentType.replace('-', ' ')}</Badge>
            <Badge>{career.experienceLevel}</Badge>
          </div>

          <h3 className="mb-3 text-lg font-bold text-white">{career.title}</h3>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#c4b5fd]">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} /> {career.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase size={12} /> {career.experienceYears}+ yrs experience
            </span>
            <span className="flex items-center gap-1.5">
              <IndianRupee size={12} /> {formatSalary(career.salaryMin)} – {formatSalary(career.salaryMax)} / mo
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={12} /> Apply by {formatDeadline(career.applicationDeadline)}
            </span>
          </div>
        </div>

        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-[#a855f7] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable detail panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-5 border-t border-white/10 px-6 pb-6 pt-5">
              <p className="text-sm leading-7 text-[#c4b5fd]">{career.description}</p>

              {/* Skills */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#a855f7]">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#c4b5fd]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#a855f7]">
                  Responsibilities
                </p>
                <ul className="space-y-1.5">
                  {career.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-6 text-[#c4b5fd]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a855f7]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qualifications */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#a855f7]">
                  Qualifications
                </p>
                <ul className="space-y-1.5">
                  {career.qualifications.map((q, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-6 text-[#c4b5fd]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a855f7]" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:support.thefifthcusp@gmail.com?subject=Application – ${career.title}`}
                className="inline-block rounded-full bg-[#a855f7] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function AvailableRoles() {
  const { title, subtitle, emptyText } = CAREERS_CONTENT.roles
  const { data: careers = [], isLoading } = useQuery({
    queryKey: ['careers'],
    queryFn: fetchCareers,
  })

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">{title}</h2>
        <p
          className="text-sm text-[#c4b5fd] sm:text-base"
          dangerouslySetInnerHTML={{
            __html: subtitle.replace(
              'THE FIFTH CUSP',
              '<strong class="font-bold text-white">THE FIFTH CUSP</strong>',
            ),
          }}
        />
      </motion.div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : careers.length > 0 ? (
        <div className="space-y-4">
          {careers.map((career, i) => (
            <CareerCard key={career.id ?? career._id ?? i} career={career} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[#c4b5fd]">{emptyText}</p>
      )}
    </section>
  )
}
