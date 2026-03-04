import { motion } from 'framer-motion'
import { ExternalLink, Github, FolderOpen, Layers, Bot, Image as ImageIcon, Search } from 'lucide-react'
import Section from './Section.jsx'
import { cn } from '../lib/utils'

const projects = [
  {
    title: 'VQA (Visual Question Answering)',
    period: '2024-Present',
    description:
      'Developed a system that answers natural language questions based on image content.',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Transformers', 'Gemini'],
    icon: Bot,
    color: 'from-blue-500/20 to-cyan-500/20',
    github: 'https://github.com/Nikhil383/Visual_Question_Answer.git',
    demo: 'https://multimodal-ai-50ad.onrender.com',
  },
  {
    title: 'Multimodal Image Captioning Engine',
    period: '2024-Present',
    description:
      'Built an end-to-end image captioning system that generates natural language descriptions from images.',
    tech: ['Python', 'LangChain', 'Gemini AI'],
    icon: ImageIcon,
    color: 'from-purple-500/20 to-pink-500/20',
    github: 'https://github.com/Nikhil383/Image-Caption.git',
    demo: 'https://image-caption-ejph.onrender.com',
  },
  {
    title: 'Agentic RAG Document Q&A App',
    period: '2024-Present',
    description:
      'Built a RAG-based Q&A system that answers questions about documents using AI.',
    tech: ['React', 'Python', 'FastAPI', 'ChromaDB', 'LLM'],
    icon: Search,
    color: 'from-emerald-500/20 to-teal-500/20',
    github: 'https://github.com/Nikhil383/RAG-Document-Q-A-App.git',
    demo: '#',
  },
  {
    title: 'Personal AI Data Analyst',
    period: '2024-Present',
    description:
      'Designed and deployed a Personal AI Data Analyst web application for high-precision data analysis and visualization.',
    tech: ['React', 'Python', 'FastAPI', 'Pandas', 'Matplotlib'],
    icon: Search,
    color: 'from-emerald-500/20 to-teal-500/20',
    github: 'https://github.com/Nikhil383/Personal-AI-Data-Analyst.git',
    demo: '#',
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
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                    title="View Source on GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.demo && project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                    title="View Live Demo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
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

