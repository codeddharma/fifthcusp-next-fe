'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Card from '@/components/common/Card'
import { fetchTestimonials } from '@/lib/api/testimonials.api'
import type { Testimonial } from '@/types/testimonial.type'

interface TestimonialsProps {
  page: string
  title?: string
}

const ACCENT_COLORS = [
  { border: '#a855f7', text: '#a855f7' },
  { border: '#ff00ff', text: '#ff00ff' },
  { border: '#818cf8', text: '#818cf8' },
]

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]
  return (
    <Card
      className="relative flex w-80 shrink-0 flex-col justify-between gap-4 overflow-hidden p-6"
      style={{ borderTop: `2px solid ${accent.border}` }}
    >
      {/* Large background quote mark */}
      <span
        className="pointer-events-none absolute -right-2 -top-4 select-none text-8xl font-black opacity-5"
        style={{ color: accent.text }}
        aria-hidden
      >
        &ldquo;
      </span>

      {/* Quote icon */}
      <Quote size={18} style={{ color: accent.text }} className="shrink-0 opacity-80" />

      <p className="flex-1 text-sm leading-7 text-[#c4b5fd]">{t.feedback}</p>

      {/* Divider + client name */}
      <div>
        <div className="mb-3 h-px w-10" style={{ backgroundColor: accent.border, opacity: 0.5 }} />
        <p className="text-sm font-bold tracking-wide text-white">{t.clientName}</p>
      </div>
    </Card>
  )
}

function SkeletonCard() {
  return (
    <div className="cosmic-glass w-80 shrink-0 animate-pulse rounded-[20px] p-6">
      <div className="mb-3 h-4 w-8 rounded bg-white/10" />
      <div className="mb-2 h-16 rounded-lg bg-white/10" />
      <div className="mb-3 h-px w-10 bg-white/10" />
      <div className="h-4 w-1/3 rounded bg-white/10" />
    </div>
  )
}

export default function Testimonials({ page, title = 'WHAT OUR CLIENTS SAY' }: TestimonialsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['testimonials', page],
    queryFn: () => fetchTestimonials(page),
  })

  if (!isLoading && (!data || data.length === 0)) return null

  const doubled = data ? [...data, ...data] : []
  // slower: 8s per item instead of 4s
  const duration = doubled.length * 8

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">{title}</h2>
      </motion.div>

      {isLoading ? (
        <div className="flex gap-5 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div
          className="overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div
            className="flex gap-5"
            style={{
              width: 'max-content',
              animation: `marquee ${duration}s linear infinite`,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
          >
            {doubled.map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
