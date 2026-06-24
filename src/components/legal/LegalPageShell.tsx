import type { ReactNode } from 'react'

interface LegalPageShellProps {
  title: string
  lastUpdated: string
  intro?: ReactNode
  children: ReactNode
}

/**
 * Shared layout for the static legal pages (Privacy, Terms, Refund, Contact).
 * Provides consistent prose styling on the dark brand theme via Tailwind
 * descendant utilities, so each page only supplies semantic content.
 */
export default function LegalPageShell({
  title,
  lastUpdated,
  intro,
  children,
}: LegalPageShellProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-wide text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-xs uppercase tracking-widest text-brand-purple">
        Last updated: {lastUpdated}
      </p>

      {intro ? (
        <p className="mt-6 text-sm leading-relaxed text-text-pearl">{intro}</p>
      ) : null}

      <div
        className="mt-8 flex flex-col gap-7 text-text-pearl
          [&_h2]:mt-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white
          [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white
          [&_p]:text-sm [&_p]:leading-relaxed
          [&_a]:text-brand-purple [&_a]:underline-offset-2 hover:[&_a]:underline
          [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5
          [&_li]:text-sm [&_li]:leading-relaxed
          [&_section]:flex [&_section]:flex-col [&_section]:gap-2.5"
      >
        {children}
      </div>
    </section>
  )
}
