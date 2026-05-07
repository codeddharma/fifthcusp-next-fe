'use client'

import { useState, useRef } from 'react'

export interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

function AccordionRow({ item, open, onToggle }: { item: AccordionItem; open: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="cosmic-glass overflow-hidden rounded-2xl">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white sm:text-base">{item.question}</span>
        <span className="shrink-0 text-xl font-light text-purple-400 transition-transform duration-300" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? `${contentRef.current?.scrollHeight ?? 500}px` : '0px' }}
      >
        <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">{item.answer}</p>
      </div>
    </div>
  )
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <AccordionRow key={i} item={item} open={openIndex === i} onToggle={() => toggle(i)} />
      ))}
    </div>
  )
}
