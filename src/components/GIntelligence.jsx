import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { connections } from '../data/knowledge.js'
import { fallbackAnswer, relevantNodes, suggestedQuestions } from '../data/knowledge'
import ConnectionMap from './ConnectionMap'
import TextType from './motion/TextType'
import AnimatedContent from './motion/AnimatedContent'
import WorldSection from './WorldSection'
import ImageSlot from './ImageSlot'

function Sources({ sources, onOpenExhibit }) {
  if (!sources?.length) return null
  return <div className="agent-sources"><span>REFERENCED ARCHIVE</span>{sources.map((source) => <button key={`${source.type}-${source.id}`} onClick={() => onOpenExhibit(source.id)}>{source.title} <b>↗</b></button>)}</div>
}

export default function GIntelligence({ onOpenExhibit, onArchive }) {
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeNodes, setActiveNodes] = useState({ engineeringActive: false, businessActive: false, connectionActive: false })
  const [activeConnection, setActiveConnection] = useState(null)
  const input = useRef(null)
  const reduceMotion = useReducedMotion()
  const ask = async (event, preset) => {
    event?.preventDefault()
    const asked = (preset || question).trim()
    if (!asked || loading) return
    setQuestion(''); setLoading(true); setMessages((current) => [...current, { role: 'user', content: asked }])
    setActiveNodes(relevantNodes(asked))
    try {
      const history = messages.slice(-4).map(({ role, content }) => ({ role, content }))
      const res = await fetch('/api/intelligence', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: asked, history }) })
      const data = await res.json()
      if (!data.answer) throw new Error(data.error || 'No response')
      const returnedConnection = data.connections?.[0]
      setMessages((current) => [...current, { role: 'assistant', ...data }]); setActiveConnection(connections.find((item) => item.id === returnedConnection?.id) || returnedConnection || (relevantNodes(asked).connectionActive ? connections[0] : null))
    } catch {
      const data = fallbackAnswer(asked)
      const returnedConnection = data.connections?.[0]
      setMessages((current) => [...current, { role: 'assistant', ...data }]); setActiveConnection(connections.find((item) => item.id === returnedConnection?.id) || returnedConnection || null)
    } finally { setLoading(false); window.setTimeout(() => input.current?.focus(), 0) }
  }
  const resolveExhibit = (id) => {
    const connection = connections.find((item) => item.id === id || item.projectId === id)
    const fallback = id === 'arduino-experiments' || id === 'frontend-development' ? 'builder' : id === 'ai-data-exploration' ? 'explorer' : id === 'eureka-juniors' ? 'competitor' : connection?.exhibitId || 'entrepreneur'
    onOpenExhibit(fallback)
  }
  return <main className="intelligence-screen">
    <header className="intelligence-header"><span className="wordmark">VOICE//404</span><nav aria-label="Portfolio sections"><a href="#engineering">ENGINEERING</a><a href="#business">BUSINESS</a><a href="#intelligence">INTELLIGENCE</a></nav><button className="text-button" onClick={onArchive}>OPEN ARCHIVE <span>↗</span></button></header>
    <section className="intelligence-hero"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><p className="eyebrow"><span className="signal-dot signal-red" /> INITIALIZING PERSONAL SYSTEM</p><h1>TWO WORLDS.<br /><em>ONE MIND.</em></h1><TextType as="p" text={['ENGINEER BY CURIOSITY', 'BUILDER BY INSTINCT', 'BUSINESS BY DESIGN']} typingSpeed={48} pauseDuration={1650} deletingSpeed={24} typeEffect="fade" cursorStyle="bar" cursorColor="#ff5c5c" className="hero-text-type" /><p className="hero-multiplication">ENGINEERING <i>×</i> BUSINESS</p><a className="hero-enter" href="#identity">ENTER THE SYSTEM <span>↓</span></a></motion.div><div className="agent-stamp"><span>G//INTELLIGENCE</span><small>CONTEXT: {messages.length ? 'ACTIVE' : 'STANDBY'}<br />MEMORY: SESSION ONLY</small></div></section>
    <section id="identity" className="identity-section" aria-labelledby="identity-heading"><AnimatedContent className="identity-index"><span>01</span><p>IDENTITY / NOT LIMITED<br />TO ONE DOMAIN</p></AnimatedContent><AnimatedContent className="identity-copy" delay={.08}><h2 id="identity-heading">Engineering is how I <em>explore.</em><br />Business is how I give it <em>direction.</em></h2><p>Gaurav is an emerging builder interested in the systems behind technology and the opportunities around it—learning through Arduino, frontend development, AI, data science, and entrepreneurial thinking.</p></AnimatedContent><AnimatedContent className="identity-media" delay={.16} y={28}><ImageSlot label="PROFILE / PERSONAL IDENTITY" /></AnimatedContent></section>
    <WorldSection index="02" world="ENGINEERING" tone="engineering" imageLabel="ENGINEERING / DIGITAL WORKSHOP" statements={['I BUILD SYSTEMS', 'I EXPERIMENT WITH AI', 'I TURN IDEAS INTO SOFTWARE']} description="A technical workshop in progress: building interfaces, learning how systems respond, and investigating the mechanics behind intelligent technology." items={[{ title: 'ARDUINO EXPERIMENTS', description: 'Hands-on learning through code, hardware, and responsive systems.', meta: 'ARDUINO / PROGRAMMING / HARDWARE' }, { title: 'FRONTEND DEVELOPMENT', description: 'Interface building with React and Tailwind as part of a wider practice of making technology usable.', meta: 'REACT / TAILWIND / FRONTEND' }, { title: 'AI + DATA EXPLORATION', description: 'An ongoing interest in how models, data, systems, and human decisions meet.', meta: 'AI / DATA SCIENCE / SYSTEMS' }]} />
    <section className="world-merge" aria-label="Engineering and Business transition"><AnimatedContent><p className="section-label">SYSTEM TRANSITION / 03</p><TextType as="h2" text="ENGINEERING BUILDS THE SYSTEM. BUSINESS GIVES IT DIRECTION." typingSpeed={30} pauseDuration={4000} loop={false} cursorStyle="bar" cursorColor="#6ea8fe" startOnVisible /></AnimatedContent><div aria-hidden="true" className="merge-lines"><i /><i /><i /><i /><i /></div><p>SYSTEMS <span>→</span> PRODUCTS <span>→</span> BUSINESSES</p></section>
    <WorldSection index="04" world="BUSINESS" tone="business" imageLabel="BUSINESS / OPPORTUNITY FRAME" statements={['I THINK IN SYSTEMS', 'I BUILD WITH PURPOSE', 'I LOOK FOR OPPORTUNITY']} description="Entrepreneurship is the bridge between a useful technical system and the real-world context it can improve. The portfolio records interests and potential applications—not claimed results." items={[{ title: 'PRODUCT THINKING', description: 'An interest in moving ideas toward useful products through careful problem definition.', meta: 'IDEAS / PRODUCTS / OPPORTUNITY' }, { title: 'SHRI KRISHNA SALES', description: 'A potential exploration of operational software around inventory, customer records, billing, and efficiency.', meta: 'POTENTIAL APPLICATION / NOT A CLAIMED IMPLEMENTATION' }, { title: 'EUREKA JUNIORS', description: 'Semifinalist experience at IIT Bombay—an early lesson in taking ideas beyond the classroom.', meta: 'ACHIEVEMENT / IIT BOMBAY' }]} />
    <section id="intelligence" className="intelligence-section-heading"><AnimatedContent><p className="eyebrow"><span className="signal-dot signal-red" /> PERSONAL KNOWLEDGE SYSTEM</p><h2>INTERROGATE<br />THE <em>INTELLIGENCE.</em></h2><TextType as="p" text={['KNOWLEDGE SYSTEM ONLINE', 'READY TO RESPOND', 'ASK ABOUT THE WORK']} typingSpeed={38} pauseDuration={1600} deletingSpeed={20} cursorColor="#ff5c5c" className="agent-status-type" startOnVisible /></AnimatedContent></section>
    <section className="intelligence-workspace" aria-label="G Intelligence interface">
      <aside className="domain-panel"><p>LIVE DOMAINS</p><button className={activeNodes.engineeringActive ? 'active' : ''} onClick={(e) => ask(e, 'What are Gaurav’s engineering interests?')}><span>01</span> ENGINEERING <i>↘</i></button><button className={activeNodes.businessActive ? 'active' : ''} onClick={(e) => ask(e, 'What are Gaurav’s entrepreneurship interests?')}><span>02</span> BUSINESS <i>↘</i></button><button className={activeNodes.connectionActive ? 'active' : ''} onClick={(e) => ask(e, 'Connect engineering and business.')}><span>03</span> CONNECTIONS <i>↘</i></button><div className="domain-foot">KNOWLEDGE IS CURATED.<br />NO VISITOR MEMORY STORED.</div></aside>
      <section className="agent-console"><div className="agent-console-head"><div><p className="agent-name">G//INTELLIGENCE</p><span>ASK ME ANYTHING ABOUT GAURAV.</span></div><span className="agent-state"><i /> ONLINE</span></div><div className="conversation" aria-live="polite">{messages.length === 0 && <div className="agent-intro"><p>I am a guide to Gaurav’s verified portfolio archive. I can explain the technical work, entrepreneurial interests, and the connections between them.</p><div className="question-list">{suggestedQuestions.map((item, index) => <button key={item} onClick={(event) => ask(event, item)}><span>{String(index + 1).padStart(2, '0')}</span>{item}<b>→</b></button>)}</div></div>}{messages.map((message, index) => message.role === 'user' ? <div className="user-query" key={`${message.content}-${index}`}>// {message.content}</div> : <article className="agent-answer" key={`${message.answer}-${index}`}><p className="section-label">G//INTELLIGENCE RESPONSE <small>{message.mode === 'curated fallback' ? ' / ARCHIVE MODE' : ''}</small></p><p>{message.answer}</p><Sources sources={message.sources} onOpenExhibit={resolveExhibit} />{message.suggestedQuestions?.length > 0 && <div className="followup-questions">{message.suggestedQuestions.slice(0, 2).map((item) => <button onClick={(event) => ask(event, item)} key={item}>{item} <b>→</b></button>)}</div>}</article>)}{loading && <div className="agent-loading"><span /> RETRIEVING VERIFIED CONTEXT</div>}</div><form className="agent-composer" onSubmit={ask}><label htmlFor="intelligence-question">INTERROGATE THE INTELLIGENCE</label><div><input ref={input} id="intelligence-question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question about Gaurav…" maxLength="500" /><button type="submit" disabled={!question.trim() || loading} aria-label="Send question">→</button></div></form></section>
    </section>
    <ConnectionMap connection={activeConnection} active={activeNodes.connectionActive} onOpenExhibit={onOpenExhibit} />
    <section className="closing-section"><AnimatedContent><p className="section-label">FINAL TRANSMISSION / 05</p><TextType as="h2" text={['THIS IS NOT THE FINAL BUILD.', 'THE NEXT VERSION IS ALREADY IN PROGRESS.']} typingSpeed={37} pauseDuration={1900} deletingSpeed={22} cursorStyle="bar" cursorColor="#ff5c5c" startOnVisible /><p>Explore the restored archive or continue the conversation with G//INTELLIGENCE.</p><button className="primary-button" onClick={onArchive}>OPEN THE ARCHIVE <span>→</span></button></AnimatedContent></section>
  </main>
}
