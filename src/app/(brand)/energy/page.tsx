import EnergyHero from '@/components/Energy/Hero'
import HowEnergyWorks from '@/components/Energy/HowEnergyWorks'
import EnergyServices from '@/components/Energy/EnergyServices'
import EnergyFAQs from '@/components/Energy/EnergyFAQs'
import FAQSection from '@/components/Home/FAQs'
import BasicServiceSection from '@/components/common/BasicServices'
import AdvanceServiceSection from '@/components/common/AdvanceServices'
import { ENERGY_CONTENT } from './energy.constants'

export default function EnergyPage() {
  return (
    <>
      <EnergyHero />
      <HowEnergyWorks />
      <BasicServiceSection page="energy" title={ENERGY_CONTENT.services.basicTitle} />
      <AdvanceServiceSection page="energy" title={ENERGY_CONTENT.services.advancedTitle} />
      <FAQSection
        page="energy"
        title={ENERGY_CONTENT.faqs.title}
        subtitle={ENERGY_CONTENT.faqs.subtitle}
      />
    </>
  )
}
