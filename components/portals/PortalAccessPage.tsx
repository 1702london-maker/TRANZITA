'use client'

import { Lock, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import BottomPortalBar from '@/components/BottomPortalBar'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'

export default function PortalAccessPage({ title, audience }: { title: string; audience: string }) {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main className="min-h-screen px-4 pt-40 pb-20" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        <motion.section
          className="mx-auto max-w-3xl rounded-[32px] bg-white p-8 text-center shadow-sm"
          style={{ border: '1px solid #DDE9D2' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
            <Lock size={30} />
          </div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Portal Access</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl" style={{ color: '#183024' }}>{title}</h1>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed" style={{ color: '#65785F' }}>
            This is the secure access point for {audience}. Portal accounts are issued by the Tranzita operations team after onboarding.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:booking@tranzita.africa" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>
              <Mail size={16} /> Request Access
            </a>
            <a href="/contact" className="rounded-full px-6 py-3 text-sm font-extrabold" style={{ color: '#183024', border: '1px solid #DDE9D2', background: '#FFF9F2' }}>
              Contact Support
            </a>
          </div>
        </motion.section>
      </main>
      <BottomPortalBar />
    </>
  )
}
