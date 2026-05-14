'use client'

import Image from 'next/image'
import { Clock } from 'lucide-react'
import type { BlogSummary } from '@/types/blog.type'

interface BlogCardProps {
  blog: BlogSummary
  onClick: () => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogCard({ blog, onClick }: BlogCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-[#a855f7]/40 hover:bg-white/8"
    >
      {/* Cover image */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category pill over image */}
        <span className="absolute left-3 top-3 rounded-full bg-[#a855f7]/80 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
          {blog.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-bold leading-snug text-white line-clamp-2">{blog.title}</h3>
        <p className="flex-1 text-sm leading-6 text-[#c4b5fd] line-clamp-3">{blog.excerpt}</p>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-[#c4b5fd]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-[#c4b5fd]/60">
          <span>{formatDate(blog.publishedAt)}</span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {blog.readTime} min read
          </span>
        </div>
      </div>
    </div>
  )
}
