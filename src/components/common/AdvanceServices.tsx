'use client'

import { useQuery } from '@tanstack/react-query'
import { ServiceCard, SkeletonCard } from '@/components/Home/ServiceCard'
import { fetchServices } from '@/lib/api/services.api'
import { HOME_CONTENT } from '@/app/(brand)/home.constants'

interface AdvanceServiceSectionProps {
  page: string
  title: string
  type: 'basic' | 'advanced' | 'consultation' | 'report_basic' | 'report_advanced' | 'numerology'
  subtitle?: string
}

export default function AdvanceServiceSection({
  page,
  title,
  subtitle,
  type = 'advanced',
}: AdvanceServiceSectionProps) {
  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['services', type, page],
    queryFn: () => fetchServices(type, page),
  })

  return (
    <section id="advanced-services" className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">{title}</h2>
        {subtitle && <p className="text-[#b8b8d4]">{subtitle}</p>}
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
