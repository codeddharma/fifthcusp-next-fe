import Image from 'next/image'
import { MATERIAL_CONTENT } from '@/app/(brand)/material/material.constants'

export default function MaterialHero() {
  const { image, title, description } = MATERIAL_CONTENT.hero

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="flex justify-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="max-w-[200px] rounded-xl sm:max-w-[280px] lg:max-w-full"
            priority
            unoptimized
          />
        </div>

        <div>
          <h1 className="mb-4 text-4xl font-bold tracking-wide text-white sm:text-5xl">{title}</h1>
          <p className="text-justify text-sm leading-7 text-[#c4b5fd] sm:text-base">{description}</p>
        </div>
      </div>
    </section>
  )
}
