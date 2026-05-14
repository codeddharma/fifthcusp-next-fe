import type { Metadata } from 'next'
import BlogDetail from '@/components/Blogs/BlogDetail'

// Next.js will call generateMetadata before rendering — we fetch the blog
// server-side here purely for SEO; the client component fetches it again
// (React Query deduplicates via cache).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id: slug } = await params
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'
    const res = await fetch(`${baseUrl}/v1/blogs/slug/${slug}`, { next: { revalidate: 3600 } })
    const json = await res.json()
    const blog = json?.data
    if (!blog) return {}
    return {
      title: blog.metaTitle ?? blog.title,
      description: blog.metaDescription ?? blog.excerpt,
      keywords: blog.metaKeywords ?? [],
      openGraph: {
        title: blog.metaTitle ?? blog.title,
        description: blog.metaDescription ?? blog.excerpt,
        images: blog.coverImage ? [{ url: blog.coverImage }] : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params
  return <BlogDetail slug={slug} />
}
