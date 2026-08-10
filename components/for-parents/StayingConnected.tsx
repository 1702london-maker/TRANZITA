'use client'

import { Home, MessageCircle, PackageSearch, PhoneCall, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['WhatsApp The Operations Team', MessageCircle, "Save the Tranzita operations number and message us during any journey. A real person who knows your child's route responds."],
  ['Report Something Left On The Bus', PackageSearch, 'Reply to any Tranzita message with the item, bus and date. Operations contacts the crew, logs the report and follows up.'],
  ['Change Guardian Or Address', Home, 'Update guardians, home address or emergency contacts through WhatsApp. Guardian changes are re-verified through the school.'],
  ['Raise A Journey Concern', PhoneCall, 'If anything worries you, operations reviews journey data, GPS records, speed logs and camera footage and responds with findings.'],
]

export default function StayingConnected() {
  return <Section background="#FFF9F2" label="Staying Connected" title="You can reach us. Any time. About anything." text="Tranzita is not a black box you hand your child to and hope for the best. We are reachable at every step."><IconCards cards={cards} columns="md:grid-cols-2" /></Section>
}
