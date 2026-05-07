import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api',
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const status = error.response?.status

    if (status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      toast.error('Session expired. Please log in again.')
      return Promise.reject(error)
    }

    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      'Something went wrong'

    const toastMessage = (() => {
      switch (status) {
        case 400:
          return `Bad request: ${message}`
        case 403:
          return 'You do not have permission to do that.'
        case 404:
          return 'Resource not found.'
        case 422:
          return `Validation error: ${message}`
        case 429:
          return 'Too many requests. Please slow down.'
        case 500:
        case 502:
        case 503:
          return 'Server error. Please try again later.'
        default:
          return message
      }
    })()

    toast.error(toastMessage)
    return Promise.reject(error)
  }
)

export default api
