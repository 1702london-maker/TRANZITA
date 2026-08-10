'use client'

import { motion } from 'framer-motion'
import { faqFilters, type FAQFilter } from '@/lib/faq-data'

type CategoryFilterProps = {
  active: FAQFilter
  onChange: (filter: FAQFilter) => void
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <motion.div
      className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 1.1 } } }}
    >
      {faqFilters.map((filter) => {
        const isActive = active === filter
        return (
          <motion.button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className="rounded-full px-4 py-2 text-sm font-bold transition-colors"
            style={{
              background: isActive ? '#D96B1F' : 'rgba(255,249,242,0.72)',
              border: `1px solid ${isActive ? '#D96B1F' : 'rgba(126,160,109,0.32)'}`,
              color: isActive ? 'white' : '#183024',
            }}
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            {filter}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
