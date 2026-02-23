import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-surface via-slate-950 to-black px-4 pt-24 pb-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/80"
          variants={item}
        >
          AI Engineer Portfolio
        </motion.p>

        <motion.h1
          className="mb-4 text-4xl font-heading font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          variants={item}
        >
          Nikhil Mahesh
          <span className="block bg-gradient-to-r from-sky-400 via-emerald-400 to-accent bg-clip-text text-transparent">
            AI Engineer
          </span>
        </motion.h1>
        
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          variants={item}
        >
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('projects')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            View projects
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent"
          >
            Contact me
          </button>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 sm:text-sm"
          variants={item}
        >
          <span>LLMs &amp; NLP</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span>ML Systems &amp; MLOps</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span>Generative AI Products</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

