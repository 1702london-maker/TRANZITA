'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const words = [
  { text: 'Every journey', color: '#183024' },
  { text: 'your child takes.', color: '#183024' },
  { text: 'Tracked.', color: '#1F6B46' },
  { text: 'Verified.', color: '#D96B1F' },
  { text: 'Safe.', color: '#D96B1F' },
]

const pills = ['Driver plus Co-Driver plus Nurse', 'Live GPS every 30 seconds', 'WhatsApp alerts at every step']

export default function HowItWorksHero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{
        paddingTop: 118,
        paddingBottom: 108,
        background:
          'linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.93) 46%, rgba(241,246,234,0.94) 100%), radial-gradient(circle at 18% 24%, rgba(248,200,78,0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(31,107,70,0.14), transparent 28%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.34) 0 1px, transparent 1px 120px), linear-gradient(0deg, rgba(255,255,255,0.28) 0 1px, transparent 1px 120px)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 76%)',
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="block w-full h-[190px] sm:h-[220px]">
          <rect x="0" y="196" width="1440" height="24" fill="#E5EEDB" />
          <line x1="0" y1="208" x2="1440" y2="208" stroke="#C9DDBE" strokeWidth="2" strokeDasharray="28 16" />
          {[
            [80, 94, 74, 'SCHOOL'],
            [210, 120, 42, 'LAGOS'],
            [335, 78, 70, 'ABUJA'],
            [500, 112, 44, 'KANO'],
            [690, 82, 76, 'SCHOOL'],
            [870, 114, 46, 'ENUGU'],
            [1040, 86, 68, 'IBADAN'],
            [1230, 118, 48, 'PORT'],
          ].map(([x, y, h, label], i) => (
            <g key={i}>
              <rect x={Number(x) - 34} y={Number(y)} width="68" height={Number(h)} fill={i % 2 ? '#DDE9D2' : '#EDF5E5'} rx="3" />
              <rect x={Number(x) - 18} y={Number(y) - 22} width="36" height="22" fill="#F8C84E" rx="2" />
              <text x={Number(x)} y={Number(y) - 8} textAnchor="middle" fill="#183024" fontSize="7" fontWeight="900" letterSpacing="1.8">
                {label}
              </text>
            </g>
          ))}
        </svg>
        <div className="absolute bus-drive" style={{ bottom: 24, left: 0 }}>
          <svg width="132" height="44" viewBox="0 0 132 44">
            <rect x="4" y="4" width="118" height="32" fill="#F28A3D" rx="7" />
            <rect x="4" y="4" width="118" height="11" fill="#D96B1F" rx="7" />
            {[12, 36, 60, 84].map((x) => <rect key={x} x={x} y="9" width="17" height="13" fill="rgba(255,255,255,0.34)" rx="2" />)}
            <circle cx="25" cy="38" r="5" fill="#183024" />
            <circle cx="98" cy="38" r="5" fill="#183024" />
            <rect x="102" y="7" width="12" height="7" fill="#fff" rx="1" />
            <rect x="102" y="7" width="3" height="7" fill="#1F6B46" />
            <rect x="111" y="7" width="3" height="7" fill="#1F6B46" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center pb-28">
        <motion.p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          How Tranzita Works
        </motion.p>
        <h1 className="font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 headline-balance" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>
          {words.map((word, i) => (
            <motion.span
              key={word.text}
              className="phrase-nowrap"
              style={{ color: word.color }}
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.1, duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>
        <motion.p className="max-w-2xl mx-auto text-lg leading-relaxed mb-8" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          From the school gate to your front door, here is exactly how Tranzita keeps every Nigerian child safe every single day.
        </motion.p>
        <motion.div className="flex flex-wrap justify-center gap-3 mb-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <a href="#journey" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white" style={{ background: '#D96B1F', boxShadow: '0 12px 28px rgba(217,107,31,0.24)' }}>
            See The Journey <ArrowRight size={16} />
          </a>
          <a href="/#demo" className="px-6 py-3 rounded-full text-sm font-bold border" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>
            Request a Demo
          </a>
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }}>
          {pills.map((pill, i) => (
            <motion.span key={pill} className="px-3 py-1.5 rounded-full text-xs font-medium border" style={{ background: '#fff', color: '#213A2B', borderColor: '#DDE9D2' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 + i * 0.12 }}>
              {pill}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 scroll-arrow" style={{ bottom: 62 }}>
        <ArrowRight className="rotate-90" size={22} color="#7EA06D" />
      </div>
    </section>
  )
}
