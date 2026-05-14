import TarotHero from '@/components/Tarot/Hero'
import TheIntuitive from '@/components/Tarot/TheIntuitive'
import BasicServiceSection from '@/components/common/BasicServices'
import FAQSection from '@/components/Home/FAQs'
import { TAROT_CONTENT } from './tarot.constants'

export default function TarotPage() {
  return (
    <>
      <TarotHero />
      <TheIntuitive />
      <BasicServiceSection page="tarot" title={TAROT_CONTENT.services.title} />
      <FAQSection
        page="tarot"
        title={TAROT_CONTENT.faqs.title}
        subtitle={TAROT_CONTENT.faqs.subtitle}
      />
    </>
  )
}
