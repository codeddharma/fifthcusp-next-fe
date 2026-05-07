export interface FAQ {
  question: string
  answer: string
  isActive: boolean
}

export interface FAQsResponse {
  success: boolean
  message: string
  data: FAQ[]
}

export interface AboutData {
  title: string
  content: string
  image: string
}
