'use client'

import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { motion } from 'framer-motion'
import { Database, FileText, Lock, Mail, ShieldCheck, UserRoundCheck } from 'lucide-react'

const email = 'booking@tranzita.africa'

const dataSections = [
  {
    title: '2.1 Child Data',
    body: 'We collect the child full name, school name, class, home address, and medical summary including known conditions and allergies provided by the parent at registration. We collect tap-on and tap-off event data including timestamp and GPS coordinates for every journey. We collect nurse welfare notes where the nurse records a health or behaviour observation during a journey. Child data is treated with the highest level of protection and is never shared with any third party for any commercial purpose.',
  },
  {
    title: '2.2 Parent and Guardian Data',
    body: 'We collect the full name, phone number, WhatsApp number, email address, home address, and photo ID of each registered parent and each verified guardian. We use this data to send journey alerts, verify guardian identity at drop-off, and contact parents in the event of an incident or concern.',
  },
  {
    title: '2.3 School Data',
    body: 'We collect school name, address, contact details, the names and roles of authorised school users, and student registration data provided by the school. We use this data to operate the school dashboard and to manage routes and manifests.',
  },
  {
    title: '2.4 Crew Member Data',
    body: 'We collect full personal details, biometric data, identity documents, criminal clearance certificates, FRSC records, medical fitness records, drug screening results, guarantor details, and home address verification records for all crew members. Biometric data is encrypted and stored separately from other crew member data.',
  },
  {
    title: '2.5 Journey Data',
    body: 'We collect GPS position, speed, bus ID, crew on duty, tap events, guardian confirmations, nurse welfare notes, and any incident flags for every journey. Journey data is stored for a minimum of three years.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <section className="relative min-h-[50vh] flex items-center justify-center px-4" style={{ paddingTop: 118, background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
          <div className="max-w-4xl mx-auto text-center py-16">
            <motion.p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Tranzita</motion.p>
            <motion.h1 className="font-extrabold text-5xl sm:text-6xl headline-balance mb-5" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>Privacy Policy</motion.h1>
            <motion.p className="font-bold mb-4" style={{ color: '#D96B1F' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>Last updated: August 2026</motion.p>
            <motion.p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Tranzita is committed to protecting the privacy of every child, parent, school, and crew member on the platform. This policy explains what data we collect, why we collect it, how we store it, and your rights in relation to it.
            </motion.p>
          </div>
        </section>

        <PolicySection icon={UserRoundCheck} label="1. Who We Are" background="#FFF9F2">
          <p>Tranzita is a school transport platform operated by Tranzita Nigeria Ltd registered in Nigeria.</p>
          <p>We operate as a data controller for the personal data of parents, children, schools, and crew members on the platform.</p>
          <p>Contact for data matters: <a href={`mailto:${email}`} className="font-bold" style={{ color: '#D96B1F' }}>{email}</a> marked Data Privacy Enquiry.</p>
        </PolicySection>

        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading icon={Database} label="2. Data We Collect" />
            <div className="grid gap-5">
              {dataSections.map((item, i) => (
                <motion.article key={item.title} className="rounded-2xl bg-white p-6 border border-[#DDE9D2]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <h3 className="font-extrabold text-xl mb-3" style={{ color: '#183024' }}>{item.title}</h3>
                  <p className="leading-relaxed" style={{ color: '#65785F' }}>{item.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <PolicySection icon={FileText} label="3. How We Use Your Data" background="#FFF9F2">
          <p>We use the data we collect solely to operate the Tranzita platform.</p>
          <p>Specifically, we use child and guardian data to manage safe drop-off and send WhatsApp journey alerts. We use journey data to operate the school dashboard and investigate any incident or complaint.</p>
          <p>We use crew data to manage vetting, scheduling, and performance monitoring. We use school data to manage routes, manifests, and school billing.</p>
          <p>We do not use any personal data for advertising. We do not sell any personal data to any third party. We do not share personal data with any commercial partner except where required to operate the platform.</p>
        </PolicySection>

        <PolicySection icon={Lock} label="4. Data Storage and Security" background="#F1F6EA">
          <p>All Tranzita data is stored on encrypted servers using Supabase infrastructure with PostgreSQL databases.</p>
          <p>All data is encrypted at rest and in transit using industry standard AES-256 encryption. Biometric data is stored separately from all other personal data with additional access controls.</p>
          <p>Access to personal data is restricted to Tranzita team members who require it to perform their specific operational role. All access to personal data is logged.</p>
          <p>We use OWASP ZAP for continuous automated security scanning of our platform.</p>
        </PolicySection>

        <PolicySection icon={ShieldCheck} label="5. Your Rights" background="#FFF9F2">
          <p>You have the right to request a copy of all personal data Tranzita holds about you or your child at any time.</p>
          <p>You have the right to request correction of inaccurate data, request deletion subject to our legal retention obligations, and object to our processing of your data.</p>
          <p>To exercise these rights contact <a href={`mailto:${email}`} className="font-bold" style={{ color: '#D96B1F' }}>{email}</a> marked Data Rights Request. We will respond within 14 days.</p>
        </PolicySection>

        <PolicySection icon={ShieldCheck} label="6. Children's Data" background="#F1F6EA">
          <p>We treat all data relating to children with the highest level of protection.</p>
          <p>Child data is never used for any purpose other than operating the safe transport of that specific child. Child data is never shared with any third party except the school the child is registered at and the crew members assigned to that child route.</p>
          <p>We do not retain child data beyond three years from the child last journey on the platform except where legally required to retain incident records relating to that child.</p>
        </PolicySection>

        <PolicySection icon={Mail} label="7. Contact" background="#FFF9F2">
          <p>For all privacy enquiries contact: <a href={`mailto:${email}`} className="font-bold" style={{ color: '#D96B1F' }}>{email}</a> marked Privacy Policy Enquiry.</p>
          <p>Tranzita Nigeria Ltd. Lagos, Nigeria.</p>
        </PolicySection>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}

function SectionHeading({ icon: Icon, label }: { icon: typeof Database; label: string }) {
  return (
    <div className="mb-10">
      <motion.div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#FFF0E4' }} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <Icon size={26} color="#D96B1F" />
      </motion.div>
      <motion.h2 className="font-extrabold text-3xl sm:text-4xl headline-balance" style={{ color: '#183024' }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{label}</motion.h2>
    </div>
  )
}

function PolicySection({ icon, label, background, children }: { icon: typeof Database; label: string; background: string; children: React.ReactNode }) {
  return (
    <section className="py-20 px-4" style={{ background }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading icon={icon} label={label} />
        <motion.div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#DDE9D2] space-y-4 leading-relaxed" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
