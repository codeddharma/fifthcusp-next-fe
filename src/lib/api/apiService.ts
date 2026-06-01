import api from './axiosInstance'

type ApiError = {
  response?: { data?: { message?: string } & Record<string, unknown> }
  message?: string
}

const asApiError = (err: unknown): ApiError =>
  err && typeof err === 'object' ? (err as ApiError) : {}

// Generic CRUD helpers
const handleErr = (err: unknown, fallback: string): never => {
  throw new Error(asApiError(err).response?.data?.message || fallback)
}

export const KundliAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/kundli/calculate', data)
      if (res.data?.success) return res.data
      throw new Error(res.data?.message || 'Kundli calculation failed')
    } catch (err) {
      handleErr(err, 'Kundli calculation failed. Please try again.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/kundli')
      return res.data.data || res.data.kundlis || []
    } catch (err) {
      handleErr(err, 'Unable to fetch kundli list.')
    }
  },
  getById: async (id: string) => {
    try {
      const res = await api.get(`/kundli/${id}`)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Failed to load kundli details.')
    }
  },
  update: async (id: string, data: Record<string, unknown>) => {
    try {
      const res = await api.put(`/kundli/${id}`, data)
      return res.data
    } catch (err) {
      handleErr(err, 'Failed to update kundli.')
    }
  },
  delete: async (id: string) => {
    try {
      const res = await api.delete(`/kundli/${id}`)
      return res.data
    } catch (err) {
      handleErr(err, 'Failed to delete kundli.')
    }
  },
}

export const NumerologyAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/numerology/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Numerology calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/numerology')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch numerology records.')
    }
  },
  getById: async (id: string) => {
    try {
      const res = await api.get(`/numerology/${id}`)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Failed to fetch numerology record.')
    }
  },
  update: async (id: string, data: Record<string, unknown>) => {
    try {
      const res = await api.put(`/numerology/${id}`, data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Failed to update numerology record.')
    }
  },
  delete: async (id: string) => {
    try {
      const res = await api.delete(`/numerology/${id}`)
      return res.data
    } catch (err) {
      handleErr(err, 'Failed to delete numerology record.')
    }
  },
}

export const CompatibilityAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/compatibility/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Compatibility calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/compatibility')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch compatibility records.')
    }
  },
  getById: async (id: string) => {
    try {
      const res = await api.get(`/compatibility/${id}`)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Failed to fetch compatibility record.')
    }
  },
  update: async (id: string, data: Record<string, unknown>) => {
    try {
      const res = await api.put(`/compatibility/${id}`, data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Failed to update compatibility record.')
    }
  },
  delete: async (id: string) => {
    try {
      const res = await api.delete(`/compatibility/${id}`)
      return res.data
    } catch (err) {
      handleErr(err, 'Failed to delete compatibility record.')
    }
  },
}

export const GemstoneAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/gemstone/calculate', data)
      if (res.data?.success) return res.data.data || res.data
      throw new Error(res.data?.message || 'Gemstone calculation failed')
    } catch (err) {
      handleErr(err, 'Unable to calculate gemstone recommendation.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/gemstone')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to load gemstone records.')
    }
  },
  getById: async (id: string) => {
    try {
      const res = await api.get(`/gemstone/${id}`)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Failed to load gemstone record.')
    }
  },
}

export const PanchangAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/panchang/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Panchang calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/panchang')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch panchang records.')
    }
  },
}

export const PlanetaryAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/planetary/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Planetary calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/planetary')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch planetary records.')
    }
  },
  update: async (id: string, data: Record<string, unknown>) => {
    try {
      const res = await api.put(`/planetary/${id}`, data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Failed to update planetary record.')
    }
  },
  delete: async (id: string) => {
    try {
      const res = await api.delete(`/planetary/${id}`)
      return res.data
    } catch (err) {
      handleErr(err, 'Failed to delete planetary record.')
    }
  },
}

export const TransitAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/transit/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Transit calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/transit')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch transit records.')
    }
  },
}

