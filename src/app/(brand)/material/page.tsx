import MaterialHero from '@/components/Material/Hero'
import HowItWorks from '@/components/Material/HowItWorks'
import TailoredProposal from '@/components/Material/TailoredProposal'
import MaterialServices from '@/components/Material/MaterialServices'
import FAQSection from '@/components/Home/FAQs'
import Steps from '@/components/common/Steps'
import Testimonials from '@/components/common/Testimonials'
import { MATERIAL_CONTENT } from './material.constants'

export default function MaterialPage() {
  return (
    <>
      <MaterialHero />
      <HowItWorks />
      <Steps steps={MATERIAL_CONTENT.steps} variant="horizontal" />
      <TailoredProposal />
      <MaterialServices />
      <Testimonials page="material" title="WHAT OUR CLIENTS SAY" />
      <FAQSection
        page="material"
        title={MATERIAL_CONTENT.faqs.title}
        subtitle={MATERIAL_CONTENT.faqs.subtitle}
      />
    </>
  )
}
