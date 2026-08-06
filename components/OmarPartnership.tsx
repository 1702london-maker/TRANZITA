'use client'
import { motion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

export default function OmarPartnership() {
  return (
    <section id="omar" className="py-20 px-4 overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
        >
          In exclusive partnership with
        </motion.p>

        {/* Omar.com logo placeholder */}
        <motion.div
          className="inline-flex items-center justify-center rounded-2xl mb-8"
          style={{
            width: 240,
            height: 80,
            background: '#F4F4F0',
            border: '2px solid #e5e5e5',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5 }}
        >
          <span className="font-black text-3xl" style={{ color: '#0C0C14' }}>
            OMAR<span style={{ color: '#E8601C' }}>.com</span>
          </span>
        </motion.div>

        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Tranzita Schools runs exclusively on Omar.com electric vehicles â€” the cleanest, safest, most advanced fleet on Nigerian roads.
        </motion.p>

        {/* Animated EV car */}
        <div className="relative my-10 overflow-hidden" style={{ height: 80 }}>
          <div className="car-drive absolute" style={{ top: 0 }}>
            <svg width="160" height="60" viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="20" width="130" height="32" rx="8" fill="#E8601C" />
              <path d="M20 20 Q40 4 70 4 Q100 4 120 20Z" fill="#CC4200" />
              <rect x="25" y="7" width="28" height="14" rx="3" fill="rgba(200,230,255,0.9)" />
              <rect x="62" y="7" width="28" height="14" rx="3" fill="rgba(200,230,255,0.9)" />
              <rect x="99" y="7" width="16" height="14" rx="3" fill="rgba(200,230,255,0.9)" />
              <rect x="10" y="38" width="130" height="8" fill="#aa3500" />
              <text x="75" y="35" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">TRANZITA â€¢ OMAR.COM EV</text>
              <circle cx="35" cy="52" r="8" fill="#222" />
              <circle cx="35" cy="52" r="4" fill="#444" />
              <circle cx="115" cy="52" r="8" fill="#222" />
              <circle cx="115" cy="52" r="4" fill="#444" />
              <rect x="130" y="22" width="14" height="8" rx="2" fill="#FFE000" />
              <rect x="2" y="28" width="8" height="5" rx="1" fill="#ff4500" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Partnership logos */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
        >
          <div
            className="rounded-xl px-5 py-3 flex items-center justify-center"
            style={{ background: '#F4F4F0', border: '1px solid #e5e5e5' }}
          >
            <span className="font-black text-xl" style={{ color: '#0C0C14' }}>
              TRANZITA <span style={{ color: '#E8601C' }}>SCHOOLS</span>
            </span>
          </div>
          <span className="text-3xl font-light text-gray-300">Ã—</span>
          <div
            className="rounded-xl px-5 py-3 flex items-center justify-center"
            style={{ background: '#F4F4F0', border: '1px solid #e5e5e5' }}
          >
            <span className="font-black text-xl" style={{ color: '#0C0C14' }}>
              OMAR<span style={{ color: '#E8601C' }}>.com</span>
            </span>
          </div>
        </motion.div>

        <motion.p
          className="text-gray-500 text-sm max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ delay: 0.5 }}
        >
          Every vehicle is GPS tracked, child-safe certified, and charged overnight at school premises across Nigeria.
        </motion.p>
      </div>
    </section>
  )
}

