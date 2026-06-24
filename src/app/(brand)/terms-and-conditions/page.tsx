import type { Metadata } from 'next'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = {
  title: 'Terms & Conditions — The Fifth Cusp',
  description:
    'The terms and conditions governing your use of The Fifth Cusp website and our astrology, tarot, numerology, vastu, and manifestation services.',
}

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      title="Terms & Conditions"
      lastUpdated="24 June 2026"
      intro={
        <>
          These Terms &amp; Conditions govern your use of the The Fifth Cusp website
          and services, operated by The Fifthcusp. By accessing our website or
          purchasing a service, you agree to be bound by these terms.
        </>
      }
    >
      <section>
        <h2>1. Our Services</h2>
        <p>
          The Fifth Cusp provides spiritual and consultative services including
          astrology, numerology, tarot reading, vastu, energy work, and manifestation
          guidance. These services are delivered digitally and/or as personal
          consultations. They are offered for guidance and personal-growth purposes
          only and are not a substitute for professional medical, legal, financial,
          or psychological advice.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old to purchase or use our services. By using
          the site, you confirm that the information you provide is accurate and that
          you are legally able to enter into this agreement.
        </p>
      </section>

      <section>
        <h2>3. Bookings &amp; Pricing</h2>
        <ul>
          <li>All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
          <li>We reserve the right to change prices and service offerings at any time.</li>
          <li>A booking is confirmed only once full payment has been received.</li>
        </ul>
      </section>

      <section>
        <h2>4. Payments</h2>
        <p>
          Payments are processed securely through Razorpay. By making a payment, you
          also agree to Razorpay&rsquo;s terms of service. We are not responsible for
          errors, delays, or issues arising from the payment gateway or your bank.
        </p>
      </section>

      <section>
        <h2>5. Refunds &amp; Cancellations</h2>
        <p>
          Cancellations and refunds are governed by our{' '}
          <a href="/refund-policy">Refund &amp; Cancellation Policy</a>, which forms
          part of these terms.
        </p>
      </section>

      <section>
        <h2>6. User Responsibilities</h2>
        <ul>
          <li>Provide accurate and complete information required to deliver your service.</li>
          <li>Use the website and services lawfully and respectfully.</li>
          <li>Not copy, resell, or redistribute our content or reports without permission.</li>
        </ul>
      </section>

      <section>
        <h2>7. Intellectual Property</h2>
        <p>
          All content on this website — including text, graphics, logos, and reports —
          is the property of The Fifth Cusp and is protected by applicable
          intellectual-property laws. You may not reproduce or use it without our
          prior written consent.
        </p>
      </section>

      <section>
        <h2>8. Disclaimer &amp; Limitation of Liability</h2>
        <p>
          Our services are provided on an &ldquo;as is&rdquo; basis for guidance
          purposes. We make no guarantees regarding specific outcomes. To the maximum
          extent permitted by law, The Fifth Cusp shall not be liable for any direct,
          indirect, or consequential loss arising from your use of our services or
          reliance on any reading or guidance provided.
        </p>
      </section>

      <section>
        <h2>9. Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes shall be subject
          to the exclusive jurisdiction of the courts of [JURISDICTION CITY], India.
        </p>
      </section>

      <section>
        <h2>10. Contact Us</h2>
        <p>
          For questions about these Terms &amp; Conditions, contact us at{' '}
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
