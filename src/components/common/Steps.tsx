'use client'

import { motion } from 'framer-motion'

interface Step {
  step: number
  title: string
  description: string
}

interface StepsProps {
  steps: Step[]
  title?: string
  accentColor?: string
  variant?: 'vertical' | 'horizontal' | 'cards'
}

function VerticalSteps({ steps, accentColor }: { steps: Step[]; accentColor: string }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          className="flex gap-5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          viewport={{ once: true }}
        >
          {/* Left: circle + line */}
          <div className="flex flex-col items-center">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold text-white"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {s.step}
            </div>
            {i < steps.length - 1 && (
              <div className="mt-1 w-px grow" style={{ backgroundColor: accentColor, opacity: 0.6 }} />
            )}
          </div>

          {/* Right: content */}
          <div className={`pb-8 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
              Step {s.step}
            </p>
            <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
            <p className="text-sm leading-7 text-[#c4b5fd]">{s.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function HorizontalSteps({ steps, accentColor }: { steps: Step[]; accentColor: string }) {
  return (
    <div className="flex flex-wrap gap-y-8">
      {steps.map((s, i) => (
        <div key={s.step} className="flex w-full flex-col sm:w-1/4">
          {/* Circle + connector */}
          <div className="mb-4 flex items-center">
            <motion.div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
              style={{ borderColor: accentColor, color: accentColor }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {s.step}
            </motion.div>
            {i < steps.length - 1 && (
              <div className="ml-2 hidden h-0.5 flex-1 sm:block" style={{ backgroundColor: accentColor, opacity: 0.6 }} />
            )}
          </div>

          <motion.div
            className="pr-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 + 0.1 }}
            viewport={{ once: true }}
          >
            <p className="mb-1 hidden text-xs font-semibold uppercase tracking-widest sm:block" style={{ color: accentColor }}>
              Step {s.step}
            </p>
            <h3 className="mb-1 text-base font-bold text-white">{s.title}</h3>
            <p className="text-sm leading-6 text-[#c4b5fd]">{s.description}</p>
          </motion.div>
          {i < steps.length - 1 && (
            <div className="ml-5 mt-2 h-8 w-0.5 sm:hidden" style={{ backgroundColor: accentColor, opacity: 0.6 }} />
          )}
        </div>
      ))}
    </div>
  )
}

function CardsSteps({ steps, accentColor }: { steps: Step[]; accentColor: string }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <p
            className="mb-3 text-5xl font-black leading-none opacity-20"
            style={{ color: accentColor }}
          >
            {String(s.step).padStart(2, '0')}
          </p>
          <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
          <p className="text-sm leading-7 text-[#c4b5fd]">{s.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function Steps({
  steps,
  title,
  accentColor = '#a855f7',
  variant = 'vertical',
}: StepsProps) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      {title && (
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">{title}</h2>
        </motion.div>
      )}

      {variant === 'vertical' && <VerticalSteps steps={steps} accentColor={accentColor} />}
      {variant === 'horizontal' && <HorizontalSteps steps={steps} accentColor={accentColor} />}
      {variant === 'cards' && <CardsSteps steps={steps} accentColor={accentColor} />}
    </section>
  )
}
