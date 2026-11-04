import profile from './profile.json' with { type: 'json' }
import engineering from './engineering.json' with { type: 'json' }
import business from './business.json' with { type: 'json' }
import achievements from './achievements.json' with { type: 'json' }
import projects from './projects.json' with { type: 'json' }
import connections from './connections.json' with { type: 'json' }

export { connections }

export const knowledge = { profile, engineering, business, achievements, projects, connections }

export const suggestedQuestions = [
  'What has Gaurav built?',
  'How does he combine engineering and business?',
  'What problems does he want to solve?',
  'What is he building toward?'
]

export function relevantNodes(question = '') {
  const q = question.toLowerCase()
  const engineeringActive = /build|engineering|technical|arduino|react|frontend|software|ai|data|system/.test(q)
  const businessActive = /business|entrepreneur|product|problem|sales|operation|customer|billing|inventory|connect/.test(q)
  const connectionActive = /connect|combine|business|problem|sales|operation|product/.test(q)
  return { engineeringActive: engineeringActive || connectionActive, businessActive: businessActive || connectionActive, connectionActive }
}

export function fallbackAnswer(question = '') {
  const q = question.toLowerCase()
  const sources = []
  const nodes = relevantNodes(question)
  let answer = ''
  if (/unknown|private|family|medical|address|phone|school/.test(q)) {
    answer = 'The portfolio knowledge base does not contain enough information to answer that. It is intentionally limited to verified, professional portfolio material.'
  } else if (/combine|connect|business|entrepreneur|sales|operation|problem/.test(q)) {
    const connection = connections[0]
    sources.push({ type: 'connection', id: connection.id, title: 'Engineering → Business connection' }, { type: 'project', id: 'shri-krishna-sales-idea', title: 'Software for Shri Krishna Sales' })
    answer = `Gaurav’s connection is practical rather than a claimed business result: his interest in software systems and frontend development could be applied to operational problems. One portfolio idea is exploring software for Shri Krishna Sales around inventory, customer records, billing, and efficiency. This is explicitly a potential application, not a finished implementation.`
  } else if (/built|build|project|engineering|technical|arduino|react|frontend/.test(q)) {
    sources.push({ type: 'project', id: 'arduino-experiments', title: 'Arduino learning and experiments' }, { type: 'project', id: 'frontend-development', title: 'Frontend development' })
    answer = 'Gaurav has learned through Arduino and hands-on technology experiments, and builds frontend interfaces with React and Tailwind. His portfolio describes these as active learning and technical practice rather than finished commercial products.'
  } else if (/ai|data/.test(q)) {
    sources.push({ type: 'experience', id: 'ai-data-exploration', title: 'AI and data-science exploration' })
    answer = 'Gaurav is exploring AI and data science, with an interest in how models, data, and human decisions connect. The portfolio frames this as an ongoing learning direction.'
  } else if (/achievement|eureka|competition/.test(q)) {
    sources.push({ type: 'achievement', id: 'eureka-juniors', title: 'Eureka Juniors semifinalist — IIT Bombay' })
    answer = 'A verified achievement is becoming a Eureka Juniors semifinalist at IIT Bombay. The experience took his work beyond the classroom and helped him learn from competition.'
  } else if (/next|toward|ambition|future/.test(q)) {
    sources.push({ type: 'profile', id: 'ambition', title: 'Future direction' })
    answer = 'He is building toward useful technology products that connect engineering curiosity with real-world problems. The portfolio does not claim a fixed next product; it presents this as an ongoing ambition.'
  } else {
    sources.push({ type: 'profile', id: 'profile', title: 'Professional profile' })
    answer = 'Gaurav is a builder interested in engineering, AI, data science, frontend development, and entrepreneurship. Ask about his technical experiments, the Eureka Juniors achievement, or how software could connect to real operational problems.'
  }
  return { answer, sources, connections: nodes.connectionActive ? connections.slice(0, 1).map(({ from, to, potentialValue, status, id }) => ({ id, from, to, explanation: potentialValue, status })) : [], suggestedQuestions, mode: 'curated fallback' }
}
