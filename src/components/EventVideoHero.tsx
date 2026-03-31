'use client'

import { useState, useRef } from 'react'
import { TicketModal } from './TicketModal'

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?#&\s]+)/,
    /youtube\.com\/watch\?v=([^?#&\s]+)/,
    /youtube\.com\/embed\/([^?#&\s]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

interface EventVideoHeroProps {
  title: string
  videoUrl: string
  videoType: 'youtube' | 'vimeo' | 'direct'
  date: Date
  timeStart?: string | null
  timeEnd?: string | null
  location?: string | null
  ticketUrl?: string | null
  slug?: string | null
  description?: string | null
  content?: string | null
}

export default function EventVideoHero({
  title,
  videoUrl,
  videoType,
  date,
  timeStart,
  timeEnd,
  location,
  ticketUrl,
  slug,
  description,
  content,
}: EventVideoHeroProps) {
  const [muted, setMuted] = useState(true)
  const [ticketOpen, setTicketOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const hasInfo = Boolean(description || content)

  const toggleMute = () => {
    if (videoType === 'youtube' && iframeRef.current?.contentWindow) {
      const func = muted ? 'unMute' : 'mute'
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }),
        'https://www.youtube-nocookie.com'
      )
    }
    if (videoType === 'direct' && videoRef.current) {
      videoRef.current.muted = !muted
    }
    setMuted((prev) => !prev)
  }

  const formattedDate = new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)

  const videoId = videoType === 'youtube' ? getYouTubeId(videoUrl) : null
  const embedSrc = videoId
    ? [
        `https://www.youtube-nocookie.com/embed/${videoId}`,
        '?controls=0',
        '&autoplay=1',
        '&mute=1',
        '&modestbranding=1',
        '&rel=0',
        '&iv_load_policy=3',
        '&disablekb=1',
        '&fs=0',
        '&playsinline=1',
        `&loop=1&playlist=${videoId}`,
        '&enablejsapi=1',
      ].join('')
    : null

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-stone-950 group">

      {/* ── VIDEO ── */}
      {videoType === 'youtube' && embedSrc && (
        <iframe
          ref={iframeRef}
          src={embedSrc}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none z-0"
          allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={title}
        />
      )}
      {videoType === 'direct' && (
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* ── BOVEN: gradient + titel ── */}
      <div className="video-overlay-top absolute top-0 left-0 right-0 z-10 h-[45%] pointer-events-none">
        <div className="pt-7 px-8 md:px-12">
          <p className="section-label mb-1.5 [text-shadow:0_1px_8px_rgba(0,0,0,1)]">
            Evenement
          </p>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white leading-tight max-w-3xl
                         [text-shadow:0_2px_8px_rgba(0,0,0,1),0_4px_24px_rgba(0,0,0,0.85),0_8px_48px_rgba(0,0,0,0.6)]">
            {title}
          </h2>
        </div>
      </div>

      {/* ── ONDER: gradient + datum/knoppen ── */}
      <div className="video-overlay-bottom absolute bottom-0 left-0 right-0 z-10 h-2/5 flex flex-col justify-end">
        <div className="pb-6 px-8 md:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">

          {/* Datum · Tijd · Locatie */}
          <div className="flex flex-wrap gap-5">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-0.5">Datum</p>
              <p className="text-white text-sm capitalize">{formattedDate}</p>
            </div>
            {(timeStart || timeEnd) && (
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-0.5">Tijd</p>
                <p className="text-amber-400 text-sm">
                  {timeStart}
                  {timeEnd && <span className="text-stone-400"> – {timeEnd}</span>}
                </p>
              </div>
            )}
            {location && (
              <div className="hidden md:block">
                <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-0.5">Locatie</p>
                <p className="text-white text-sm">{location}</p>
              </div>
            )}
          </div>

          {/* Knoppen + geluid */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 bg-black/50 hover:bg-black/70 text-white
                         text-xs px-3 py-2 rounded-full border border-white/10
                         hover:border-amber-500/40 transition-all duration-200 backdrop-blur-sm"
              aria-label={muted ? 'Geluid inschakelen' : 'Geluid uitschakelen'}
            >
              {muted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                  <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                </svg>
              )}
              <span>{muted ? 'Geluid aan' : 'Geluid uit'}</span>
            </button>

            {ticketUrl && (
              <button
                type="button"
                onClick={() => setTicketOpen(true)}
                className="btn-gold py-2 px-5 text-xs"
              >
                Kaarten bestellen
              </button>
            )}
            {hasInfo && (
              <button
                type="button"
                onClick={() => setPanelOpen(true)}
                className="btn-ghost py-2 px-5 text-xs"
              >
                Meer info
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── HOVER-LABEL (rechts) ── */}
      {hasInfo && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          aria-label="Lees beschrijving"
          className={[
            'absolute right-0 top-1/2 -translate-y-1/2 z-20',
            'flex flex-col items-center gap-2 py-5 px-3',
            'bg-stone-950/80 backdrop-blur-sm',
            'border-l border-t border-b border-amber-600/30',
            'text-amber-400 transition-all duration-300 ease-out',
            // Verborgen buiten hover: schuift in vanuit rechts
            panelOpen
              ? 'opacity-0 pointer-events-none translate-x-full'
              : 'opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-0',
          ].join(' ')}
        >
          {/* Verticale tekst */}
          <span className="text-[10px] tracking-[0.25em] uppercase font-light text-amber-400/80 whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
            Over dit evenement
          </span>
          {/* Pijltje naar links */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 rotate-180 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* ── INFOPANEEL (schuift in van rechts) ── */}
      {hasInfo && (
        <>
          {/* Klik-buiten overlay */}
          {panelOpen && (
            <div
              aria-hidden="true"
              className="absolute inset-0 z-20"
              onClick={() => setPanelOpen(false)}
            />
          )}

          <div
            role="region"
            aria-label="Evenement omschrijving"
            className={[
              'absolute top-[10%] bottom-[14%] right-0 z-30',
              'w-full sm:w-[580px]',
              'flex flex-col',
              'bg-stone-950/85 backdrop-blur-md',
              'border border-stone-700/40 border-r-0',
              'transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
              panelOpen ? 'translate-x-0' : 'translate-x-full',
            ].join(' ')}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800/60 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-1 h-4 bg-amber-500 shrink-0" aria-hidden="true" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-amber-500 font-light truncate">
                  Over dit evenement
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Sluit omschrijving"
                className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-white border border-stone-700/40 hover:border-stone-500 transition-colors duration-200 shrink-0 ml-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>

            {/* Panel inhoud — scrollbaar */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              <h3 className="font-serif text-2xl text-white leading-snug tracking-tight">{title}</h3>

              {description && (
                <>
                  <div className="w-8 h-px bg-amber-500/60" aria-hidden="true" />
                  <p className="text-[13px] font-semibold text-stone-200 leading-relaxed tracking-wide">{description}</p>
                </>
              )}

              {content && (
                <div
                  className="prose prose-invert prose-stone max-w-none
                    prose-p:text-stone-400 prose-p:leading-relaxed prose-p:text-[13px] prose-p:font-normal prose-p:mt-0
                    prose-headings:font-serif prose-headings:text-white prose-headings:text-sm prose-headings:mt-4
                    prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-stone-300 prose-strong:font-semibold
                    prose-li:text-stone-400 prose-li:text-[13px]
                    prose-em:text-stone-400 prose-em:not-italic prose-em:text-[12px]"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}

            </div>
          </div>
        </>
      )}

      {/* Ticket modal */}
      {ticketUrl && (
        <TicketModal
          isOpen={ticketOpen}
          onClose={() => setTicketOpen(false)}
          ticketUrl={ticketUrl}
          eventTitle={title}
        />
      )}
    </div>
  )
}
