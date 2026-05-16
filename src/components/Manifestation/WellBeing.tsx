'use client'

import { motion } from 'framer-motion'
import SkeletonImage from '../common/SkeletonImage'
import { MANIFESTATION_CONTENT } from '@/app/(brand)/manifestation/manifestation.constants'

export default function WellBeing() {
  const wb = MANIFESTATION_CONTENT.wellBeing

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      {/* Hero row — image + heading + short description */}
      <motion.div
        className="mb-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_2fr]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center">
          <SkeletonImage
            src={wb.heroImage.src}
            alt={wb.heroImage.alt}
            width={wb.heroImage.width}
            height={wb.heroImage.height}
            className="max-w-[200px] rounded-xl sm:max-w-[280px] lg:max-w-full"
          />
        </div>
        <div>
          <h2 className="mb-4 text-4xl font-bold tracking-wide text-white sm:text-5xl">
            {wb.heroTitle}
          </h2>
          <p className="text-sm leading-7 text-[#c4b5fd] sm:text-base">{wb.heroDescription}</p>
        </div>
      </motion.div>

      {/* Full content */}
      <motion.div
        className="space-y-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Title + subtitle + intro */}
        <div className="text-center">
          <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{wb.title}</h3>
          <p className="mb-4 text-sm font-semibold tracking-wide text-[#a855f7]">{wb.subtitle}</p>
          <p className="mx-auto max-w-3xl text-justify text-sm leading-7 text-[#c4b5fd] sm:text-base">
            {wb.intro}
          </p>
        </div>

        {/* House metaphor */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <ul className="space-y-2 text-sm leading-7 text-[#c4b5fd] sm:text-base">
            {wb.houseMetaphor.map((line, i) => (
              <li key={i} className={i === 0 ? 'font-semibold text-white' : ''}>
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* Energetic Foundation */}
        <div>
          <h4 className="mb-2 text-xl font-bold text-white sm:text-2xl">
            {wb.energeticFoundation.title}
          </h4>
          <p className="mb-6 text-sm leading-7 text-[#c4b5fd] sm:text-base">
            {wb.energeticFoundation.intro}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {wb.energeticFoundation.scales.map((scale, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#a855f7]/20 bg-[#a855f7]/5 p-5"
              >
                <h5 className="mb-3 text-sm font-bold text-[#a855f7]">{scale.title}</h5>
                <p className="text-xs leading-6 text-[#c4b5fd]">{scale.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why mandatory */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h4 className="mb-5 text-xl font-bold text-white sm:text-2xl">
            {wb.whyMandatory.title}
          </h4>
          <ul className="space-y-3">
            {wb.whyMandatory.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-6 text-[#c4b5fd]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a855f7]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-base font-bold text-white">
            {wb.whyMandatory.closing.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
