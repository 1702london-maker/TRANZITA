'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X } from 'lucide-react'
import { AMAKA_FIRST_MESSAGE } from '@/lib/constants'

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
      content: AMAKA_FIRST_MESSAGE,
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not connect right now. Please email us at booking@tranzita.africa and we will get back to you shortly!' }])
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
            style={{ bottom: 170, border: '1px solid #DDE9D2' }}
          >
            <div className="px-5 py-4 flex items-center gap-3" style={{ background: '#183024' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: '#D96B1F' }}>
                <Bot size={18} />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-bold">ZITA</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors leading-none" aria-label="Close ZITA chat">
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-3" style={{ background: '#FFF9F2', maxHeight: 340 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      background: msg.role === 'user' ? '#D96B1F' : '#FFFFFF',
                      color: msg.role === 'user' ? '#FFFFFF' : '#183024',
                      border: msg.role === 'assistant' ? '1px solid #DDE9D2' : 'none',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-2.5 text-sm" style={{ background: '#FFFFFF', border: '1px solid #DDE9D2', color: '#65785F' }}>
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

            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2" style={{ background: '#FFF9F2' }}>
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{ background: '#F1F6EA', color: '#183024', border: '1px solid #DDE9D2' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 flex gap-2" style={{ background: '#FFFFFF', borderTop: '1px solid #DDE9D2' }}>
              <input
                aria-label="Ask ZITA"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask ZITA..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#F1F6EA', color: '#183024' }}
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-opacity disabled:opacity-40"
                style={{ background: '#D96B1F' }}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed right-5 z-[9991] w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl"
        style={{ bottom: 90, background: '#183024', animation: 'fabPulse 3s ease-in-out infinite' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with ZITA"
      >
        {open ? <X size={24} /> : <Bot size={26} />}
      </motion.button>
    </>
  )
}
