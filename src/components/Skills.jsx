import { motion } from 'framer-motion'
import { Code2, BrainCircuit, MessageSquare, Database, Terminal, Cpu } from 'lucide-react'
import Section from './Section.jsx'

const categories = [
  {
    name: ' Programming and Tools',
    icon: Code2,
    items: ['Python', 'Matplotlib, Seaborn, Plotly', 'SQL', 'Git', 'Cursor', 'Jupyter'],
    color: 'text-blue-400',
  },
  {
    name: 'AI & Machine Learning',
    icon: BrainCircuit,
    items: ['Supervised & Unsupervised', 'Semi-Supervised', 'Reinforcement'],
    color: 'text-purple-400',
  },
  {
    name: 'GenAI & NLP',
    icon: MessageSquare,
    items: ['GPT-4 / Claude', 'Transformers', 'LangChain', 'RAG Systems'],
    color: 'text-emerald-400',
  },
  {
    name: 'Data & Infra',
    icon: Database,
    items: ['PostgreSQL', 'ChromaDB', 'Pinecone', 'Redis'],
    color: 'text-amber-400',
  },
  {
    name: 'MLOps',
    icon: Terminal,
    items: ['Docker', 'AWS', 'Kubernetes', 'FastAPI'],
    color: 'text-rose-400',
  },
  {
    name: 'Tools',
    icon: Cpu,
    items: ['Git', 'VS Code', 'Jupyter', 'Weights & Biases'],
    color: 'text-cyan-400',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100 }
  },
}

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Expertise"
      eyebrow="Technical Stack"
    >
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            variants={itemVariants}
            className="group glass-card overflow-hidden rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={`rounded-xl bg-slate-900/50 p-2.5 ${category.color}`}>
                <category.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white">{category.name}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-800/40 px-3 py-1 text-xs font-medium text-slate-300 transition-colors group-hover:bg-slate-800 group-hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

