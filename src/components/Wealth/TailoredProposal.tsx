'use client'

import { motion } from 'framer-motion'
import { WEALTH_CONTENT } from '@/app/(brand)/wealth/wealth.constants'

export default function TailoredProposal() {
  const { title, paragraphs, whoIsItFor, finalHighlight } = WEALTH_CONTENT.tailoredProposal

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-8 text-center text-3xl font-bold tracking-wide text-white sm:text-4xl">
          {title}
        </h2>

        <div className="space-y-5 text-sm leading-7 text-[#c4b5fd] sm:text-base">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-justify">
              {paragraph}
            </p>
          ))}

          <h3 className="pt-4 text-xl font-bold tracking-wide text-white sm:text-2xl">
            {whoIsItFor.title}
          </h3>
          <ul className="space-y-2 pl-5">
            {whoIsItFor.items.map((item, i) => (
              <li key={i} className="list-disc text-[#c4b5fd]">
                {item}
              </li>
            ))}
          </ul>

          <p className="pt-4 font-semibold tracking-wide text-white">{finalHighlight}</p>
        </div>
      </motion.div>
    </section>
  )
}
