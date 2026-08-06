'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function DemoFAB() {
  const [hovered, setHovered] = useState(false)

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9000] flex items-center gap-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.2, type: 'spring', stiffness: 300, damping: 20 }}
    >
      {hovered && (
        <motion.div
          className="rounded-xl px-4 py-2 text-white text-sm font-medium whitespace-nowrap shadow-lg"
          style={{ background: '#E8601C' }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Book a Demo
        </motion.div>
      )}

      <motion.button
        onClick={scrollToDemo}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl fab-pulse"
        style={{ background: '#E8601C' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Book a demo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </motion.button>
    </motion.div>
  )
}

