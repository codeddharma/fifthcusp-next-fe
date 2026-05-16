export type FormInputType =
  | 'text'
  | 'email'
  | 'number'
  | 'date'
  | 'textarea'
  | 'dropdown'
  | 'radio'
  | 'multiSelect'
  | 'phonenumber'

export interface FormInput {
  fieldKey: string
  label: string
  type: FormInputType
  isRequired: boolean
  placeholder?: string
  tooltip?: string
  options: string[]
  validation?: {
    min?: number
    max?: number
    maxLength?: number
  }
  order: number
}

export interface FileUpload {
  fieldKey: string
  label: string
  tooltip?: string
  acceptedTypes: string[]
  maxFiles: number
  maxFileSizeMB: number
  isRequired: boolean
  order: number
}

export interface Service {
  _id: string
  sku: string
  title: string
  subtitle: string
  description: string
  price: number
  type: string
  pages: string[]
  formInputs: FormInput[]
  fileUploads: FileUpload[]
  addOns: unknown[]
  isInSale: boolean
  saleTitle?: string
  hasSaleBanner: boolean
  discountPercentage: number
  isActiveService: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ServicesResponse {
  success: boolean
  message: string
  data: Service[]
}
