import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/api/pageMeta.api'
import EnergyHero from '@/components/Energy/Hero'
import HowEnergyWorks from '@/components/Energy/HowEnergyWorks'
import FAQSection from '@/components/Home/FAQs'
import BasicServiceSection from '@/components/common/BasicServices'
import AdvanceServiceSection from '@/components/common/AdvanceServices'
import WhatsAppCTA from '@/components/common/WhatsAppCTA'
import { ENERGY_CONTENT } from './energy.constants'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/energy')
}

export default function EnergyPage() {
  return (
    <>
      <EnergyHero />
      <HowEnergyWorks />
      <BasicServiceSection page="energy" title={ENERGY_CONTENT.services.basicTitle} type='basic'/>
      <AdvanceServiceSection page="energy" title={ENERGY_CONTENT.services.advancedTitle} type='advanced'/>
      <FAQSection
        page="energy"
        title={ENERGY_CONTENT.faqs.title}
        subtitle={ENERGY_CONTENT.faqs.subtitle}
      />
      <WhatsAppCTA message="Hi! I would like to know more about your energy healing services." />
    </>
  )
}
