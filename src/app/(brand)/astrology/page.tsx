import AstrologyHero from '@/components/Astrology/Hero'
import AstrologyIntro from '@/components/Astrology/AstrologyIntro'
import Karam from '@/components/Astrology/Karam'
import BasicServiceSection from '@/components/common/BasicServices'
import AdvanceServiceSection from '@/components/common/AdvanceServices'
import FAQSection from '@/components/Home/FAQs'
import { ASTROLOGY_CONTENT } from './astrology.constants'
import ConsultationSection from '@/components/Astrology/Consultation'
import ReportsSection from '@/components/Astrology/Reports'

export default function AstrologyPage() {
  return (
    <>
      <AstrologyHero />
      <AstrologyIntro />
      <Karam />
      <ConsultationSection />
      <BasicServiceSection
        page="astrology"
        title={ASTROLOGY_CONTENT.reports.basicTitle}
        subtitle={ASTROLOGY_CONTENT.reports.basicSubTitle}
        type="report_basic"
      />
      <AdvanceServiceSection
        page="astrology"
        title={ASTROLOGY_CONTENT.reports.advancedTitle}
        subtitle={ASTROLOGY_CONTENT.reports.advanceSubTitle}
        type="report_basic"
      />
      <BasicServiceSection
        page="astrology"
        title={ASTROLOGY_CONTENT.numerology.title}
        subtitle={ASTROLOGY_CONTENT.numerology.subtitle}
        type="numerology"
      />
      <FAQSection
        page="astrology"
        title={ASTROLOGY_CONTENT.faqs.title}
        subtitle={ASTROLOGY_CONTENT.faqs.subtitle}
      />
    </>
  )
}
