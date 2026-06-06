import type { Metadata } from 'next'

interface PageMetaResponse {
  pagePath: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImageUrl?: string
}

export async function generatePageMetadata(pagePath: string): Promise<Metadata> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'
    const url = `${baseUrl}/v1/page-meta/public?path=${encodeURIComponent(pagePath)}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    const json = await res.json()
    const meta: PageMetaResponse | null = json?.data
    if (!meta) return {}
    return {
      title: meta.metaTitle,
      description: meta.metaDescription,
      keywords: meta.metaKeywords,
      openGraph: {
        title: meta.ogTitle ?? meta.metaTitle,
        description: meta.ogDescription ?? meta.metaDescription,
        images: meta.ogImageUrl ? [{ url: meta.ogImageUrl }] : [],
      },
    }
  } catch {
    return {}
  }
}
