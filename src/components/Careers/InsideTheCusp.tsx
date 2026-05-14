'use client'

import { motion } from 'framer-motion'
import { CAREERS_CONTENT } from '@/app/(brand)/careers/careers.constants'

export default function InsideTheCusp() {
  const { title, subtitle, description } = CAREERS_CONTENT.hero

  return (
    <section className="mx-auto max-w-4xl px-5 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h1 className="mb-3 text-4xl font-bold tracking-wide text-white sm:text-5xl">{title}</h1>
        <h3 className="mb-8 text-lg font-semibold tracking-wider text-[#c4b5fd] sm:text-xl">
          {subtitle}
        </h3>
        <p className="text-justify text-sm leading-7 text-[#c4b5fd] sm:text-base">{description}</p>
      </motion.div>
    </section>
  )
}
