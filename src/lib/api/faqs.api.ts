import api from './axiosInstance'
import type { FAQsResponse } from '@/types/home.type'

export async function fetchFaqs(page: string) {
  const res = await api.get<FAQsResponse>(`/v1/faqs/page/${page}`)
  return res.data.data.filter((f) => f.isActive)
}
