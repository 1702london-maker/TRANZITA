'use client'

import { Battery, ClipboardCheck, Disc3, Wrench, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['30-Day Vehicle Inspection', ClipboardCheck, 'Every bus is inspected every 30 days across brakes, tyres, lighting, powertrain, battery, GPS, cameras, NFC reader, first aid and child safety features.'],
  ['Pre-Departure Check', Wrench, 'Before leaving depot, the driver completes tyre, light, camera, GPS, NFC, first aid and battery checks in the Driver App.'],
  ['Battery Health Monitoring', Battery, 'Battery degradation is tracked continuously, with annual battery health reviews and immediate service removal when route completion could be affected.'],
  ['Tyre and Brake Standards', Disc3, 'Tyres are replaced by tread schedule and brakes by documented inspection plus mileage rules from the vehicle partner.'],
]

export default function FleetSafety() {
  return <Section background="#F1F6EA" label="Fleet Safety" title="Every bus. Inspected every 30 days. No exceptions." text="A vehicle that carries children needs to be physically safe every single day."><IconCards cards={cards} columns="md:grid-cols-2" /></Section>
}
