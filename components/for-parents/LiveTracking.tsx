'use client'

import { motion } from 'framer-motion'
import { Globe, RadioTower, Route, UsersRound, type LucideIcon } from 'lucide-react'
import { Section } from './Shared'

const features: Array<[string, LucideIcon, string]> = [
  ['Opens in any browser', Globe, 'The Tranzita PWA opens in Chrome, Safari, or any standard mobile browser. Native mobile apps are coming soon.'],
  ['Updates every 30 seconds', RadioTower, 'The bus position updates every 30 seconds, with automatic ETA messages when traffic changes.'],
  ['See every stop', Route, 'The map shows registered stops ahead of your address so you understand the sequence.'],
  ['Family can track too', UsersRound, 'Forward the link to another trusted family member so everyone who matters stays informed.'],
]

export default function LiveTracking() {
  return (
    <Section background="#FFF9F2" label="The Tracking" title="See the bus. See your child's stop. See the ETA." text="Live tracking works through the browser-based Tranzita PWA today. App Store and Google Play apps are coming soon.">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          {features.map(([title, Icon, body], i) => (
            <motion.div key={String(title)} className="flex gap-4 rounded-2xl bg-white p-5 border border-[#DDE9D2]" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Icon size={26} color="#D96B1F" className="shrink-0 mt-1" />
              <div><h3 className="font-extrabold mb-1" style={{ color: '#183024' }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p></div>
            </motion.div>
          ))}
        </div>
        <motion.div className="float-phone mx-auto w-full max-w-sm rounded-[2rem] p-4 border" style={{ background: '#FFF0E4', borderColor: '#DDE9D2', boxShadow: '0 24px 60px rgba(24,48,36,0.12)' }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="rounded-[1.4rem] overflow-hidden bg-[#F1F6EA] min-h-[500px] relative">
            <div className="px-4 py-4 flex justify-between items-center text-white" style={{ background: '#1F6B46' }}><span className="font-bold">TRZ-004 Live</span><span className="text-xs">ETA 3:57 PM</span></div>
            <svg className="absolute inset-x-4 top-20 h-[330px] w-[calc(100%-2rem)]" viewBox="0 0 300 330">
              <path d="M32 278 C80 180, 120 245, 165 150 S245 90, 265 48" stroke="#C9DDBE" strokeWidth="14" fill="none" strokeLinecap="round" />
              {[55, 126, 190, 244].map((x, i) => <circle key={x} cx={x} cy={i === 0 ? 238 : i === 1 ? 205 : i === 2 ? 122 : 72} r="7" fill="#fff" stroke="#D96B1F" strokeWidth="3" />)}
              <motion.circle r="10" fill="#D96B1F" animate={{ offsetDistance: ['0%', '100%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} style={{ offsetPath: "path('M32 278 C80 180, 120 245, 165 150 S245 90, 265 48')" }} />
            </svg>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white p-4 border border-[#DDE9D2]">
              <p className="text-xs font-bold" style={{ color: '#D96B1F' }}>2 stops before your home</p>
              <p className="font-extrabold" style={{ color: '#183024' }}>Arriving in 4 minutes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
