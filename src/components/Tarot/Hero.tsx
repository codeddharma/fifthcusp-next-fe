import { TAROT_CONTENT } from '@/app/(brand)/tarot-reading/tarot.constants'
import SkeletonImage from '../common/SkeletonImage'

export default function TarotHero() {
  const { image, title, paragraphs } = TAROT_CONTENT.hero

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="flex justify-center">
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
          <h1 className="mb-4 text-4xl font-bold tracking-wide text-white sm:text-5xl">{title}</h1>
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-3 text-justify text-sm leading-7 text-[#c4b5fd] sm:text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
