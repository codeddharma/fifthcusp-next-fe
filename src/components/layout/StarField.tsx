'use client'

import { useEffect, useState } from 'react'
import { STAR_FIELD_CONFIG } from '@/app/(brand)/layout.constants'

type Star = {
  id: number
  top: number
  left: number
  size: number
  duration: number
  delay: number
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: STAR_FIELD_CONFIG.count }, (_, id) => ({
        id,
        top: Math.random() * STAR_FIELD_CONFIG.maxPositionPercent,
        left: Math.random() * STAR_FIELD_CONFIG.maxPositionPercent,
        size: STAR_FIELD_CONFIG.minSize + Math.random() * STAR_FIELD_CONFIG.sizeRange,
        duration: STAR_FIELD_CONFIG.minDuration + Math.random() * STAR_FIELD_CONFIG.durationRange,
        delay: Math.random() * STAR_FIELD_CONFIG.delayRange,
      }))
    )
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {stars.map((star) => (
          <span
            key={star.id}
            className="animate-twinkle absolute rounded-full bg-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[10%] top-[10%] h-[300px] w-[300px] rounded-full bg-violet-600/15 blur-[80px]" />
        <div className="absolute right-[10%] top-[60%] h-[250px] w-[250px] rounded-full bg-fuchsia-500/10 blur-[80px]" />
        <div className="absolute bottom-[10%] left-[40%] h-[200px] w-[200px] rounded-full bg-cyan-300/10 blur-[80px]" />
      </div>
    </>
  )
}
