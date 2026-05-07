import api from './axiosInstance'
import type { ServicesResponse } from '@/types/service.type'

export async function fetchServices(type: 'basic' | 'advanced') {
  const res = await api.get<ServicesResponse>('/v1/services', { params: { active: true, type } })
  return res.data.data
}
