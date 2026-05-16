'use client'

import { useRef, useState } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import type { FileUpload } from '@/types/service.type'

interface Props {
  field: FileUpload
  files: File[]
  onChange: (files: File[]) => void
  error?: string
}

const MIME_MAP: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FileUploadField({ field, files, onChange, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [fieldError, setFieldError] = useState<string | null>(null)

  const acceptedMimes = field.acceptedTypes.map((t) => MIME_MAP[t] ?? `${t}/*`).join(',')
  const displayError = error ?? fieldError

  const validate = (incoming: File[]): string | null => {
    for (const file of incoming) {
      if (file.size > field.maxFileSizeMB * 1024 * 1024)
        return `"${file.name}" exceeds the ${field.maxFileSizeMB} MB limit.`
      const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
      if (!field.acceptedTypes.includes(ext))
        return `"${file.name}" is not an accepted file type. Accepted: ${field.acceptedTypes.join(', ')}`
    }
    return null
  }

  const addFiles = (incoming: File[]) => {
    setFieldError(null)
    const combined = [...files, ...incoming]
    if (combined.length > field.maxFiles) {
      setFieldError(`You can upload a maximum of ${field.maxFiles} file(s).`)
      return
    }
    const err = validate(incoming)
    if (err) {
      setFieldError(err)
      return
    }
    onChange(combined)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(Array.from(e.dataTransfer.files))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  const remove = (idx: number) => {
    setFieldError(null)
    onChange(files.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5">
        <label className="text-sm font-medium text-white/80">
          {field.label}
          {field.isRequired && <span className="ml-1 text-brand-purple">*</span>}
        </label>
        {field.tooltip && (
          <span className="text-xs text-white/40">({field.tooltip})</span>
        )}
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition ${
          dragOver
            ? 'border-brand-purple bg-brand-purple/10'
            : displayError
              ? 'border-red-500/60 bg-white/3'
              : 'border-white/15 bg-white/3 hover:border-brand-purple/50 hover:bg-white/5'
        }`}
      >
        <Upload size={20} className="text-white/40" />
        <p className="text-sm text-white/50">
          Drag & drop or <span className="text-brand-purple">browse</span>
        </p>
        <p className="text-xs text-white/30">
          {field.acceptedTypes.map((t) => t.toUpperCase()).join(', ')} · max {field.maxFileSizeMB} MB
          {field.maxFiles > 1 && ` · up to ${field.maxFiles} files`}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedMimes}
        multiple={field.maxFiles > 1}
        className="hidden"
        onChange={handleChange}
      />

      {files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            >
              <FileText size={14} className="shrink-0 text-brand-purple" />
              <span className="flex-1 truncate text-xs text-white/70">{file.name}</span>
              <span className="shrink-0 text-xs text-white/30">{formatBytes(file.size)}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(idx) }}
                className="shrink-0 rounded p-0.5 text-white/30 transition hover:text-red-400"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {displayError && <p className="mt-1 text-xs text-red-400">{displayError}</p>}
    </div>
  )
}
