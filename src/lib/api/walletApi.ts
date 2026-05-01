import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://astro-5dcy.onrender.com/api'

const api = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' } })

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const WalletAPI = {
  getBalance: async (): Promise<number> => {
    const res = await api.get('/wallet/balance')
    return res.data.balance ?? 0
  },
  getTransactions: async (): Promise<any[]> => {
    const res = await api.get('/wallet/transactions')
    return res.data.transactions ?? []
  },
  addCredits: async (amount: number): Promise<any> => {
    const res = await api.post('/wallet/add', { amount })
    return res.data
  },
}
