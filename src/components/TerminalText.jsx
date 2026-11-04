import { useEffect, useState } from 'react'

export default function TerminalText({ children, delay = 0, className = '' }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setShow(true), delay)
    return () => window.clearTimeout(timer)
  }, [delay])
  return <span className={`${className} ${show ? 'terminal-visible' : 'terminal-hidden'}`}>{children}</span>
}
