import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function ExhibitModal({ exhibit, onClose }) {
  const closeButton = useRef(null)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (!exhibit) return
    closeButton.current?.focus()
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [exhibit, onClose])
  return <AnimatePresence>{exhibit && <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
    <motion.article className="exhibit-modal" role="dialog" aria-modal="true" aria-labelledby="exhibit-title" onMouseDown={(e) => e.stopPropagation()}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? {} : { opacity: 0, y: 12 }} transition={{ duration: 0.25 }}>
      <div className="modal-header"><div><p className="card-category">EXHIBIT {exhibit.number} / {exhibit.category}</p><h2 id="exhibit-title">{exhibit.title}</h2></div><button ref={closeButton} className="close-button" onClick={onClose} aria-label="Close exhibit">×</button></div>
      <div className="modal-rule" />
      <div className="modal-grid"><section><p className="section-label">FIELD NOTE</p><p className="story-copy">{exhibit.story}</p><div className="facts">{exhibit.facts.map((fact) => <span key={fact}>{fact}</span>)}</div></section><section className="detail-stack"><div><p className="section-label">PROJECT / ACHIEVEMENT</p><p>{exhibit.project}</p></div><div><p className="section-label">LESSON RECOVERED</p><p>{exhibit.lesson}</p></div>{exhibit.link && <a className="text-link" href={exhibit.link} target="_blank" rel="noreferrer">VIEW PROJECT ↗</a>}</section></div>
      <section className="voice-archive"><div><p className="section-label">VOICE ARCHIVE / WISPR FLOW</p><p className="voice-note">Part of the creation process — dictated thought, shaped into story.</p></div><div className="waveform" aria-hidden="true">{Array.from({ length: 35 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 17) % 48)}%` }} />)}</div><blockquote>{exhibit.transcript}</blockquote></section>
      <div className="modal-footer"><span>FILE STATUS: RESTORED</span><button className="text-button" onClick={onClose}>CLOSE FILE <span aria-hidden="true">→</span></button></div>
    </motion.article>
  </motion.div>}</AnimatePresence>
}
