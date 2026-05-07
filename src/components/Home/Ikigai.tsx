import { HOME_CONTENT } from '@/app/(brand)/home.constants'
import Card from '../common/Card'
import SkeletonImage from '../common/SkeletonImage'
import Link from 'next/link'

export default function IkigaiSection() {
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
            {HOME_CONTENT.ikigai.actions.map((action) => (
              <Link key={action.href} href={action.href} className="home-action-btn">
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
