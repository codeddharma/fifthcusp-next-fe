import Link from 'next/link'
import { HOME_CONTENT } from '@/app/(brand)/home.constants'

const LANGUAGE_ROUTES: Record<string, string> = {
  ASTROLOGY: '/astrology',
  'VASTU SHASTRA': '/vastu',
  NUMEROLOGY: '/astrology',
  'ENERGY READING': '/energy',
  'TAROT READING': '/tarot-reading',
  MANIFESTATION: '/manifestation',
}

export default function LanguagesSection() {
  return (
    <section id="languages" className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">
          {HOME_CONTENT.languages.title}
        </h2>
        <p className="text-[#b8b8d4]">{HOME_CONTENT.languages.subtitle}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {HOME_CONTENT.languages.services.map((service) => (
          <Link
            key={service.name.replace(' ', '_').toLowerCase()}
            href={LANGUAGE_ROUTES[service.name] ?? '/'}
            className="cosmic-glass group flex min-h-[260px] flex-col rounded-[20px] p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:shadow-[0_15px_40px_rgba(138,43,226,0.25)]"
          >
            <h3 className="mb-4 text-xl font-semibold uppercase tracking-wide text-white">
              {service.name}
            </h3>
            <p className="flex-1 whitespace-pre-line text-sm leading-6 text-[#c4c4d8]">
              {service.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
