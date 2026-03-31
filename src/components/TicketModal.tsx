'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

interface TicketModalProps {
  isOpen: boolean
  onClose: () => void
  ticketUrl: string
  eventTitle: string
}

export function TicketModal({ isOpen, onClose, ticketUrl, eventTitle }: TicketModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) setIframeLoaded(false)
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    const t = setTimeout(() => closeButtonRef.current?.focus(), 50)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(t)
    }
  }, [isOpen, handleKeyDown])

  if (!mounted || !isOpen) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal venster — mobiel: fullscreen, desktop: gecentreerd */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Kaarten bestellen: ${eventTitle}`}
        className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[9999] flex flex-col w-full h-full md:w-[90vw] md:max-w-[900px] md:h-[85vh] md:max-h-[800px] bg-stone-950 border border-stone-800/50 shadow-2xl"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-stone-800/50 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-1 h-5 bg-amber-500 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.25em] uppercase text-amber-500 font-light leading-none mb-1">
                Kaarten bestellen
              </p>
              <p className="text-sm text-stone-200 font-serif truncate">{eventTitle}</p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Sluit"
            className="w-9 h-9 border border-stone-700/50 bg-transparent text-stone-400 hover:text-white hover:border-stone-500 transition-colors duration-200 flex items-center justify-center shrink-0 ml-4 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </header>

        {/* Content: laadscherm + iframe gestapeld */}
        <div className="flex-1 relative overflow-hidden">

          {/* Gebrande laadscherm — verdwijnt zodra iframe klaar is */}
          <div
            aria-hidden="true"
            className={[
              'absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-stone-950 transition-opacity duration-500',
              iframeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100',
            ].join(' ')}
          >
            <span className="block w-12 h-px bg-amber-500/50" />

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 text-amber-500/40" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
            </svg>

            <div className="text-center">
              <p className="text-stone-300 text-sm font-serif mb-1">Ticketshop laden</p>
              <p className="text-stone-600 text-xs tracking-wide">{eventTitle}</p>
            </div>

            {/* Pulserende puntjes */}
            <div className="flex gap-1.5" role="status" aria-label="Laden">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 animate-[ticketPulse_1.2s_ease-in-out_0s_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 animate-[ticketPulse_1.2s_ease-in-out_0.2s_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 animate-[ticketPulse_1.2s_ease-in-out_0.4s_infinite]" />
            </div>

            <span className="block w-12 h-px bg-amber-500/50" />
          </div>

          {/* iframe */}
          <iframe
            src={ticketUrl}
            title={`Kaarten voor ${eventTitle}`}
            className="absolute inset-0 w-full h-full border-0 block"
            allow="payment; clipboard-write"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between px-5 py-3 border-t border-stone-800/50 shrink-0 bg-stone-950">
          <p className="text-[10px] text-stone-600 tracking-wide">Beveiligde afhandeling via WeTicket</p>
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-stone-500 hover:text-amber-400 tracking-wide transition-colors duration-200 flex items-center gap-1.5"
          >
            Openen in nieuw tabblad
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3" aria-hidden="true">
              <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
            </svg>
          </a>
        </footer>
      </div>

      {/* Keyframe voor laadpuntjes — enkel de animatie, geen inline styles */}
      <style>{`@keyframes ticketPulse{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}`}</style>
    </>,
    document.body
  )
}
