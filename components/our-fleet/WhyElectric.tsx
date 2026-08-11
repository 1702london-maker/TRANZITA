'use client'

import { Fuel, Leaf, Wrench, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['Approved Fuel Standard', Fuel, 'Electric, diesel and petrol vehicles can operate only when they meet Tranzita route, inspection, refuelling and safety requirements.'],
  ['Maintained Before Routes', Wrench, 'Every vehicle must pass scheduled checks, route-readiness review, documentation checks and daily driver inspection before school movement.'],
  ['Built for Nigerian Roads', Leaf, 'Ground clearance, cooling and air conditioning are specified for Nigerian road surfaces and climate without compromising child comfort.'],
]

export default function WhyElectric() {
  return <Section background="#FFF9F2" label="Fleet Standard" title="We approve vehicles by safety, assembly quality, and route readiness." text="Tranzita is not limited to one powertrain. Electric, diesel and petrol buses can serve only when they are Nigerian-assembled and cleared for child-safe school transport."><IconCards cards={cards} /></Section>
}
