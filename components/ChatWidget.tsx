'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'How does pickup work?',
  'How much does it cost?',
  'Is it safe for my child?',
  'Which areas do you cover?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I am Amaka, your Tranzita guide. I can answer questions about school pickup, driver safety, pricing, and more. What would you like to know? 🚌",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I could not connect right now. Please email us at booking@transzita.africa and we will get back to you shortly!" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-5 z-[9990] w-80 sm:w-96 rounded-3xl overflow-hidden shadow-2xl"
            style={{ bottom: 170, border: '1px solid #E0EAE0' }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3" style={{ background: '#1E2B1E' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: '#E8601C' }}>
                🤖
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-bold">Amaka</p>
                <p className="text-xs" style={{ color: '#8FA88F' }}>Tranzita AI Assistant</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors text-lg leading-none">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto p-4 space-y-3" style={{ background: '#FAFAF8', maxHeight: 340 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      background: msg.role === 'user' ? '#E8601C' : '#FFFFFF',
                      color: msg.role === 'user' ? '#FFFFFF' : '#1E2B1E',
                      border: msg.role === 'assistant' ? '1px solid #E0EAE0' : 'none',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-2.5 text-sm" style={{ background: '#FFFFFF', border: '1px solid #E0EAE0', color: '#6B7F6B' }}>
                    <span className="inline-flex gap-1">
                      <span className="typing-dot" />
                      <span className="typing-dot" style={{ animationDelay: '0.2s' }} />
                      <span className="typing-dot" style={{ animationDelay: '0.4s' }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2" style={{ background: '#FAFAF8' }}>
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{ background: '#F2F5F0', color: '#1E2B1E', border: '1px solid #E0EAE0' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 flex gap-2" style={{ background: '#FFFFFF', borderTop: '1px solid #E0EAE0' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask about Tranzita..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#F2F5F0', color: '#1E2B1E' }}
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-opacity disabled:opacity-40"
                style={{ background: '#E8601C' }}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed right-5 z-[9991] w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl"
        style={{ bottom: 90, background: '#1E2B1E', animation: 'fabPulse 3s ease-in-out infinite' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with Amaka"
      >
        {open ? '✕' : '🤖'}
      </motion.button>
    </>
  )
}
