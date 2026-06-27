'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchDisclaimerBanner } from '@/lib/api/disclaimerBanner.api'

export default function DisclaimerBanner() {
  const { data: banner } = useQuery({
    queryKey: ['disclaimer-banner'],
    queryFn: fetchDisclaimerBanner,
  })

  if (!banner || !banner.isActive || !banner.text) return null

  return (
    <div
      className="relative z-[101] overflow-hidden py-2"
      style={{ backgroundColor: banner.backgroundColor, color: banner.textColor }}
    >
      <div className="disclaimer-banner-track">
        <span className="px-8 text-xs font-semibold tracking-wide sm:text-sm">{banner.text}</span>
        <span className="px-8 text-xs font-semibold tracking-wide sm:text-sm">{banner.text}</span>
      </div>
    </div>
  )
}
