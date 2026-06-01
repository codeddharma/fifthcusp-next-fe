'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Button from '@/components/common/Button'
import DynamicFormField, { type FormFieldValue } from '@/components/booking/DynamicFormField'
import FileUploadField from '@/components/booking/FileUploadField'
import { discountedPrice } from '@/lib/utils/pricing'
import { openRazorpayCheckout } from '@/lib/razorpayHandler'
import {
  createOrder,
  verifyOrderPayment,
  type CreateOrderResponse,
} from '@/lib/api/orders.api'
import { useOrderStatusPolling } from '@/hooks/useOrderStatusPolling'
import type { Service, FormInput } from '@/types/service.type'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Step = 1 | 2 | 3
type OrderStatus = 'success' | 'failure' | null

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------
const STEP_LABELS = ['Your Details', 'Payment', 'Confirmation']

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-center gap-0 px-4">
      {STEP_LABELS.map((label, idx) => {
        const num = idx + 1
        const isActive = step === num
        const isDone = step > num
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                  isDone
                    ? 'border-brand-purple bg-brand-purple text-white'
                    : isActive
                      ? 'border-brand-purple bg-brand-purple/20 text-brand-purple'
                      : 'border-white/15 bg-transparent text-white/30'
                }`}
              >
                {isDone ? '✓' : num}
              </div>
              <span
                className={`hidden text-[10px] font-medium sm:block ${
                  isActive ? 'text-brand-purple' : isDone ? 'text-white/60' : 'text-white/25'
                }`}
              >
                {label}
              </span>
            </div>
            {idx < STEP_LABELS.length - 1 && (
              <div
                className={`mx-2 mb-4 h-px w-10 transition-colors duration-300 sm:w-16 ${
                  step > num ? 'bg-brand-purple' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
function validateForm(
  formInputs: FormInput[],
  formData: Record<string, FormFieldValue>,
  files: Record<string, File[]>,
  fileUploads: Service['fileUploads'],
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const field of formInputs) {
    const val = formData[field.fieldKey]
    if (field.isRequired) {
      if (field.type === 'multiSelect') {
        if (!Array.isArray(val) || val.length === 0)
          errors[field.fieldKey] = `${field.label} is required.`
      } else if (val === undefined || val === null || val === '') {
        errors[field.fieldKey] = `${field.label} is required.`
      }
    }
    if (field.type === 'number' && val !== '' && val !== undefined) {
      const n = Number(val)
      if (field.validation?.min !== undefined && n < field.validation.min)
        errors[field.fieldKey] = `Minimum value is ${field.validation.min}.`
      if (field.validation?.max !== undefined && n > field.validation.max)
        errors[field.fieldKey] = `Maximum value is ${field.validation.max}.`
    }
    if (field.type === 'email' && val) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val)))
        errors[field.fieldKey] = 'Enter a valid email address.'
    }
    if (field.type === 'phonenumber' && val) {
      if (!/^\d{10}$/.test(String(val)))
        errors[field.fieldKey] = 'Enter a valid 10-digit phone number.'
    }
    if (field.type === 'textarea' && val && field.validation?.maxLength) {
      if (String(val).length > field.validation.maxLength)
        errors[field.fieldKey] = `Maximum ${field.validation.maxLength} characters allowed.`
    }
  }

  for (const fu of fileUploads) {
    if (fu.isRequired && (!files[fu.fieldKey] || files[fu.fieldKey].length === 0))
      errors[fu.fieldKey] = `${fu.label} is required.`
  }

  return errors
}

// ---------------------------------------------------------------------------
// Main modal
// ---------------------------------------------------------------------------
interface BookingModalProps {
  service: Service
  open: boolean
  onClose: () => void
}

