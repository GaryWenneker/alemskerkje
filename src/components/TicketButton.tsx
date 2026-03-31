'use client'

import { useState } from 'react'
import { TicketModal } from './TicketModal'

interface TicketButtonProps {
  ticketUrl: string
  eventTitle: string
}

export function TicketButton({ ticketUrl, eventTitle }: TicketButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-gold inline-flex items-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 shrink-0"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M13 3a1 1 0 0 1 1 1v1h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a1 1 0 0 1 2 0v1h4V4a1 1 0 0 1 1-1ZM5 9a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H5Z"
            clipRule="evenodd"
          />
        </svg>
        Kaarten bestellen
      </button>

      <TicketModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ticketUrl={ticketUrl}
        eventTitle={eventTitle}
      />
    </>
  )
}
