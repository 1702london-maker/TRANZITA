'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [counts, setCounts] = useState(STATS.map(() => 0))

  useEffect(() => {
    if (!inView) return
    STATS.forEach((s, i) => {
      const duration = 1800
      const steps = 60
      const step = s.value / steps
      let current = 0
      const timer = setInterval(() => {
        current = Math.min(current + step, s.value)
        setCounts(prev => {
          const next = [...prev]
          next[i] = Math.round(current)
          return next
        })
        if (current >= s.value) clearInterval(timer)
      }, (duration / steps) + i * 150)
    })
  }, [inView])

  return (
    <div ref={ref} style={{ background: '#D96B1F' }} className="py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="font-black text-4xl text-white leading-none">
              {counts[i]}{s.suffix}
            </div>
            <div className="text-xs text-orange-100 mt-1 font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

