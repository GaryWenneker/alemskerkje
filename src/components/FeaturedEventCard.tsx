'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface FeaturedEventCardProps {
  title: string
  category: string | null
  categoryLabel: string | null
  description: string | null
  content: string | null
  timeStart: string | null
  timeEnd: string | null
  formattedDate: string
  img: string
  videoId: string | null
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

export default function FeaturedEventCard({
  title,
  category,
  categoryLabel,
  description,
  content,
  timeStart,
  timeEnd,
  formattedDate,
  img,
  videoId,
}: FeaturedEventCardProps) {
  const playerRef = useRef<YTPlayer | null>(null)

  const [muted,       setMuted]       = useState(true)
  const [playerReady, setPlayerReady] = useState(false)
  const [expanded,    setExpanded]    = useState(false)
  const [animIn,      setAnimIn]      = useState(false)

  const playerId = videoId ? `yt-featured-${videoId}` : null

  /* ── YouTube API ── */
  useEffect(() => {
    if (!videoId || !playerId) return

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
          onReady: (e: { target: YTPlayer }) => { e.target.playVideo(); setPlayerReady(true) },
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

    return () => { playerRef.current?.destroy(); playerRef.current = null }
  }, [videoId, playerId])

  /* ── Expand ── */
  const handleOpen = () => {
    setExpanded(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)))
  }

  /* ── Collapse ── */
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

  /* ── Mute toggle ── */
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!playerRef.current) return
    if (muted) { playerRef.current.unMute(); playerRef.current.setVolume(75); setMuted(false) }
    else        { playerRef.current.mute(); setMuted(true) }
  }

  /* ── Mute knop ── */
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

  /* ════════════════════════════════════════════════════════
     KEY INSIGHT: de video-container zelf gaat van
     "absolute inset-0"  →  "fixed inset-0 z-[98]"
     De iframe WORDT NIET VERPLAATST en herstart dus NIET.
     CSS verandert alleen de positie/grootte van de container.
  ════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── KAART (altijd in de layout) ── */}
      <div className="group relative aspect-[21/9] bg-stone-900 overflow-visible">

        {/* Video/foto container
            - Normaal:   absolute inset-0  → clipped door de kaart
            - Expanded:  fixed  inset-0 z-[98] → vult het scherm
            Geen DOM-move, geen iframe-reload.                     */}
        <div
          className={`pointer-events-none overflow-hidden
            ${expanded
              ? 'fixed inset-0 z-[98]'
              : 'absolute inset-0'}`}
        >
          {videoId ? (
            <div id={playerId!} className="yt-cover-iframe" />
          ) : (
            <img
              src={img}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
            />
          )}
          {/* Extra donkere laag als expanded (video iets dimmer voor leesbaarheid) */}
          {expanded && (
            <div className="absolute inset-0 bg-black/30" />
          )}
        </div>

        {/* Kaart-gradients (alleen zichtbaar als NIET expanded) */}
        {!expanded && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 pointer-events-none" />
          </>
        )}

        {/* Klik-trigger (invisible, op de kaart — z-20 zodat hij boven de gradients zit) */}
        {!expanded && (
          <div
            className="absolute inset-0 z-20 cursor-pointer"
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
            aria-label={`${title} — klik om meer te zien`}
          />
        )}

        {/* Kaart-content (pointer-events-none zodat de klik-trigger werkt) */}
        {!expanded && (
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10 pointer-events-none">
            <div className="max-w-2xl">
              {category && (
                <span className="inline-block text-[10px] tracking-[0.25em] uppercase
                                 text-amber-400 border border-amber-500/30 px-3 py-1 mb-4">
                  {categoryLabel ?? category}
                </span>
              )}
              <h2 className="font-serif text-3xl md:text-5xl text-white mb-3 leading-tight
                             [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]
                             group-hover:text-amber-100 transition-colors duration-300">
                {title}
              </h2>
              {description && (
                <p className="text-stone-400 text-sm leading-relaxed mb-5 line-clamp-1">
                  {description}
                </p>
              )}
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <p className="text-stone-500 text-[10px] tracking-widest uppercase mb-0.5">Datum</p>
                  <p className="text-white capitalize">{formattedDate}</p>
                </div>
                {(timeStart || timeEnd) && (
                  <div>
                    <p className="text-stone-500 text-[10px] tracking-widest uppercase mb-0.5">Tijd</p>
                    <p className="text-amber-400">{timeStart}{timeEnd && ` – ${timeEnd}`}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mute-knop op de kaart (z-30, boven de klik-trigger) */}
        {!expanded && (
          <div className="absolute top-5 right-5 z-30">
            <MuteBtn />
          </div>
        )}

        {/* Reserveer-knop op de kaart */}
        {!expanded && (
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30">
            <Link
              href="/contact"
              onClick={(e) => e.stopPropagation()}
              className="inline-block border border-amber-600/60 hover:border-amber-500
                         hover:bg-amber-600/10 text-amber-400 hover:text-amber-300
                         px-5 py-2.5 text-xs tracking-[0.2em] uppercase
                         transition-all duration-200 backdrop-blur-sm bg-black/30"
            >
              Reserveer
            </Link>
          </div>
        )}


      </div>

      {/* ── FULLSCREEN TEKST-OVERLAY ──
          Klik OVERAL op de overlay = sluiten.
          Alleen de knoppen en de link stoppen propagatie.         */}
      {expanded && (
        <div
          className={`fixed inset-0 z-[99] cursor-pointer
                      transition-opacity duration-400
                      ${animIn ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
          aria-label={title}
        >
          {/* Gradient overlays (pointer-events-none) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-stone-950/30 z-10" />

          {/* Knoppen rechtsboven — stopPropagation zodat klikken hier NIET sluit */}
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

          {/* Inhoud — animeert omhoog. pointer-events-none zodat klik-door-naar-overlay werkt */}
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
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight
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
                            transition-all duration-500 ease-out delay-[250ms]
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
      )}
    </>
  )
}
