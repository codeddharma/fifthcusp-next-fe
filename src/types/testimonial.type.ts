export interface Testimonial {
  clientName: string
  feedback: string
}

export interface TestimonialsResponse {
  success: boolean
  message: string
  data: Testimonial[]
}
