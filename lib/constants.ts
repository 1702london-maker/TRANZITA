export const BRAND = {
  name: 'Tranzita',
  tagline: 'Every child. On time. Safe home.',
  subTagline: "Nigeria's first dedicated school transport platform — made and coupled in Nigeria.",
  email: 'booking@tranzita.africa',
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_TRANZITA_WHATSAPP_NUMBER || ''}?text=Hi%2C%20I%20am%20interested%20in%20Tranzita%20Schools%20for%20my%20school%20in%20Nigeria.`,
}

export const TRUST_BADGES = [
  'Background Checked Drivers',
  'Live GPS Tracking',
  'WhatsApp Alerts',
  'Made in Nigeria Fleet',
  'School Board Approved',
  'Criminal Clearance Required',
  'Child-Safe Audio Only',
  'Zero Emission Buses',
  'Nationwide Coverage',
  '24/7 Monitoring',
]

export const STATS = [
  { value: 500, suffix: '+', label: 'Children transported daily' },
  { value: 98, suffix: '%', label: 'On-time rate' },
  { value: 100, suffix: '%', label: 'background checked drivers' },
  { value: 24, suffix: '/7', label: 'Live monitoring' },
  { value: 0, suffix: '', label: 'Incidents reported' },
]

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'School registers',
    desc: 'Routes mapped by home address clusters across your city.',
    icon: '🏫',
  },
  {
    step: 2,
    title: 'Parents download the app',
    desc: 'Live map, ETA countdown, WhatsApp notifications.',
    icon: '📱',
  },
  {
    step: 3,
    title: 'Driver picks up',
    desc: 'Child is tapped on — parent receives WhatsApp alert instantly.',
    icon: '🚌',
  },
  {
    step: 4,
    title: 'Child arrives home',
    desc: 'Drop-off tapped and timestamped, parent notified immediately.',
    icon: '🏠',
  },
]

export const AMAKA_SYSTEM_PROMPT = `You are ZITA, an AI-powered Tranzita support assistant. You help schools, parents, and partners understand the Tranzita platform. You are warm, clear, and reassuring. You speak like a knowledgeable Nigerian professional. If someone asks whether you are automated or AI, answer honestly that you are AI-powered and can connect them with the Tranzita team at booking@tranzita.africa. You know the platform handles school pickup and drop-off across Nigeria using Tranzita-approved vehicles. Safety is the number one priority. Drivers are criminal-background-checked and cleared through Nigerian processes. Parents get live GPS tracking and WhatsApp alerts. Schools get a full dashboard.`

export const AMAKA_FIRST_MESSAGE = "Hello! I'm ZITA, Tranzita's AI-powered support assistant. How can I help you today? Whether you are a school administrator, a parent, or just curious about the platform, I am here."
