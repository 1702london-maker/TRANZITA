import { AMAKA_SYSTEM_PROMPT } from '@/lib/constants'
import { durableRateLimit, rateLimitKey } from '@/lib/rate-limit'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 12

export async function POST(req: Request) {
  const limited = await durableRateLimit(rateLimitKey(req, 'chat'), RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)
  if (!limited.ok) {
    return Response.json({ content: 'EFE is receiving too many messages right now. Please wait a minute and try again.' }, { status: 429 })
  }

  const payload = await req.json().catch(() => null)
  const messages = sanitiseMessages(payload?.messages)
  if (!messages.length) {
    return Response.json({ content: 'Please send a question and EFE will help.' }, { status: 400 })
  }

  const user = await getSignedInUser()
  if (!user) {
    const publicReply = getPublicSupportReply(messages[messages.length - 1]?.content || '')
    if (publicReply) return Response.json({ content: publicReply })
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

function getPublicSupportReply(input: string) {
  const text = input.toLowerCase()
  if (/(how|work|works|process|start|onboard)/.test(text)) {
    return 'Tranzita starts with a route review for the school or parent group. We map pickup areas, confirm the safest vehicle plan, assign verified crew, then activate parent updates, live tracking, tap-on and tap-off records, and guardian handover rules.'
  }
  if (/(safe|safety|driver|vet|police|clearance|nurse|crew)/.test(text)) {
    return 'Safety is the centre of Tranzita. Routes use verified drivers, copilots and onboard nurses, live GPS, child tap records, guardian handover checks, route monitoring, and operations support. Crew and vehicles must clear Tranzita checks before carrying children.'
  }
  if (/(price|cost|fee|pay|payment|charge)/.test(text)) {
    return 'Pricing depends on the city, school location, route distance, number of children, service level, and whether the school needs white-label onboarding or custom app support. The best next step is a route review so the team can quote properly.'
  }
  if (/(school|principal|administrator|admin)/.test(text)) {
    return 'Schools get a transport operations view for routes, students, attendance, safeguarding, communications, billing, reports, white-label onboarding options, and approved Tranzita fleet activity. The school can request a route review from the contact page.'
  }
  if (/(parent|child|children|guardian|whatsapp|tracking)/.test(text)) {
    return 'Parents use the Tranzita PWA for live tracking, ETA, journey status and guardian handover updates. WhatsApp and EFE are available for support, complaints and escalation. Private child records and live route details are only available inside the correct parent portal after approval.'
  }
  if (/(partner|vehicle|fleet|car|bus|owner)/.test(text)) {
    return 'Tranzita partners with approved Nigerian-assembled school buses, maintenance, depot and fleet infrastructure providers. The fleet can include electric, diesel and petrol vehicles, but only approved Tranzita vehicles enter school routes. Approved partners can see vehicle activity, inspections, documents, earnings and child counts, but not child names or parent details.'
  }
  if (/(hello|hi|hey|good morning|good afternoon|good evening)/.test(text)) {
    return 'Hello. I can help with Tranzita routes, safety, school onboarding, parent support, fleet partners, pricing basics, and portal access. What would you like to know?'
  }
  return ''
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
