'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const FAQS = [
  {
    group: 'For Parents',
    items: [
      {
        q: 'What if my child misses the bus?',
        a: "The co-driver contacts the parent directly within 2 minutes of the scheduled pickup time. If there is no response, the operations centre calls all emergency contacts. The child is never left without a confirmed arrangement. Every missed pickup is logged and followed up by the operations team the same day.",
      },
      {
        q: 'What if no one is home at drop-off?',
        a: "The child does not leave the bus. This is a non-negotiable rule with no exceptions. The co-driver stays with the child on the bus while the operations centre calls the parent and all listed emergency contacts. If no contact is made within 30 minutes, the child is returned to school or to a verified alternative address that has been pre-approved on the child's profile.",
      },
      {
        q: 'Can I change the drop-off address temporarily?',
        a: "Yes but not on the same day. Any address change must be submitted through the parent app or by WhatsApp to the operations team before 10 PM the evening before the change is needed. Same-day changes cannot be accommodated due to safeguarding verification requirements. Permanent address changes take 48 hours to reroute in the system.",
      },
      {
        q: 'Can grandparents or other family members collect at drop-off?',
        a: "Yes. Up to four verified guardians can be added to a child's profile. Each additional guardian must be verified by both the school and the parent. Verification requires a photo ID and a signed consent form submitted through the parent portal. No unverified individual will ever receive a child from a Tranzita bus regardless of the explanation given at the door.",
      },
      {
        q: 'How do I know who is driving my child on any given day?',
        a: "Every parent receives a morning message containing the names, photos, and Tranzita ID numbers of the driver, co-driver, and nurse assigned to their child's route that day. Each crew member has a QR code on their Tranzita ID card that parents can scan to verify their clearance status in real time through the app.",
      },
    ],
  },
  {
    group: 'For Schools',
    items: [
      {
        q: 'How long does onboarding take?',
        a: "The full onboarding process from contract signing to first live route takes between 5 and 10 working days. This includes student registration, route mapping, crew assignment, parent onboarding, driver app setup, and a full test run before the first live day. A dedicated Tranzita onboarding manager is assigned to every school and remains the primary contact throughout.",
      },
      {
        q: 'What happens if a driver is absent on a given day?',
        a: "Tranzita maintains a verified reserve crew pool in every city where we operate. A replacement crew is dispatched within 60 minutes of receiving a sick notice. Parents are notified of any crew change before the bus departs for the day. No route is ever cancelled because of a crew absence.",
      },
      {
        q: "Can schools set their own rules for routes?",
        a: "Yes. Schools can specify speed thresholds per road zone, approved stop locations, music restrictions, drop-off sequencing for safeguarding reasons, and communication preferences. All school-specified rules are loaded into the Tranzita Driver App and enforced by the system automatically without relying on driver compliance.",
      },
      {
        q: 'What data does the school receive and how is it stored?',
        a: "Schools receive a live dashboard, a weekly safety digest, and a formal report within 24 hours of any incident. All journey data, crew logs, speed records, tap-on tap-off events, and manifest records are stored encrypted for a minimum of three years. All data is available for safeguarding audits on request. Full data handling documentation is provided at the point of onboarding.",
      },
    ],
  },
]

function AccordionItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.45 }}
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid #E2EDD8' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
        style={{ background: open ? '#F1F6EA' : '#FFFFFF' }}
      >
        <span className="font-semibold text-sm pr-4" style={{ color: '#1E2B1E' }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl shrink-0 font-light"
          style={{ color: '#E8601C' }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 py-4 text-sm leading-relaxed" style={{ color: '#6B7F6B', borderTop: '1px solid #E2EDD8' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQAccordion() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>Questions</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl" style={{ color: '#1E2B1E' }}>
            Everything you <span style={{ color: '#E8601C' }}>need to know.</span>
          </h2>
        </div>

        <div className="space-y-10">
          {FAQS.map((group, gi) => (
            <div key={gi}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: gi * 0.2 }}
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: '#E8601C' }}
              >
                {group.group}
              </motion.p>
              <div className="space-y-2">
                {group.items.map((item, ii) => (
                  <AccordionItem key={ii} q={item.q} a={item.a} delay={gi * 0.1 + ii * 0.06} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
