import { motion, useReducedMotion } from 'framer-motion'

export default function ConnectionMap({ connection, active, onOpenExhibit }) {
  const reduceMotion = useReducedMotion()
  if (!connection) return <div className="connection-empty">ASK ABOUT A CONNECTION TO ACTIVATE THE RELATIONSHIP MAP.</div>
  const labels = [connection.from, connection.through, connection.problem, connection.to, connection.potentialValue]
  return <section className={`connection-map ${active ? 'is-active' : ''}`} aria-label="Engineering and business connection">
    <div className="connection-heading"><span>DISCOVER CONNECTIONS</span><small>{connection.status}</small></div>
    <div className="connection-chain">{labels.map((label, index) => <div className="connection-part" key={label}>
      <motion.button className={`connection-node node-${index}`} initial={reduceMotion ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .07 }} onClick={() => onOpenExhibit?.(connection.exhibitId)} aria-label={index === 4 ? 'Open related exhibit' : `Explore ${label}`}>
        <span>{String(index + 1).padStart(2, '0')}</span>{label}
      </motion.button>{index < labels.length - 1 && <div className="connection-line" aria-hidden="true" />}
    </div>)}</div>
  </section>
}
