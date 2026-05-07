import AboutSection from '@/components/Home/About'
import AboutYouSection from '@/components/Home/AboutYou'
import HeroSection from '@/components/Home/Hero'
import IkigaiSection from '@/components/Home/Ikigai'
import LanguagesSection from '@/components/Home/Languages'
import BasicServiceSection from '@/components/common/BasicServices'
import AdvanceServiceSection from '@/components/common/AdvanceServices'
import FAQSection from '@/components/Home/FAQs'
import { HOME_CONTENT } from '@/app/(brand)/home.constants'

export default function BrandPage() {
  return (
    <>
      <HeroSection />
      <LanguagesSection />
      <AboutSection />
      <AboutYouSection />
      <BasicServiceSection
        page="home"
        title={HOME_CONTENT.services.title}
        subtitle={HOME_CONTENT.services.subtitle}
      />
      <AdvanceServiceSection
        page="home"
        title={HOME_CONTENT.advancedServices.title}
        subtitle={HOME_CONTENT.advancedServices.subtitle}
      />
      <IkigaiSection />
      <FAQSection
        page="home"
        title={HOME_CONTENT.faqs.title}
        subtitle={HOME_CONTENT.faqs.subtitle}
      />
    </>
  )
}
