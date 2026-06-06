import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/api/pageMeta.api'
import InsideTheCusp from '@/components/Careers/InsideTheCusp'
import AvailableRoles from '@/components/Careers/AvailableRoles'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/careers')
}

export default function CareersPage() {
  return (
    <>
      <InsideTheCusp />
      <AvailableRoles />
    </>
  )
}
