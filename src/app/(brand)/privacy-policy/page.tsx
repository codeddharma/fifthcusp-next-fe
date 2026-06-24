import type { Metadata } from 'next'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = {
  title: 'Privacy Policy — The Fifth Cusp',
  description:
    'How The Fifth Cusp collects, uses, and protects your personal information across our astrology, tarot, numerology, vastu, and manifestation services.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      lastUpdated="24 June 2026"
      intro={
        <>
          This Privacy Policy explains how The Fifth Cusp (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;), operated by [LEGAL ENTITY NAME],
          collects, uses, discloses, and safeguards your information when you visit
          our website or use our services. By using our website, you consent to the
          practices described in this policy.
        </>
      }
    >
      <section>
        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal details</strong> you provide when booking a service or
            contacting us — such as your name, email address, phone number, date,
            time and place of birth, and any details you share for a reading or
            consultation.
          </li>
          <li>
            <strong>Payment information</strong> processed securely through our
            payment gateway, Razorpay. We do not store your card or banking details
            on our servers.
          </li>
          <li>
            <strong>Usage data</strong> automatically collected through cookies and
            analytics tools (for example, Google Analytics), such as your browser
            type, pages visited, and time spent on the site.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To deliver the services, readings, and consultations you request.</li>
          <li>To process payments and send booking or order confirmations.</li>
          <li>To respond to your enquiries and provide customer support.</li>
          <li>
            To send service-related updates and, where you have opted in, occasional
            offers or content.
          </li>
          <li>To improve our website, services, and user experience.</li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>
      </section>

      <section>
        <h2>3. Payments</h2>
        <p>
          All online payments are processed by Razorpay, a third-party payment
          gateway, in accordance with their own terms and privacy policy. Your
          payment information is shared directly with Razorpay over a secure,
          encrypted connection and is not retained by us.
        </p>
      </section>

      <section>
        <h2>4. Cookies &amp; Analytics</h2>
        <p>
          We use cookies and similar technologies to operate the site and understand
          how it is used. You can control or disable cookies through your browser
          settings, though some features may not function correctly if you do.
        </p>
      </section>

      <section>
        <h2>5. Sharing of Information</h2>
        <p>
          We do not sell or rent your personal information. We may share it only with
          trusted service providers (such as payment processors, email, and analytics
          providers) who help us operate our services, or where required by law.
        </p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We take reasonable technical and organisational measures to protect your
          information. However, no method of transmission over the internet is
          completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          information by contacting us. We will respond to legitimate requests within
          a reasonable timeframe.
        </p>
      </section>

      <section>
        <h2>8. Children&rsquo;s Privacy</h2>
        <p>
          Our services are intended for users aged 18 and above. We do not knowingly
          collect personal information from children.
        </p>
      </section>

      <section>
        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The latest version
          will always be available on this page with a revised &ldquo;Last
          updated&rdquo; date.
        </p>
      </section>

      <section>
        <h2>10. Contact Us</h2>
        <p>
          For any questions about this Privacy Policy, contact us at{' '}
          <a href="mailto:support.thefifthcusp@gmail.com">
            support.thefifthcusp@gmail.com
          </a>{' '}
          or call <a href="tel:+919773732067">+91 97737 32067</a>.
          <br />
          [LEGAL ENTITY NAME], [REGISTERED ADDRESS].
        </p>
      </section>
    </LegalPageShell>
  )
}
