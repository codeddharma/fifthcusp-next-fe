import VastuHero from '@/components/Vastu/Hero'
import HowVastuWorks from '@/components/Vastu/HowVastuWorks'
import BasicServiceSection from '@/components/common/BasicServices'
import FAQSection from '@/components/Home/FAQs'
import { VASTU_CONTENT } from './vastu.constants'

export default function VastuPage() {
  return (
    <>
      <VastuHero />
      <HowVastuWorks />
      <BasicServiceSection page="vastu" title={VASTU_CONTENT.services.basicTitle} />
      <FAQSection
        page="vastu"
        title={VASTU_CONTENT.faqs.title}
        subtitle={VASTU_CONTENT.faqs.subtitle}
      />
    </>
  )
}
