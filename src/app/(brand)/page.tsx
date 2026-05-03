'use client'

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { HOME_API, HOME_CONTENT } from './home.constants'
import { AboutData, FAQ } from '@/types/home.type'

export default function HomePage() {
  const [aboutData, setAboutData] = useState<AboutData>(HOME_CONTENT.initialAboutData)
  const [homeFaqs, setHomeFaqs] = useState<FAQ[]>([])
  const [aboutFaqs, setAboutFaqs] = useState<FAQ[]>([])
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [aboutRes, homeFaqRes, aboutFaqRes] = await Promise.all([
          axios.get(`${HOME_API.baseUrl}${HOME_API.endpoints.about}`),
          axios.get(`${HOME_API.baseUrl}${HOME_API.endpoints.homeFaqs}`),
          axios.get(`${HOME_API.baseUrl}${HOME_API.endpoints.aboutFaqs}`),
        ])

        if (aboutRes.data) setAboutData(aboutRes.data)

        setHomeFaqs((homeFaqRes.data?.faqs || []).filter((faq: FAQ) => faq.status === 'active'))
        setAboutFaqs((aboutFaqRes.data?.faqs || []).filter((faq: FAQ) => faq.status === 'active'))
      } catch {
        setHomeFaqs([])
        setAboutFaqs([])
      }
    }

    fetchContent()
  }, [])

  useEffect(() => {
    if (window.location.hash === `#${HOME_CONTENT.ids.languages}`) {
      document.getElementById(HOME_CONTENT.ids.languages)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const faqs = [...homeFaqs, ...aboutFaqs]

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <div className="relative z-[2] flex min-h-screen flex-col pt-20">
        <section className="cosmic-glass rounded-[20px] mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-16 text-center lg:grid-cols-[0.8fr_1.6fr] lg:items-center lg:text-left transition duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:shadow-[0_15px_40px_rgba(138,43,226,0.25)]">
          <div className="mx-auto flex justify-center">
            <Image
              src={HOME_CONTENT.hero.logo.src}
              alt={HOME_CONTENT.hero.logo.alt}
              width={HOME_CONTENT.hero.logo.width}
              height={HOME_CONTENT.hero.logo.height}
              priority
              className="aspect-square w-44 rounded-full object-cover shadow-[0_0_35px_rgba(183,132,247,0.35)] sm:w-56 lg:w-64"
            />
          </div>

          <div>
            <h1 className="mb-5 text-4xl font-bold tracking-wide text-white sm:text-5xl">
              {HOME_CONTENT.hero.title}
            </h1>
            <div className="space-y-4 text-sm leading-7 text-[#d7d2ef] sm:text-base">
              {HOME_CONTENT.hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id={HOME_CONTENT.ids.languages} className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              {HOME_CONTENT.languages.title}
            </h2>
            <p className="text-[#b8b8d4]">{HOME_CONTENT.languages.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {HOME_CONTENT.languages.services.map((service) => (
              <Link
                key={service.link}
                href={service.link}
                className="cosmic-glass group flex min-h-[260px] flex-col rounded-[20px] p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:shadow-[0_15px_40px_rgba(138,43,226,0.25)]"
              >
                <h3 className="mb-4 text-xl font-semibold uppercase tracking-wide text-white">
                  {service.name}
                </h3>
                <p className="flex-1 whitespace-pre-line text-sm leading-6 text-[#c4c4d8]">
                  {service.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.85fr_1.4fr] lg:items-center">
          <div className="cosmic-glass flex justify-center rounded-[20px] p-6">
            <Image
              src={HOME_CONTENT.aboutYou.image.src}
              alt={HOME_CONTENT.aboutYou.image.alt}
              width={HOME_CONTENT.aboutYou.image.width}
              height={HOME_CONTENT.aboutYou.image.height}
              className="w-full max-w-sm object-contain"
            />
          </div>
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
        </section>

        <section className="mx-auto max-w-5xl px-5 py-14 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-wide text-white sm:text-4xl">
            {HOME_CONTENT.aboutUs.title}
          </h2>
          <p className="mb-8 text-[#b8b8d4]">{HOME_CONTENT.aboutUs.subtitle}</p>
          <div className="cosmic-glass rounded-[20px] p-6 text-left leading-7 text-[#d7d2ef] sm:p-8">
            {aboutData.content ? (
              <div dangerouslySetInnerHTML={{ __html: aboutData.content }} />
            ) : (
              <p>{HOME_CONTENT.aboutUs.fallback}</p>
            )}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
          <div className="cosmic-glass flex justify-center rounded-[20px] p-6">
            <Image
              src={HOME_CONTENT.ikigai.image.src}
              alt={HOME_CONTENT.ikigai.image.alt}
              width={HOME_CONTENT.ikigai.image.width}
              height={HOME_CONTENT.ikigai.image.height}
              className="w-full max-w-sm object-contain"
            />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              {HOME_CONTENT.ikigai.title}
            </h2>
            <p className="mb-8 text-sm font-semibold uppercase leading-7 tracking-wide text-[#d7d2ef] sm:text-base">
              {HOME_CONTENT.ikigai.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {HOME_CONTENT.ikigai.actions.map((action) => (
                <Link key={action.href} href={action.href} className="home-action-btn">
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-14">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              {HOME_CONTENT.faqs.title}
            </h2>
            <p className="text-[#b8b8d4]">{HOME_CONTENT.faqs.subtitle}</p>
          </div>

          <div className="space-y-4">
            {faqs.length === 0 ? (
              <p className="text-center text-white/70">{HOME_CONTENT.faqs.emptyText}</p>
            ) : (
              faqs.map((faq) => {
                const isOpen = openFaq === faq._id
                return (
                  <div key={faq._id} className="cosmic-glass rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq._id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-semibold text-white">{faq.question}</span>
                      <span className="text-2xl text-[#c77dff]">
                        {isOpen ? HOME_CONTENT.faqs.openSymbol : HOME_CONTENT.faqs.closedSymbol}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/10 px-5 pb-5 pt-1 text-sm leading-6 text-[#d7d2ef]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_0_25px_rgba(147,51,234,0.35)] backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
        aria-label={HOME_CONTENT.scrollToTop.ariaLabel}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  )
}
