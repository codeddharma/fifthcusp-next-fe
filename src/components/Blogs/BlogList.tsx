'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import BlogCard from '@/components/cards/BlogCard'
import { fetchBlogs } from '@/lib/api/blogs.api'
import { BLOGS_CONTENT } from '@/app/(brand)/blogs/blogs.constants'

const CATEGORIES = ['All', 'Vedic Astrology', 'Vastu', 'Numerology', 'Energy', 'Tarot', 'Material']

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="h-48 animate-pulse bg-white/10" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="h-3 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-white/5" />
        <div className="mt-2 h-px bg-white/10" />
        <div className="flex justify-between">
          <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
          <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
        </div>
      </div>
    </div>
  )
}

export default function BlogList() {
  const router = useRouter()
  const { title, emptyText } = BLOGS_CONTENT.listing
  const [activeCategory, setActiveCategory] = useState('All')

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs', activeCategory],
    queryFn: () =>
      fetchBlogs(activeCategory !== 'All' ? { category: activeCategory } : undefined),
  })

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      {/* Title */}
      <motion.h1
        className="mb-8 text-center text-4xl font-bold tracking-wide text-white sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>

      {/* Category filter pills */}
      <motion.div
        className="mb-10 flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-[#a855f7] text-white'
                : 'border border-white/20 text-[#c4b5fd] hover:border-[#a855f7]/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-[#c4b5fd]">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <BlogCard
                blog={blog}
                onClick={() => router.push(`/blogs/${blog.slug}`)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
