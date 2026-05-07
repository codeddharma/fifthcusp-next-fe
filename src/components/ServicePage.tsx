'use client'

import { useState, useEffect, useRef } from 'react'
import axios from '@/lib/api/axiosInstance'
import { toast } from 'sonner'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { initiateRazorpayPayment } from '@/lib/razorpayHandler'

interface Service {
  _id: string
  key?: string
  title?: string
  name?: string
  short?: string
  description?: string
  price: number
  tag?: string
  status?: string
  type?: string
}

interface FAQ {
  _id: string
  question: string
  answer: string
  status: string
}

interface BookingForm {
  name: string
  email: string
  phone: string
  gender: string
  dob: string
  tob: string
  isTobExact: string
  pob: string
  question1: string
  question2: string
  question3: string
}

interface ServicePageProps {
  title: string
  subtitle: string
  description: React.ReactNode
  servicesApi: string
  faqPage: string
  heroImage?: string
  accentColor?: string
}

const BOOKING_API = 'https://astro-5dcy.onrender.com/api/bookings'

const defaultForm: BookingForm = {
  name: '',
  email: '',
  phone: '',
  gender: '',
  dob: '',
  tob: '',
  isTobExact: '',
  pob: '',
  question1: '',
  question2: '',
  question3: '',
}

