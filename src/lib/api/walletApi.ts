import api from './axiosInstance'

export type WalletTransaction = Record<string, unknown>

export const WalletAPI = {
  getBalance: async (): Promise<number> => {
    const res = await api.get('/wallet/balance')
    return res.data.balance ?? 0
  },
  getTransactions: async (): Promise<WalletTransaction[]> => {
    const res = await api.get('/wallet/transactions')
    return res.data.transactions ?? []
  },
  addCredits: async (amount: number): Promise<Record<string, unknown>> => {
    const res = await api.post('/wallet/add', { amount })
    return res.data
  },
}
