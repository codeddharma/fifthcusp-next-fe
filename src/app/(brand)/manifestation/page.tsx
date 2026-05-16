import ManifestationHero from '@/components/Manifestation/Hero'
import ManifestationGallery from '@/components/Manifestation/Gallery'
import HowManifestationWorks from '@/components/Manifestation/HowManifestationWorks'
import ManifestationCalendar from '@/components/Manifestation/ManifestationCalendar'
import WellBeing from '@/components/Manifestation/WellBeing'
import BasicServiceSection from '@/components/common/BasicServices'
import AdvanceServiceSection from '@/components/common/AdvanceServices'
import FAQSection from '@/components/Home/FAQs'
import { MANIFESTATION_CONTENT } from './manifestation.constants'

export default function ManifestationPage() {
  const { services, wellBeingPractices, faqs } = MANIFESTATION_CONTENT

  return (
    <>
      <ManifestationHero />
      <ManifestationGallery />
      <HowManifestationWorks />
      <ManifestationCalendar />

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-5 pb-4 pt-12">
        <h2 className="text-center text-3xl font-bold tracking-wide text-white sm:text-4xl">
          {services.title}
        </h2>
      </section>
      <BasicServiceSection
        page="manifestation"
        type="basic"
        title={services.basicTitle}
        subtitle={services.basicSubtitle}
      />
      <AdvanceServiceSection
        page="manifestation"
        type="advanced"
        title={services.advancedTitle}
        subtitle={services.advancedSubtitle}
      />

      <WellBeing />

      <BasicServiceSection
        page="manifestation"
        type="practice"
        title={wellBeingPractices.title}
      />

      <FAQSection
        page="manifestation"
        title={faqs.title}
        subtitle={faqs.subtitle}
      />
    </>
  )
}
