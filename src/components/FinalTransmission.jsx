import { motion, useReducedMotion } from 'framer-motion'

const lines = ['The future was never guaranteed.', 'It was built.', 'One decision.', 'One project.', 'One attempt at a time.', 'I don’t know if we made it.', 'But at least we kept building.']
export default function FinalTransmission({ onPortfolio }) {
  const reduceMotion = useReducedMotion()
  return <main className="screen final-screen"><div className="final-noise" /><section className="final-content"><motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="signal-dot" /> TRANSMISSION RESTORED / 100%</motion.p><div className="transmission-copy">{lines.map((line, i) => <motion.p key={line} className={i === 1 || i === 6 ? 'emphasis' : ''} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.24, duration: 0.45 }}>{line}</motion.p>)}</div><motion.button className="primary-button" onClick={onPortfolio} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>REWRITE THE FUTURE <span aria-hidden="true">→</span></motion.button></section><div className="final-footer">END OF TRANSMISSION / BEGINNING OF PORTFOLIO</div></main>
}
