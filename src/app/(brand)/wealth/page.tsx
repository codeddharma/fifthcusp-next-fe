import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/api/pageMeta.api'
import WealthHero from '@/components/Wealth/Hero'
import HowItWorks from '@/components/Wealth/HowItWorks'
import TailoredProposal from '@/components/Wealth/TailoredProposal'
import WealthServices from '@/components/Wealth/WealthServices'
import FAQSection from '@/components/Home/FAQs'
import Steps from '@/components/common/Steps'
import Testimonials from '@/components/common/Testimonials'
import WhatsAppCTA from '@/components/common/WhatsAppCTA'
import { WEALTH_CONTENT } from './wealth.constants'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/wealth')
}

export default function WealthPage() {
  return (
    <>
      <WealthHero />
      <HowItWorks />
      <Steps steps={WEALTH_CONTENT.steps} variant="horizontal" />
      <TailoredProposal />
      <WealthServices />
      <Testimonials page="wealth" title="WHAT OUR CLIENTS SAY" />
      <FAQSection
        page="wealth"
        title={WEALTH_CONTENT.faqs.title}
        subtitle={WEALTH_CONTENT.faqs.subtitle}
      />
      <WhatsAppCTA message="Hi! I would like to know more about your wealth & wellbeing services." />
    </>
  )
}
