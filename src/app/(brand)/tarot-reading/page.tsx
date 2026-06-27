import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/api/pageMeta.api'
import TarotHero from '@/components/Tarot/Hero'
import TheIntuitive from '@/components/Tarot/TheIntuitive'
import BasicServiceSection from '@/components/common/BasicServices'
import AdvanceServiceSection from '@/components/common/AdvanceServices'
import FAQSection from '@/components/Home/FAQs'
import WhatsAppCTA from '@/components/common/WhatsAppCTA'
import { TAROT_CONTENT } from './tarot.constants'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/tarot-reading')
}

export default function TarotPage() {
  return (
    <>
      <TarotHero />
      <TheIntuitive />
      <BasicServiceSection page="tarot" title={TAROT_CONTENT.services.title} />
      <AdvanceServiceSection
        page="tarot"
        title={TAROT_CONTENT.advancedServices.title}
        subtitle={TAROT_CONTENT.advancedServices.subtitle}
      />
      <FAQSection
        page="tarot"
        title={TAROT_CONTENT.faqs.title}
        subtitle={TAROT_CONTENT.faqs.subtitle}
      />
      <WhatsAppCTA message="Hi! I would like to know more about your tarot reading services." />
    </>
  )
}
