import api from './axiosInstance'

export interface CouponValidationResult {
  code: string
  discountType: 'percentage' | 'flat'
  discountValue: number
  discountAmount: number
  finalAmount: number
}

export async function validateCoupon(params: {
  code: string
  serviceId: string
  customerId?: string
  amount: number
}): Promise<CouponValidationResult> {
  const res = await api.post<{ data: CouponValidationResult }>('/v1/coupons/validate', params)
  return res.data.data
}
