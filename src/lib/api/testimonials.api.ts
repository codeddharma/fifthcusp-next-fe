import api from './axiosInstance'
import type { TestimonialsResponse } from '@/types/testimonial.type'

export async function fetchTestimonials(page: string) {
  const res = await api.get<TestimonialsResponse>(`/v1/testimonials/service/${page}`)
  return res.data.data
}
