import api from './axiosInstance'

export interface BookingInfo {
  status: 'pending' | 'booked' | 'expired'
  customerName: string
  orderNumber: string
  serviceName: string
  durationMinutes: number
}

export interface AvailableSlot {
  startTime: string
  endTime: string
  durationMinutes: number
}

export interface BookedEvent {
  _id: string
  startTime: string
  endTime: string
  meetLink: string
  durationMinutes: number
}

export async function getBookingInfo(token: string): Promise<BookingInfo> {
  const res = await api.get(`/v1/consultation-booking/${token}`)
  return res.data.data
}

export async function getAvailableSlots(token: string): Promise<AvailableSlot[]> {
  const res = await api.get(`/v1/consultation-booking/${token}/slots`)
  return res.data.data
}

export async function bookSlot(token: string, startTime: string): Promise<BookedEvent> {
  const res = await api.post(`/v1/consultation-booking/${token}/book`, { startTime })
  return res.data.data
}
