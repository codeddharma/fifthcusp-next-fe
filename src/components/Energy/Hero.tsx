import Image from 'next/image'
import { ENERGY_CONTENT } from '@/app/(brand)/energy/energy.constants'
import SkeletonImage from '../common/SkeletonImage'

export default function EnergyHero() {
  const { image, title, subtitle, whatIsTitle, whatIsParagraph } = ENERGY_CONTENT.hero

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="flex justify-center lg:order-none">
          <SkeletonImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="max-w-[200px] rounded-xl sm:max-w-[280px] lg:max-w-full"
            priority
          />
        </div>

        <div>
          <h1 className="mb-3 text-4xl font-bold tracking-wide text-white sm:text-5xl">{title}</h1>
          <p className="mb-6 whitespace-pre-line text-sm font-semibold tracking-wider text-[#c4b5fd] sm:text-base">
            {subtitle}
          </p>

          <h3 className="mb-3 text-lg font-bold tracking-wide text-white sm:text-xl">
            {whatIsTitle}
          </h3>
          <p className="text-justify text-sm leading-7 text-[#c4b5fd] sm:text-base">
            {whatIsParagraph}
          </p>
        </div>
      </div>
    </section>
  )
}
