import { AMAKA_SYSTEM_PROMPT } from '@/lib/constants'
import { durableRateLimit, rateLimitKey } from '@/lib/rate-limit'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 12

export async function POST(req: Request) {
  const limited = await durableRateLimit(rateLimitKey(req, 'chat'), RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)
  if (!limited.ok) {
    return Response.json({ content: 'ZITA is receiving too many messages right now. Please wait a minute and try again.' }, { status: 429 })
  }

  const payload = await req.json().catch(() => null)
  const messages = sanitiseMessages(payload?.messages)
  if (!messages.length) {
    return Response.json({ content: 'Please send a question and ZITA will help.' }, { status: 400 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return Response.json({ content: "I'm ZITA, your Tranzita guide. Our AI chat is currently being set up. Please email booking@tranzita.africa and we'll get back to you shortly." })
  }

  const { OpenAI } = await import('openai')
  const openai = new OpenAI({ apiKey })

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: AMAKA_SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 500,
    temperature: 0.8,
  })

  return Response.json({ content: completion.choices[0]?.message?.content || 'Please email booking@tranzita.africa and the Tranzita team will help you.' })
}

function sanitiseMessages(value: unknown) {
  if (!Array.isArray(value)) return []
  return value
    .filter((message): message is { role: 'user' | 'assistant'; content: string } => {
      if (!message || typeof message !== 'object') return false
      const role = (message as { role?: unknown }).role
      const content = (message as { content?: unknown }).content
      return (role === 'user' || role === 'assistant') && typeof content === 'string' && content.trim().length > 0
    })
    .slice(-12)
    .map((message) => ({ role: message.role, content: message.content.slice(0, 1200) }))
}
