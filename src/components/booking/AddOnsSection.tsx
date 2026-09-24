'use client'

import { Check } from 'lucide-react'
import DynamicFormField, { type FormFieldValue } from '@/components/booking/DynamicFormField'
import FileUploadField from '@/components/booking/FileUploadField'
import type { AddOn } from '@/types/service.type'
import { formatINR } from '@/lib/utils/pricing'

/** Namespaced key/id for an add-on's nested field, matching the backend file convention. */
export const addOnFieldName = (addOnKey: string, fieldKey: string) =>
  `addon__${addOnKey}__${fieldKey}`

interface Props {
  addOns: AddOn[]
  selectedKeys: string[]
  onToggle: (key: string, selected: boolean) => void
  addOnForm: Record<string, Record<string, FormFieldValue>>
  addOnFiles: Record<string, Record<string, File[]>>
  onFieldChange: (addOnKey: string, fieldKey: string, value: FormFieldValue) => void
  onFileChange: (addOnKey: string, fieldKey: string, files: File[]) => void
  errors: Record<string, string>
}

export default function AddOnsSection({
  addOns,
  selectedKeys,
  onToggle,
  addOnForm,
  addOnFiles,
  onFieldChange,
  onFileChange,
  errors,
}: Props) {
  if (!addOns.length) return null

  return (
    <div className="space-y-3 border-t border-white/10 pt-4">
      <p className="text-sm font-medium text-white/80">Add-ons</p>
      {addOns.map((addOn) => {
        const selected = selectedKeys.includes(addOn.key)
        const inputs = [...(addOn.formInputs ?? [])].sort((a, b) => a.order - b.order)
        const uploads = [...(addOn.fileUploads ?? [])].sort((a, b) => a.order - b.order)

        return (
          <div
            key={addOn.key}
            className={`rounded-xl border transition ${
              selected ? 'border-brand-purple bg-brand-purple/5' : 'border-white/10 bg-white/3'
            }`}
          >
            <button
              type="button"
              onClick={() => onToggle(addOn.key, !selected)}
              className="flex w-full items-start gap-3 px-4 py-3 text-left"
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                  selected
                    ? 'border-brand-purple bg-brand-purple text-white'
                    : 'border-white/25 bg-transparent'
                }`}
              >
                {selected && <Check size={13} strokeWidth={3} />}
              </span>
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-white">{addOn.label}</span>
                  <span className="shrink-0 text-sm font-semibold text-brand-purple">
                    +₹{formatINR(addOn.price)}
                  </span>
                </span>
                {addOn.description && (
                  <span className="mt-0.5 block text-xs leading-relaxed text-white/50">
                    {addOn.description}
                  </span>
                )}
              </span>
            </button>

            {selected && (inputs.length > 0 || uploads.length > 0) && (
              <div className="space-y-4 border-t border-white/10 px-4 py-4">
                {inputs.map((field) => (
                  <div key={field.fieldKey} id={`field-${addOnFieldName(addOn.key, field.fieldKey)}`}>
                    <DynamicFormField
                      field={field}
                      value={addOnForm[addOn.key]?.[field.fieldKey]}
                      onChange={(val) => onFieldChange(addOn.key, field.fieldKey, val)}
                      error={errors[addOnFieldName(addOn.key, field.fieldKey)]}
                    />
                  </div>
                ))}
                {uploads.map((fu) => (
                  <div key={fu.fieldKey} id={`field-${addOnFieldName(addOn.key, fu.fieldKey)}`}>
                    <FileUploadField
                      field={fu}
                      files={addOnFiles[addOn.key]?.[fu.fieldKey] ?? []}
                      onChange={(files) => onFileChange(addOn.key, fu.fieldKey, files)}
                      error={errors[addOnFieldName(addOn.key, fu.fieldKey)]}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
