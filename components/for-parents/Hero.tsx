'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const pills = ['WhatsApp Alerts Every Step', 'No App Required', 'Real People Always Available']

export default function ParentHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4" style={{ paddingTop: 118, paddingBottom: 112, background: 'linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 48%, rgba(241,246,234,0.95) 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 18% 22%, rgba(248,200,78,0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(31,107,70,0.12), transparent 28%)' }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 210" preserveAspectRatio="none" className="block w-full h-[190px]">
          <rect x="0" y="188" width="1440" height="22" fill="#E5EEDB" />
          {[90, 245, 400, 575, 760, 955, 1160, 1320].map((x, i) => (
            <g key={x}>
              <rect x={x - 34} y={104 + (i % 2) * 18} width="68" height={84 - (i % 2) * 10} rx="3" fill={i % 2 ? '#DDE9D2' : '#EDF5E5'} />
              <path d={`M${x - 42} ${104 + (i % 2) * 18}h84l-42-32z`} fill="#F8C84E" opacity="0.9" />
              <rect x={x - 8} y={148} width="16" height="40" fill="#C9DDBE" />
            </g>
          ))}
        </svg>
        <div className="absolute bus-drive" style={{ bottom: 22, left: 0 }}>
          <svg width="136" height="46" viewBox="0 0 136 46"><rect x="4" y="5" width="120" height="32" rx="7" fill="#F28A3D" /><rect x="4" y="5" width="120" height="11" rx="7" fill="#D96B1F" />{[13, 38, 63, 88].map((x) => <rect key={x} x={x} y="10" width="17" height="13" rx="2" fill="rgba(255,255,255,0.36)" />)}<circle cx="28" cy="39" r="5" fill="#183024" /><circle cx="100" cy="39" r="5" fill="#183024" /></svg>
        </div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center pb-28">
        <motion.p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>For Parents</motion.p>
        <h1 className="font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 headline-balance" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#183024' }}>
          {['You Will Know', 'The Moment They Board.', 'And The Moment', 'They Are Home.'].map((line, i) => (
            <motion.span key={line} className="phrase-nowrap" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.58 }}>{line}</motion.span>
          ))}
        </h1>
        <motion.p className="max-w-2xl mx-auto text-lg leading-relaxed mb-8" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 }}>Tranzita sends you every update you need via WhatsApp. No app to download. No dashboard to check. No calls to make.</motion.p>
        <motion.div className="flex flex-wrap justify-center gap-3 mb-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
          <a href="/#demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white" style={{ background: '#D96B1F', boxShadow: '0 12px 28px rgba(217,107,31,0.24)' }}>Register My Child <ArrowRight size={16} /></a>
          <a href="/how-it-works" className="px-6 py-3 rounded-full text-sm font-semibold border" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>How It Works</a>
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}>
          {pills.map((pill, i) => <motion.span key={pill} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white" style={{ color: '#213A2B', borderColor: '#DDE9D2' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.12 }}>{pill}</motion.span>)}
        </motion.div>
      </div>
    </section>
  )
}
