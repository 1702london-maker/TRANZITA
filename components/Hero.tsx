'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const WORDS = ['Every', 'child.', 'On', 'time.', 'Safe', 'home.']
const ORANGE_IDX = new Set([4, 5])

const PARTICLE_DATA = [
  { left: '8%', top: '22%', size: 4, dur: '5s', del: '0s' },
  { left: '15%', top: '65%', size: 3, dur: '7s', del: '1.2s' },
  { left: '25%', top: '38%', size: 5, dur: '6s', del: '0.5s' },
  { left: '40%', top: '78%', size: 3, dur: '8s', del: '2s' },
  { left: '55%', top: '28%', size: 4, dur: '5.5s', del: '0.8s' },
  { left: '70%', top: '55%', size: 3, dur: '7.5s', del: '1.8s' },
  { left: '82%', top: '32%', size: 5, dur: '6.5s', del: '0.3s' },
  { left: '90%', top: '70%', size: 3, dur: '9s', del: '1.5s' },
]

const TRUST = ['500+ Kids Daily', 'Live GPS', 'WhatsApp Alerts', '100% Verified Drivers', 'Zero Incidents']

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#FAFAF8', paddingTop: 96, paddingBottom: 80 }}
    >
      {/* Subtle gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '8%', left: '3%', width: 320, height: 320,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,96,28,0.05) 0%, transparent 70%)'
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '6%', width: 240, height: 240,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,216,64,0.04) 0%, transparent 70%)'
        }} />
      </div>

      {/* Floating particles (client only) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLE_DATA.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full dot-particle"
              style={{
                left: p.left, top: p.top,
                width: p.size, height: p.size,
                background: i % 3 === 0 ? '#E8601C' : i % 3 === 1 ? '#F5D840' : '#8FA88F',
                ['--duration' as string]: p.dur,
                ['--delay' as string]: p.del,
              }}
            />
          ))}
        </div>
      )}

      {/* Nigerian cityscape — bus scrolls past city labels */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
          {/* Road */}
          <rect x="0" y="182" width="1440" height="18" fill="#E8F2E8" />
          <line x1="0" y1="190" x2="1440" y2="190" stroke="#D0E4D0" strokeWidth="1" strokeDasharray="20 10" />

          {/* LAGOS */}
          <rect x="18" y="115" width="48" height="85" fill="#E8F2E8" rx="2" />
          <rect x="28" y="92" width="30" height="108" fill="#DFF0DF" rx="1" />
          <rect x="68" y="108" width="25" height="92" fill="#E0EAE0" rx="2" />
          <rect x="95" y="82" width="40" height="118" fill="#E8F2E8" rx="2" />
          <rect x="102" y="64" width="26" height="136" fill="#DFF0DF" rx="1" />
          <text x="68" y="112" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">LAGOS</text>

          {/* IBADAN */}
          <rect x="175" y="108" width="36" height="92" fill="#E0EAE0" rx="2" />
          <rect x="215" y="88" width="44" height="112" fill="#E8F2E8" rx="2" />
          <rect x="222" y="70" width="30" height="130" fill="#DFF0DF" rx="1" />
          <rect x="262" y="102" width="32" height="98" fill="#E0EAE0" rx="2" />
          <text x="220" y="106" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">IBADAN</text>

          {/* ABUJA */}
          <rect x="335" y="76" width="50" height="124" fill="#DFF0DF" rx="2" />
          <rect x="345" y="55" width="30" height="145" fill="#E8F2E8" rx="1" />
          <rect x="390" y="90" width="40" height="110" fill="#E0EAE0" rx="2" />
          <rect x="434" y="78" width="36" height="122" fill="#E8F2E8" rx="2" />
          <rect x="440" y="58" width="24" height="142" fill="#DFF0DF" rx="1" />
          <text x="388" y="73" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">ABUJA</text>

          {/* KANO */}
          <rect x="515" y="100" width="38" height="100" fill="#E8F2E8" rx="2" />
          <rect x="558" y="84" width="34" height="116" fill="#DFF0DF" rx="2" />
          <rect x="565" y="66" width="20" height="134" fill="#E0EAE0" rx="1" />
          <rect x="596" y="97" width="30" height="103" fill="#E8F2E8" rx="2" />
          <text x="555" y="82" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">KANO</text>

          {/* PORT HARCOURT */}
          <rect x="660" y="88" width="46" height="112" fill="#DFF0DF" rx="2" />
          <rect x="670" y="66" width="26" height="134" fill="#E8F2E8" rx="1" />
          <rect x="712" y="76" width="44" height="124" fill="#E0EAE0" rx="2" />
          <rect x="720" y="52" width="28" height="148" fill="#E8F2E8" rx="1" />
          <rect x="760" y="94" width="32" height="106" fill="#DFF0DF" rx="2" />
          <text x="710" y="64" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="1.5" fontFamily="'Plus Jakarta Sans',sans-serif">PORT HARCOURT</text>

          {/* ENUGU */}
          <rect x="840" y="106" width="34" height="94" fill="#E8F2E8" rx="2" />
          <rect x="878" y="88" width="40" height="112" fill="#DFF0DF" rx="2" />
          <rect x="885" y="70" width="26" height="130" fill="#E0EAE0" rx="1" />
          <rect x="922" y="100" width="32" height="100" fill="#E8F2E8" rx="2" />
          <text x="882" y="86" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">ENUGU</text>

          {/* BENIN */}
          <rect x="998" y="94" width="38" height="106" fill="#E0EAE0" rx="2" />
          <rect x="1040" y="80" width="36" height="120" fill="#E8F2E8" rx="2" />
          <rect x="1047" y="62" width="22" height="138" fill="#DFF0DF" rx="1" />
          <rect x="1080" y="98" width="32" height="102" fill="#E0EAE0" rx="2" />
          <text x="1040" y="78" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">BENIN</text>

          {/* KADUNA */}
          <rect x="1142" y="104" width="36" height="96" fill="#E8F2E8" rx="2" />
          <rect x="1182" y="86" width="42" height="114" fill="#DFF0DF" rx="2" />
          <rect x="1189" y="66" width="28" height="134" fill="#E0EAE0" rx="1" />
          <rect x="1228" y="99" width="33" height="101" fill="#E8F2E8" rx="2" />
          <text x="1185" y="83" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">KADUNA</text>

          {/* JOS */}
          <rect x="1295" y="110" width="34" height="90" fill="#DFF0DF" rx="2" />
          <rect x="1334" y="96" width="40" height="104" fill="#E8F2E8" rx="2" />
          <rect x="1340" y="78" width="28" height="122" fill="#E0EAE0" rx="1" />
          <rect x="1378" y="106" width="52" height="94" fill="#E8F2E8" rx="2" />
          <text x="1340" y="94" textAnchor="middle" fill="#A8C0A8" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">JOS</text>
        </svg>

        {/* Animated EV bus scrolling */}
        <div className="absolute bus-drive" style={{ bottom: 16, left: 0 }}>
          <svg width="110" height="36" viewBox="0 0 110 36">
            <rect x="3" y="3" width="97" height="26" fill="#E8601C" rx="6" />
            <rect x="3" y="3" width="97" height="9" fill="#C85018" rx="6" />
            <rect x="8" y="7" width="18" height="12" fill="rgba(255,255,255,0.35)" rx="2" />
            <rect x="30" y="7" width="14" height="12" fill="rgba(255,255,255,0.25)" rx="2" />
            <rect x="48" y="7" width="14" height="12" fill="rgba(255,255,255,0.25)" rx="2" />
            <rect x="66" y="7" width="14" height="12" fill="rgba(255,255,255,0.25)" rx="2" />
            <rect x="1" y="23" width="105" height="4" fill="#B84815" rx="2" />
            <circle cx="20" cy="31" r="5" fill="#1E2B1E" />
            <circle cx="20" cy="31" r="2" fill="#8FA88F" />
            <circle cx="82" cy="31" r="5" fill="#1E2B1E" />
            <circle cx="82" cy="31" r="2" fill="#8FA88F" />
            <rect x="84" y="5" width="9" height="5" rx="1" fill="white" />
            <rect x="84" y="5" width="2.5" height="5" rx="1" fill="#006600" />
            <rect x="90.5" y="5" width="2.5" height="5" rx="1" fill="#006600" />
            <rect x="5" y="16" width="14" height="6" fill="#F5D840" rx="2" />
            <text x="6" y="21" fill="#1E2B1E" fontSize="5" fontWeight="800" fontFamily="sans-serif">EV</text>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{ background: 'rgba(232,96,28,0.07)', color: '#C85018', border: '1px solid rgba(232,96,28,0.13)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Now Operating Across Nigeria — Made &amp; Coupled In Nigeria
        </motion.div>

        {/* Headline — smaller */}
        <h1 className="font-extrabold leading-tight mb-5 flex flex-wrap justify-center gap-x-3 gap-y-1"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              style={{ color: ORANGE_IDX.has(i) ? '#E8601C' : '#1E2B1E' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
          style={{ color: '#6B7F6B' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          Nigeria&apos;s first dedicated school pickup &amp; drop-off platform. Verified drivers, co-drivers and onboard nurses — with live GPS and WhatsApp updates for every parent.
        </motion.p>

        {/* Smaller buttons */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.45 }}
        >
          <motion.a
            href="#demo"
            className="px-6 py-3 rounded-full font-bold text-white text-sm"
            style={{ background: '#E8601C', boxShadow: '0 4px 18px rgba(232,96,28,0.22)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(232,96,28,0.32)' }}
            whileTap={{ scale: 0.97 }}
          >
            Request a Demo →
          </motion.a>
          <motion.a
            href="#how-it-works"
            className="px-6 py-3 rounded-full font-semibold text-sm border"
            style={{ color: '#1E2B1E', borderColor: '#D0DDD0', background: '#FAFAF8' }}
            whileHover={{ scale: 1.02, borderColor: '#E8601C', color: '#E8601C' }}
            whileTap={{ scale: 0.97 }}
          >
            See How It Works
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {TRUST.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: '#F2F5F0', color: '#2C3A2C', border: '1px solid #E0EAE0' }}
            >
              ✓ {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 scroll-arrow"
        style={{ bottom: 56 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="#8FA88F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
