import api from './axiosInstance'
import type { ServicesResponse } from '@/types/service.type'

export async function fetchServices(
  type: 'basic' | 'advanced' | 'consultation' | 'report_basic' | 'report_advanced' | 'numerology',
  page?: string
) {
  const res = await api.get<ServicesResponse>('/v1/services', {
    params: { active: true, type, ...(page && { page }) },
  })
  return res.data.data
}
