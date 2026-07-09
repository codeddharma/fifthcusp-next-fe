'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js'
import { getCountryList, detectDefaultCountry, type CountryCode } from '@/lib/phone'
import type { FormInput } from '@/types/service.type'

export type FormFieldValue = string | number | string[]

interface Props {
  field: FormInput
  value: FormFieldValue | undefined
  onChange: (val: FormFieldValue) => void
  error?: string
}

export default function DynamicFormField({ field, value, onChange, error }: Props) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const labelEl = (
    <div className="mb-1.5 flex items-center gap-1.5">
      <label className="text-sm font-medium text-white/80">
        {field.label}
        {field.isRequired && <span className="ml-1 text-brand-purple">*</span>}
      </label>
      {field.tooltip && (
        <div className="relative">
          <button
            type="button"
            className="flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[10px] text-white/40 hover:border-brand-purple hover:text-brand-purple"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            i
          </button>
          {tooltipVisible && (
            <div className="absolute left-5 top-0 z-50 w-52 rounded-lg border border-white/10 bg-[#1a1038] p-2.5 text-xs leading-relaxed text-white/70 shadow-xl">
              {field.tooltip}
            </div>
          )}
        </div>
      )}
    </div>
  )

  const inputCls = `w-full rounded-xl border bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand-purple focus:bg-white/8 ${
    error ? 'border-red-500/60' : 'border-white/10'
  }`

  const selectCls = `w-full rounded-xl border bg-[#1a1038] px-3 py-2.5 text-sm text-white outline-none transition focus:border-brand-purple ${
    error ? 'border-red-500/60' : 'border-white/10'
  }`

  if (field.type === 'text' || field.type === 'email') {
    return (
      <div>
        {labelEl}
        <input
          type={field.type}
          className={inputCls}
          placeholder={field.placeholder}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  if (field.type === 'number') {
    return (
      <div>
        {labelEl}
        <input
          type="number"
          className={inputCls}
          placeholder={field.placeholder}
          value={value ?? ''}
          min={field.validation?.min}
          max={field.validation?.max}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  if (field.type === 'phonenumber') {
    return <PhoneField labelEl={labelEl} value={value} onChange={onChange} error={error} />
  }

  if (field.type === 'textarea') {
    return (
      <div>
        {labelEl}
        <textarea
          className={`${inputCls} min-h-[90px] resize-y`}
          placeholder={field.placeholder}
          value={value ?? ''}
          maxLength={field.validation?.maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.validation?.maxLength && (
          <p className="mt-0.5 text-right text-xs text-white/30">
            {String(value ?? '').length}/{field.validation.maxLength}
          </p>
        )}
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  if (field.type === 'dropdown') {
    return (
      <div>
        {labelEl}
        <select
          className={selectCls}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  if (field.type === 'radio') {
    return (
      <div>
        {labelEl}
        <div className="flex flex-wrap gap-3">
          {field.options.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm transition ${
                value === opt
                  ? 'border-brand-purple bg-brand-purple/10 text-white'
                  : 'border-white/10 text-white/60 hover:border-white/30'
              }`}
            >
              <input
                type="radio"
                className="hidden"
                name={field.fieldKey}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  if (field.type === 'date') {
    return (
      <div>
        {labelEl}
        <input
          type="date"
          className={inputCls}
          value={value ?? ''}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => onChange(e.target.value)}
          style={{ colorScheme: 'dark' }}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  if (field.type === 'multiSelect') {
    const selected: string[] = Array.isArray(value) ? value : []
    const toggle = (opt: string) => {
      if (selected.includes(opt)) onChange(selected.filter((v) => v !== opt))
      else onChange([...selected, opt])
    }
    return (
      <div>
        {labelEl}
        <div className="flex flex-wrap gap-3">
          {field.options.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm transition ${
                selected.includes(opt)
                  ? 'border-brand-purple bg-brand-purple/10 text-white'
                  : 'border-white/10 text-white/60 hover:border-white/30'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// Phone field with country-code selector. Stores the value as E.164
// (e.g. "+919876543210"); the length limit / validity follows the chosen
// country. Kept as its own component so its state resets on remount.
// ---------------------------------------------------------------------------
interface PhoneFieldProps {
  labelEl: ReactNode
  value: FormFieldValue | undefined
  onChange: (val: FormFieldValue) => void
  error?: string
}

function PhoneField({ labelEl, value, onChange, error }: PhoneFieldProps) {
  const countries = useMemo(() => getCountryList(), [])

  // Seed from an existing value (if any), else auto-detect the country. Runs once.
  const initial = useMemo(() => {
    const raw = String(value ?? '')
    if (raw) {
      try {
        const parsed = parsePhoneNumber(raw)
        if (parsed?.country) return { country: parsed.country, national: parsed.nationalNumber }
      } catch {
        /* fall through to defaults */
      }
    }
    return { country: detectDefaultCountry(), national: raw.replace(/\D/g, '') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [country, setCountry] = useState<CountryCode>(initial.country)
  const [national, setNational] = useState<string>(initial.national)

  const emit = (c: CountryCode, n: string) => {
    onChange(n ? `+${getCountryCallingCode(c)}${n}` : '')
  }

  return (
    <div>
      {labelEl}
      <div
        className={`flex overflow-hidden rounded-xl border bg-white/5 transition focus-within:border-brand-purple ${
          error ? 'border-red-500/60' : 'border-white/10'
        }`}
      >
        <select
          aria-label="Country code"
          className="max-w-[42%] shrink-0 border-r border-white/10 bg-[#1a1038] px-2 py-2.5 text-sm text-white/70 outline-none"
          value={country}
          onChange={(e) => {
            const c = e.target.value as CountryCode
            setCountry(c)
            emit(c, national)
          }}
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} +{c.callingCode}  {c.name}
            </option>
          ))}
        </select>
        <input
          type="tel"
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none"
          placeholder="98765 43210"
          value={national}
          maxLength={15}
          onChange={(e) => {
            const n = e.target.value.replace(/\D/g, '')
            setNational(n)
            emit(country, n)
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
