import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Mail, Phone } from 'lucide-react'
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'

const pageLinks = [
  { label: 'Home', href: '/' },
  { label: 'Languages', href: '/careers' },
  { label: 'Well Beings', href: '/manifestation' },
  { label: 'Manifestation Calendar', href: '/manifestation' },
  { label: 'Blogs', href: '/blogs' },
]

const serviceLinks = [
  { label: 'Energy', href: '/energy' },
  { label: 'Manifestation', href: '/manifestation' },
  { label: 'Vastu', href: '/vastu' },
  { label: 'Material', href: '/wealth-architecture' },
  { label: 'Tarot Reading', href: '/tarot-reading' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-violet-300/10 bg-gradient-to-b from-bg-overlay to-[#1a1038] pt-10 text-white">
      <div className="mx-auto flex max-w-[calc(100svw-200px)] flex-wrap justify-between gap-8 px-6 pb-8">
        <section className="min-w-[250px] flex-1">
          <div className="mb-5 flex items-start gap-4">
            <Image
              src="/assets/logo.png"
              alt="The Fifth Cusp Logo"
              width={70}
              height={70}
              className="h-[70px] w-[70px] object-contain drop-shadow-(--shadow-icon)"
            />
            <div className="pt-1">
              <h2 className="font-serif text-3xl font-semibold leading-tight tracking-wide">
                THE FIFTH CUSP
              </h2>
              <p className="mt-1 text-sm italic text-brand-purple">
                Align with your cosmic destiny
              </p>
            </div>
          </div>

          <p className="border-l-2 border-brand-purple/20 pl-3 text-sm leading-6 text-text-pearl">
            Guiding you through cosmic pathways of Astrology, Numerology, Vastu, Tarot, and
            Manifestation.
          </p>
        </section>

        <section className="flex min-w-[250px] flex-1 gap-8 pt-2">
          <FooterColumn title="Pages" links={pageLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
        </section>

        <section className="min-w-[250px] flex-1 pt-2">
          <h3 className="mb-4 border-b border-violet-300/20 pb-2 text-base font-medium">
            <span className="mr-2 text-brand-purple">✦</span>
            Stay Connected
          </h3>

          <div className="mb-5 flex gap-3">
            <SocialLink href="https://wa.me/919999999999" label="WhatsApp">
              <FaWhatsapp />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/yourprofile" label="LinkedIn">
              <FaLinkedinIn />
            </SocialLink>
            <SocialLink href="https://instagram.com/yourprofile" label="Instagram">
              <FaInstagram />
            </SocialLink>
          </div>

          <div className="space-y-2 text-sm text-text-pearl">
            <a
              href="mailto:enquiry@thefifthcusp.com"
              className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-brand-purple/10 hover:text-brand-purple"
            >
              <Mail size={16} />
              enquiry@thefifthcusp.com
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-brand-purple/10 hover:text-brand-purple"
            >
              <Phone size={16} />
              +91 98765 43210
            </a>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-text-pearl">
        © {currentYear} <span className="text-brand-purple">THE FIFTH CUSP</span>. All rights
        reserved. DEVELOPED BY Neel Shah
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: Array<{ label: string; href: string }>
}) {
  return (
    <div className="flex-1">
      <h3 className="mb-4 border-b border-violet-300/20 pb-2 text-base font-medium">
        <span className="mr-2 text-brand-purple">✦</span>
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-text-pearl transition hover:translate-x-1 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-white transition hover:-translate-y-1 hover:scale-105 hover:bg-brand-purple hover:shadow-(--shadow-service-card)"
    >
      {children}
    </a>
  )
}
