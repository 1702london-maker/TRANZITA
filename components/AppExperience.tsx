'use client'

import { motion } from 'framer-motion'
import { Bell, BusFront, ChartPie, ClipboardCheck, Download, HeartPulse, MapPinned, QrCode, School, ShieldCheck, Smartphone, Users } from 'lucide-react'

const appRoles = [
  { title: 'Parents', href: '/auth/signin?role=parent&next=/dashboard/parent', icon: Users, points: ['Live route map', 'ETA and journey status', 'Guardian handover', 'Complaints and support'] },
  { title: 'Schools', href: '/auth/signin?role=school&next=/dashboard/school', icon: School, points: ['Student onboarding', 'Route oversight', 'Parent communications', 'White-label setup'] },
  { title: 'Drivers', href: '/auth/signin?role=driver&next=/dashboard/driver', icon: BusFront, points: ['Daily route sheet', 'Vehicle checklist', 'Operations alerts', 'Journey report'] },
  { title: 'Copilots', href: '/auth/signin?role=codriver&next=/dashboard/codriver', icon: ClipboardCheck, points: ['Manifest control', 'QR tap-on and tap-off', 'Guardian checks', 'No-guardian protocol'] },
  { title: 'Nurses', href: '/auth/signin?role=nurse&next=/dashboard/nurse', icon: HeartPulse, points: ['Temperature readings', 'Welfare notes', 'First-aid actions', 'Emergency events'] },
  { title: 'Partners', href: '/auth/signin?role=partner&next=/dashboard/partner', icon: ShieldCheck, points: ['Vehicle-only tracking', 'Children onboard count', 'Inspections', 'Documents and earnings'] },
]

const phoneRows = [
  ['Amara Okorie', 'On bus', '18 mins'],
  ['Tomi Adewale', 'At school', 'Boarding soon'],
  ['Zara Bello', 'Nurse watch', 'Clear'],
]

export default function AppExperience() {
  return (
    <section className="px-4 py-24" style={{ background: 'linear-gradient(120deg, #FFF9F2 0%, #F1F6EA 100%)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>PWA App Experience</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl" style={{ color: '#183024' }}>
              Install Tranzita like an app. Use it like a control centre.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8" style={{ color: '#65785F' }}>
              The first Tranzita app is a browser-based PWA for Lagos operations. Parents, schools, crew, nurses and partners get role-specific dashboards before we package the same experience for Play Store.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/app" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ background: 'linear-gradient(90deg, #183024, #1F6B46 52%, #D96B1F)' }}>
                <Smartphone size={18} /> View App Features
              </a>
              <a href="/dashboard/parent" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold" style={{ color: '#183024', border: '1px solid #DDE9D2' }}>
                <ChartPie size={18} /> Preview Dashboard
              </a>
            </div>
          </motion.div>

          <motion.div className="relative mx-auto w-full max-w-[390px]" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rounded-[42px] bg-[#183024] p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[32px] bg-[#FFF9F2]">
                <div className="flex items-center justify-between px-5 py-4" style={{ background: '#FFF0E4' }}>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Parent PWA</p>
                    <p className="text-lg font-extrabold" style={{ color: '#183024' }}>Today Journey</p>
                  </div>
                  <span className="rounded-full bg-white p-2"><Bell size={18} color="#D96B1F" /></span>
                </div>
                <div className="p-5">
                  <div className="relative h-52 overflow-hidden rounded-[24px]" style={{ background: 'linear-gradient(135deg, #F1F6EA, #FFFFFF)', border: '1px solid #DDE9D2' }}>
                    <svg viewBox="0 0 320 190" className="absolute inset-0 h-full w-full">
                      <path d="M26 150 C78 40 140 158 196 75 C236 18 272 105 302 42" fill="none" stroke="#D96B1F" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 11" />
                    </svg>
                    <motion.div className="absolute left-8 top-28 rounded-2xl bg-white p-3 shadow-lg" animate={{ x: [0, 82, 160, 224], y: [0, -66, -52, -96] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                      <BusFront size={22} color="#D96B1F" />
                    </motion.div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[['ETA', '18m'], ['Children', '2'], ['Status', 'Live']].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-white p-3 text-center" style={{ border: '1px solid #DDE9D2' }}>
                        <p className="text-[10px] font-extrabold uppercase" style={{ color: '#65785F' }}>{label}</p>
                        <p className="mt-1 text-lg font-extrabold" style={{ color: '#183024' }}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    {phoneRows.map(([name, state, eta]) => (
                      <div key={name} className="flex items-center justify-between rounded-2xl bg-white p-3" style={{ border: '1px solid #DDE9D2' }}>
                        <div>
                          <p className="text-sm font-extrabold" style={{ color: '#183024' }}>{name}</p>
                          <p className="text-xs font-bold" style={{ color: '#65785F' }}>{state}</p>
                        </div>
                        <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: '#FFF0E4', color: '#D96B1F' }}>{eta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appRoles.map((role, index) => {
            const Icon = role.icon
            return (
              <motion.a key={role.title} href={role.href} className="gradient-frame rounded-[26px] bg-white p-5" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: '#FFF0E4', color: '#D96B1F' }}><Icon size={23} /></span>
                <h3 className="mt-4 text-xl font-extrabold" style={{ color: '#183024' }}>{role.title} App</h3>
                <div className="mt-4 grid gap-2">
                  {role.points.map((point) => (
                    <span key={point} className="flex items-center gap-2 text-sm font-bold" style={{ color: '#65785F' }}>
                      <QrCode size={14} color="#D96B1F" /> {point}
                    </span>
                  ))}
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
