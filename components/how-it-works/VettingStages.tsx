'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STAGES = [
  {
    num: '01',
    title: 'Criminal Records Bureau Clearance',
    body: 'Mandatory Nigerian Police Clearance Certificate obtained directly from the Nigeria Police Force. Cross-referenced with the Nigeria Criminal Records database. Any criminal record of any nature results in immediate and permanent disqualification. No exceptions. No appeals process. No probationary arrangements.',
  },
  {
    num: '02',
    title: 'Biometric Identity Verification',
    body: 'Full biometric registration including fingerprint capture and facial recognition. National ID, driver licence, and international passport are all cross-checked against government records. Biometric data is encrypted and stored securely within the Tranzita platform. The biometric profile is used to confirm identity on every single login to the Tranzita Driver App before any route begins.',
  },
  {
    num: '03',
    title: 'Home Address Verification and Guarantor Visit',
    body: "A Tranzita field officer visits the crew member's registered home address in person before clearance is granted. A guarantor who is a registered property owner provides a sworn declaration of identity and character. The guarantor must not be a family member of the applicant under any circumstances. GPS coordinates of the home address are recorded and stored permanently on file.",
  },
  {
    num: '04',
    title: 'Defensive Driving Certification and FRSC Records Check',
    body: 'Drivers must hold a current FRSC-approved defensive driving certificate before their application proceeds. Co-drivers and nurses complete a Tranzita road safety passenger training module. FRSC records are checked for any previous traffic violations, licence suspensions, or incident history. Tranzita also carries out an independent supervised driving assessment with a Tranzita-appointed examiner.',
  },
  {
    num: '05',
    title: 'Child Protection and Safeguarding Training',
    body: 'All three crew member types complete the full Tranzita Child Safeguarding Programme before assignment. The programme covers physical safety, emotional wellbeing, communication protocols, reporting obligations, and emergency response procedures specific to the school transport context. Assessment is mandatory at the end of the programme. Failure results in immediate disqualification with no re-sit within 12 months. Certification must be renewed every 18 months.',
  },
  {
    num: '06',
    title: 'Medical Fitness and Drug Screening',
    body: 'Full medical examination conducted by a certified physician approved by Tranzita. Comprehensive drug and alcohol screening with a zero tolerance result threshold. Vision and hearing assessment included. Mental health fitness evaluation completed. Any active prescription medication that may impair judgement or reaction time must be disclosed in full. Random unannounced re-screening occurs at unpredictable intervals throughout the employment period.',
  },
]

export default function VettingStages() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>How We Vet Every Crew Member</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            Six stages. No shortcuts.<br />
            <span style={{ color: '#E8601C' }}>No exceptions.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
            Every driver, co-driver, and nurse goes through the same six-stage process independently before they ever sit on a Tranzita bus.
          </p>
        </div>

        <div className="space-y-4">
          {STAGES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -80 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.55, type: 'spring', damping: 22 }}
              className="rounded-2xl p-6 sm:p-8 flex gap-6 items-start"
              style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}
            >
              <span className="font-black text-4xl shrink-0 leading-none" style={{ color: '#E2EDD8' }}>{s.num}</span>
              <div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2B1E' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 rounded-3xl p-8 text-center"
          style={{ background: '#1E2B1E' }}
        >
          <p className="font-bold text-base sm:text-lg leading-relaxed" style={{ color: '#FFF9F2' }}>
            Every crew member on every Tranzita bus has cleared all six stages in full before their first day. There are no probationary periods. There are no partial clearances. There are no exceptions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
