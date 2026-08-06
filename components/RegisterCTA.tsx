'use client'
import { motion } from 'framer-motion'

export default function RegisterCTA() {
  return (
    <section className="py-24 px-4" style={{ background: '#F2F5F0' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl px-8 py-16 relative overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '2px solid #E0EAE0',
            boxShadow: '0 20px 60px rgba(44,58,44,0.07)',
          }}
        >
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Early Access Open
          </motion.p>

          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-5"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Nigeria&apos;s safest school run{' '}
            <span style={{ color: '#E8601C' }}>starts here.</span>
          </motion.h2>

          <motion.p
            className="text-base mb-10 max-w-xl mx-auto"
            style={{ color: '#6B7F6B' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            Join the schools and parents already signed up for Tranzita early access. Launch is coming to Lagos, Abuja, and Port Harcourt.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            <motion.a
              href="#demo"
              className="px-8 py-4 rounded-2xl font-bold text-white text-base"
              style={{ background: '#E8601C' }}
              whileHover={{ scale: 1.04, background: '#D14F10' }}
              whileTap={{ scale: 0.97 }}
            >
              Register My School 🏫
            </motion.a>
            <motion.a
              href="#demo"
              className="px-8 py-4 rounded-2xl font-bold text-base"
              style={{ background: '#F2F5F0', color: '#1E2B1E', border: '1px solid #E0EAE0' }}
              whileHover={{ scale: 1.04, background: '#E0EAE0' }}
              whileTap={{ scale: 0.97 }}
            >
              I am a Parent
            </motion.a>
          </motion.div>

          <motion.p
            className="mt-8 text-xs"
            style={{ color: '#8FA88F' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Made &amp; Coupled In Nigeria 🇳🇬 &nbsp;|&nbsp; booking@transzita.africa
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
