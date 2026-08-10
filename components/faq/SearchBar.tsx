'use client'

import { Search } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const PLACEHOLDERS = [
  'Search for an answer...',
  'Try: What if no one is home at drop-off...',
  'Try: How do I register my child...',
  'Try: What music do drivers play...',
  'Try: What happens if the bus breaks down...',
]

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const reduceMotion = useReducedMotion()
  const [phrase, setPhrase] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const current = PLACEHOLDERS[phrase]
    if (count < current.length) {
      const timer = window.setTimeout(() => setCount((n) => n + 1), 34)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(() => {
      setPhrase((n) => (n + 1) % PLACEHOLDERS.length)
      setCount(0)
    }, 1700)
    return () => window.clearTimeout(timer)
  }, [count, phrase, reduceMotion])

  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Search className="absolute left-5 top-1/2 -translate-y-1/2" size={22} color="#7EA06D" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={reduceMotion ? PLACEHOLDERS[0] : PLACEHOLDERS[phrase].slice(0, count)}
        className="w-full rounded-full py-5 pl-14 pr-6 text-base font-semibold outline-none shadow-xl"
        style={{
          background: 'rgba(255,249,242,0.92)',
          border: '1px solid rgba(126,160,109,0.35)',
          color: '#183024',
          boxShadow: '0 18px 50px rgba(31,107,70,0.12)',
        }}
      />
    </motion.div>
  )
}
