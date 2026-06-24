import type { Metadata } from 'next'
import LegalPageShell from '@/components/legal/LegalPageShell'
import { whatsappLink } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact Us — The Fifth Cusp',
  description:
    'Get in touch with The Fifth Cusp by email, phone, or WhatsApp for astrology, tarot, numerology, vastu, and manifestation services.',
}

export default function ContactPage() {
  const whatsapp = whatsappLink('Hi! I would like to get in touch with The Fifth Cusp.') ||
    'https://wa.me/919773732067'

  return (
    <LegalPageShell
      title="Contact Us"
      lastUpdated="24 June 2026"
      intro={
        <>
          We&rsquo;d love to hear from you. Reach out with any questions about our
          services, bookings, or your order — we usually respond within a few hours.
        </>
      }
    >
      <section>
        <h2>Reach Us</h2>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:support.thefifthcusp@gmail.com">
              support.thefifthcusp@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{' '}
            <a href="tel:+919773732067">+91 97737 32067</a>
          </li>
          <li>
            <strong>WhatsApp:</strong>{' '}
            <a href={whatsapp} target="_blank" rel="noreferrer">
              Chat with us on WhatsApp
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Follow Us</h2>
        <ul>
          <li>
            <a href="https://instagram.com/thefifthcusp" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/the-fifth-cusp-55258a418/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Business Details</h2>
        <p>
          The Fifthcusp
          {/* <br />
          [REGISTERED ADDRESS] */}
          <br />
          [GSTIN / REG NO. — if applicable]
        </p>
      </section>

      <section>
        <h2>Response Time</h2>
        <p>
          Our support hours are Monday to Saturday, 10:00 AM – 7:00 PM IST. Messages
          received outside these hours will be answered on the next working day.
        </p>
      </section>
    </LegalPageShell>
  )
}
