'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { HOME_CONTENT } from '@/app/(brand)/home.constants'
import Card from '../common/Card'
import SkeletonImage from '../common/SkeletonImage'
import BookingModal from '@/components/booking/BookingModal'
import { fetchAllServices } from '@/lib/api/services.api'
import { whatsappLink } from '@/lib/whatsapp'

// Managed in the admin panel's Services tab — create/edit a service with this
// exact SKU to control the Ikigai booking form's price, description, and fields.
const IKIGAI_SKU = 'IKIGAI'

export default function IkigaiSection() {
  const [modalOpen, setModalOpen] = useState(false)

  const { data: services } = useQuery({
    queryKey: ['services', 'all'],
    queryFn: fetchAllServices,
    staleTime: 5 * 60 * 1000,
  })

  const service = services?.find((s) => s.sku.toUpperCase() === IKIGAI_SKU)
  const knowMoreHref =
    whatsappLink("I'd like to know more about IKIGAI-EFFORTLESS GROWTH") ||
    'https://wa.me/919773732067'

  return (
    <Card
      id="ikigai"
      as="section"
      className="mx-auto mb-10 p-10 grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:items-center"
    >
      <SkeletonImage
        src={HOME_CONTENT.ikigai.image.src}
        alt={HOME_CONTENT.ikigai.image.alt}
        width={HOME_CONTENT.ikigai.image.width}
        height={HOME_CONTENT.ikigai.image.height}
        className="w-full max-w-sm object-contain"
      />
      <div className="text-center lg:text-left">
        <h2 className="mb-5 text-3xl font-bold tracking-wide text-white sm:text-4xl">
          {HOME_CONTENT.ikigai.title}
        </h2>
        <div className="mb-5 space-y-4 text-sm leading-7 text-[#d7d2ef] sm:text-base">
          <p key={HOME_CONTENT.ikigai.subtitle}>{HOME_CONTENT.ikigai.subtitle}</p>
        </div>
        <div className="text-center lg:text-left">
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            {HOME_CONTENT.ikigai.actions.map((action) =>
              action.label === 'Affirm' && service ? (
                <button
                  key={action.href}
                  type="button"
                  className="home-action-btn"
                  onClick={() => setModalOpen(true)}
                >
                  {action.label}
                </button>
              ) : action.label === 'Know More' ? (
                <a
                  key={action.href}
                  href={knowMoreHref}
                  className="home-action-btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  {action.label}
                </a>
              ) : (
                <Link key={action.href} href={action.href} className="home-action-btn">
                  {action.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {service && (
        <BookingModal service={service} open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </Card>
  )
}
