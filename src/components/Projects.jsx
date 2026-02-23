import { motion } from 'framer-motion'
import Section from './Section.jsx'

const projects = [
  {
    title: 'VQA (Visual Question Answering)',
    period: '2024-present',
    description:
      'A model that can answer questions about images using a combination of vision and language models.',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Transformers'],
  },
  {
    title: 'Image Captioning',
    period: '2024-present',
    description:
      'A model that can generate captions for images using a combination of vision and language models.',
    tech: ['Python', 'LangChain', 'Vector DB', 'Azure OpenAI'],
  },
  {
    title: 'RAG Web App Question Answering',
    period: '2024-present',
    description:
      'A web app that can answer questions about a given document using a combination of RAG and LLM.',
    tech: ['Python', 'LangChain', 'RAG', 'LLM'],
  },
]

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      eyebrow="Selected Work"
    >
      <motion.div
        className="grid gap-5 md:grid-cols-3"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-slate-950/40"
          >
            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span>{project.period}</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                AI project
              </span>
            </div>
            <h3 className="mb-2 text-sm font-semibold text-white">{project.title}</h3>
            <p className="mb-3 text-xs text-slate-300 sm:text-sm">{project.description}</p>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-700 bg-slate-900/60 px-2 py-0.5 text-[11px] text-slate-200 group-hover:border-accent/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

