'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react'
import { openRazorpayCheckout } from '@/lib/razorpayHandler'
import {
  getPaymentLink,
  initPaymentLinkCheckout,
  verifyPaymentLinkPayment,
  type PublicPaymentLink,
} from '@/lib/api/paymentLinks.api'

type PageState = 'loading' | 'ready' | 'paying' | 'success' | 'failure' | 'invalid'

const STATUS_MESSAGES: Record<string, { icon: React.ReactNode; title: string; body: string }> = {
  expired: {
    icon: <Clock size={48} className="text-yellow-400" />,
    title: 'Link has expired',
    body: 'This payment link is no longer valid. Please contact us for a new link.',
  },
  paid: {
    icon: <CheckCircle2 size={48} className="text-green-400" />,
    title: 'Already paid',
    body: 'This payment link has already been used. Thank you for your payment.',
  },
  cancelled: {
    icon: <XCircle size={48} className="text-red-400" />,
    title: 'Link cancelled',
    body: 'This payment link has been cancelled. Please contact us for assistance.',
  },
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

function formatExpiry(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function PayPage() {
  const { token } = useParams<{ token: string }>()
  const [state, setState] = useState<PageState>('loading')
  const [link, setLink] = useState<PublicPaymentLink | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    getPaymentLink(token)
      .then((data) => {
        setLink(data)
        if (data.status !== 'pending') {
          setState('invalid')
        } else {
          setState('ready')
        }
      })
      .catch(() => {
        setError('Payment link not found or is invalid.')
        setState('invalid')
      })
  }, [token])

  const handlePay = async () => {
    if (!link || !token) return
    setState('paying')
    try {
      const checkout = await initPaymentLinkCheckout(token)
      await openRazorpayCheckout({
        key: checkout.key,
        amount: checkout.amount,
        currency: checkout.currency,
        razorpayOrderId: checkout.razorpayOrderId,
        name: 'THE FIFTH CUSP',
        description: link.description,
        prefill: {
          name: link.prefillName,
          email: link.prefillEmail,
          contact: link.prefillPhone,
        },
        onSuccess: async (response) => {
          try {
            await verifyPaymentLinkPayment(token, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            setState('success')
          } catch {
            setState('failure')
          }
        },
        onDismiss: () => setState('ready'),
        onFailure: () => setState('failure'),
      })
    } catch {
      setState('failure')
    }
  }

  if (state === 'loading') {
    return (
      <CenteredLayout>
        <Loader2 size={40} className="animate-spin text-brand-purple" />
        <p className="mt-4 text-white/60">Loading payment details…</p>
      </CenteredLayout>
    )
  }

  if (state === 'success') {
    return (
      <CenteredLayout>
        <CheckCircle2 size={56} className="text-green-400" />
        <h1 className="mt-4 text-2xl font-semibold text-white">Payment successful!</h1>
        <p className="mt-2 text-white/60">
          Thank you. Your payment has been received and your booking is confirmed.
        </p>
      </CenteredLayout>
    )
  }

  if (state === 'failure') {
    return (
      <CenteredLayout>
        <XCircle size={56} className="text-red-400" />
        <h1 className="mt-4 text-2xl font-semibold text-white">Payment failed</h1>
        <p className="mt-2 text-white/60">Something went wrong. Please try again or contact us.</p>
        <button
          type="button"
          onClick={() => setState('ready')}
          className="mt-6 rounded-lg border border-white/20 px-6 py-2 text-sm text-white/80 hover:bg-white/5"
        >
          Try again
        </button>
      </CenteredLayout>
    )
  }

  if (state === 'invalid' || !link) {
    const statusMsg = link ? STATUS_MESSAGES[link.status] : null
    return (
      <CenteredLayout>
        {statusMsg ? (
          <>
            {statusMsg.icon}
            <h1 className="mt-4 text-2xl font-semibold text-white">{statusMsg.title}</h1>
            <p className="mt-2 text-white/60">{statusMsg.body}</p>
          </>
        ) : (
          <>
            <XCircle size={56} className="text-red-400" />
            <h1 className="mt-4 text-2xl font-semibold text-white">Invalid link</h1>
            <p className="mt-2 text-white/60">{error ?? 'This payment link is not valid.'}</p>
          </>
        )}
      </CenteredLayout>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d14] px-4 py-16 font-poppins">
      <div className="mx-auto max-w-md">
        {/* Brand */}
        <p className="mb-8 text-center text-xs font-semibold tracking-widest text-brand-purple/70 uppercase">
          THE FIFTH CUSP
        </p>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold text-white">{link.description}</h1>

          {link.serviceDescription && (
            <p className="mt-1 text-sm text-white/50">{link.serviceDescription}</p>
          )}

          <div className="my-6 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">{formatAmount(link.amount)}</span>
          </div>

          <div className="mb-6 space-y-2 rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Billed to</span>
              <span className="text-white">{link.prefillName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Email</span>
              <span className="text-white">{link.prefillEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Expires</span>
              <span className="text-white">{formatExpiry(link.validUntil)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={state === 'paying'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple px-6 py-3.5 text-base font-semibold text-white transition hover:bg-brand-purple/90 disabled:opacity-50"
          >
            {state === 'paying' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Opening payment…
              </>
            ) : (
              `Pay ${formatAmount(link.amount)}`
            )}
          </button>

          <p className="mt-4 text-center text-xs text-white/30">
            Secured by Razorpay · Payments are encrypted and safe
          </p>
        </div>
      </div>
    </div>
  )
}

function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d0d14] px-4 py-16 text-center font-poppins">
      {children}
    </div>
  )
}
