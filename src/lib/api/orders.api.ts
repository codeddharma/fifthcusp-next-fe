import api from './axiosInstance'

export interface CreateOrderCustomer {
  name: string
  email: string
  phone: string
}

export interface CreateOrderSelectedAddOn {
  key: string
  formResponses?: Record<string, unknown>
}

export interface CreateOrderResponse {
  orderNumber: string
  razorpayOrderId: string
  amount: number
  currency: 'INR'
  key: string
  prefill: { name: string; email: string; contact: string }
}

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type OrderStatus = 'created' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'

export interface OrderStatusResponse {
  orderNumber: string
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export async function createOrder(formData: FormData): Promise<CreateOrderResponse> {
  const res = await api.post<{ data: CreateOrderResponse }>('/v1/orders', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data.data
}

export async function verifyOrderPayment(
  orderNumber: string,
  payload: VerifyPaymentPayload,
): Promise<OrderStatusResponse> {
  const res = await api.post<{ data: OrderStatusResponse }>(
    `/v1/orders/${orderNumber}/verify`,
    payload,
  )
  return res.data.data
}

export async function getOrderStatus(orderNumber: string): Promise<OrderStatusResponse> {
  const res = await api.get<{ data: OrderStatusResponse }>(`/v1/orders/${orderNumber}/status`)
  return res.data.data
}
