'use client'

import { BadgeCheck, CalendarCheck, HeartHandshake, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['You are known and trusted', BadgeCheck, 'Every crew member has a verified identity, a published profile, and a QR code parents can scan. You are a professional with a Tranzita identity.'],
  ['You are paid on time', CalendarCheck, 'No cash handling, no waiting for parents, and no deductions for route changes outside your control. Your pay is direct and predictable.'],
  ['You do work that matters', HeartHandshake, 'Every route helps make Nigerian school transport safer. That is not a mission statement. It is the daily reality of the job.'],
]

export default function WhyTranzita() {
  return <Section background="#FFF9F2" label="Why Tranzita" title="This is not just a driving job." text="Every Tranzita crew member is trusted with the safe delivery of someone else's child. Every single day."><IconCards cards={cards} /></Section>
}
