'use client'

import { useQuery } from '@tanstack/react-query'
import { ServiceCard, SkeletonCard } from '@/components/Home/ServiceCard'
import { fetchServices } from '@/lib/api/services.api'
import { ENERGY_CONTENT } from '@/app/(brand)/energy/energy.constants'

export default function EnergyServices() {
  const { title, subtitle, basicTitle, advancedTitle } = ENERGY_CONTENT.services

  const { data: basicServices, isLoading: loadingBasic } = useQuery({
    queryKey: ['energy-services', 'basic'],
    queryFn: () => fetchServices('basic'),
  })

  const { data: advancedServices, isLoading: loadingAdvanced } = useQuery({
    queryKey: ['energy-services', 'advanced'],
    queryFn: () => fetchServices('advanced'),
  })

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">{title}</h2>
        <p className="text-[#b8b8d4]">{subtitle}</p>
      </div>

      <h3 className="mb-6 text-center text-xl font-semibold text-white">{basicTitle}</h3>
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loadingBasic
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : basicServices?.map((service) => <ServiceCard key={service._id} service={service} />)}
      </div>

      <h3 className="mb-6 text-center text-xl font-semibold text-white">{advancedTitle}</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loadingAdvanced
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : advancedServices?.map((service) => <ServiceCard key={service._id} service={service} />)}
      </div>
    </section>
  )
}
