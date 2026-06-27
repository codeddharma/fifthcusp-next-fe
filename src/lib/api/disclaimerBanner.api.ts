import api from './axiosInstance'

export interface DisclaimerBannerData {
  text: string
  isActive: boolean
  backgroundColor: string
  textColor: string
}

export async function fetchDisclaimerBanner(): Promise<DisclaimerBannerData | null> {
  try {
    const res = await api.get('/v1/disclaimer-banner')
    return res.data.data ?? null
  } catch {
    return null
  }
}
