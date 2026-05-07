import { HOME_CONTENT } from '@/app/(brand)/home.constants'
import Card from '../common/Card'
import SkeletonImage from '../common/SkeletonImage'

export default function HeroSection() {
  return (
    <Card
      as="section"
      hover
      className="mx-auto grid max-w-5xl gap-8 px-5 pb-12 pt-16 text-center lg:grid-cols-[0.8fr_1.6fr] lg:items-center lg:text-left"
    >
      <div className="mx-auto flex justify-center">
        <SkeletonImage
          src={HOME_CONTENT.hero.logo.src}
          alt={HOME_CONTENT.hero.logo.alt}
          width={HOME_CONTENT.hero.logo.width}
          height={HOME_CONTENT.hero.logo.height}
          priority
          className="aspect-square w-44 rounded-full object-cover shadow-(--shadow-logo) sm:w-56 lg:w-64"
          skeletonClassName="rounded-full w-44 sm:w-56 lg:w-64 aspect-square"
        />
      </div>

      <div>
        <h1 className="mb-5 text-4xl font-bold tracking-wide text-white sm:text-5xl text-center">
          {HOME_CONTENT.hero.title}
        </h1>
        <div className="space-y-4 text-sm leading-7 text-text-soft sm:text-base text-justify lg:text-left">
          {HOME_CONTENT.hero.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Card>
  )
}
