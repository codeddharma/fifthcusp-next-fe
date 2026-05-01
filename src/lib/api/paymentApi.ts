import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/payments`
  : 'https://astro-5dcy.onrender.com/api/payments'

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
    const res = await axios.post(`${API_URL}/create-order`, { amount, userId, planId })
    return res.data
  } catch (err: any) {
    console.error('❌ Create Order Error:', err.response?.data || err.message)
    return null
  }
}

export async function verifyPayment(paymentData: PaymentData) {
  try {
    const res = await axios.post(`${API_URL}/verify`, paymentData)
    return res.data
  } catch (err: any) {
    console.error('❌ Verify Error:', err.response?.data || err.message)
    return null
  }
}
