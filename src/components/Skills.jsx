import { motion } from 'framer-motion'
import { Code2, BrainCircuit, MessageSquare, Database, Terminal, Cpu, Eye, Layers, Rocket } from 'lucide-react'
import Section from './Section.jsx'

const categories = [
  {
    name: 'AI & Machine Learning Foundations',
    icon: BrainCircuit,
    items: ['Supervised & Unsupervised Learning', 'Bias-Variance Tradeoff', 'Model Evaluation (ROC, AUC)', 'Feature Engineering', 'Cross-validation', 'Hyperparameter Tuning', 'Statistical Foundations'],
    color: 'text-purple-400',
  },
  {
    name: 'Deep Learning',
    icon: Layers,
    items: ['Neural Networks (ANN)', 'CNN (Computer Vision)', 'RNN, LSTM', 'Transformers', 'Attention Mechanism', 'Transfer Learning', 'Fine-tuning models'],
    color: 'text-indigo-400',
  },
  {
    name: 'Generative AI & LLMs',
    icon: MessageSquare,
    items: ['Large Language Models (LLMs)', 'Prompt Engineering', 'RAG Systems', 'Embeddings', 'Vector Databases', 'Multi-modal AI', 'Image Captioning & VQA'],
    color: 'text-emerald-400',
  },
  {
    name: 'Computer Vision',
    icon: Eye,
    items: ['Image Classification', 'Object Detection', 'Feature Extraction', 'Vision Transformers (ViT)'],
    color: 'text-blue-400',
  },
  {
    name: 'AI System Development',
    icon: Cpu,
    items: ['End-to-End ML Pipeline Design', 'Model Training & Evaluation', 'Data Preprocessing', 'Experiment Tracking', 'Scalable Code Design'],
    color: 'text-amber-400',
  },
  {
    name: 'Deployment & MLOps',
    icon: Rocket,
    items: ['Flask API Deployment', 'Model Serialization', 'Git & Version Control', 'Basic CI/CD', 'Cloud Concepts (AWS/GCP)'],
    color: 'text-rose-400',
  },
  {
    name: 'Programming & Tools',
    icon: Terminal,
    items: ['Python', 'NumPy, Pandas', 'Matplotlib / Seaborn', 'VS Code', 'Linux Basics', 'LangChain', 'Hugging Face', 'Docker', 'FAISS / Pinecone'],
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
              {category.items.map((item, idx) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="rounded-full bg-slate-800/40 px-3 py-1 text-xs font-medium text-slate-300 transition-colors group-hover:bg-slate-800 group-hover:text-white cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

