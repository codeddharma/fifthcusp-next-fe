export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''))
}

export const isValidDate = (date: string): boolean => {
  const d = new Date(date)
  return !isNaN(d.getTime())
}

export const isNonEmpty = (value: string): boolean => {
  return value.trim().length > 0
}

export const isValidTime = (time: string): boolean => {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)
}
