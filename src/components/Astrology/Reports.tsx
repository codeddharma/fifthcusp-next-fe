'use client'

import { fetchServices } from '@/lib/api/services.api'
import { useQuery } from '@tanstack/react-query'
import { ServiceCard, SkeletonCard } from '../Home/ServiceCard'
import { ASTROLOGY_CONTENT } from '@/app/(brand)/astrology/astrology.constants'
import BasicServiceSection from '../common/BasicServices'
import AdvanceServiceSection from '../common/AdvanceServices'

export default function ReportsSection() {
  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['services', 'report_basic', 'astrology'],
    queryFn: () => fetchServices('report_basic', 'astrology'),
  })

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-12">
      <div className="text-center">
        <h2 className="mb-3 text-5xl font-bold tracking-wide text-white sm:text-4xl">
          {ASTROLOGY_CONTENT.reports.title}
        </h2>
        <p className="text-[#b8b8d4]">{ASTROLOGY_CONTENT.reports.subtitle}</p>
      </div>
    </section>
  )
}
