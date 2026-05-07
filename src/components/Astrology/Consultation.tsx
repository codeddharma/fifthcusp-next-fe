'use client'

import { fetchServices } from '@/lib/api/services.api'
import { useQuery } from '@tanstack/react-query'
import { ServiceCard, SkeletonCard } from '../Home/ServiceCard'
import { ASTROLOGY_CONTENT } from '@/app/(brand)/astrology/astrology.constants'

export default function ConsultationSection() {
  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['services', 'consultation', 'astrology'],
    queryFn: () => fetchServices('consultation', 'astrology'),
  })

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">
          {ASTROLOGY_CONTENT.consultation.title}
        </h2>
        <p className="text-[#b8b8d4]">{ASTROLOGY_CONTENT.consultation.subtitle}</p>
      </div>

      {isError && (
        <p className="text-center text-sm text-white/40">
          Unable to load services right now. Please try again later.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : services?.map((service) => <ServiceCard key={service._id} service={service} />)}
      </div>
    </section>
  )
}
