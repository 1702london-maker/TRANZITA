'use client'

import { motion } from 'framer-motion'
import { Bus, HeartPulse, Headphones, UsersRound, type LucideIcon } from 'lucide-react'
import { Section } from './Shared'

const roles: Array<{ id: string; title: string; icon: LucideIcon; locations: string; apply: string; duties: string; needs: string; offers: string }> = [
  {
    id: 'drivers',
    title: 'Bus Driver',
    icon: Bus,
    locations: 'Lagos now. Abuja and Port Harcourt interest list.',
    apply: 'Apply As A Driver',
    duties: 'Operate electric buses on assigned school routes, follow the Tranzita Driver App route, complete biometric login, submit pre-departure checks, monitor speed, and complete daily route debriefs.',
    needs: "A current Nigerian driver's licence, three years urban driving experience, clean FRSC record, ability to complete six-stage vetting, and a non-family guarantor who is a registered property owner.",
    offers: 'Competitive monthly salary, uniform and ID, EV training, Driver App training, annual recertification, and progression to Senior Driver or Route Supervisor.',
  },
  {
    id: 'co-drivers',
    title: 'Co-Driver',
    icon: UsersRound,
    locations: 'Lagos now. Abuja and Port Harcourt interest list.',
    apply: 'Apply As A Co-Driver',
    duties: 'Manage boarding and alighting, call children by name, operate tap-on and tap-off, monitor wellbeing, support parent communication, and walk children to verified guardians.',
    needs: 'Two years working with children, calm communication, smartphone literacy, full vetting clearance, and a non-family guarantor who is a registered property owner.',
    offers: 'Competitive monthly salary, uniform and ID, Co-Driver App training, safeguarding certification, and progression to Senior Co-Driver or Onboarding Trainer.',
  },
  {
    id: 'nurses',
    title: 'Onboard Nurse',
    icon: HeartPulse,
    locations: 'Lagos now. Abuja and Port Harcourt interest list.',
    apply: 'Apply As A Nurse',
    duties: 'Confirm first aid equipment, complete visible wellness checks, monitor children, assess illness or injury, contact parents when needed, and submit welfare notes.',
    needs: 'Current Nursing and Midwifery Council of Nigeria registration, two years post-registration experience, paediatric first aid or willingness to complete it, and full vetting clearance.',
    offers: 'Professional salary, uniform and ID, paediatric first aid support, annual re-registration support, safeguarding training, AED training, and progression to Senior Nurse.',
  },
  {
    id: 'operations',
    title: 'Operations Team Member',
    icon: Headphones,
    locations: 'Lagos now. Abuja interest list.',
    apply: 'Apply For Operations',
    duties: 'Monitor the fleet dashboard, respond to alerts, call buses, handle parent WhatsApp messages, coordinate manifests, support onboarding, and assist crew scheduling.',
    needs: 'Strong English communication, calm decision-making, smartphone and computer literacy, transport-hour availability, clean record, and interest in child and road safety.',
    offers: 'Competitive monthly salary, full platform training, and progression to Operations Supervisor, City Manager, and national operations roles.',
  },
]

export default function OpenRoles() {
  return (
    <Section background="#F1F6EA" label="Open Roles" title="We are recruiting in Lagos first." text="Abuja and Port Harcourt applicants can register interest ahead of launch. Every role requires the full six-stage vetting process. We guide you through every step.">
      <div className="grid lg:grid-cols-2 gap-6">
        {roles.map((role, i) => (
          <motion.div id={role.id} key={role.id} className="gradient-frame rounded-2xl p-7" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -5 }}>
            <role.icon size={40} color="#D96B1F" className="mb-5" />
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="font-extrabold text-2xl" style={{ color: '#183024' }}>{role.title}</h3>
              <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: '#D96B1F' }}>Actively Recruiting</span>
            </div>
            <p className="text-sm font-bold mb-5" style={{ color: '#1F6B46' }}>{role.locations}</p>
            <Block title="What you will do" text={role.duties} />
            <Block title="What you need" text={role.needs} />
            <Block title="What we offer" text={role.offers} />
            <a href="#apply" className="inline-flex mt-3 rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: '#D96B1F' }}>{role.apply}</a>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Block({ title, text }: { title: string; text: string }) {
  return <div className="mb-4"><p className="font-extrabold mb-1" style={{ color: '#183024' }}>{title}</p><p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{text}</p></div>
}
