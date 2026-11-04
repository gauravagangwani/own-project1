import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './TextType.css'

export default function TextType({
  text, as: Tag = 'span', prefix = '', typingSpeed = 55, initialDelay = 0,
  pauseDuration = 1800, deletingSpeed = 30, loop = true, showCursor = true,
  cursorStyle = 'bar', cursorCharacter, cursorColor, cursorBlinkDuration = .72,
  className = '', prefixColor, textColors = [], onSentenceComplete, startOnVisible = false,
  typeEffect = 'none'
}) {
  const phrases = useMemo(() => Array.isArray(text) ? text : [text], [text])
  const [content, setContent] = useState('')
  const [started, setStarted] = useState(!startOnVisible)
  const host = useRef(null); const cursor = useRef(null); const phraseIndex = useRef(0); const characterIndex = useRef(0)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    if (!startOnVisible || !host.current) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setStarted(true), { threshold: .25 })
    observer.observe(host.current); return () => observer.disconnect()
  }, [startOnVisible])
  useEffect(() => {
    if (!started) return
    if (reduced) { setContent(phrases[0] || ''); return }
    const scope = gsap.context(() => {
      if (cursor.current) gsap.to(cursor.current, { opacity: .18, duration: cursorBlinkDuration / 2, repeat: -1, yoyo: true, ease: 'none' })
      const schedule = (fn, delay) => gsap.delayedCall(delay / 1000, fn)
      const type = () => {
        const current = phrases[phraseIndex.current] || ''
        if (characterIndex.current < current.length) {
          characterIndex.current += 1; setContent(current.slice(0, characterIndex.current)); schedule(type, typingSpeed)
        } else {
          onSentenceComplete?.(current)
          if (phrases.length === 1 && !loop) return
          schedule(erase, pauseDuration)
        }
      }
      const erase = () => {
        if (characterIndex.current > 0) { characterIndex.current -= 1; setContent((phrases[phraseIndex.current] || '').slice(0, characterIndex.current)); schedule(erase, deletingSpeed) }
        else { phraseIndex.current = (phraseIndex.current + 1) % phrases.length; if (!loop && phraseIndex.current === 0) return; schedule(type, typingSpeed) }
      }
      schedule(type, initialDelay)
    }, host)
    return () => scope.revert()
  }, [started, phrases, typingSpeed, initialDelay, pauseDuration, deletingSpeed, loop, cursorBlinkDuration, onSentenceComplete, reduced])
  const cursorGlyph = cursorCharacter || ({ bar: '|', block: '█', underscore: '_' }[cursorStyle] || '|')
  const textColor = textColors[phraseIndex.current % textColors.length]
  return <Tag ref={host} className={`text-type ${typeEffect !== 'none' ? `text-type--${typeEffect}` : ''} ${className}`} aria-label={`${prefix}${phrases[0] || ''}`}>
    <span className="text-type__sr">{prefix}{phrases[0] || ''}</span><span aria-hidden="true">{prefix && <span className="text-type__prefix" style={{ color: prefixColor }}>{prefix}</span>}<span className="text-type__content" style={{ color: textColor }}>{content}</span>{showCursor && <span ref={cursor} className={`text-type__cursor text-type__cursor--${cursorStyle}`} style={{ color: cursorColor }}>{cursorGlyph}</span>}</span>
  </Tag>
}
