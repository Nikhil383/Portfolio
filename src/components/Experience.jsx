import { motion } from 'framer-motion'
import Section from './Section.jsx'

const roles = [
  {
    title: 'Student Intern',
    company: 'ABB',
    period: 'Feb 2024 — July 2024',
    bullets: [
      'Developed a VQA model using a combination of vision and language models.',
      'Implemented a image captioning model using a combination of vision and language models.',
    ],
  },
]

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      eyebrow="Background"
    >
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 hidden w-px bg-gradient-to-b from-emerald-500/60 via-slate-700 to-transparent md:block" />
        <div className="space-y-6">
          {roles.map((role, idx) => (
            <motion.article
              key={role.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative grid gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:grid-cols-[auto,1fr]"
            >
              <div className="hidden md:flex md:flex-col md:items-center md:gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.35)]" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {role.title}{' '}
                    <span className="text-slate-400">@ {role.company}</span>
                  </h3>
                  <span className="text-xs text-slate-400">{role.period}</span>
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-300 sm:text-sm">
                  {role.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2"
                    >
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}

