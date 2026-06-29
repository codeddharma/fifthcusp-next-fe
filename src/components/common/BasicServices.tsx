'use client'

import { useQuery } from '@tanstack/react-query'
import { ServiceCard, SkeletonCard } from '@/components/Home/ServiceCard'
import { fetchServices } from '@/lib/api/services.api'

const HIDDEN_SERVICE_SKUS = new Set(['IKIGAI'])

interface BasicServiceSectionProps {
  page: string
  title: string
  type?:
    | 'basic'
    | 'advanced'
    | 'consultation'
    | 'reports_basic'
    | 'reports_advanced'
    | 'numerology'
    | 'practice'
  subtitle?: string
}

export default function BasicServiceSection({
  page,
  title,
  subtitle,
  type = 'basic',
}: BasicServiceSectionProps) {
  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['services', type, page],
    queryFn: () => fetchServices(type, page),
  })

  const visibleServices = services?.filter(
    (service) => !HIDDEN_SERVICE_SKUS.has(service.sku.toUpperCase())
  )

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-12">
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
          : visibleServices?.map((service) => <ServiceCard key={service._id} service={service} />)}
      </div>
    </section>
  )
}
