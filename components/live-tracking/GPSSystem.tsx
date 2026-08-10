'use client'

import { HardDrive, MapPinned, ShieldCheck, Gauge, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['Hardware Built Into Every Bus', HardDrive, 'The GPS unit is hardwired during vehicle specification, has independent power, and cannot be removed or switched off by the driver.'],
  ['Verified Against The Planned Route', MapPinned, 'Every position is checked against the approved route. Off-route movement triggers operations alerts.'],
  ['Speed Recorded At Every Point', Gauge, 'Every GPS transmission includes vehicle speed and is stored for review after any incident or concern.'],
  ['Independent of Driver Behaviour', ShieldCheck, 'The driver cannot pause tracking, spoof location, or create a gap in the journey record.'],
]

export default function GPSSystem() {
  return <Section background="#FFF9F2" label="The GPS System" title="Why our GPS tracking is different from a dropped location pin." text="Tranzita gives you a verified, tamper-resistant position updated every 30 seconds."><IconCards cards={cards} columns="md:grid-cols-2" /></Section>
}
