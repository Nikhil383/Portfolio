import { motion } from 'framer-motion'
import { ExternalLink, Github, FolderOpen, Layers, Bot, Image as ImageIcon, Search } from 'lucide-react'
import Section from './Section.jsx'
import { cn } from '../lib/utils'

const projects = [
  {
    title: 'VQA (Visual Question Answering)',
    period: '2024-Present',
    description:
      'Engineered a multi-modal transformer system capable of reasoned answering about visual content, bridging computer vision and NLP.',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Transformers'],
    icon: Bot,
    color: 'from-blue-500/20 to-cyan-500/20',
    link: '#',
  },
  {
    title: 'Visual Semantic Analysis',
    period: '2024-Present',
    description:
      'Developed an automated image captioning system utilizing Azure OpenAI and LangChain for rich semantic description generation.',
    tech: ['Python', 'LangChain', 'Vector DB', 'Azure OpenAI'],
    icon: ImageIcon,
    color: 'from-purple-500/20 to-pink-500/20',
    link: '#',
  },
  {
    title: 'Enterprise RAG Solution',
    period: '2024-Present',
    description:
      'Designed and deployed a Retrieval-Augmented Generation web application for high-precision document interrogation and summary.',
    tech: ['React', 'Python', 'FastAPI', 'ChromaDB', 'LLM'],
    icon: Search,
    color: 'from-emerald-500/20 to-teal-500/20',
    link: '#',
  },
]

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  },
}

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Featured Work"
      eyebrow="My Portfolio"
    >
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={cardVariants}
            className="group glass-card flex flex-col overflow-hidden rounded-3xl p-6"
          >
            {/* Project Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br transition-shadow group-hover:shadow-lg group-hover:shadow-primary/20",
                project.color
              )}>
                <project.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex gap-2">
                <a href={project.link} className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white">
                  <Github className="h-4 w-4" />
                </a>
                <a href={project.link} className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-2 text-xs font-medium text-primary uppercase tracking-wider">
                {project.period}
              </div>
              <h3 className="mb-3 text-xl font-heading font-bold text-white group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>
            </div>

            {/* Footer / Tech */}
            <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-slate-900/50 px-2.5 py-1 text-[11px] font-medium text-slate-300 border border-slate-800"
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

