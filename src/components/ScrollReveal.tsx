'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** Extra delay in ms before the animation starts once the element is visible */
  delay?: number
  /** Animation direction. Default: 'up' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
  /** Animation duration in ms. Default: 700 */
  duration?: number
  /** Distance (px) the element travels. Default: 36 */
  distance?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700,
  distance = 36,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If user prefers reduced motion, skip the reveal delay and just show
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = delay > 0 ? setTimeout(() => setVisible(true), delay) : null
          if (!t) setVisible(true)
          observer.unobserve(el)
        }
      },
      // rootMargin ensures element starts animating just before it reaches the viewport
      { threshold: 0.06, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, prefersReduced])

  const getInitialTransform = (): string => {
    if (prefersReduced) return 'none'
    switch (direction) {
      case 'up':    return `translateY(${distance}px)`
      case 'down':  return `translateY(-${distance}px)`
      case 'left':  return `translateX(${distance}px)`
      case 'right': return `translateX(-${distance}px)`
      case 'scale': return `scale(0.93) translateY(${distance / 2}px)`
      case 'none':  return 'none'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : getInitialTransform(),
        transition: prefersReduced
          ? 'none'
          : `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
