import { motion, useReducedMotion } from 'framer-motion'
import TerminalText from './TerminalText'

export default function TransmissionIntro({ onEnter }) {
  const reduceMotion = useReducedMotion()
  const rise = reduceMotion ? {} : { y: [14, 0], opacity: [0, 1] }
  return <main className="screen intro-screen">
    <div className="corner-mark">/// 01 — INCOMING</div>
    <motion.div className="intro-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>
      <div className="eyebrow"><span className="signal-dot signal-red" /> VOICE//404 <span className="eyebrow-separator">/</span> PERSONAL INTELLIGENCE SYSTEM</div>
      <div className="system-lines" aria-label="Transmission metadata">
        <TerminalText delay={250}>SOURCE: CURATED PORTFOLIO ARCHIVE</TerminalText>
        <TerminalText delay={450}>SYSTEM: G//INTELLIGENCE</TerminalText>
        <TerminalText delay={650}>STATUS: <span className="status-ready">READY TO INTERROGATE</span></TerminalText>
      </div>
      <motion.h1 animate={rise} transition={{ delay: 0.32, duration: 0.7, ease: 'easeOut' }}>Two worlds.<br /><em>One mind.</em><span className="cursor" /></motion.h1>
      <motion.p className="intro-copy" animate={rise} transition={{ delay: 0.52, duration: 0.7 }}>Engineering × business. Ask anything about Gaurav.</motion.p>
      <motion.button className="primary-button" onClick={onEnter} animate={rise} transition={{ delay: 0.7, duration: 0.7 }}>
        INTERROGATE THE INTELLIGENCE <span aria-hidden="true">→</span>
      </motion.button>
    </motion.div>
    <div className="intro-footer"><span>G//INTELLIGENCE / VERIFIED CONTEXT</span><span>MEMORY: SESSION ONLY</span></div>
  </main>
}
