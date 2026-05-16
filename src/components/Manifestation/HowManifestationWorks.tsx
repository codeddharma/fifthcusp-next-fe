'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { MANIFESTATION_CONTENT } from '@/app/(brand)/manifestation/manifestation.constants'

interface Step {
  number: string
  title: string
  subtitle: string
  intro: string
  bullets: { label: string; text: string }[]
  extras?: string[]
  closing: string
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      {/* Header — always visible, click to expand */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-start gap-5 p-5 text-left sm:p-6"
      >
        {/* Step number badge */}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a855f7]/20 text-sm font-bold text-[#a855f7] ring-1 ring-[#a855f7]/40">
          {step.number}
        </span>

        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#a855f7]">
            Step {step.number}
          </p>
          <h3 className="mt-0.5 text-base font-bold text-white sm:text-lg">{step.title}</h3>
          {step.subtitle && (
            <p className="mt-1 text-xs italic text-[#c4b5fd]/70">{step.subtitle}</p>
          )}
        </div>

        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-[#a855f7] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-white/10 px-5 pb-6 pt-5 sm:px-6">
              {/* Intro */}
              <p className="text-justify text-sm leading-7 text-[#c4b5fd]">{step.intro}</p>

              {/* Extras (step V scenarios) */}
              {step.extras && step.extras.length > 0 && (
                <div className="space-y-2 rounded-xl border border-white/5 bg-white/5 p-4">
                  {step.extras.map((e, i) => (
                    <p key={i} className="text-sm leading-6 text-[#c4b5fd]/80 italic">
                      {e}
                    </p>
                  ))}
                </div>
              )}

              {/* Bullets */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#a855f7]">
                  What Happens Here
                </p>
                <ul className="space-y-3">
                  {step.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a855f7]" />
                      <span className="text-[#c4b5fd]">
                        <strong className="font-semibold text-white">{b.label}:</strong> {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Closing */}
              <p className="pt-1 text-center text-sm font-semibold italic tracking-wide text-[#a855f7]">
                {step.closing}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function HowManifestationWorks() {
  const { title, intro, steps } = MANIFESTATION_CONTENT.howItWorks

  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl font-bold tracking-wide text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-[#c4b5fd] sm:text-base">{intro}</p>
      </motion.div>

      {/* Connector line behind cards */}
      <div className="relative">
        <div className="absolute left-[28px] top-0 hidden h-full w-px bg-gradient-to-b from-[#a855f7]/40 via-[#a855f7]/20 to-transparent sm:block" />
        <div className="space-y-4">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step as Step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
