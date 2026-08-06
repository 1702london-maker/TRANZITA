import { AMAKA_SYSTEM_PROMPT } from '@/lib/constants'

export const runtime = 'edge'

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ content: "I'm Amaka, your Tranzita guide! Our AI chat is currently being set up. Please email booking@transzita.africa and we'll get back to you shortly." }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { messages } = await req.json()

  const { OpenAI } = await import('openai')
  const openai = new OpenAI({ apiKey })

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages: [
      { role: 'system', content: AMAKA_SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 500,
    temperature: 0.8,
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || ''
        if (text) controller.enqueue(encoder.encode(text))
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
