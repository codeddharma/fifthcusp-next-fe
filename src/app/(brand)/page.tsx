import AboutSection from '@/components/Home/About'
import AboutYouSection from '@/components/Home/AboutYou'
import HeroSection from '@/components/Home/Hero'
import IkigaiSection from '@/components/Home/Ikigai'
import LanguagesSection from '@/components/Home/Languages'
import BasicServiceSection from '@/components/Home/BasicServices'
import AdvanceServiceSection from '@/components/Home/AdvanceServices'
import FAQSection from '@/components/Home/FAQs'

export default function BrandPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <div className="relative z-[2] flex min-h-screen flex-col pt-6 px-4 sm:px-6 lg:px-0">
        <HeroSection />
        <LanguagesSection />
        <AboutSection />
        <AboutYouSection />
        <BasicServiceSection />
        <AdvanceServiceSection />
        <IkigaiSection />
        <FAQSection page="home" />
      </div>
    </div>
  )
}
