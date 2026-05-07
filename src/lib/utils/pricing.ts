export function discountedPrice(price: number, pct: number): number {
  return Math.round(price - (price * pct) / 100)
}
