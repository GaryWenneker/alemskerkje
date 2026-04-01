'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export interface EventCardProps {
  id: number
  title: string
  category: string | null
  categoryLabel: string | null
  description: string | null
  content: string | null
  timeStart: string | null
  timeEnd: string | null
  formattedDate: string
  day: string
  month: string
  weekday: string
  img: string
  videoId: string | null
  hasVideo: boolean
  /** 'card' = grid-blokje met foto, 'list' = rij in afgelopen-overzicht */
  variant: 'card' | 'list'
}

declare global {
  interface Window {
    YT: { Player: new (...args: unknown[]) => YTPlayer }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YTPlayer {
  mute: () => void
  unMute: () => void
  setVolume: (v: number) => void
  playVideo: () => void
  destroy: () => void
}

// Categorie → kleur
function catColors(category: string | null) {
  switch (category) {
    case 'concert':         return { badge: 'bg-purple-500',  overlay: 'bg-purple-700' }
    case 'yoga':            return { badge: 'bg-emerald-500', overlay: 'bg-emerald-600' }
    case 'huwelijk':        return { badge: 'bg-rose-500',    overlay: 'bg-rose-700' }
    case 'tentoonstelling': return { badge: 'bg-amber-500',   overlay: 'bg-amber-600' }
    case 'theater':         return { badge: 'bg-red-500',     overlay: 'bg-red-700' }
    case 'film':            return { badge: 'bg-blue-500',    overlay: 'bg-blue-800' }
    case 'lezing':          return { badge: 'bg-sky-500',     overlay: 'bg-sky-700' }
    default:                return { badge: 'bg-stone-500',   overlay: 'bg-stone-900' }
  }
}

export default function EventCard({
  id,
  title,
  category,
  categoryLabel,
  description,
  content,
  timeStart,
  timeEnd,
  formattedDate,
  day,
  month,
  weekday,
  img,
  videoId,
  hasVideo,
  variant,
}: EventCardProps) {
  const playerRef = useRef<YTPlayer | null>(null)
  const [expanded,    setExpanded]    = useState(false)
  const [animIn,      setAnimIn]      = useState(false)
  const [muted,       setMuted]       = useState(true)
  const [playerReady, setPlayerReady] = useState(false)

  const playerId = `yt-event-${id}`
  const { badge: badgeColor, overlay: overlayColor } = catColors(category)

  /* ── YouTube: laden zodra overlay opengaat ── */
  useEffect(() => {
    if (!expanded || !videoId) return

    const initPlayer = () => {
      if (playerRef.current) return
      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: 1, mute: 1, loop: 1, playlist: videoId,
          controls: 0, showinfo: 0, rel: 0, modestbranding: 1,
          iv_load_type: 3, disablekb: 1, enablejsapi: 1, playsinline: 1,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.playVideo()
            setPlayerReady(true)
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => { prev?.(); initPlayer() }
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement('script')
        s.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(s)
      }
    }

    return () => {
      playerRef.current?.destroy()
      playerRef.current = null
      setPlayerReady(false)
    }
  }, [expanded, videoId, playerId])

  /* ── Expand / Collapse ── */
  const handleOpen = () => {
    setExpanded(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)))
  }
  const handleClose = () => {
    setAnimIn(false)
    setTimeout(() => setExpanded(false), 400)
  }

  /* ── Escape + scroll-lock ── */
  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [expanded]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Mute-toggle ── */
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!playerRef.current) return
    if (muted) { playerRef.current.unMute(); playerRef.current.setVolume(75); setMuted(false) }
    else        { playerRef.current.mute(); setMuted(true) }
  }

  /* ── Mute-knop ── */
  const MuteBtn = () =>
    videoId && playerReady ? (
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Geluid aanzetten' : 'Geluid uitzetten'}
        className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm border
                    transition-all duration-200
                    ${muted
                      ? 'bg-black/60 border-white/20 hover:border-white/40 hover:bg-black/80'
                      : 'bg-amber-500/20 border-amber-400/50 hover:bg-amber-500/30'}`}
      >
        {muted ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
               className="w-4 h-4 text-stone-300" aria-hidden="true">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
               className="w-4 h-4 text-amber-400" aria-hidden="true">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
            <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.061Z" />
          </svg>
        )}
        <span className={`text-xs ${muted ? 'text-stone-400' : 'text-amber-300'}`}>
          {muted ? 'Geluid aan' : 'Dempen'}
        </span>
      </button>
    ) : null

  /* ── Overlay (gedeeld voor card en list) ── */
  const Overlay = () => (
    <div
      className={`fixed inset-0 z-[99] cursor-pointer
                  transition-opacity duration-400
                  ${animIn ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Achtergrond: video of foto */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {videoId ? (
          <div id={playerId} className="yt-cover-iframe" />
        ) : (
          <img
            src={img}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.60]"
          />
        )}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Gradienten */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-stone-950/30 z-10" />

      {/* Knoppen rechtsboven */}
      <div
        className="absolute top-6 right-6 z-30 flex items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <MuteBtn />
        <button
          onClick={handleClose}
          aria-label="Sluiten"
          className="flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm
                     bg-black/60 border border-white/20
                     hover:border-white/40 hover:bg-black/80
                     transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
               className="w-4 h-4 text-stone-300" aria-hidden="true">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-stone-400">Sluiten</span>
        </button>
      </div>

      {/* Inhoud linksonder */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-8 md:px-16 pb-14 md:pb-20 z-20">
        {/* Categorie */}
        <div className={`transition-all duration-500 ease-out
                        ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {category && (
            <span className="inline-block text-[11px] tracking-[0.3em] uppercase
                             text-amber-400 border border-amber-500/40 px-4 py-1.5 mb-5">
              {categoryLabel ?? category}
            </span>
          )}
        </div>

        {/* Titel */}
        <div className={`transition-all duration-[600ms] ease-out delay-[80ms]
                        ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight
                         mb-6 max-w-4xl [text-shadow:0_4px_24px_rgba(0,0,0,0.7)]">
            {title}
          </h2>
        </div>

        {/* Volledige tekst */}
        {(content || description) && (
          <div className={`transition-all duration-[600ms] ease-out delay-[180ms]
                          ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content ? (
              <div
                className="event-body prose prose-invert prose-base md:prose-lg max-w-2xl mb-10
                           prose-headings:text-white prose-headings:font-serif
                           prose-strong:text-white prose-a:text-amber-400 prose-a:no-underline
                           prose-li:text-stone-300 prose-blockquote:text-stone-400
                           prose-blockquote:border-amber-600/50"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Datum / tijd */}
        <div className={`flex flex-wrap items-center gap-6
                        transition-all duration-500 ease-out delay-[100ms]
                        ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <p className="text-stone-500 text-[10px] tracking-[0.2em] uppercase mb-1">Datum</p>
            <p className="text-white text-sm md:text-base capitalize">{formattedDate}</p>
          </div>
          {(timeStart || timeEnd) && (
            <>
              <div className="w-px h-8 bg-stone-700" />
              <div>
                <p className="text-stone-500 text-[10px] tracking-[0.2em] uppercase mb-1">Aanvang</p>
                <p className="text-amber-400 text-sm md:text-base font-medium">
                  {timeStart}{timeEnd && ` – ${timeEnd}`}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Reserveer-knop */}
        <div className={`pointer-events-auto mt-8
                        transition-all duration-500 ease-out delay-[200ms]
                        ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link
            href="/contact"
            onClick={(e) => e.stopPropagation()}
            className="inline-block border border-amber-500 hover:bg-amber-600/20
                       text-amber-400 hover:text-amber-300 px-8 py-3
                       text-xs tracking-[0.25em] uppercase transition-all duration-200"
          >
            Reserveer nu
          </Link>
        </div>
      </div>
    </div>
  )

  /* ════════ RENDER ════════ */
  return (
    <>
      {variant === 'card' ? (
        /* ── GRID-BLOKJE ── */
        <div
          className="group relative h-[280px] overflow-hidden bg-stone-950 cursor-pointer"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
          aria-label={`${title} — klik om meer te zien`}
        >
          {/* Kleur-accent lijn bovenaan */}
          <div className={`absolute top-0 left-0 right-0 h-[3px] z-10 ${badgeColor}
                          origin-left scale-x-0 group-hover:scale-x-100
                          transition-transform duration-500 ease-out`} />

          {/* Foto */}
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700
                       group-hover:scale-105 brightness-[0.50] group-hover:brightness-[0.65]"
          />

          {/* Categorie-kleur overlay */}
          <div className={`absolute inset-0 opacity-15 mix-blend-color ${overlayColor}`} />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

          {/* Datum badge */}
          <div className="absolute top-4 left-4 text-center bg-stone-950/80 backdrop-blur-sm
                          border border-amber-400/50 group-hover:border-amber-400
                          transition-colors duration-300 px-3 py-2.5 min-w-[58px]">
            <p className="text-amber-400 text-3xl tabular-nums leading-none">{day}</p>
            <p className="text-amber-300/70 text-[10px] tracking-[0.2em] uppercase mt-1">{month}</p>
          </div>

          {/* Categorie pill */}
          {category && (
            <div className={`absolute top-4 right-4 ${badgeColor} px-2.5 py-1`}>
              <span className="text-white text-[10px] tracking-[0.15em] uppercase font-medium">
                {categoryLabel ?? category}
              </span>
            </div>
          )}

          {/* Video-badge */}
          {hasVideo && (
            <div className="absolute top-14 right-4 bg-black/60 backdrop-blur-sm
                            border border-white/10 rounded-full p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                   className="w-3 h-3 text-amber-400" aria-hidden="true">
                <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
              </svg>
            </div>
          )}

          {/* Inhoud onderaan */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="font-serif text-xl text-white leading-snug mb-3
                           group-hover:text-amber-200 transition-colors duration-300
                           [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
              {title}
            </h2>
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span className="capitalize">{weekday}</span>
                {timeStart && (
                  <>
                    <span className="text-stone-700">·</span>
                    <span className="text-amber-400 font-medium">
                      {timeStart}{timeEnd && ` – ${timeEnd}`}
                    </span>
                  </>
                )}
              </div>
              <Link
                href="/contact"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] tracking-[0.15em] uppercase border border-amber-600/50
                           hover:border-amber-400 hover:bg-amber-600/10 text-amber-400
                           px-2.5 py-1 transition-all duration-200"
              >
                Reserveer
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* ── LIJSTRIJ (afgelopen) ── */
        <div
          className="group flex items-center gap-5 py-4 px-2
                     hover:bg-stone-900/40 transition-all duration-200 -mx-2 cursor-pointer"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
          aria-label={`${title} — klik om meer te zien`}
        >
          {/* Categorie-kleur dot */}
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${badgeColor} opacity-60`} />

          {/* Datum */}
          <div className="text-center shrink-0 w-10">
            <p className="text-lg tabular-nums text-stone-500 leading-none">{day}</p>
            <p className="text-[9px] tracking-widest uppercase text-stone-600">{month}</p>
          </div>

          {/* Titel + categorie */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-base text-stone-400 group-hover:text-stone-200
                           transition-colors truncate">
              {title}
            </h3>
            {category && (
              <p className="text-[10px] tracking-widest uppercase text-stone-600 mt-0.5">
                {categoryLabel ?? category}
              </p>
            )}
          </div>

          {/* Tijd */}
          {timeStart && (
            <p className="text-stone-600 text-xs shrink-0">{timeStart}</p>
          )}
        </div>
      )}

      {/* Fullscreen overlay */}
      {expanded && <Overlay />}
    </>
  )
}
