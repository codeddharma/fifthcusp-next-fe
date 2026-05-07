'use client'

import { motion } from 'framer-motion'
import { ASTROLOGY_CONTENT } from '@/app/(brand)/astrology/astrology.constants'

export default function AstrologyIntro() {
  const { title, paragraphs, emphasis } = ASTROLOGY_CONTENT.intro

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">{title}</h2>

        <div className="space-y-5 text-sm leading-7 text-[#dcdcdc] sm:text-base">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-justify">
              {p}
            </p>
          ))}
        </div>

        <p className="mt-6 text-sm italic text-[#e8e8e8] sm:text-base">{emphasis}</p>
      </motion.div>
    </section>
  )
}
