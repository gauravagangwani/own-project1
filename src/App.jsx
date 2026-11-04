import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { exhibits } from './data/exhibits'
import { useExhibitProgress } from './hooks/useExhibitProgress'
import TransmissionIntro from './components/TransmissionIntro'
import Archive from './components/Archive'
import ExhibitModal from './components/ExhibitModal'
import FinalTransmission from './components/FinalTransmission'
import Portfolio from './components/Portfolio'
import GIntelligence from './components/GIntelligence'

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [selectedExhibit, setSelectedExhibit] = useState(null)
  const { visitedExhibits, visit, isComplete } = useExhibitProgress(exhibits.length)
  const openExhibit = useCallback((exhibit) => { if (!exhibit) return; visit(exhibit.id); setSelectedExhibit(exhibit) }, [visit])
  const openExhibitById = useCallback((id) => { const exhibit = exhibits.find((item) => item.id === id); if (exhibit) openExhibit(exhibit) }, [openExhibit])
  const goFinal = useCallback(() => { if (isComplete) setScreen('final') }, [isComplete])
  return <><AnimatePresence mode="wait">{screen === 'intro' && <motion.div key="intro" exit={{ opacity: 0 }}><TransmissionIntro onEnter={() => setScreen('intelligence')} /></motion.div>}{screen === 'intelligence' && <motion.div key="intelligence" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><GIntelligence onOpenExhibit={openExhibitById} onArchive={() => setScreen('archive')} /></motion.div>}{screen === 'archive' && <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Archive exhibits={exhibits} visited={visitedExhibits} onOpen={openExhibit} onFinal={goFinal} onIntelligence={() => setScreen('intelligence')} /></motion.div>}{screen === 'final' && <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><FinalTransmission onPortfolio={() => setScreen('portfolio')} /></motion.div>}{screen === 'portfolio' && <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Portfolio onReturn={() => setScreen('intelligence')} /></motion.div>}</AnimatePresence><ExhibitModal exhibit={selectedExhibit} onClose={() => setSelectedExhibit(null)} /></>
}
