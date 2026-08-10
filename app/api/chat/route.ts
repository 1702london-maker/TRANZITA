import { AMAKA_SYSTEM_PROMPT } from '@/lib/constants'
import { durableRateLimit, rateLimitKey } from '@/lib/rate-limit'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

  const user = await getSignedInUser()
  if (!user) {
    return Response.json({
      content: 'For account or route help, please sign in to the correct Tranzita portal. For general enquiries, email booking@tranzita.africa or use WhatsApp support and the Tranzita team will help you.',
    })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return Response.json({ content: "I could not connect right now. Please email booking@tranzita.africa or use WhatsApp support and the Tranzita team will help you." })
  }

  const { OpenAI } = await import('openai')
  const openai = new OpenAI({ apiKey })

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: AMAKA_SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 320,
    temperature: 0.45,
  })

  const content = cleanSupportReply(completion.choices[0]?.message?.content || '')
  return Response.json({ content: content || 'Please email booking@tranzita.africa or use WhatsApp support and the Tranzita team will help you.' })
}

async function getSignedInUser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null

  const cookieStore = cookies()
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {},
    },
  })

  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return data.user
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

function cleanSupportReply(value: string) {
  return value
    .replace(/[*#"`>_~|]/g, '')
    .replace(/-{3,}/g, ' ')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/\bAI-powered\b/gi, 'support')
    .replace(/\bAI\b/g, 'support')
    .replace(/\bautomated\b/gi, 'support')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
