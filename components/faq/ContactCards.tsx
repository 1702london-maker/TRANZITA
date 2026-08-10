'use client'

import { motion } from 'framer-motion'
import { CalendarCheck, Mail, MessageCircle } from 'lucide-react'

const cards = [
  {
    title: 'WhatsApp',
    body: 'The fastest way to get an answer from the Tranzita operations team.',
    cta: 'Message Us',
    href: 'https://wa.me/',
    icon: MessageCircle,
    color: '#1F6B46',
  },
  {
    title: 'Email',
    body: 'For detailed or formal questions. We respond within business hours.',
    cta: 'Email Tranzita',
    href: 'mailto:booking@tranzita.africa',
    icon: Mail,
    color: '#D96B1F',
  },
  {
    title: 'Book A Demo',
    body: 'See the service working live and ask every question on the call.',
    cta: 'Book Demo',
    href: '/contact#demo-form',
    icon: CalendarCheck,
    color: '#D96B1F',
  },
]

export default function ContactCards() {
  return (
    <section className="relative overflow-hidden px-4 py-24" style={{ background: '#F1F6EA' }}>
      <div className="absolute inset-x-0 bottom-8 opacity-20">
        <motion.div animate={{ x: ['-20%', '100%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
          <svg width="260" height="50" viewBox="0 0 260 50" fill="none">
            <rect x="10" y="12" width="220" height="28" rx="8" fill="#D96B1F" />
            <circle cx="58" cy="42" r="7" fill="#183024" />
            <circle cx="184" cy="42" r="7" fill="#183024" />
          </svg>
        </motion.div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Still Have Questions</p>
          <h2 className="headline-balance mt-3 text-4xl font-extrabold sm:text-5xl" style={{ color: '#183024' }}>
            We would rather you asked than wondered.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed" style={{ color: '#65785F' }}>
            If your question is not answered above, contact the Tranzita team directly.
          </p>
        </motion.div>
        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.a
                key={card.title}
                href={card.href}
                className="rounded-[28px] bg-white p-7 shadow-sm"
                style={{ border: '1px solid #DDE9D2' }}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6, boxShadow: '0 20px 55px rgba(217,107,31,0.16)' }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: '#FFF0E4', color: card.color }}>
                  <Icon size={24} />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold" style={{ color: '#183024' }}>{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#65785F' }}>{card.body}</p>
                <span className="mt-6 inline-flex rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: card.color }}>
                  {card.cta}
                </span>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-16 rounded-[32px] px-6 py-10 text-center sm:px-10"
          style={{ background: 'linear-gradient(100deg, #183024 0%, #1F6B46 52%, #D96B1F 100%)' }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="headline-balance text-3xl font-extrabold text-white sm:text-5xl">
            Ready to give your child the safest journey home?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">Talk to your school about Tranzita today.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="/for-schools" className="rounded-full bg-white px-6 py-3 text-sm font-extrabold" style={{ color: '#183024' }}>Register Your School</a>
            <a href="/for-parents" className="rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ border: '1px solid rgba(255,255,255,0.45)' }}>For Parents</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
