import type { Metadata } from 'next'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — The Fifth Cusp',
  description:
    'Refund and cancellation terms for The Fifth Cusp digital and consultation services, including how to request a refund processed via Razorpay.',
}

export default function RefundPolicyPage() {
  return (
    <LegalPageShell
      title="Refund & Cancellation Policy"
      lastUpdated="24 June 2026"
      intro={
        <>
          We want you to be satisfied with your experience at The Fifth Cusp. This
          policy explains when cancellations and refunds are possible for our digital
          and consultation services, operated by The Fifthcusp.
        </>
      }
    >
      <section>
        <h2>1. Nature of Our Services</h2>
        <p>
          The Fifth Cusp provides digital and personalised consultation services
          (such as astrology, numerology, tarot, vastu, and manifestation guidance).
          As these are personalised and, in many cases, delivered immediately, refund
          eligibility depends on the stage of fulfilment.
        </p>
      </section>

      <section>
        <h2>2. Cancellations</h2>
        <ul>
          <li>
            <strong>Before work begins:</strong> You may cancel a booking before we
            have started preparing your report or before a scheduled consultation. To
            cancel, contact us as early as possible using the details below.
          </li>
          <li>
            <strong>Rescheduling:</strong> Consultations may be rescheduled at least
            24 hours in advance, subject to availability, at no extra charge.
          </li>
          <li>
            <strong>After work begins / delivery:</strong> Once a personalised report
            has been prepared or a consultation has taken place, the service is
            considered delivered and is generally non-cancellable.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Refunds</h2>
        <ul>
          <li>
            Refunds may be issued where a service has been paid for but not yet
            delivered, or in the event of a duplicate or erroneous payment.
          </li>
          <li>
            Refunds are not available for services that have already been delivered,
            given their personalised nature.
          </li>
          <li>
            If you are unsatisfied with a delivered service, please contact us — we
            will review the matter in good faith and may offer a suitable resolution
            at our discretion.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. How to Request a Refund</h2>
        <p>
          To request a refund or cancellation, email{' '}
          <a href="mailto:support.thefifthcusp@gmail.com">
            support.thefifthcusp@gmail.com
          </a>{' '}
          with your order/booking details and reason. We aim to respond within 3
          business days.
        </p>
      </section>

      <section>
        <h2>5. Refund Processing</h2>
        <p>
          Approved refunds are processed back to your original payment method via
          Razorpay. Once approved, refunds typically reflect in your account within
          5–7 business days, depending on your bank or card provider.
        </p>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          For any questions about this policy, contact us at{' '}
          <a href="mailto:support.thefifthcusp@gmail.com">
            support.thefifthcusp@gmail.com
          </a>{' '}
          or call <a href="tel:+919773732067">+91 97737 32067</a>.
          <br />
          The Fifthcusp.
        </p>
      </section>
    </LegalPageShell>
  )
}
