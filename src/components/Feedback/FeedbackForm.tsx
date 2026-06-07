'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import api from '@/lib/api/axiosInstance'

const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

interface Props {
  orderNumber: string
}

export default function FeedbackForm({ orderNumber }: Props) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [starRating, setStarRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [clientName, setClientName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!token) {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <p className="text-lg text-red-400">This feedback link is invalid or has expired.</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <div className="mb-6 text-6xl">🙏</div>
        <h1 className="mb-3 text-3xl font-bold text-white">Thank You!</h1>
        <p className="text-white/70">
          Your feedback has been received. We truly appreciate you taking the time to share your experience.
        </p>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!starRating) { setError('Please select a star rating.'); return }
    if (!clientName.trim()) { setError('Please enter your name.'); return }
    if (!comment.trim()) { setError('Please share your experience.'); return }

    setLoading(true)
    setError('')
    try {
      await api.post('/v1/orders/feedback', { orderNumber, token, starRating, comment, clientName })
      setSubmitted(true)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setError(msg ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const display = hovered || starRating

  return (
    <div className="mx-auto max-w-lg py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-white">Share Your Experience</h1>
        <p className="text-white/60">
          Order <span className="font-mono text-white/80">{orderNumber}</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
      >
        {/* Star rating */}
        <div className="mb-6 text-center">
          <p className="mb-3 text-sm font-medium text-white/70">How would you rate your experience?</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setStarRating(n)}
                className="text-4xl transition-transform hover:scale-110 focus:outline-none"
              >
                <span className={n <= display ? 'text-yellow-400' : 'text-white/20'}>★</span>
              </button>
            ))}
          </div>
          {display > 0 && (
            <p className="mt-2 text-sm font-medium text-yellow-300">{STAR_LABELS[display]}</p>
          )}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-white/80">Your name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-white placeholder-white/30 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-medium text-white/80">Your experience</label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience with The Fifth Cusp…"
            className="w-full resize-none rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-white placeholder-white/30 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Submitting…' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}
