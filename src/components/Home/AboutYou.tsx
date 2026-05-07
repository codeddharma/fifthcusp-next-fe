import { HOME_CONTENT } from '@/app/(brand)/home.constants'
import SkeletonImage from '../common/SkeletonImage'
import Card from '../common/Card'

export default function AboutYouSection() {
  return (
    <Card
      id="aboutYou"
      as="section"
      className="mx-auto p-10 grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:items-center"
    >
      <SkeletonImage
        src={HOME_CONTENT.aboutYou.image.src}
        alt={HOME_CONTENT.aboutYou.image.alt}
        width={HOME_CONTENT.aboutYou.image.width}
        height={HOME_CONTENT.aboutYou.image.height}
        className="w-full max-w-sm object-contain"
      />
      <div className="text-center lg:text-left">
        <h2 className="mb-5 text-3xl font-bold tracking-wide text-white sm:text-4xl">
          {HOME_CONTENT.aboutYou.title}
        </h2>
        <div className="space-y-4 text-sm leading-7 text-[#d7d2ef] sm:text-base">
          {HOME_CONTENT.aboutYou.paragraphs.map((paragraph) => (
            <p key={paragraph.text}>
              {paragraph.prefix && <strong>{paragraph.prefix}</strong>}
              {paragraph.text}
            </p>
          ))}
          <p className="font-semibold text-white">{HOME_CONTENT.aboutYou.emphasis}</p>
        </div>
      </div>
    </Card>
  )
}
