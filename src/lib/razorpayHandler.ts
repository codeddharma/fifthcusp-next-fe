'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    Razorpay: any
  }
}

export interface RazorpaySuccessResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export interface OpenRazorpayCheckoutOptions {
  key: string
  amount: number // in paise
  currency: string
  razorpayOrderId: string
  name?: string
  description?: string
  prefill: { name: string; email: string; contact: string }
  themeColor?: string
  onSuccess: (response: RazorpaySuccessResponse) => void
  onDismiss?: () => void
  onFailure?: (error: unknown) => void
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function openRazorpayCheckout(options: OpenRazorpayCheckoutOptions): Promise<boolean> {
  const ok = await loadRazorpayScript()
  if (!ok) {
    options.onFailure?.(new Error('Razorpay script failed to load'))
    return false
  }

  const rzp = new window.Razorpay({
    key: options.key,
    amount: options.amount,
    currency: options.currency,
    name: options.name ?? 'THE FIFTH CUSP',
    description: options.description,
    order_id: options.razorpayOrderId,
    prefill: options.prefill,
    theme: { color: options.themeColor ?? '#7b2cbf' },
    modal: {
      ondismiss: () => options.onDismiss?.(),
    },
    handler: (response: RazorpaySuccessResponse) => options.onSuccess(response),
  })

  rzp.on('payment.failed', (response: unknown) => {
    options.onFailure?.(response)
  })

  rzp.open()
  return true
}

/**
 * @deprecated Use the orders.api.ts `createOrder` + `openRazorpayCheckout` flow.
 * Kept only because `ServicePage.tsx` (unreferenced legacy) still imports it.
 */
export async function initiateRazorpayPayment(_opts: {
  amount: number
  userId: string
  name?: string
  email?: string
  phone?: string
  description?: string
  onSuccess?: (verifyResult: unknown, razorResponse: unknown) => void
  onFailure?: (result: unknown, razorResponse: unknown) => void
  onError?: (message: string) => void
  themeColor?: string
}): Promise<boolean> {
  _opts.onError?.('Legacy Razorpay flow has been removed. Please use the new checkout.')
  return false
}
