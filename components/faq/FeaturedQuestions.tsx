'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { featuredFaqs, type FAQFilter } from '@/lib/faq-data'

type FeaturedQuestionsProps = {
  search: string
  activeCategory: FAQFilter
}

export default function FeaturedQuestions({ search, activeCategory }: FeaturedQuestionsProps) {
  const [openId, setOpenId] = useState<string | null>(featuredFaqs[0]?.id ?? null)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return featuredFaqs.filter((item) => {
      const categoryMatch = activeCategory === 'All Questions' || item.category === activeCategory
      const searchMatch = !term || `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(term)
      return categoryMatch && searchMatch
    })
  }, [activeCategory, search])

  return (
    <section className="px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Most Asked</p>
          <h2 className="headline-balance mt-3 text-4xl font-extrabold sm:text-5xl" style={{ color: '#183024' }}>
            The questions we get asked most often.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed" style={{ color: '#65785F' }}>
            Start here if you are new to Tranzita.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          layout
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const isOpen = openId === item.id
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  layout
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="group rounded-[28px] p-6 text-left shadow-sm"
                  style={{
                    background: isOpen ? '#FFF0E4' : 'white',
                    border: `1px solid ${isOpen ? 'rgba(217,107,31,0.34)' : '#DDE9D2'}`,
                    boxShadow: isOpen ? '0 18px 50px rgba(217,107,31,0.14)' : '0 12px 34px rgba(31,107,70,0.08)',
                  }}
                  variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: '#F1F6EA', color: '#1F6B46' }}>
                      {item.category}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0">
                      <ChevronDown size={20} color="#D96B1F" />
                    </motion.span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold leading-snug transition-colors group-hover:text-[#D96B1F]" style={{ color: '#183024' }}>
                    {item.question}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        className="mt-4 text-sm leading-relaxed"
                        style={{ color: '#65785F' }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
