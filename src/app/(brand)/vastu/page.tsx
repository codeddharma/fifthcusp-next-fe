import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/api/pageMeta.api'
import VastuHero from '@/components/Vastu/Hero'
import HowVastuWorks from '@/components/Vastu/HowVastuWorks'
import VastuServices from '@/components/Vastu/VastuServices'
import BasicServiceSection from '@/components/common/BasicServices'
import FAQSection from '@/components/Home/FAQs'
import WhatsAppCTA from '@/components/common/WhatsAppCTA'
import { VASTU_CONTENT } from './vastu.constants'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/vastu')
}

export default function VastuPage() {
  return (
    <>
      <VastuHero />
      <HowVastuWorks />
      <BasicServiceSection page="vastu" title={VASTU_CONTENT.services.basicTitle} />
      <VastuServices />
      <FAQSection
        page="vastu"
        title={VASTU_CONTENT.faqs.title}
        subtitle={VASTU_CONTENT.faqs.subtitle}
      />
      <WhatsAppCTA message="Hi! I would like to know more about your Vastu consultation services." />
    </>
  )
}
