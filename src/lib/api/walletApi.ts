import api from './axiosInstance'

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
