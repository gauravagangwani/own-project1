import { motion, useReducedMotion } from 'framer-motion'
import TerminalText from './TerminalText'

export default function TransmissionIntro({ onEnter }) {
  const reduceMotion = useReducedMotion()
  const rise = reduceMotion ? {} : { y: [14, 0], opacity: [0, 1] }
  return <main className="screen intro-screen">
    <div className="corner-mark">/// 01 — INCOMING</div>
    <motion.div className="intro-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>
      <div className="eyebrow"><span className="signal-dot" /> VOICE//404 <span className="eyebrow-separator">/</span> INCOMING TRANSMISSION</div>
      <div className="system-lines" aria-label="Transmission metadata">
        <TerminalText delay={250}>SOURCE: UNKNOWN</TerminalText>
        <TerminalText delay={450}>TIMESTAMP: 2042</TerminalText>
        <TerminalText delay={650}>STATUS: <span className="status-error">CORRUPTED</span></TerminalText>
      </div>
      <motion.h1 animate={rise} transition={{ delay: 0.32, duration: 0.7, ease: 'easeOut' }}>The future has<br /><em>rejected you.</em><span className="cursor" /></motion.h1>
      <motion.p className="intro-copy" animate={rise} transition={{ delay: 0.52, duration: 0.7 }}>A transmission from a future that hasn’t happened yet.</motion.p>
      <motion.button className="primary-button" onClick={onEnter} animate={rise} transition={{ delay: 0.7, duration: 0.7 }}>
        INVESTIGATE TRANSMISSION <span aria-hidden="true">→</span>
      </motion.button>
    </motion.div>
    <div className="intro-footer"><span>CHANNEL 09 / UNVERIFIED</span><span>SCROLL SIGNAL: STABLE</span></div>
  </main>
}
