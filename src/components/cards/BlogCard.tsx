'use client'

import Image from 'next/image'

interface BlogCardProps {
  title: string
  description: string
  image: string
  date: string
  author: string
  ctaText?: string
  onClick?: () => void
}

export default function BlogCard({
  title,
  description,
  image,
  date,
  author,
  ctaText = 'Read More',
  onClick,
}: BlogCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-black border border-white/10 hover:border-white/30 transition-colors overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/60 leading-relaxed line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-xs text-white/40 mt-1">
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClick?.() }}
          className="mt-2 self-start px-4 py-2 text-xs tracking-widest border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
        >
          {ctaText}
        </button>
      </div>
    </div>
  )
}
