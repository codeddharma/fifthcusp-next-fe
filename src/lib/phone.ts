import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  type CountryCode,
} from 'libphonenumber-js'

export { isValidPhoneNumber }
export type { CountryCode }

export interface Country {
  code: CountryCode
  name: string
  callingCode: string
  flag: string
}

// Emoji flag from an ISO 3166-1 alpha-2 code (regional indicator symbols).
function flagFor(code: string): string {
  return code.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
}

function buildCountries(): Country[] {
  const displayNames =
    typeof Intl !== 'undefined' && 'DisplayNames' in Intl
      ? new Intl.DisplayNames(['en'], { type: 'region' })
      : null

  return getCountries()
    .map((code) => ({
      code,
      name: displayNames?.of(code) ?? code,
      callingCode: getCountryCallingCode(code),
      flag: flagFor(code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

let cached: Country[] | null = null

/** Memoized list of all countries with dial code, English name, and emoji flag. */
export function getCountryList(): Country[] {
  if (!cached) cached = buildCountries()
  return cached
}

/**
 * Best-effort default country from the browser's locale (e.g. `en-GB` → `GB`),
 * falling back to India (`IN`) when the region is missing or unknown.
 */
export function detectDefaultCountry(): CountryCode {
  const fallback: CountryCode = 'IN'
  if (typeof navigator === 'undefined') return fallback

  const known = new Set<string>(getCountries())
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language]

  for (const locale of locales) {
    if (!locale) continue
    const region = locale.split('-')[1]?.toUpperCase()
    if (region && known.has(region)) return region as CountryCode
  }
  return fallback
}
