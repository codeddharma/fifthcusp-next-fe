'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react'
import { fetchBlogBySlug } from '@/lib/api/blogs.api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogDetail({ slug }: { slug: string }) {
  const router = useRouter()
  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlogBySlug(slug),
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <div className="mb-8 h-5 w-24 animate-pulse rounded bg-white/10" />
        <div className="mb-6 h-72 animate-pulse rounded-2xl bg-white/5" />
        <div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="mb-8 h-4 w-32 animate-pulse rounded bg-white/5" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-white/5" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !blog) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center text-[#c4b5fd]">
        Blog not found.
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-sm text-[#c4b5fd] transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Blogs
      </button>

      {/* Cover image */}
      {blog.coverImage && (
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Category + tags */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#a855f7]/20 px-3 py-0.5 text-xs font-semibold text-[#a855f7]">
          {blog.category}
        </span>
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-[#c4b5fd]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">{blog.title}</h1>

      {/* Meta row */}
      <div className="mb-8 flex flex-wrap gap-4 text-xs text-[#c4b5fd]/60">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={12} />
          {formatDate(blog.publishedAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={12} />
          {blog.readTime} min read
        </span>
      </div>

      {/* Excerpt */}
      <p className="mb-8 text-base leading-7 text-[#c4b5fd] opacity-80">{blog.excerpt}</p>

      <hr className="mb-8 border-white/10" />

      {/* Content */}
      <div
        className="prose prose-invert max-w-none text-[#c4b5fd] prose-headings:text-white prose-headings:font-bold prose-a:text-[#a855f7] prose-strong:text-white prose-li:text-[#c4b5fd]"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  )
}
