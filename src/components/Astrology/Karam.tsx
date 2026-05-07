'use client'

import { motion } from 'framer-motion'
import { ASTROLOGY_CONTENT } from '@/app/(brand)/astrology/astrology.constants'

export default function Karam() {
  const { title, intro, paragraphs, points, closing } = ASTROLOGY_CONTENT.karam

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">{title}</h3>

        <p className="mb-4 text-sm leading-7 text-[#dcdcdc] sm:text-base">{intro}</p>

        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="mb-4 whitespace-pre-line text-sm leading-7 text-[#dcdcdc] sm:text-base"
          >
            {p}
          </p>
        ))}

        <ul className="mb-8 space-y-3">
          {points.map((point, i) => (
            <li key={i} className="text-justify text-sm leading-7 text-[#e8e8e8] sm:text-base">
              {point}
            </li>
          ))}
        </ul>

        <div className="space-y-5">
          {closing.map((p, i) => (
            <p key={i} className="text-justify text-sm leading-7 text-[#dcdcdc] sm:text-base">
              {p}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
