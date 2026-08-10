'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Mail, MapPin, MessageCircle } from 'lucide-react'
import { email, Section, whatsapp } from './Shared'

const cards = [
  ['WhatsApp', MessageCircle, 'The fastest way to reach us. Ask about the platform, request a demo, report a concern, or ask about your child journey.', 'Open WhatsApp', whatsapp, '#25D366'],
  ['Email', Mail, 'For detailed enquiries, school contracts, partnerships, press enquiries, and formal safety requests.', 'Send An Email', `mailto:${email}`, '#D96B1F'],
  ['Book A Demo Call', CalendarDays, 'See the dashboard, driver app, parent WhatsApp flow, and live GPS tracking in a real walkthrough.', 'Book A Demo Call', '#demo-form', '#D96B1F'],
  ['Visit A Depot', MapPin, 'School administrators and principals can visit Lagos or Abuja depots by appointment.', 'Request A Depot Visit', '#demo-form', '#D96B1F'],
] as const

export default function ContactMethods() {
  return (
    <Section background="#FFF9F2" label="Get In Touch" title="Choose how you want to reach us." text="Every message goes directly to a member of the Tranzita operations team.">
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map(([title, Icon, body, cta, href, color], i) => (
          <motion.div key={title} className="gradient-frame rounded-2xl p-7" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }}>
            <Icon size={38} color={color} className="mb-5" />
            <h3 className="font-extrabold text-2xl mb-3" style={{ color: '#183024' }}>{title}</h3>
            <p className="leading-relaxed mb-5" style={{ color: '#65785F' }}>{body}</p>
            <a href={href} className="inline-flex rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: color }}>{cta}</a>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
