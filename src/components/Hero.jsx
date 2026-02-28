import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Terminal } from 'lucide-react'
import { cn } from '../lib/utils'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 pt-32 pb-16"
    >
      {/* Dynamic Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={item}
          className="mb-8 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="h-3 w-3" />
          <span>Portfolio 2026</span>
        </motion.div>

        <motion.h1
          className="mb-6 text-5xl font-heading font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl"
          variants={item}
        >
          Hi, I'm <span className="bg-gradient-to-r from-primary via-sky-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">Nikhil Mahesh</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mb-10 max-w-2xl text-lg text-slate-400 sm:text-xl lg:text-2xl"
        >
          Architecting the future with <span className="text-white font-medium">Large Language Models</span> and
          <span className="text-white font-medium"> Generative AI</span>. Turning complex data into intelligent experiences.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-5"
          variants={item}
        >
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('projects')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View My Work</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-500 active:scale-95"
          >
            <Terminal className="h-5 w-5 text-primary" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 gap-8 border-t border-slate-800/50 pt-8 sm:grid-cols-4"
          variants={item}
        >
          {[
            { label: "Experience", value: "3+ Years" },
            { label: "Projects", value: "20+ Done" },
            { label: "Accuracy", value: "99.9%" },
            { label: "Coffee", value: "∞ Cups" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-slate-700 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-2 w-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  )
}

