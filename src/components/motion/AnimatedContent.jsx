import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedContent({ children, className = '', delay = 0, y = 22, duration = .65, scale = 1, once = true }) {
  const element = useRef(null)
  useEffect(() => {
    const node = element.current
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { gsap.set(node, { autoAlpha: 1, y: 0, scale: 1 }); return }
    const reveal = () => gsap.to(node, { autoAlpha: 1, y: 0, scale: 1, duration, delay, ease: 'power3.out', overwrite: true })
    gsap.set(node, { autoAlpha: 0, y, scale })
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { reveal(); if (once) observer.disconnect() } else if (!once) gsap.set(node, { autoAlpha: 0, y, scale }) }, { threshold: .14 })
    observer.observe(node)
    return () => { observer.disconnect(); gsap.killTweensOf(node) }
  }, [delay, y, duration, scale, once])
  return <div ref={element} className={className}>{children}</div>
}