export default function BookingModal({ service, open, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<Record<string, FormFieldValue>>({})
  const [files, setFiles] = useState<Record<string, File[]>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(null)
  const [paying, setPaying] = useState(false)
  const [order, setOrder] = useState<CreateOrderResponse | null>(null)
  const [pollingEnabled, setPollingEnabled] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useOrderStatusPolling({
    orderNumber: order?.orderNumber ?? null,
    enabled: pollingEnabled,
    onPaid: () => {
      setPollingEnabled(false)
      setPaying(false)
      setOrderStatus('success')
      goTo(3)
    },
    onFailed: () => {
      setPollingEnabled(false)
      setPaying(false)
      setOrderStatus('failure')
      goTo(3)
    },
    onTimeout: () => {
      setPollingEnabled(false)
      setPaying(false)
      toast.error('Payment not completed. You can retry below.')
    },
  })

  const finalPrice = service.isInSale
    ? discountedPrice(service.price, service.discountPercentage)
    : service.price

  const sortedInputs = [...(service.formInputs ?? [])].sort((a, b) => a.order - b.order)
  const sortedUploads = [...(service.fileUploads ?? [])].sort((a, b) => a.order - b.order)

  // Close on Escape (only steps 1 and 3)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (step === 1 || step === 3)) onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1)
        setDirection(1)
        setFormData({})
        setFiles({})
        setErrors({})
        setOrderStatus(null)
        setPaying(false)
        setOrder(null)
        setPollingEnabled(false)
      }, 300)
    }
  }, [open])

  // Scroll modal body to top on step change
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [step])

  const goTo = (next: Step) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const handleContinue = () => {
    const errs = validateForm(sortedInputs, formData, files, sortedUploads)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const messages = Object.values(errs)
      toast.error(messages.length === 1 ? messages[0] : `Please fix the following:\n${messages.map(m => `• ${m}`).join('\n')}`, { duration: 5000 })
      // Scroll the modal body (overflow container) to the first error element
      const firstErrKey = Object.keys(errs)[0]
      const firstErrorEl = document.getElementById(`field-${firstErrKey}`)
      if (firstErrorEl && bodyRef.current) {
        const containerRect = bodyRef.current.getBoundingClientRect()
        const elRect = firstErrorEl.getBoundingClientRect()
        bodyRef.current.scrollTop += elRect.top - containerRect.top - 24
      }
      return
    }
    setErrors({})
    goTo(2)
  }

  const openCheckout = async (existing: CreateOrderResponse) => {
    await openRazorpayCheckout({
      key: existing.key,
      amount: existing.amount,
      currency: existing.currency,
      razorpayOrderId: existing.razorpayOrderId,
      name: 'THE FIFTH CUSP',
      description: service.title,
      prefill: existing.prefill,
      onSuccess: async (rp) => {
        try {
          const res = await verifyOrderPayment(existing.orderNumber, {
            razorpay_order_id: rp.razorpay_order_id,
            razorpay_payment_id: rp.razorpay_payment_id,
            razorpay_signature: rp.razorpay_signature,
          })
          setPaying(false)
          if (res.paymentStatus === 'paid') {
            setOrderStatus('success')
            goTo(3)
          } else {
            setOrderStatus('failure')
            goTo(3)
          }
        } catch {
          // Verify call failed (network etc.) — webhook may still confirm. Poll briefly.
          setPollingEnabled(true)
        }
      },
      onDismiss: () => {
        // Browser closed Razorpay without paying — webhook may still come through. Poll briefly.
        setPollingEnabled(true)
      },
      onFailure: () => {
        setPaying(false)
        setOrderStatus('failure')
        goTo(3)
      },
    })
  }

  const handlePay = async () => {
    setPaying(true)
    try {
      let placed = order
      if (!placed) {
        const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim()
        const fd = new FormData()
        fd.append('serviceSku', service.sku)
        fd.append(
          'customer',
          JSON.stringify({
            name: fullName || formData.email,
            email: formData.email,
            phone: String(formData.phone ?? ''),
          }),
        )
        fd.append('quantity', '1')
        fd.append('formResponses', JSON.stringify(formData))
        fd.append('selectedAddOns', JSON.stringify([]))
        for (const [key, fileList] of Object.entries(files)) {
          for (const file of fileList) fd.append(key, file)
        }
        placed = await createOrder(fd)
        setOrder(placed)
      }
      await openCheckout(placed)
    } catch {
      // Axios interceptor already toasted the error
      setPaying(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Slide variants
  // ---------------------------------------------------------------------------
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  }

  const canClose = step === 1 || step === 3

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          onClick={canClose ? onClose : undefined}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#120d2e] shadow-2xl"
            style={{ maxHeight: 'calc(100vh - 64px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 border-b border-white/10 px-5 pt-5 pb-4">
              <StepIndicator step={step} />
              {canClose && (
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Scrollable body */}
            <div ref={bodyRef} className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="space-y-4 px-5 py-5"
                  >
                    <div className="mb-2">
                      <h2 className="text-lg font-semibold text-white">{service.title}</h2>
                      <p className="text-sm text-white/50">{service.subtitle}</p>
                    </div>

                    {sortedInputs.map((field) => (
                      <div key={field.fieldKey} id={`field-${field.fieldKey}`}>
                        <DynamicFormField
                          field={field}
                          value={formData[field.fieldKey]}
                          onChange={(val) => {
                            setFormData((prev) => ({ ...prev, [field.fieldKey]: val }))
                            if (errors[field.fieldKey])
                              setErrors((prev) => { const n = { ...prev }; delete n[field.fieldKey]; return n })
                          }}
                          error={errors[field.fieldKey]}
                        />
                      </div>
                    ))}

                    {sortedUploads.length > 0 && (
                      <div className="space-y-4 border-t border-white/10 pt-4">
                        {sortedUploads.map((fu) => (
                          <div key={fu.fieldKey} id={`field-${fu.fieldKey}`}>
                            <FileUploadField
                              field={fu}
                              files={files[fu.fieldKey] ?? []}
                              onChange={(fileList) => {
                                setFiles((prev) => ({ ...prev, [fu.fieldKey]: fileList }))
                                if (errors[fu.fieldKey])
                                  setErrors((prev) => { const n = { ...prev }; delete n[fu.fieldKey]; return n })
                              }}
                              error={errors[fu.fieldKey]}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="px-5 py-5"
                  >
                    <h2 className="mb-4 text-lg font-semibold text-white">Payment Summary</h2>

                    <div className="rounded-xl border border-white/10 bg-white/3 p-4">
                      <p className="font-medium text-white">{service.title}</p>
                      <p className="mt-0.5 text-sm text-white/50">{service.subtitle}</p>

                      <div className="mt-4 flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-white">
                          ₹{finalPrice.toLocaleString('en-IN')}
                        </span>
                        {service.isInSale && (
                          <span className="text-sm text-white/35 line-through">
                            ₹{service.price.toLocaleString('en-IN')}
                          </span>
                        )}
                        {service.isInSale && (
                          <span className="rounded-full bg-brand-purple/20 px-2 py-0.5 text-xs font-medium text-brand-purple">
                            {service.discountPercentage}% off
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-white/40">
                      You will be redirected to Razorpay&apos;s secure payment gateway. After successful
                      payment, your booking will be confirmed.
                    </p>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="flex flex-col items-center px-5 py-10 text-center"
                  >
                    {orderStatus === 'success' ? (
                      <>
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        >
                          <CheckCircle2 size={64} className="text-emerald-400" />
                        </motion.div>
                        <h2 className="mt-5 text-2xl font-bold text-white">Booking Confirmed!</h2>
                        <p className="mt-2 max-w-xs text-sm text-white/55">
                          Thank you for booking <span className="text-white">{service.title}</span>.
                          We&apos;ll be in touch shortly to coordinate your session.
                        </p>
                        <Button className="mt-8 w-full" onClick={onClose}>
                          Close
                        </Button>
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        >
                          <XCircle size={64} className="text-red-400" />
                        </motion.div>
                        <h2 className="mt-5 text-2xl font-bold text-white">Payment Unsuccessful</h2>
                        <p className="mt-2 max-w-xs text-sm text-white/55">
                          Your payment could not be completed. No charges were made.
                        </p>
                        <div className="mt-8 flex w-full flex-col gap-3">
                          <Button
                            onClick={() => {
                              setOrderStatus(null)
                              goTo(2)
                            }}
                          >
                            Try Again
                          </Button>
                          <Button variant="ghost" onClick={onClose}>
                            Close
                          </Button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer actions */}
            {step !== 3 && (
              <div className="flex-shrink-0 border-t border-white/10 px-5 py-4">
                {step === 1 && (
                  <div className="flex gap-3">
                    <Button variant="ghost" className="flex-1" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleContinue}>
                      Continue to Payment
                    </Button>
                  </div>
                )}
                {step === 2 && (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => goTo(1)}
                      disabled={paying}
                    >
                      Back
                    </Button>
                    <Button className="flex-1" onClick={handlePay} disabled={paying}>
                      {paying ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          Processing…
                        </span>
                      ) : (
                        `Pay ₹${finalPrice.toLocaleString('en-IN')}`
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
