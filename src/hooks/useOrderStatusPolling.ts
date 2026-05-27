'use client'

import { useEffect, useRef } from 'react'
import { getOrderStatus, OrderStatusResponse } from '@/lib/api/orders.api'

interface UseOrderStatusPollingOptions {
  orderNumber: string | null
  enabled: boolean
  intervalMs?: number
  maxAttempts?: number
  onPaid: (status: OrderStatusResponse) => void
  onFailed?: (status: OrderStatusResponse) => void
  onTimeout?: () => void
}

export function useOrderStatusPolling({
  orderNumber,
  enabled,
  intervalMs = 5000,
  maxAttempts = 12,
  onPaid,
  onFailed,
  onTimeout,
}: UseOrderStatusPollingOptions) {
  const attemptsRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stoppedRef = useRef(false)

  useEffect(() => {
    if (!enabled || !orderNumber) return
    stoppedRef.current = false
    attemptsRef.current = 0

    const tick = async () => {
      if (stoppedRef.current) return
      attemptsRef.current += 1
      try {
        const status = await getOrderStatus(orderNumber)
        if (stoppedRef.current) return
        if (status.paymentStatus === 'paid') {
          onPaid(status)
          return
        }
        if (status.paymentStatus === 'failed') {
          onFailed?.(status)
          return
        }
      } catch {
        // network blip — ignore and keep polling
      }
      if (attemptsRef.current >= maxAttempts) {
        onTimeout?.()
        return
      }
      timerRef.current = setTimeout(tick, intervalMs)
    }

    timerRef.current = setTimeout(tick, intervalMs)

    return () => {
      stoppedRef.current = true
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, orderNumber])
}
