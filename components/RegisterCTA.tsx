'use client'
import { motion } from 'framer-motion'

export default function RegisterCTA() {
  return (
    <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="gradient-frame rounded-3xl px-8 py-16 relative overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '2px solid #DDE9D2',
            boxShadow: '0 20px 60px rgba(44,58,44,0.07)',
          }}
        >
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#D96B1F' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Join The Rollout
          </motion.p>

          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-5 headline-balance"
            style={{ color: '#183024' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Bring structured transport{' '}
            <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>to your school.</span>
          </motion.h2>

          <motion.p
            className="text-base mb-10 max-w-xl mx-auto"
            style={{ color: '#65785F' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            Tell us your campus location, student volume, and current transport gaps. We will use that to prioritise rollout zones and onboarding.
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
              style={{ background: 'linear-gradient(90deg, #183024 0%, #1F6B46 48%, #D96B1F 100%)' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Add My School To Rollout
            </motion.a>
            <motion.a
              href="#demo"
              className="px-8 py-4 rounded-2xl font-bold text-base"
              style={{ background: '#FFF9F2', color: '#183024', border: '2px solid transparent', backgroundClip: 'padding-box', boxShadow: '0 0 0 1px rgba(217,107,31,0.28)' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Join Parent Waitlist
            </motion.a>
          </motion.div>

          <motion.p
            className="mt-8 text-xs"
            style={{ color: '#7EA06D' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Built for Nigerian school operations &nbsp;|&nbsp; booking@tranzita.africa
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
