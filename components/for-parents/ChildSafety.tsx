'use client'

import { BadgeCheck, Gauge, HeartPulse, MapPinned, ShieldCheck, UsersRound, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['Your Child Has A Wristband', BadgeCheck, 'Every child receives a unique NFC wristband for tap-on and tap-off. If the wristband is missing, the exception is logged and operations is notified.'],
  ['No Unauthorised Collection', ShieldCheck, 'You register verified guardians. The co-driver will not release your child to anyone outside that list, no matter what they claim.'],
  ['A Registered Nurse Is Present', HeartPulse, 'Every bus carries a registered nurse with medical summaries, allergy notes and authority to respond immediately.'],
  ['Three Adults On Every Bus', UsersRound, 'Driver, co-driver and nurse are all independently vetted. Your child is never alone with one adult.'],
  ['Deviation Triggers An Alert', MapPinned, 'If the bus leaves the approved route, operations receives an alert within 45 seconds and calls the crew.'],
  ['Speed Checked Every 10 Seconds', Gauge, 'Speed is checked against road-zone limits, with cab audio alerts and operations notifications after any breach.'],
] 

export default function ChildSafety() {
  return <Section background="#F1F6EA" label="Your Child Is Safe" title="What Tranzita does to protect your child specifically." text="Every safety measure exists because a parent asked: but what if? Here are the answers."><IconCards cards={cards} /></Section>
}
