import api from './axiosInstance'
import type { ServicesResponse } from '@/types/service.type'

export async function fetchServices(
  type: 'basic' | 'advanced' | 'consultation' | 'reports_basic' | 'reports_advanced' | 'numerology' | 'practice',
  page?: string
) {
  const res = await api.get<ServicesResponse>('/v1/services', {
    params: { active: true, type, ...(page && { page }) },
  })
  return res.data.data
}

/** Fetches every active service (no type filter) — used by the header search. */
export async function fetchAllServices() {
  const res = await api.get<ServicesResponse>('/v1/services', {
    params: { active: true },
  })
  return res.data.data
}
