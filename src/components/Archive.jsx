import { motion } from 'framer-motion'
import ExhibitCard from './ExhibitCard'
import ProgressIndicator from './ProgressIndicator'

export default function Archive({ exhibits, visited, onOpen, onFinal, onIntelligence }) {
  const isComplete = visited.length === exhibits.length
  return <main className="screen archive-screen">
    <header className="archive-header"><a className="wordmark" href="#archive" aria-label="VOICE 404 archive">VOICE//404</a><button className="text-button archive-agent-button" onClick={onIntelligence}>G//INTELLIGENCE <span>↗</span></button></header>
    <section className="archive-intro"><div><p className="eyebrow"><span className="signal-dot" /> RECOVERED MATERIAL</p><h2>Investigate<br />the <em>past.</em></h2><p>Five fragments. One unfinished story.</p></div><ProgressIndicator count={visited.length} total={exhibits.length} /></section>
    <section id="archive" className="exhibit-grid" aria-label="Archive exhibits">{exhibits.map((exhibit, index) => <ExhibitCard key={exhibit.id} exhibit={exhibit} index={index} explored={visited.includes(exhibit.id)} onOpen={onOpen} />)}</section>
    <motion.button className={`final-unlock ${isComplete ? 'is-ready' : ''}`} onClick={onFinal} disabled={!isComplete} aria-describedby="final-hint">
      <span>06</span><strong>{isComplete ? 'OPEN FINAL TRANSMISSION' : 'FINAL TRANSMISSION LOCKED'}</strong><span aria-hidden="true">{isComplete ? '→' : '×'}</span>
    </motion.button>
    <p id="final-hint" className="sr-only">{isComplete ? 'All exhibits have been restored. Open the final transmission.' : 'Restore all five exhibits to unlock the final transmission.'}</p>
  </main>
}
