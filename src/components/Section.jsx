import { motion } from 'framer-motion'

export default function Section({ id, title, eyebrow, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-slate-900/60 bg-surface/80 px-4 py-16 sm:px-6 lg:px-8"
    >
      <motion.div
        className="mx-auto flex max-w-5xl flex-col gap-6"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/80">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-heading font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
        </div>
        {children}
      </motion.div>
    </section>
  )
}

