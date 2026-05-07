'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type SkeletonImageProps = ImageProps & {
  skeletonClassName?: string
}

export default function SkeletonImage({
  className = '',
  skeletonClassName = '',
  onLoad,
  ...props
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="flex relative justify-center">
      {!loaded && (
        <div className={`absolute inset-0 animate-pulse bg-white/10 ${skeletonClassName}`} />
      )}
      <Image
        {...props}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
      />
    </div>
  )
}
