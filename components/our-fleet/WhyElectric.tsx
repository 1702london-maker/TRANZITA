'use client'

import { BatteryCharging, Leaf, Sun, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['Zero Tailpipe Emissions', Leaf, 'No diesel, petrol or exhaust fumes inside or outside the vehicle. Children breathe clean air, and the quiet electric motor makes the journey calmer.'],
  ['Solar-Assisted Depots', Sun, 'Buses charge overnight at certified depots with solar-assisted infrastructure, lowering operating cost and reducing grid dependency.'],
  ['Built for Nigerian Roads', BatteryCharging, 'Ground clearance, cooling and air conditioning are specified for Nigerian road surfaces and climate without compromising school-route range.'],
]

export default function WhyElectric() {
  return <Section background="#FFF9F2" label="Why Electric" title="We chose electric because children breathe inside these buses every day." text="Zero emission electric vehicles were not a sustainability slogan for Tranzita. They were a child health decision."><IconCards cards={cards} /></Section>
}
