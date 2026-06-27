'use client'

import { motion } from 'framer-motion'
import { WEALTH_CONTENT } from '@/app/(brand)/wealth/wealth.constants'

export default function HowItWorks() {
  const { title, paragraphs, highlight } = WEALTH_CONTENT.howItWorks

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

      <motion.div
        className="space-y-5 text-sm leading-7 text-[#c4b5fd] sm:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-justify">
            {paragraph}
          </p>
        ))}
        <p className="font-semibold tracking-wide text-white">{highlight}</p>
      </motion.div>
    </section>
  )
}
