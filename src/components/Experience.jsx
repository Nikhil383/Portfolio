import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import Section from './Section.jsx'

const roles = [
  {
    title: 'Student Intern',
    company: 'ABB',
    location: 'Remote / Bangalore',
    period: 'Feb 2024 — July 2024',
    bullets: [
      'Engineered a cutting-edge Visual Question Answering (VQA) system integrating ViT and LLM architectures.',
      'Developed automated image captioning pipelines for industrial monitoring scenarios.',
      'Collaborated with senior researchers to optimize multi-modal model inference speed.',
    ],
  },
]

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      eyebrow="Career Journey"
    >
      <div className="relative mx-auto max-w-3xl">
        {/* Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-slate-800 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col gap-8 md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Dot */}
              <div className="absolute left-0 top-2 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/20 md:left-1/2" />

              {/* Content Card */}
              <div className="ml-8 w-full md:ml-0 md:w-1/2">
                <div className={`glass-card rounded-3xl p-6 ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                  <div className="mb-4 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                      <Calendar className="h-3 w-3" />
                      <span>{role.period}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white leading-tight">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                      <Briefcase className="h-4 w-4" />
                      <span>{role.company}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-700" />
                      <MapPin className="h-3 w-3" />
                      <span>{role.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {role.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for MD */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

