export interface Service {
  _id: string
  title: string
  subtitle: string
  description: string
  price: number
  isInSale: boolean
  saleTitle?: string
  hasSaleBanner: boolean
  discountPercentage: number
  isActiveService: boolean
  createdAt: string
  updatedAt: string
}

export interface ServicesResponse {
  success: boolean
  message: string
  data: Service[]
}
