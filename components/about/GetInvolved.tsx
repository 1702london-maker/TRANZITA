'use client'

import { motion } from 'framer-motion'
import { LiftCard, SectionIntro } from './Shared'

const actions = [
  ['For Schools', 'Register Your School', 'Give every parent in your school a safer, clearer transport experience. Bring Tranzita to your routes and see how it works with your actual student locations.', '/for-schools', 'Register Your School'],
  ['For Parents', 'Tell Your School', "If your child's school is not yet on Tranzita, share this with the principal or transport coordinator. One conversation can change every afternoon.", '/for-parents', 'Share With My School'],
  ['For Crew', 'Join The Team', "We are recruiting drivers, co-drivers, and nurses who understand what it means to be responsible for someone else's child.", '/careers', 'Apply Now'],
  ['For Investors', 'Invest In This', 'Tranzita is building safety infrastructure for Nigerian school transport with a serious platform, grassroots market insight, and a huge national need.', '/contact', 'Get In Touch'],
]

export default function GetInvolved() {
  return (
    <section className="relative overflow-hidden px-4 py-24" style={{ background: '#F1F6EA' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="Get Involved" title="Four ways to be part of this." subtitle="Whether you are a school, a parent, a crew member, or someone who believes in what we are building, there is a place for you." />
        <motion.div className="mt-12 grid gap-5 md:grid-cols-2" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          {actions.map(([label, title, body, href, cta]) => (
            <LiftCard key={title}>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>{label}</p>
              <h3 className="mt-3 text-3xl font-extrabold" style={{ color: '#183024' }}>{title}</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
              <a href={href} className="mt-6 inline-flex rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>{cta}</a>
            </LiftCard>
          ))}
        </motion.div>
        <motion.div className="relative mt-16 overflow-hidden rounded-[32px] px-6 py-12 text-center sm:px-10" style={{ background: 'linear-gradient(100deg, #FFF0E4 0%, #FFF9F2 45%, #F28A3D 100%)', border: '1px solid rgba(217,107,31,0.24)' }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <motion.div className="absolute bottom-5 left-0 opacity-20" animate={{ x: ['-15%', '110%'] }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
            <svg width="220" height="44" viewBox="0 0 220 44"><rect x="6" y="10" width="190" height="25" rx="8" fill="white" /><circle cx="48" cy="36" r="6" fill="#183024" /><circle cx="154" cy="36" r="6" fill="#183024" /></svg>
          </motion.div>
          <h2 className="headline-balance text-3xl font-extrabold sm:text-5xl" style={{ color: '#183024' }}>Built from the ground. Designed for children. Ready to set the pace.</h2>
          <p className="mx-auto mt-4 max-w-2xl" style={{ color: '#65785F' }}>Join the schools and parents already trusting Tranzita with the most important journey their children make every single day.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="/for-schools" className="rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>Register Your School</a>
            <a href="/contact#demo-form" className="rounded-full px-6 py-3 text-sm font-extrabold" style={{ color: '#183024', border: '1px solid rgba(217,107,31,0.28)', background: 'rgba(255,249,242,0.82)' }}>Request a Demo</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
