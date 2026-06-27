'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import BookingModal from '@/components/booking/BookingModal'
import { discountedPrice } from '@/lib/utils/pricing'
import { whatsappLink } from '@/lib/whatsapp'
import type { Service } from '@/types/service.type'

export function ServiceCard({ service }: { service: Service }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const { title, subtitle, description, price, isInSale, saleTitle, discountPercentage } = service
  const finalPrice = isInSale ? discountedPrice(price, discountPercentage) : price

  const anchorId = `service-${service.sku}`

  // When the URL hash targets this card (e.g. from the header search), scroll to
  // it and briefly highlight it. Handles both first load and same-page navigation.
  useEffect(() => {
    const focusIfMatches = () => {
      if (typeof window === 'undefined' || window.location.hash !== `#${anchorId}`) return
      const el = document.getElementById(anchorId)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setHighlighted(true)
      window.setTimeout(() => setHighlighted(false), 2000)
    }
    focusIfMatches()
    window.addEventListener('hashchange', focusIfMatches)
    return () => window.removeEventListener('hashchange', focusIfMatches)
  }, [anchorId])

  return (
    <>
      <Card
        id={anchorId}
        hover
        className={`relative flex scroll-mt-28 flex-col gap-4 overflow-hidden p-6 transition-shadow duration-500 ${
          highlighted ? 'ring-2 ring-purple-400 shadow-(--shadow-card-hover)' : ''
        }`}
      >
        {isInSale && (
          <div className="absolute right-0 top-0 h-24 w-24 overflow-hidden">
            <span className="absolute right-[-28px] top-[18px] w-[110px] rotate-45 bg-gradient-to-r from-purple-600 to-fuchsia-500 py-1 text-center text-[10px] font-bold tracking-widest text-white shadow-md shadow-purple-900/50">
              {saleTitle?.toUpperCase() ?? `${discountPercentage}% OFF`}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1 text-center">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/50">{subtitle}</p>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-justify text-white/70">{description}</p>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">
              ₹{finalPrice.toLocaleString('en-IN')}
            </span>
            {isInSale && (
              <span className="text-sm text-white/40 line-through">
                ₹{price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              size="md"
              variant="outline"
              onClick={() =>
                window.open(
                  whatsappLink(`I'd like to know more about ${title}`) ||
                    'https://wa.me/919773732067',
                  '_blank',
                  'noopener,noreferrer',
                )
              }
            >
              Know More
            </Button>
            <Button size="md" onClick={() => setModalOpen(true)}>
              Affirm
            </Button>
          </div>
        </div>
      </Card>

      <BookingModal
        service={service}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

export function SkeletonCard() {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="h-5 w-2/3 animate-pulse rounded-lg bg-white/10" />
      <div className="h-3 w-1/2 animate-pulse rounded-lg bg-white/10" />
      <div className="flex flex-col gap-2">
        <div className="h-3 w-full animate-pulse rounded-lg bg-white/10" />
        <div className="h-3 w-full animate-pulse rounded-lg bg-white/10" />
        <div className="h-3 w-4/5 animate-pulse rounded-lg bg-white/10" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-6 w-20 animate-pulse rounded-lg bg-white/10" />
        <div className="h-9 w-24 animate-pulse rounded-xl bg-white/10" />
      </div>
    </Card>
  )
}
