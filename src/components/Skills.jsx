import { motion } from 'framer-motion'
import { Code2, BrainCircuit, MessageSquare, Database, Terminal, Cpu, Eye, Layers, Rocket } from 'lucide-react'
import Section from './Section.jsx'

const categories = [
  {
    name: 'AI & Machine Learning',
    icon: BrainCircuit,
    items: [
      { skill: 'Supervised/Unsupervised Learning', level: 'Advanced' },
      { skill: 'Model Evaluation (ROC, AUC)', level: 'Advanced' },
      { skill: 'Feature Engineering', level: 'Advanced' },
      { skill: 'Hyperparameter Tuning', level: 'Intermediate' },
      { skill: 'Statistical Analysis', level: 'Intermediate' },
    ],
    color: 'text-purple-400',
  },
  {
    name: 'Deep Learning',
    icon: Layers,
    items: [
      { skill: 'Neural Networks (ANN)', level: 'Advanced' },
      { skill: 'CNN (Computer Vision)', level: 'Advanced' },
      { skill: 'RNN/LSTM', level: 'Intermediate' },
      { skill: 'Transformers', level: 'Advanced' },
      { skill: 'Transfer Learning', level: 'Advanced' },
    ],
    color: 'text-indigo-400',
  },
  {
    name: 'Generative AI & LLMs',
    icon: MessageSquare,
    items: [
      { skill: 'LLM Fine-tuning', level: 'Advanced' },
      { skill: 'RAG Systems', level: 'Advanced' },
      { skill: 'Prompt Engineering', level: 'Advanced' },
      { skill: 'Vector Databases', level: 'Advanced' },
      { skill: 'Multi-modal AI', level: 'Intermediate' },
    ],
    color: 'text-emerald-400',
  },
  {
    name: 'Programming & Frameworks',
    icon: Code2,
    items: [
      { skill: 'Python', level: 'Advanced' },
      { skill: 'PyTorch', level: 'Advanced' },
      { skill: 'TensorFlow/Keras', level: 'Intermediate' },
      { skill: 'Hugging Face', level: 'Advanced' },
      { skill: 'LangChain', level: 'Advanced' },
    ],
    color: 'text-cyan-400',
  },
  {
    name: 'Data Engineering',
    icon: Database,
    items: [
      { skill: 'Pandas/NumPy', level: 'Advanced' },
      { skill: 'SQL', level: 'Advanced' },
      { skill: 'ETL Pipelines', level: 'Intermediate' },
      { skill: 'Data Visualization', level: 'Advanced' },
    ],
    color: 'text-amber-400',
  },
  {
    name: 'Deployment & MLOps',
    icon: Rocket,
    items: [
      { skill: 'Flask/FastAPI', level: 'Advanced' },
      { skill: 'Docker', level: 'Intermediate' },
      { skill: 'Git/GitHub', level: 'Advanced' },
      { skill: 'CI/CD Basics', level: 'Intermediate' },
      { skill: 'AWS/GCP', level: 'Beginner' },
    ],
    color: 'text-rose-400',
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
              {category.items.map((item, idx) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="group/item"
                >
                  <div
                    className="relative overflow-hidden rounded-full bg-slate-800/40 px-3 py-1.5 transition-colors group-hover/item:bg-slate-800 cursor-default"
                  >
                    <span className="text-xs font-medium text-slate-300 group-hover/item:text-white">
                      {item.skill}
                    </span>
                    <span className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                      item.level === 'Advanced' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.level === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-600/20 text-slate-400'
                    }`}>
                      {item.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

