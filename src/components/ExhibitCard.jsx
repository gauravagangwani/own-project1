import { motion, useReducedMotion } from 'framer-motion'

export default function ExhibitCard({ exhibit, explored, index, onOpen }) {
  const reduceMotion = useReducedMotion()
  return <motion.button className={`exhibit-card ${explored ? 'is-explored' : ''}`} onClick={() => onOpen(exhibit)}
    initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 + 0.16, duration: 0.45 }} whileHover={reduceMotion ? {} : { y: -5 }}>
    <div className="card-topline"><span>EXHIBIT {exhibit.number}</span><span className="card-status">{explored ? 'RESTORED' : 'UNREAD'}</span></div>
    <div className="card-main"><p className="card-category">{exhibit.category}</p><h3>{exhibit.title}</h3><p className="card-subtitle">{exhibit.subtitle}</p></div>
    <div className="card-bottom"><span>{explored ? 'REVISIT FILE' : 'OPEN FILE'}</span><span aria-hidden="true">↗</span></div>
  </motion.button>
}
