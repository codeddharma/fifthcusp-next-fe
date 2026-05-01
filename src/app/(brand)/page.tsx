'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { services } from './constants'
import { AboutData, FAQ } from '@/types/home.type'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://astro-5dcy.onrender.com/api'

export default function HomePage() {
  const [aboutData, setAboutData] = useState<AboutData>({ title: 'About Us', content: '', image: '' })
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [aboutFaqs, setAboutFaqs] = useState<FAQ[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openAboutFaq, setOpenAboutFaq] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="min-h-screen text-white">
      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-center text-center">
          <div className="flex justify-center">
            <Image
              src="/assets/The Fifth Cusp_Logo.png"
              alt="The Fifth Cusp Logo"
              width={220}
              height={220}
              className="rounded-full"
            />
          </div>
          <div className="text-left space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest">THE FIFTH CUSP</h2>
            <p className="text-gray-300 leading-relaxed">
              You&apos;re standing inside a new kind of spiritual ecosystem, one built to decode who you are,
              align where you&apos;re going, and transform how you live.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our collective brings together Astrology, Vastu, Energy Reading, Manifestation, Tarot, and
              Wealth Architecture (Material) into one integrated space.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Every tool, report, assessment, and consultation is designed to reveal your inner blueprint
              and translate it into real-world action.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether you want clarity, healing, direction, or growth, the system guides you through your
              inherent nature, emotional patterns, environment, and the opportunities written into your chart.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This isn&apos;t a website — it&apos;s a personal operating system for alignment, abundance, and self-mastery.
              <br />
              It is a portal to higher frequencies. It is the Cusp.
            </p>
          </div>
        </div>
      </section>

      {/* LANGUAGES / SERVICES */}
      <section id="languages" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold tracking-widest text-center mb-3">LANGUAGES</h2>
        <p className="text-center text-gray-400 mb-10">Explore cosmic wisdom through our transformative offerings</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Link
              key={idx}
              href={service.link}
              className="rounded-2xl p-6 text-white no-underline hover:scale-105 transition-transform duration-300"
              style={{ background: service.gradient }}
            >
              <h3 className="text-xl font-bold mb-3 tracking-wider">{service.name}</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line opacity-90">{service.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about-section" className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-widest">ABOUT US</h2>
          <p className="text-gray-400 mt-2">Connecting You with Universal Wisdom</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed transition-all duration-500 overflow-hidden"
            style={{ maxHeight: expanded ? 'none' : '34rem' }}
            dangerouslySetInnerHTML={{ __html: aboutData.content || 'Loading…' }}
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-purple-400 hover:text-purple-300 underline text-sm"
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        </motion.div>
      </section>

      {/* ABOUT YOU */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm p-2">
              <Image
                src="/assets/About You_Final.png"
                alt="About You"
                width={420}
                height={420}
                className="rounded-xl object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-widest">ABOUT YOU</h2>
            <p className="text-gray-300 leading-relaxed">
              <strong>About You</strong> is where you finally understand why you feel the way you do.
              It reveals your true nature, your wounds, your karmic stories, and the blocks that silently steal your peace.
            </p>
            <p className="text-gray-300 leading-relaxed">
              When you learn all that you can be at your elevated levels of frequency (what you&apos;re actually meant to be),
              that&apos;s when you&apos;re ready to realign and propel yourself into the best version of yourself.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The change truly begins at home — within. This section explains everything, and suddenly, everything begins to make sense.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This is the first real step toward manifestation, inner peace, and becoming who you were always meant to be.
            </p>
            <p className="text-purple-300 italic font-medium">
              Your higher self already exists within you — all you need is to resonate.
              To let go of the anchors is to finally jump.
            </p>
          </div>
        </div>
      </section>

      {/* IKIGAI */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src="/assets/Ikigai_Final.png"
              alt="Find Your Ikigai"
              width={420}
              height={420}
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-widest">IKIGAI — EFFORTLESS GROWTH</h2>
            <p className="text-gray-400 uppercase tracking-widest text-sm">
              What you love · What you&apos;re good at · What you can be paid for · What the world needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/know-more" className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-full font-semibold tracking-wide transition-colors">
                KNOW MORE
              </Link>
              <Link href="/experiences" className="px-6 py-3 border border-purple-500 hover:bg-purple-900/40 text-purple-300 rounded-full font-semibold tracking-wide transition-colors">
                EXPERIENCE
              </Link>
              <Link href="/contact" className="px-6 py-3 border border-white/20 hover:bg-white/10 text-gray-300 rounded-full font-semibold tracking-wide transition-colors">
                AFFIRM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-widest">FAQs</h2>
          <p className="text-gray-400 mt-2">Everything you need to know about us</p>
        </div>
        <div className="space-y-3">
          {[...faqs, ...aboutFaqs].length === 0 && (
            <p className="text-center text-gray-500">No FAQs available</p>
          )}
          {faqs.map((faq, i) => (
            <div key={faq._id} className="border border-white/10 rounded-xl overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-xl text-purple-400">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-gray-400">{faq.answer}</div>
              )}
            </div>
          ))}
          {aboutFaqs.map((faq, i) => (
            <div key={faq._id} className="border border-white/10 rounded-xl overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenAboutFaq(openAboutFaq === i ? null : i)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-xl text-purple-400">{openAboutFaq === i ? '−' : '+'}</span>
              </button>
              {openAboutFaq === i && (
                <div className="px-6 pb-4 text-gray-400">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FIXED CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-full font-bold tracking-widest shadow-lg transition-colors"
        >
          BEGIN MY ALIGNMENT
        </button>
      </div>
    </div>
  )
}
