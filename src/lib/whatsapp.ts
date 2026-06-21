export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

/**
 * Builds a wa.me chat link for the configured business number, optionally
 * prefilling a message. Returns an empty string when no number is configured
 * so callers can hide the entry point.
 */
export function whatsappLink(message?: string): string {
  if (!WHATSAPP_NUMBER) return ''
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
