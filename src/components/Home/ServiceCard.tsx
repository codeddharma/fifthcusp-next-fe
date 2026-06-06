'use client'

import { useState } from 'react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import BookingModal from '@/components/booking/BookingModal'
import { discountedPrice } from '@/lib/utils/pricing'
import type { Service } from '@/types/service.type'

export function ServiceCard({ service }: { service: Service }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { title, subtitle, description, price, isInSale, saleTitle, discountPercentage } = service
  const finalPrice = isInSale ? discountedPrice(price, discountPercentage) : price

  return (
    <>
      <Card hover className="relative flex flex-col gap-4 overflow-hidden p-6">
        {isInSale && (
          <div className="absolute right-0 top-0 h-24 w-24 overflow-hidden">
            <span className="absolute right-[-28px] top-[18px] w-[110px] rotate-45 bg-gradient-to-r from-purple-600 to-fuchsia-500 py-1 text-center text-[10px] font-bold tracking-widest text-white shadow-md shadow-purple-900/50">
              {saleTitle?.toUpperCase() ?? `${discountPercentage}% OFF`}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1 pr-16">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/50">{subtitle}</p>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-white/70">{description}</p>

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

          <Button size="md" onClick={() => setModalOpen(true)}>
            Affirm
          </Button>
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
