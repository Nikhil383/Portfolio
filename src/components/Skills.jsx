import { motion } from 'framer-motion'
import Section from './Section.jsx'

const categories = [
  {
    name: 'Languages',
    items: ['Python', 'TypeScript / JavaScript', 'SQL'],
  },
  {
    name: 'ML & DL',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn'],
  },
  {
    name: 'LLMs & NLP',
    items: ['OpenAI / Azure OpenAI', 'Transformers (HF)', 'RAG, Vector DBs'],
  },
  {
    name: 'MLOps & Infra',
    items: ['Docker', 'FastAPI', 'LangChain / LlamaIndex'],
  },
]

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      eyebrow="Capabilities"
    >
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            variants={itemVariants}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
          >
            <h3 className="mb-2 text-sm font-semibold text-white">{category.name}</h3>
            <ul className="space-y-1 text-xs text-slate-300 sm:text-sm">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

