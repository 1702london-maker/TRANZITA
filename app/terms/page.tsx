'use client'

import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { motion } from 'framer-motion'
import { FileText, Mail } from 'lucide-react'

const sections = [
  {
    label: '1. The Service',
    body: 'Tranzita provides a managed school transport service including route planning, crew management, GPS tracking, parent notifications, and school operations dashboards. The service is provided to schools under a school transport agreement and to parents as registered users of a school that has contracted with Tranzita.',
    background: '#FFF9F2',
  },
  {
    label: '2. School Obligations',
    body: 'Schools contracting with Tranzita agree to provide accurate student registration data, maintain current guardian verification records, notify Tranzita of any changes to student transport requirements with a minimum of 48 hours notice, ensure all parents of registered students are enrolled in the WhatsApp alert system, cooperate with the Tranzita onboarding process, and pay all invoices within the agreed payment terms. Schools agree not to permit any unregistered vehicle to serve as an alternative to Tranzita transport for students registered on the Tranzita programme without notifying Tranzita in advance.',
    background: '#F1F6EA',
  },
  {
    label: '3. Parent Obligations',
    body: 'Parents registering children with Tranzita agree to provide accurate child and guardian information at registration and to update that information promptly when it changes. Parents agree to ensure a verified guardian is present at the drop-off address at the agreed drop-off time. Parents understand and accept that Tranzita will not release a child to any person not on the verified guardian list regardless of any explanation provided. Parents agree to notify Tranzita of any absence before 10 AM on the day of the absence. Parents agree not to share the child tracking link with any person who is not a verified guardian of the child.',
    background: '#FFF9F2',
  },
  {
    label: '4. Tranzita Obligations',
    body: 'Tranzita agrees to provide a driver, co-driver, and registered nurse on every route every school day. Tranzita agrees to vet all crew members through the full six-stage process before assignment to any route. Tranzita agrees to send WhatsApp alerts to all registered parents at every key journey event. Tranzita agrees to maintain the GPS tracking system and the school dashboard in working order. Tranzita agrees to respond to parent and school communications within the response times stated in the Tranzita communications policy. Tranzita agrees to provide incident reports to schools within 24 hours of any reportable incident.',
    background: '#F1F6EA',
  },
  {
    label: '5. Payments and Billing',
    body: 'Schools are billed per student per term at the rate confirmed in the school transport agreement. Invoices are issued at the start of each term and are due within 14 days of issue. Late payment may result in suspension of the transport service for that school with 48 hours written notice. All billing is managed through the Tranzita school finance portal. No cash payments are accepted under any circumstances.',
    background: '#FFF9F2',
  },
  {
    label: '6. Limitation of Liability',
    body: 'Tranzita will not be liable for any delay or failure to deliver the service caused by events outside our reasonable control including road closures, natural disasters, government action, or school closures. Tranzita liability in relation to any incident on the platform is limited to the insurance coverage maintained by Tranzita for that incident type. Schools and parents are responsible for ensuring that their contact details and guardian information are accurate and current. Tranzita accepts no liability for failed drop-offs resulting from inaccurate guardian information provided by the parent or school.',
    background: '#F1F6EA',
  },
  {
    label: '7. Termination',
    body: 'Either party may terminate the school transport agreement at the end of any term with written notice provided before the start of the following term. Tranzita reserves the right to terminate the agreement immediately in the event of non-payment, provision of false information at registration, or any action by the school or parent that compromises the safety of children or crew on the platform.',
    background: '#FFF9F2',
  },
  {
    label: '8. Governing Law',
    body: 'These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising from these terms shall be subject to the exclusive jurisdiction of the Nigerian courts.',
    background: '#F1F6EA',
  },
]

export default function TermsPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <section className="relative min-h-[50vh] flex items-center justify-center px-4" style={{ paddingTop: 118, background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
          <div className="max-w-4xl mx-auto text-center py-16">
            <motion.p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Tranzita</motion.p>
            <motion.h1 className="font-extrabold text-5xl sm:text-6xl headline-balance mb-5" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>Terms of Service</motion.h1>
            <motion.p className="font-bold mb-4" style={{ color: '#D96B1F' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>Last updated: August 2026</motion.p>
            <motion.p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              These terms govern the use of the Tranzita platform by schools, parents, and crew members across Nigeria. By registering with or using the Tranzita platform you agree to these terms in full.
            </motion.p>
          </div>
        </section>

        {sections.map((section, i) => (
          <PolicySection key={section.label} label={section.label} body={section.body} background={section.background} delay={i * 0.03} />
        ))}

        <section className="py-20 px-4" style={{ background: '#FFF9F2' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading label="9. Contact" />
            <motion.div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#DDE9D2] space-y-4 leading-relaxed" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p>For all terms enquiries contact: <a href="mailto:booking@tranzita.africa" className="font-bold" style={{ color: '#D96B1F' }}>booking@tranzita.africa</a> marked Terms Enquiry.</p>
              <p>Tranzita Nigeria Ltd. Lagos, Nigeria.</p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-8">
      <motion.div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#FFF0E4' }} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        {label.startsWith('9') ? <Mail size={26} color="#D96B1F" /> : <FileText size={26} color="#D96B1F" />}
      </motion.div>
      <motion.h2 className="font-extrabold text-3xl sm:text-4xl headline-balance" style={{ color: '#183024' }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{label}</motion.h2>
    </div>
  )
}

function PolicySection({ label, body, background, delay }: { label: string; body: string; background: string; delay: number }) {
  return (
    <section className="py-20 px-4" style={{ background }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading label={label} />
        <motion.div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#DDE9D2] leading-relaxed" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}>
          {body}
        </motion.div>
      </div>
    </section>
  )
}
