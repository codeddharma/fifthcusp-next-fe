'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle2, Clock, XCircle, Loader2, Video, CalendarDays, ChevronRight } from 'lucide-react'
import {
  getBookingInfo,
  getAvailableSlots,
  bookSlot,
  type BookingInfo,
  type AvailableSlot,
  type BookedEvent,
} from '@/lib/api/consultationBooking.api'

type PageState = 'loading' | 'selecting' | 'confirming' | 'success' | 'already_booked' | 'expired' | 'error'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  })
}

function groupSlotsByDate(slots: AvailableSlot[]): Map<string, AvailableSlot[]> {
  const map = new Map<string, AvailableSlot[]>()
  for (const slot of slots) {
    const dateKey = new Date(slot.startTime).toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    if (!map.has(dateKey)) map.set(dateKey, [])
    map.get(dateKey)!.push(slot)
  }
  return map
}

export default function BookConsultationPage() {
  const params = useParams()
  const token = params.token as string

  const [pageState, setPageState] = useState<PageState>('loading')
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null)
  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [bookedEvent, setBookedEvent] = useState<BookedEvent | null>(null)
  const [isBooking, setIsBooking] = useState(false)

  const load = useCallback(async () => {
    try {
      const info = await getBookingInfo(token)
      setBookingInfo(info)

      if (info.status === 'booked') {
        setPageState('already_booked')
        return
      }
      if (info.status === 'expired') {
        setPageState('expired')
        return
      }

      const availableSlots = await getAvailableSlots(token)
      setSlots(availableSlots)
      setPageState('selecting')
    } catch (err: any) {
      const status = err?.response?.status
      if (status === 409) setPageState('already_booked')
      else if (status === 410) setPageState('expired')
      else setPageState('error')
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  const handleBook = async () => {
    if (!selectedSlot) return
    setIsBooking(true)
    try {
      const event = await bookSlot(token, selectedSlot.startTime)
      setBookedEvent(event)
      setPageState('success')
    } catch (err: any) {
      setIsBooking(false)
      setSelectedSlot(null)
      // Slot was taken between selection and confirm — refresh the list
      if (err?.response?.status === 409) {
        const fresh = await getAvailableSlots(token).catch(() => [])
        setSlots(fresh)
      }
    }
  }

  const groupedSlots = groupSlotsByDate(slots)
  const dateKeys = Array.from(groupedSlots.keys())

  // Auto-select first date
  useEffect(() => {
    if (pageState === 'selecting' && dateKeys.length > 0 && !selectedDate) {
      setSelectedDate(dateKeys[0])
    }
  }, [pageState, dateKeys, selectedDate])

  if (pageState === 'loading') {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    )
  }

  if (pageState === 'expired') {
    return (
      <StatusCard
        icon={<Clock size={48} className="text-yellow-500" />}
        title="Booking Link Expired"
        body="This booking link has expired. Please contact us to receive a new link."
      />
    )
  }

  if (pageState === 'already_booked') {
    return (
      <StatusCard
        icon={<CheckCircle2 size={48} className="text-green-500" />}
        title="Already Booked"
        body="You have already scheduled your consultation. Check your email for the Google Meet link."
      />
    )
  }

  if (pageState === 'error') {
    return (
      <StatusCard
        icon={<XCircle size={48} className="text-red-500" />}
        title="Invalid Link"
        body="This booking link is not valid. Please contact us for assistance."
      />
    )
  }

  if (pageState === 'success' && bookedEvent) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Consultation Confirmed!</h1>
          <p className="text-gray-500 mb-6">
            You&apos;re all set. Your session details are below.
          </p>
          <div className="bg-purple-50 rounded-xl p-5 text-left mb-6">
            <p className="text-xs text-gray-400 mb-1">Date &amp; Time</p>
            <p className="font-semibold text-gray-800 text-sm">
              {formatDate(bookedEvent.startTime)}<br />
              {formatTime(bookedEvent.startTime)} – {formatTime(bookedEvent.endTime)} IST
            </p>
          </div>
          <a
            href={bookedEvent.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold py-3 rounded-xl mb-4"
          >
            <Video size={18} /> Join Google Meet
          </a>
          <p className="text-xs text-gray-400">
            A confirmation email with this link has been sent to your inbox. Please save the date and time.
          </p>
        </div>
      </div>
    )
  }

  // Selecting state
  return (
    <div className="min-h-screen bg-[#f7f4ef] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule Your Consultation</h1>
          {bookingInfo && (
            <p className="text-gray-500 mt-1">
              {bookingInfo.serviceName} · {bookingInfo.durationMinutes} min · for {bookingInfo.customerName}
            </p>
          )}
        </div>

        {slots.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            <CalendarDays size={40} className="mx-auto mb-3 text-purple-300" />
            <p className="font-medium">No available slots at the moment.</p>
            <p className="text-sm mt-1">Please contact us to arrange a suitable time.</p>
          </div>
        ) : (
          <div className="flex gap-4 flex-col md:flex-row">
            {/* Date list */}
            <div className="md:w-52 flex-shrink-0">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">Select a Date</p>
              <div className="flex flex-col gap-2">
                {dateKeys.map((dateKey) => {
                  const slot = groupedSlots.get(dateKey)![0]
                  const isSelected = dateKey === selectedDate
                  return (
                    <button
                      key={dateKey}
                      onClick={() => { setSelectedDate(dateKey); setSelectedSlot(null) }}
                      className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {new Date(slot.startTime).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          timeZone: 'Asia/Kolkata',
                        })}
                      </span>
                      <ChevronRight size={14} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">Select a Time</p>
              {selectedDate && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {groupedSlots.get(selectedDate)!.map((slot) => {
                    const isSelected = selectedSlot?.startTime === slot.startTime
                    return (
                      <button
                        key={slot.startTime}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-purple-400'
                        }`}
                      >
                        {formatTime(slot.startTime)}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confirm button */}
        {selectedSlot && (
          <div className="mt-8 bg-white rounded-2xl shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Selected slot</p>
              <p className="font-semibold text-gray-900">
                {formatDate(selectedSlot.startTime)} · {formatTime(selectedSlot.startTime)} – {formatTime(selectedSlot.endTime)} IST
              </p>
            </div>
            <button
              onClick={handleBook}
              disabled={isBooking}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-60"
            >
              {isBooking ? <Loader2 size={16} className="animate-spin" /> : <Video size={16} />}
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function StatusCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-10 text-center">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
