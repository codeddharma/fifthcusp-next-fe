'use client'

import { useState } from 'react'
import type { FormInput } from '@/types/service.type'

interface Props {
  field: FormInput
  value: any
  onChange: (val: any) => void
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
    return (
      <div>
        {labelEl}
        <div
          className={`flex overflow-hidden rounded-xl border bg-white/5 transition focus-within:border-brand-purple ${
            error ? 'border-red-500/60' : 'border-white/10'
          }`}
        >
          <span className="flex items-center border-r border-white/10 bg-white/5 px-3 text-sm text-white/50">
            +91
          </span>
          <input
            type="tel"
            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none"
            placeholder="98765 43210"
            value={value ?? ''}
            maxLength={10}
            onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
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
            {(value ?? '').length}/{field.validation.maxLength}
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
