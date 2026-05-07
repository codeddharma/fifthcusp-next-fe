import api from './axiosInstance'

interface CreateOrderParams {
  amount: number
  userId: string
  planId?: string
}

interface PaymentData {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
  userId: string
  amount: number
}

export async function createOrder({ amount, userId, planId }: CreateOrderParams) {
  try {
    const res = await api.post('/payments/create-order', { amount, userId, planId })
    return res.data
  } catch {
    return null
  }
}

export async function verifyPayment(paymentData: PaymentData) {
  try {
    const res = await api.post('/payments/verify', paymentData)
    return res.data
  } catch {
    return null
  }
}
