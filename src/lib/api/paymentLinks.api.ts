import api from './axiosInstance'

export interface PublicPaymentLink {
  token: string
  amount: number
  description: string
  validUntil: string
  status: 'pending' | 'paid' | 'cancelled' | 'expired'
  prefillName: string
  prefillEmail: string
  prefillPhone: string
  serviceDescription?: string
}

export interface InitCheckoutResponse {
  razorpayOrderId: string
  amount: number
  currency: string
  key: string
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export async function getPaymentLink(token: string): Promise<PublicPaymentLink> {
  const res = await api.get<{ data: PublicPaymentLink }>(`/v1/payment-links/public/${token}`)
  return res.data.data
}

export async function initPaymentLinkCheckout(token: string): Promise<InitCheckoutResponse> {
  const res = await api.post<{ data: InitCheckoutResponse }>(`/v1/payment-links/public/${token}/pay`)
  return res.data.data
}

export async function verifyPaymentLinkPayment(
  token: string,
  payload: VerifyPaymentPayload,
): Promise<void> {
  await api.post(`/v1/payment-links/public/${token}/verify`, payload)
}
