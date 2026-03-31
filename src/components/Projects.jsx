import { motion } from 'framer-motion'
import { ExternalLink, Github, FolderOpen, Layers, Bot, Image as ImageIcon, Search } from 'lucide-react'
import Section from './Section.jsx'
import { cn } from '../lib/utils'

const projects = [
  {
    title: 'VQA (Visual Question Answering)',
    period: '2024',
    description:
      'AI system answering natural language questions from images with 85%+ accuracy. Enables automated visual analysis for accessibility and content moderation use cases.',
    tech: ['Python', 'PyTorch', 'Transformers', 'Gemini', 'Flask'],
    icon: Bot,
    color: 'from-blue-500/20 to-cyan-500/20',
    github: 'https://github.com/Nikhil383/Visual_Question_Answer.git',
    demo: 'https://multimodal-ai-50ad.onrender.com',
    metrics: ['85%+ Accuracy', 'Multi-modal AI'],
  },
  {
    title: 'Multimodal Image Captioning Engine',
    period: '2024',
    description:
      'End-to-end image captioning system generating human-like descriptions. Reduces manual content tagging time by 90% for e-commerce and media applications.',
    tech: ['Python', 'LangChain', 'Gemini AI', 'Flask'],
    icon: ImageIcon,
    color: 'from-purple-500/20 to-pink-500/20',
    github: 'https://github.com/Nikhil383/Image-Caption.git',
    demo: 'https://image-caption-ejph.onrender.com',
    metrics: ['90% Time Saved', 'Auto-tagging'],
  },
  {
    title: 'Agentic RAG Document Q&A App',
    period: '2024',
    description:
      'RAG-based system answering complex queries from documents in seconds. Enables instant knowledge retrieval from 1000+ page technical manuals and reports.',
    tech: ['React', 'Python', 'FastAPI', 'ChromaDB', 'LLM'],
    icon: Search,
    color: 'from-emerald-500/20 to-teal-500/20',
    github: 'https://github.com/Nikhil383/RAG-Document-Q-A-App.git',
    demo: '#',
    metrics: ['Seconds Response', '1000+ Pages'],
  },
  {
    title: 'Personal AI Data Analyst',
    period: '2024',
    description:
      'No-code analytics platform enabling business users to perform complex data analysis without SQL. Democratizes data access for non-technical teams.',
    tech: ['Streamlit', 'Python', 'Pandas', 'Matplotlib'],
    icon: Search,
    color: 'from-emerald-500/20 to-teal-500/20',
    github: 'https://github.com/Nikhil383/Personal-AI-Data-Analyst.git',
    demo: '#',
    metrics: ['No-Code', 'Self-Serve Analytics'],
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
              <p className="mb-4 text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>
              {project.metrics && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.metrics.map((metric, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Tech */}
            <motion.div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
              {project.tech.map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="rounded-lg bg-slate-900/50 px-2.5 py-1 text-[11px] font-medium text-slate-300 border border-slate-800 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

