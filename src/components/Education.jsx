import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react'
import Section from './Section.jsx'

const education = [
  {
    degree: 'B.Tech in Computer Science',
    school: 'Visvesvaraya Technological University',
    location: 'Belagavi, Karnataka',
    period: '2021 — 2025',
    gpa: '8.5/10.0',
    highlights: [
      'Relevant Coursework: Data Structures, Algorithms, Machine Learning, Database Systems',
      'Final Year Project: Visual Question Answering using Deep Learning',
    ],
  },
]

const certifications = [
  { name: 'Deep Learning Specialization', issuer: 'Coursera / deeplearning.ai', year: '2024' },
  { name: 'Machine Learning A-Z', issuer: 'Udemy', year: '2023' },
  { name: 'Python for Data Science', issuer: 'IBM / Coursera', year: '2023' },
]

export default function Education() {
  return (
    <Section
      id="education"
      title="Education"
      eyebrow="Academic Background"
    >
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Education */}
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{edu.school}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-end gap-1.5 text-sm font-semibold text-emerald-400">
                    <Award className="h-3.5 w-3.5" />
                    <span>GPA: {edu.gpa}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 border-t border-slate-800/50 pt-4">
                {edu.highlights.map((highlight, hIdx) => (
                  <motion.li
                    key={hIdx}
                    className="flex gap-2 text-sm text-slate-400"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: hIdx * 0.1 }}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <motion.h3
            className="text-xl font-heading font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Certifications
          </motion.h3>

          <div className="space-y-3">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-primary/50 hover:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{cert.name}</h4>
                    <p className="text-xs text-slate-500">{cert.issuer}</p>
                  </div>
                </div>
                <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Skills Summary */}
          <motion.div
            className="rounded-2xl border border-primary/30 bg-primary/5 p-5"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
              <GraduationCap className="h-4 w-4" />
              Key Takeaways
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Strong CS Fundamentals', 'ML/DL Theory', 'Production Systems', 'Research Mindset'].map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