export const ZodiacAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/zodiac/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Zodiac calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/zodiac')
      return Array.isArray(res.data) ? res.data : res.data?.data || []
    } catch (err) {
      handleErr(err, 'Unable to fetch Zodiac entries.')
    }
  },
}

export const ManglikAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/manglik/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Manglik calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/manglik')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch Manglik list.')
    }
  },
}

export const DashaAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/dasha/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Dasha calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/dasha')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch dasha records.')
    }
  },
}

export const NakshatraAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/nakshatra/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Nakshatra calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/nakshatra')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch Nakshatra list.')
    }
  },
}

export const DailyPredictionAPI = {
  getAll: async () => {
    try {
      const res = await api.get('/daily-prediction')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch daily predictions.')
    }
  },
  fetchFromProkerala: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/daily-prediction/fetch', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Failed to fetch daily horoscope.')
    }
  },
}

export const HoroscopeAPI = {
  calculate: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/horoscope/calculate', data)
      return res.data.data || res.data
    } catch (err) {
      handleErr(err, 'Horoscope calculation failed.')
    }
  },
  getAll: async () => {
    try {
      const res = await api.get('/horoscope')
      return res.data.data || []
    } catch (err) {
      handleErr(err, 'Failed to fetch horoscope records.')
    }
  },
}

export const PaymentAPI = {
  createOrder: async ({
    amount,
    userId,
    planId,
  }: {
    amount: number
    userId: string
    planId?: string
  }) => {
    try {
      const res = await api.post('/payment/create-order', { amount, userId, planId })
      return res.data
    } catch (err) {
      const e = asApiError(err)
      return { success: false, error: e.response?.data || e.message }
    }
  },
  verifyPayment: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/payment/verify', data)
      return res.data
    } catch (err) {
      const e = asApiError(err)
      return { success: false, error: e.response?.data || e.message }
    }
  },
}

export const BookingAPI = {
  getMyBookings: async (userId: string) => {
    try {
      const res = await api.get(`/booking/user/${userId}`)
      return res.data.data || res.data.bookings || []
    } catch {
      return { success: false, bookings: [] }
    }
  },
  addBooking: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/booking/add', data)
      return res.data
    } catch {
      return { success: false }
    }
  },
}

export const UserReportAPI = {
  add: async (data: Record<string, unknown>) => {
    try {
      const res = await api.post('/user-report/add', data)
      return res.data
    } catch {
      return { success: false }
    }
  },
  getByUser: async (userId: string) => {
    try {
      const res = await api.get(`/user-report/user/${userId}`)
      return res.data.data || res.data.reports || []
    } catch {
      return { success: false, reports: [] }
    }
  },
  delete: async (id: string) => {
    try {
      const res = await api.delete(`/user-report/${id}`)
      return res.data
    } catch {
      return { success: false }
    }
  },
}

export const AuthAPI = {
  login: async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        document.cookie = `token=${res.data.token}; path=/; SameSite=Lax`
      }
      return res.data
    } catch (err) {
      throw new Error(asApiError(err).response?.data?.message || 'Login failed')
    }
  },
  register: async (userData: Record<string, unknown>) => {
    try {
      const res = await api.post('/auth/register', userData)
      return res.data
    } catch (err) {
      throw new Error(asApiError(err).response?.data?.message || 'Registration failed')
    }
  },
  getCurrentUser: async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      if (!token) return null
      const res = await api.get('/auth/me')
      return res.data.user || res.data
    } catch {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      return null
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  },
}

const apiService = {
  KundliAPI,
  NumerologyAPI,
  CompatibilityAPI,
  GemstoneAPI,
  PanchangAPI,
  PlanetaryAPI,
  TransitAPI,
  ZodiacAPI,
  ManglikAPI,
  DashaAPI,
  NakshatraAPI,
  DailyPredictionAPI,
  HoroscopeAPI,
  PaymentAPI,
  BookingAPI,
  UserReportAPI,
  AuthAPI,
}

export default apiService
