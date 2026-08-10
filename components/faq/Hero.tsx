'use client'

import { motion } from 'framer-motion'
import CategoryFilter from './CategoryFilter'
import SearchBar from './SearchBar'
import type { FAQFilter } from '@/lib/faq-data'

type HeroProps = {
  search: string
  setSearch: (value: string) => void
  activeCategory: FAQFilter
  setActiveCategory: (value: FAQFilter) => void
}

const headline = ['Every Question.', 'Answered Honestly.']

export default function FAQHero({ search, setSearch, activeCategory, setActiveCategory }: HeroProps) {
  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 pt-32 pb-28 text-center"
      style={{
        background: `
          linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 42%, rgba(241,246,234,0.96) 100%),
          radial-gradient(circle at 18% 22%, rgba(248,200,78,0.2) 0 10%, transparent 28%),
          radial-gradient(circle at 84% 18%, rgba(31,107,70,0.14) 0 12%, transparent 30%),
          repeating-linear-gradient(135deg, rgba(31,107,70,0.045) 0 1px, transparent 1px 22px)
        `,
      }}
    >
      <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 190" preserveAspectRatio="none" className="block w-full">
          <rect x="0" y="172" width="1440" height="18" fill="#E5EEDB" />
          {Array.from({ length: 24 }).map((_, i) => (
            <rect
              key={i}
              x={i * 66}
              y={90 + (i % 5) * 12}
              width={34 + (i % 3) * 10}
              height={90 - (i % 4) * 12}
              rx="2"
              fill={i % 2 ? '#DDE9D2' : '#EDF5E5'}
            />
          ))}
          <text x="130" y="116" fill="#6F875B" fontSize="8" fontWeight="900" letterSpacing="2">LAGOS</text>
          <text x="505" y="96" fill="#6F875B" fontSize="8" fontWeight="900" letterSpacing="2">ABUJA</text>
          <text x="890" y="110" fill="#6F875B" fontSize="8" fontWeight="900" letterSpacing="2">ENUGU</text>
          <text x="1220" y="104" fill="#6F875B" fontSize="8" fontWeight="900" letterSpacing="2">KADUNA</text>
        </svg>
        <motion.div
          className="absolute bottom-4 left-0"
          animate={{ x: ['-10vw', '108vw'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="116" height="38" viewBox="0 0 116 38">
            <rect x="4" y="4" width="102" height="27" fill="#F28A3D" rx="6" />
            <rect x="4" y="4" width="102" height="9" fill="#D96B1F" rx="6" />
            <rect x="10" y="8" width="20" height="12" fill="rgba(255,255,255,0.38)" rx="2" />
            <rect x="34" y="8" width="15" height="12" fill="rgba(255,255,255,0.28)" rx="2" />
            <rect x="54" y="8" width="15" height="12" fill="rgba(255,255,255,0.28)" rx="2" />
            <rect x="74" y="8" width="15" height="12" fill="rgba(255,255,255,0.28)" rx="2" />
            <circle cx="23" cy="32" r="5" fill="#183024" />
            <circle cx="88" cy="32" r="5" fill="#183024" />
            <rect x="89" y="6" width="10" height="6" fill="white" rx="1" />
            <rect x="89" y="6" width="3" height="6" fill="#1F6B46" rx="1" />
            <rect x="96" y="6" width="3" height="6" fill="#1F6B46" rx="1" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center pb-24">
        <motion.p
          className="mb-5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-widest"
          style={{ background: 'rgba(217,107,31,0.11)', color: '#D96B1F', border: '1px solid rgba(217,107,31,0.18)' }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Frequently Asked Questions
        </motion.p>
        <h1 className="headline-balance flex flex-wrap justify-center gap-x-4 gap-y-2 font-extrabold leading-tight" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#183024' }}>
          {headline.map((word, index) => (
            <motion.span
              key={word}
              style={{ color: index === 1 ? '#D96B1F' : '#183024' }}
              initial={{ opacity: 0, y: 38 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: '#65785F' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.45 }}
        >
          Everything parents, schools, drivers, and nurses want to know about Tranzita. No corporate speak. Just straight answers to real questions.
        </motion.p>
        <div className="mt-9 w-full">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>
      </div>
      <motion.div
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="#7EA06D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
