import { FaWhatsapp } from 'react-icons/fa'
import { whatsappLink } from '@/lib/whatsapp'

interface WhatsAppCTAProps {
  title?: string
  subtitle?: string
  message?: string
  buttonLabel?: string
}

export default function WhatsAppCTA({
  title = 'Still have questions?',
  subtitle = 'Talk to us directly on WhatsApp — we usually reply within a few hours.',
  message = 'Hi! I would like to know more about The Fifth Cusp services.',
  buttonLabel = 'Talk to us on WhatsApp',
}: WhatsAppCTAProps) {
  const href = whatsappLink(message) || 'https://wa.me/919773732067'

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-14">
      <div className="cosmic-glass flex flex-col items-center gap-5 rounded-2xl border border-violet-300/15 px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold tracking-wide text-white sm:text-3xl">{title}</h2>
        <p className="max-w-xl text-sm leading-relaxed text-text-pearl sm:text-base">{subtitle}</p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-[#1fb955] hover:shadow-lg hover:shadow-green-900/30"
        >
          <FaWhatsapp className="text-lg" />
          {buttonLabel}
        </a>
      </div>
    </section>
  )
}
