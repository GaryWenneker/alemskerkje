'use client'

import { useState, useRef } from 'react'

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

function SpeakerOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
    </svg>
  )
}

function SpeakerOnIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
      <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

interface VideoBlockProps {
  videoUrl: string
  videoType: 'youtube' | 'vimeo' | 'direct'
  title: string
}

export default function VideoBlock({ videoUrl, videoType, title }: VideoBlockProps) {
  const [muted, setMuted] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoType === 'youtube' && iframeRef.current?.contentWindow) {
      const func = muted ? 'unMute' : 'mute'
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }),
        'https://www.youtube-nocookie.com'
      )
      setMuted((prev) => !prev)
    }

    if (videoType === 'direct' && videoRef.current) {
      videoRef.current.muted = !muted
      setMuted((prev) => !prev)
    }
  }

  if (videoType === 'youtube') {
    const videoId = getYouTubeId(videoUrl)
    if (!videoId) return null

    const src = [
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

    return (
      <div className="relative w-full aspect-video bg-stone-950 overflow-hidden">
        {/* Gradient + title overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/85 via-black/40 to-transparent pt-8 pb-20 px-6 md:px-12 pointer-events-none">
          <p className="section-label mb-2">Evenement</p>
          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white leading-tight drop-shadow-xl">
            {title}
          </h1>
        </div>

        {/* YouTube iframe — z-0 ensures title overlay (z-10) stays on top */}
        <iframe
          ref={iframeRef}
          src={src}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none z-0"
          allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={title}
        />

        {/* Mute toggle button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white text-xs px-4 py-2.5 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-amber-500/40 tracking-wide"
          aria-label={muted ? 'Geluid inschakelen' : 'Geluid uitschakelen'}
        >
          {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
          <span>{muted ? 'Geluid aan' : 'Geluid uit'}</span>
        </button>
      </div>
    )
  }

  if (videoType === 'direct') {
    return (
      <div className="relative w-full aspect-video bg-stone-950 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/85 via-black/40 to-transparent pt-8 pb-20 px-6 md:px-12 pointer-events-none">
          <p className="section-label mb-2">Evenement</p>
          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white leading-tight drop-shadow-xl">
            {title}
          </h1>
        </div>

        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />

        <button
          onClick={toggleMute}
          className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white text-xs px-4 py-2.5 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-amber-500/40 tracking-wide"
          aria-label={muted ? 'Geluid inschakelen' : 'Geluid uitschakelen'}
        >
          {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
          <span>{muted ? 'Geluid aan' : 'Geluid uit'}</span>
        </button>
      </div>
    )
  }

  return null
}