export default function ServicePage({
  title,
  subtitle,
  description,
  servicesApi,
  faqPage,
  accentColor = '#a855f7',
}: ServicePageProps) {
  const [services, setServices] = useState<Service[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [loadingServices, setLoadingServices] = useState(true)

  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [form, setForm] = useState<BookingForm>(defaultForm)
  const [processing, setProcessing] = useState(false)
  const [confirmationMsg, setConfirmationMsg] = useState('')

  const bookingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    axios
      .get(`${servicesApi}/all`)
      .then((res) => {
        const list = res.data?.services || res.data || []
        setServices(
          Array.isArray(list) ? list.filter((s: Service) => s.status === 'active' || !s.status) : []
        )
      })
      .catch(() => {})
      .finally(() => setLoadingServices(false))

    axios
      .get(`https://astro-5dcy.onrender.com/api/faqs/list?page=${encodeURIComponent(faqPage)}`)
      .then((res) => {
        if (res.data?.faqs) setFaqs(res.data.faqs.filter((f: FAQ) => f.status === 'active'))
      })
      .catch(() => {})
  }, [servicesApi, faqPage])

  const handleSelectService = (service: Service) => {
    setSelectedService(service)
    setStep(1)
    setTimeout(
      () => bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      100
    )
  }

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) {
      toast.error('Please fill all required fields')
      return
    }
    setStep(2)
  }

  const handlePay = async () => {
    if (!selectedService) return
    setProcessing(true)

    const storedUser =
      typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null
    const userId = storedUser?._id || 'guest'

    if (selectedService.price === 0) {
      await axios
        .post(`${BOOKING_API}/create`, {
          serviceKey: selectedService.key || selectedService._id,
          serviceTitle: selectedService.title || selectedService.name,
          ...form,
          paymentStatus: 'free',
          userId,
        })
        .catch(() => {})
      setConfirmationMsg(
        `Thank you ${form.name}! Your free reading request has been submitted. We'll email you at ${form.email} within 24-48 hours.`
      )
      setStep(3)
      setProcessing(false)
      return
    }

    await initiateRazorpayPayment({
      amount: selectedService.price * 100,
      userId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      description: selectedService.title || selectedService.name || 'Service',
      onSuccess: async (verifyResult) => {
        await axios
          .post(`${BOOKING_API}/create`, {
            serviceKey: selectedService.key || selectedService._id,
            serviceTitle: selectedService.title || selectedService.name,
            ...form,
            paymentStatus: 'paid',
            userId,
            paymentInfo: verifyResult,
          })
          .catch(() => {})
        setConfirmationMsg(
          `Thank you ${form.name}! Payment successful. We'll email your reading to ${form.email} within 24-48 hours.`
        )
        setStep(3)
        setProcessing(false)
      },
      onFailure: () => {
        toast.error('Payment failed. Please try again.')
        setProcessing(false)
      },
      onError: (msg) => {
        toast.error(`Payment error: ${msg}`)
        setProcessing(false)
      },
    })
  }

  const resetAll = () => {
    setStep(0)
    setSelectedService(null)
    setForm(defaultForm)
    setConfirmationMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inputCls =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors'

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'radial-gradient(circle at top, #0a0018, #1e003f)' }}
    >
      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-widest mb-4"
          style={{
            background: `linear-gradient(90deg, #fff, ${accentColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h1>
        <p className="text-purple-300 text-lg mb-8 italic">{subtitle}</p>
        <div className="text-gray-300 leading-relaxed space-y-4">{description}</div>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold tracking-widest text-center mb-3">SERVICES</h2>
        <p className="text-center text-gray-400 mb-10">
          Every report delves deep into a specific area of your life.
        </p>

        {loadingServices && <p className="text-center text-gray-500">Loading services…</p>}
        {!loadingServices && services.length === 0 && (
          <p className="text-center text-gray-500">No services available right now.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <motion.article
              key={s._id || idx}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col gap-4 hover:border-purple-500/40 transition-colors"
              whileHover={{ translateY: -4 }}
            >
              <div className="flex-1">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{
                    background: s.price === 0 ? 'rgba(0,255,255,0.15)' : 'rgba(255,0,255,0.15)',
                    color: s.price === 0 ? '#00ffff' : '#ff00ff',
                  }}
                >
                  {s.tag || (s.price === 0 ? 'Free' : 'Paid')}
                </span>
                <h3 className="font-bold text-lg mb-2">{s.title || s.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.short || s.description}</p>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-extrabold mb-4"
                  style={{ color: s.price === 0 ? '#00ffcc' : '#ff00ff' }}
                >
                  {s.price === 0 ? 'FREE' : `₹${s.price}`}
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <Link
                    href="/know-more"
                    className="flex-1 text-center px-3 py-2 rounded-lg border border-white/20 text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    KNOW MORE
                  </Link>
                  <Link
                    href="/experiences"
                    className="flex-1 text-center px-3 py-2 rounded-lg border border-white/20 text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    EXPERIENCE
                  </Link>
                  <button
                    onClick={() => handleSelectService(s)}
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                    style={{ background: accentColor }}
                  >
                    AFFIRM
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* BOOKING FLOW */}
      {step > 0 && (
        <section ref={bookingRef} className="max-w-2xl mx-auto px-6 pb-20">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Select Service</span>
              <span>Your Details</span>
              <span>Payment</span>
              <span>Done</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%`, background: accentColor }}
              />
            </div>
          </div>

          {/* Step 1 — Form */}
          {step === 1 && selectedService && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-bold mb-1">
                {selectedService.title || selectedService.name}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                {selectedService.price === 0 ? 'Free' : `₹${selectedService.price}`}
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  placeholder="Your Name *"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                />
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className={inputCls}
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Date of Birth</label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Time of Birth</label>
                    <input
                      type="time"
                      value={form.tob}
                      onChange={(e) => setForm({ ...form, tob: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>
                <select
                  value={form.isTobExact}
                  onChange={(e) => setForm({ ...form, isTobExact: e.target.value })}
                  className={inputCls}
                >
                  <option value="">Is birth time exact?</option>
                  <option value="yes">Yes, exact</option>
                  <option value="approximate">Approximate</option>
                  <option value="unknown">Unknown</option>
                </select>
                <input
                  placeholder="Place of Birth"
                  value={form.pob}
                  onChange={(e) => setForm({ ...form, pob: e.target.value })}
                  className={inputCls}
                />
                <input
                  placeholder="Question 1 (optional)"
                  value={form.question1}
                  onChange={(e) => setForm({ ...form, question1: e.target.value })}
                  className={inputCls}
                />
                <input
                  placeholder="Question 2 (optional)"
                  value={form.question2}
                  onChange={(e) => setForm({ ...form, question2: e.target.value })}
                  className={inputCls}
                />
                <input
                  placeholder="Question 3 (optional)"
                  value={form.question3}
                  onChange={(e) => setForm({ ...form, question3: e.target.value })}
                  className={inputCls}
                />
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-sm hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-bold tracking-wide transition-colors"
                    style={{ background: accentColor }}
                  >
                    PROCEED
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2 — Payment */}
          {step === 2 && selectedService && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center space-y-6">
              <h3 className="text-2xl font-bold">Review & Pay</h3>
              <div className="text-left space-y-2 text-sm text-gray-300">
                <p>
                  <span className="text-gray-500">Service:</span>{' '}
                  {selectedService.title || selectedService.name}
                </p>
                <p>
                  <span className="text-gray-500">Name:</span> {form.name}
                </p>
                <p>
                  <span className="text-gray-500">Email:</span> {form.email}
                </p>
                <p>
                  <span className="text-gray-500">Amount:</span>{' '}
                  {selectedService.price === 0 ? 'FREE' : `₹${selectedService.price}`}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl border border-white/20 text-sm hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePay}
                  disabled={processing}
                  className="flex-1 py-3 rounded-xl font-bold tracking-wide disabled:opacity-50 transition-colors"
                  style={{ background: accentColor }}
                >
                  {processing
                    ? 'Processing…'
                    : selectedService.price === 0
                      ? 'CONFIRM FREE'
                      : `PAY ₹${selectedService.price}`}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Success */}
          {step === 3 && (
            <div className="rounded-2xl border border-green-500/30 bg-green-900/20 p-8 text-center space-y-6">
              <div className="text-5xl">✅</div>
              <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
              <p className="text-gray-300">{confirmationMsg}</p>
              <button
                onClick={resetAll}
                className="px-8 py-3 rounded-xl font-bold"
                style={{ background: accentColor }}
              >
                Book Another
              </button>
            </div>
          )}
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold tracking-widest text-center mb-8">FAQs</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={faq._id} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className="text-xl text-purple-400">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-gray-400">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
