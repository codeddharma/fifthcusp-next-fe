'use client'

import { motion } from 'framer-motion'
import { MATERIAL_CONTENT } from '@/app/(brand)/material/material.constants'

export default function MaterialServices() {
  const { title, items } = MATERIAL_CONTENT.services

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <motion.h2
        className="mb-10 text-center text-3xl font-bold tracking-wide text-white sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service, i) => (
          <motion.div
            key={service.key}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#ff00ff]/15 px-3 py-1 text-xs font-bold text-[#ff00ff]">
                {service.tag}
              </span>
              <h3 className="mb-3 text-lg font-bold text-white">{service.title}</h3>
              <p className="text-sm leading-6 text-[#c4b5fd]">{service.description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-2xl font-extrabold text-[#ff00ff]">₹{service.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
