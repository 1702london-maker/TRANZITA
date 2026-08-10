'use client'

import { motion } from 'framer-motion'
import { Globe, Share2, Timer, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const routes = ['M70 360 C190 160 320 330 530 110 S690 160 760 72', 'M85 100 C250 130 350 80 500 190 S650 300 780 210', 'M110 270 C250 210 330 130 455 250 S610 350 730 292']
const cards: Array<[string, LucideIcon, string]> = [
  ['Opens in any browser', Globe, 'The tracking link arrives in WhatsApp. Tap it and the map opens in Chrome, Safari, or any browser. No login.'],
  ['Updates automatically', Timer, 'The bus position updates every 30 seconds. Put your phone down, pick it up later, and the ETA has moved.'],
  ['Share the link', Share2, 'Forward the tracking link to a spouse, grandparent, or nanny so multiple people can watch the same live map.'],
]

export default function LiveMapSection() {
  return (
    <Section background="#F1F6EA" label="The Live Map" title="This is what you see the moment your child boards the bus." text="Not a static map. The exact location of your child's bus updated every 30 seconds in a live map opened from WhatsApp.">
      <div className="relative h-[320px] md:h-[500px] rounded-3xl overflow-hidden bg-white border border-[#DDE9D2] mb-10">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 840 520" preserveAspectRatio="none">
          {routes.map((d, i) => <path key={d} d={d} stroke={i % 2 ? '#DDE9D2' : '#C9DDBE'} strokeWidth="16" fill="none" strokeLinecap="round" />)}
          {routes.map((d, i) => (
            <g key={`m-${i}`}>
              <motion.circle r="14" fill="rgba(217,107,31,0.18)" animate={{ offsetDistance: ['0%', '100%'], scale: [1, 1.5, 1] }} transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }} style={{ offsetPath: `path('${d}')` }} />
              <motion.circle r="8" fill="#D96B1F" animate={{ offsetDistance: ['0%', '100%'] }} transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }} style={{ offsetPath: `path('${d}')` }} />
              <motion.text fontSize="16" fontWeight="900" fill="#183024" animate={{ offsetDistance: ['0%', '100%'] }} transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }} style={{ offsetPath: `path('${d}')`, translate: '16px -16px' }}>TRZ-00{i + 1}</motion.text>
            </g>
          ))}
          {[80, 115, 740, 765, 120, 720].map((x, i) => <motion.circle key={i} cx={x} cy={i < 2 ? 95 + i * 255 : i < 4 ? 85 + (i - 2) * 210 : 285 + (i - 4) * 20} r="10" fill={i % 2 ? '#1F6B46' : '#F8C84E'} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />)}
        </svg>
        <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-4 py-3 shadow-md"><p className="text-xs font-bold" style={{ color: '#65785F' }}>Live Fleet</p><p className="font-extrabold" style={{ color: '#183024' }}>3 buses active</p></div>
      </div>
      <IconCards cards={cards} />
    </Section>
  )
}
