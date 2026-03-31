'use client'

import { useRef, useState } from 'react'

interface ImageUploadProps {
  name?: string
  currentUrl?: string | null
  label?: string
}

export default function ImageUpload({
  name = 'image',
  currentUrl,
  label = 'Afbeelding',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)
  const [isDeleted, setIsDeleted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setIsDeleted(false)
  }

  function handleRemove() {
    setPreview(null)
    setIsDeleted(true)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {preview ? (
        <div className="relative w-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Voorbeeld"
            className="w-48 h-32 object-cover border border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 hover:bg-red-700"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          className="w-48 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-amber-400 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <span className="text-gray-400 text-xs text-center px-2">
            Klik om een afbeelding te kiezen
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        aria-label={label}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Signaal voor de server action: afbeelding expliciet verwijderd */}
      {isDeleted && (
        <input type="hidden" name="imageDeleted" value="true" />
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-xs text-amber-600 hover:text-amber-800 underline"
      >
        {preview ? 'Andere afbeelding kiezen' : 'Afbeelding kiezen'}
      </button>
    </div>
  )
}
