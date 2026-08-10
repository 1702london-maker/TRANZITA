'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { faqFilters, faqItems, type FAQCategory, type FAQFilter } from '@/lib/faq-data'

type AccordionFAQProps = {
  search: string
  activeCategory: FAQFilter
}

const categoryOrder = faqFilters.filter((filter): filter is FAQCategory => filter !== 'All Questions')

export default function AccordionFAQ({ search, activeCategory }: AccordionFAQProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['parents-how-it-works']))
  const grouped = useMemo(() => {
    const term = search.trim().toLowerCase()
    return categoryOrder
      .map((category) => ({
        category,
        items: faqItems.filter((item) => {
          const categoryMatch = activeCategory === 'All Questions' || item.category === activeCategory
          const searchMatch = !term || `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(term)
          return item.category === category && categoryMatch && searchMatch
        }),
      }))
      .filter((group) => group.items.length > 0)
  }, [activeCategory, search])

  const toggle = (id: string) => {
    setOpenIds((previous) => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Full FAQ</p>
          <h2 className="headline-balance mt-3 text-4xl font-extrabold sm:text-5xl" style={{ color: '#183024' }}>
            Answers by role and responsibility.
          </h2>
        </motion.div>

        {grouped.length === 0 && (
          <motion.div className="rounded-3xl p-8 text-center" style={{ background: '#FFF0E4', color: '#183024' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            No matching answer yet. Try another word or contact Tranzita directly.
          </motion.div>
        )}

        <div className="space-y-14">
          {grouped.map((group) => (
            <div key={group.category}>
              <h3 className="inline-block pb-2 text-2xl font-extrabold" style={{ color: '#183024', borderBottom: '4px solid #D96B1F' }}>
                {group.category}
              </h3>
              <div className="mt-6 overflow-hidden rounded-[28px]" style={{ border: '1px solid #DDE9D2' }}>
                <AnimatePresence initial={false}>
                  {group.items.map((item, index) => {
                    const isOpen = openIds.has(item.id)
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ borderBottom: index === group.items.length - 1 ? 'none' : '1px solid #DDE9D2' }}
                      >
                        <button
                          type="button"
                          onClick={() => toggle(item.id)}
                          className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
                        >
                          <span className="shrink-0 text-sm font-extrabold" style={{ color: '#D96B1F' }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="flex-1 text-base font-extrabold transition-colors group-hover:text-[#D96B1F] sm:text-lg" style={{ color: '#183024' }}>
                            {item.question}
                          </span>
                          <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0">
                            <Plus size={22} color="#D96B1F" />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              className="relative px-5 pb-6 pl-12 sm:px-7 sm:pl-16"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div
                                className="absolute left-8 top-0 w-1 rounded-full sm:left-10"
                                style={{ background: '#D96B1F' }}
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                exit={{ height: 0 }}
                              />
                              <p className="text-sm leading-relaxed sm:text-base" style={{ color: '#65785F' }}>
                                {item.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
