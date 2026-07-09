'use client'

import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { Factory, Landmark, type LucideIcon } from 'lucide-react'
import { VASTU_CONTENT } from '@/app/(brand)/vastu/vastu.constants'
import { whatsappLink } from '@/lib/whatsapp'

const ICONS: Record<string, LucideIcon> = {
  'industrial-vastu': Factory,
  'institutional-vastu': Landmark,
}

export default function VastuServices() {
  const { title, items } = VASTU_CONTENT.tailoredServices

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

      <div className="flex flex-wrap justify-center gap-6">
        {items.map((service, i) => {
          const Icon = ICONS[service.key] ?? Factory
          return (
            <motion.div
              key={service.key}
              className="relative flex w-full flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm sm:w-[46%] lg:w-[46%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c4b5fd]/15 shadow-[0_0_25px_rgba(196,181,253,0.35)]">
                <Icon className="h-7 w-7 text-[#c4b5fd]" />
              </div>

              <h3 className="text-lg font-bold text-white">{service.title}</h3>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[#c4b5fd]/80">
                {service.subtitle}
              </p>
              <p className="text-sm leading-6 text-[#c4b5fd]">{service.description}</p>

              <a
                href={
                  whatsappLink(
                    `Hi! I'm interested in ${service.title} — could you share a tailored proposal?`,
                  ) || 'https://wa.me/919773732067'
                }
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#128C46] px-4 py-2 text-xs font-bold tracking-wide text-white transition-all duration-200 hover:bg-[#0f7339] hover:shadow-lg hover:shadow-green-900/30"
              >
                <FaWhatsapp className="text-sm" />
                Get a Tailored Proposal
              </a>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
