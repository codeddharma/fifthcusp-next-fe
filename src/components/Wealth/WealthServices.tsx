'use client'

import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { WEALTH_CONTENT } from '@/app/(brand)/wealth/wealth.constants'
import { whatsappLink } from '@/lib/whatsapp'

export default function WealthServices() {
  const { title, items } = WEALTH_CONTENT.services

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
              <h3 className="mb-3 text-center text-lg font-bold text-white">{service.title}</h3>
              <p className="text-justify text-sm leading-6 text-[#c4b5fd]">{service.description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-2xl font-extrabold text-[#ff00ff]">₹{service.price}</span>
              <a
                href={
                  whatsappLink(
                    `Hi! I'm interested in the ${service.title} — could you share custom pricing details?`,
                  ) || 'https://wa.me/919773732067'
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-[#128C46] px-3 py-1.5 text-xs font-bold tracking-wide text-white transition-all duration-200 hover:bg-[#0f7339] hover:shadow-lg hover:shadow-green-900/30"
              >
                <FaWhatsapp className="text-sm" />
                Get Pricing
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
