import type { Service } from '@/types/service.type'

/** Round a rupee amount to paise precision, avoiding float drift (0.1 + 0.2). */
export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100
}

/** The service's list price (MRP). Records created before the MRP model have none — use the price. */
export function listPrice(service: Pick<Service, 'mrp' | 'price'>): number {
  return service.mrp ?? service.price
}

/** ₹-less INR amount: "1,499" for whole rupees, "749.50" when there are paise. */
export function formatINR(amount: number): string {
  const digits = Number.isInteger(amount) ? 0 : 2
  return amount.toLocaleString('en-IN', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}
