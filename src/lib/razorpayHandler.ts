'use client'

import axios from 'axios'

const PAYMENTS_API = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/payments`
  : 'https://astro-5dcy.onrender.com/api/payments'

declare global {
  interface Window {
    Razorpay: any
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => {
      console.error('Failed to load Razorpay script')
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export const createRazorpayOrder = async (amount: number, userId: string) => {
  try {
    const res = await axios.post(`${PAYMENTS_API}/create-order`, { amount, userId })
    if (res.data?.success && res.data.order) {
      return {
        success: true,
        order: res.data.order,
        key: res.data.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      }
    }
    return { success: false, error: 'Order creation failed' }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export const verifyPayment = async (paymentData: Record<string, unknown>) => {
  try {
    const res = await axios.post(`${PAYMENTS_API}/verify`, paymentData)
    return res.data
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

interface PaymentOptions {
  amount: number
  userId: string
  name?: string
  email?: string
  phone?: string
  description?: string
  onSuccess?: (verifyResult: any, razorResponse: any) => void
  onFailure?: (result: any, razorResponse: any) => void
  onError?: (message: string) => void
  themeColor?: string
}

export const initiateRazorpayPayment = async ({
  amount,
  userId,
  name,
  email,
  phone,
  description = 'Service Payment',
  onSuccess,
  onFailure,
  onError,
  themeColor = '#7b2cbf',
}: PaymentOptions): Promise<boolean> => {
  try {
    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      onError?.('Payment system loading failed.')
      return false
    }

    const orderResult = await createRazorpayOrder(amount, userId)
    if (!orderResult.success) {
      onError?.(orderResult.error || 'Failed to create order')
      return false
    }

    const { order, key } = orderResult as any

    const options = {
      key,
      amount: order.amount,
      currency: 'INR',
      name: 'THE FIFTH CUSP',
      description,
      order_id: order.id || order.order_id,
      handler: async (razorResponse: any) => {
        const verifyResult = await verifyPayment({
          razorpay_payment_id: razorResponse.razorpay_payment_id,
          razorpay_order_id: razorResponse.razorpay_order_id,
          razorpay_signature: razorResponse.razorpay_signature,
          userId,
          amount,
        })
        if (verifyResult.success) onSuccess?.(verifyResult, razorResponse)
        else onFailure?.(verifyResult, razorResponse)
      },
      prefill: { name: name || '', email: email || '', contact: phone || '' },
      theme: { color: themeColor },
      modal: { ondismiss: () => onFailure?.({ success: false, error: 'Payment cancelled' }, null) },
      notes: { userId, service: description },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (response: any) => {
      onFailure?.({ success: false, error: 'Payment failed' }, response)
    })
    rzp.open()
    return true
  } catch (err: any) {
    onError?.(err.message || 'Payment could not be processed')
    return false
  }
}

export const simulatePayment = (delay = 1500): Promise<Record<string, unknown>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        simulated: true,
        paymentId: `sim_${Date.now()}`,
        orderId: `order_sim_${Date.now()}`,
      })
    }, delay)
  })
}
