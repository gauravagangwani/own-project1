import { readFile } from 'node:fs/promises'
import path from 'node:path'

const DATA_FILES = ['profile.json', 'engineering.json', 'business.json', 'achievements.json', 'projects.json', 'connections.json']
const DEFAULT_QUESTIONS = ['What has Gaurav built?', 'How does he combine engineering and business?', 'What problems does he want to solve?', 'What is he building toward?']

async function loadKnowledge() {
  const base = path.join(process.cwd(), 'src', 'data')
  const entries = await Promise.all(DATA_FILES.map(async (file) => [file.replace('.json', ''), JSON.parse(await readFile(path.join(base, file), 'utf8'))]))
  return Object.fromEntries(entries)
}

function safeResponse(payload, fallback = {}) {
  if (!payload || typeof payload.answer !== 'string') return null
  return {
    answer: payload.answer.slice(0, 1200),
    sources: Array.isArray(payload.sources) ? payload.sources.filter((item) => item && typeof item.title === 'string').slice(0, 4) : [],
    connections: Array.isArray(payload.connections) ? payload.connections.filter((item) => item && typeof item.explanation === 'string').slice(0, 2) : [],
    suggestedQuestions: Array.isArray(payload.suggestedQuestions) ? payload.suggestedQuestions.filter((item) => typeof item === 'string').slice(0, 4) : DEFAULT_QUESTIONS,
    mode: fallback.mode || 'AI response'
  }
}

function fallback() {
  return {
    answer: 'G//INTELLIGENCE is currently running in verified archive mode because no server-side AI key is configured. The archive remains available: Gaurav’s verified material covers Arduino learning, React and Tailwind frontend work, AI and data-science interests, the Eureka Juniors semifinalist experience at IIT Bombay, and entrepreneurship interests. Add OPENAI_API_KEY in Vercel to enable generated, knowledge-grounded answers.',
    sources: [{ type: 'profile', id: 'profile', title: 'Professional profile' }],
    connections: [],
    suggestedQuestions: DEFAULT_QUESTIONS,
    mode: 'configuration fallback'
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
  const { question, history = [] } = request.body || {}
  if (typeof question !== 'string' || !question.trim() || question.length > 500) return response.status(400).json({ error: 'Provide a question up to 500 characters.' })
  if (!process.env.OPENAI_API_KEY) return response.status(503).json({ ...fallback(), error: 'AI_NOT_CONFIGURED' })
  try {
    const knowledge = await loadKnowledge()
    const recentHistory = Array.isArray(history) ? history.slice(-4).map(({ role, content }) => ({ role: role === 'assistant' ? 'assistant' : 'user', content: String(content || '').slice(0, 500) })) : []
    const instructions = `You are G//INTELLIGENCE, an AI portfolio guide. Answer only with verified information in KNOWLEDGE. Do not invent projects, credentials, awards, business results, or personal experiences. Never claim to be Gaurav. Clearly label future ideas and potential applications. If the answer is unavailable, say so. Return ONLY valid JSON: {"answer":"string","sources":[{"type":"project|experience|achievement|connection|profile","id":"known id or profile","title":"string"}],"connections":[{"id":"known connection id","from":"ENGINEERING","to":"BUSINESS","explanation":"string","status":"string"}],"suggestedQuestions":["string"]}.\n\nKNOWLEDGE:\n${JSON.stringify(knowledge)}`
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4.1-mini', temperature: 0.2, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: instructions }, ...recentHistory, { role: 'user', content: question.trim() }] })
    })
    if (!upstream.ok) throw new Error(`OpenAI response ${upstream.status}`)
    const completion = await upstream.json()
    const parsed = JSON.parse(completion.choices?.[0]?.message?.content || '{}')
    const result = safeResponse(parsed)
    if (!result) throw new Error('Invalid structured response')
    return response.status(200).json(result)
  } catch (error) {
    console.error('G//INTELLIGENCE error', error.message)
    return response.status(502).json({ ...fallback(), error: 'AI_UNAVAILABLE' })
  }
}
