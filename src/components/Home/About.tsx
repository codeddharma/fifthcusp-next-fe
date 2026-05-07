import { HOME_CONTENT } from '@/app/(brand)/home.constants'
import Card from '../common/Card'

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">
          {HOME_CONTENT.aboutUs.title}
        </h2>
        <p className="text-[#b8b8d4]">{HOME_CONTENT.aboutUs.subtitle}</p>
      </div>
      <Card as="section" hover className="mx-auto p-10 text-center">
        <div className="space-y-4 text-sm leading-7 text-text-soft sm:text-base text-justify lg:text-left">
          {HOME_CONTENT.aboutUs.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Card>
    </section>
  )
}
