'use client'

import { useQuery } from '@tanstack/react-query'
import Accordion from '@/components/common/Accordion'
import { fetchFaqs } from '@/lib/api/faqs.api'
import { HOME_CONTENT } from '@/app/(brand)/home.constants'

interface FAQSectionProps {
  page: string
}

function SkeletonRow() {
  return (
    <div className="cosmic-glass rounded-2xl px-6 py-5">
      <div className="h-4 w-3/4 animate-pulse rounded-lg bg-white/10" />
    </div>
  )
}

export default function FAQSection({ page }: FAQSectionProps) {
  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['faqs', page],
    queryFn: () => fetchFaqs(page),
  })

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">
          {HOME_CONTENT.faqs.title}
        </h2>
        <p className="text-[#b8b8d4]">{HOME_CONTENT.faqs.subtitle}</p>
      </div>

      {isError && (
        <p className="text-center text-sm text-white/40">
          Unable to load FAQs right now. Please try again later.
        </p>
      )}

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}

      {!isLoading && faqs && faqs.length === 0 && (
        <p className="text-center text-sm text-white/40">{HOME_CONTENT.faqs.emptyText}</p>
      )}

      {!isLoading && faqs && faqs.length > 0 && <Accordion items={faqs} />}
    </section>
  )
}
