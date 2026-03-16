import { motion } from 'framer-motion'
import { User, MapPin, Target, Zap } from 'lucide-react'
import Section from './Section.jsx'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
}

export default function About() {
  return (
    <Section
      id="about"
      title="My Story"
      eyebrow="Introduction"
    >
      <motion.div
        className="grid gap-12 lg:grid-cols-2 lg:items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="space-y-6">
          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-slate-300">
            I'm an <span className="text-white font-semibold">AI Engineer</span> dedicated to crafting intelligent systems that solve real-world problems. My passion lies at the intersection of <span className="text-primary italic">Deep Learning</span> and <span className="text-primary italic">Software Engineering</span>.
          </motion.p>
          <motion.p variants={itemVariants} className="text-base leading-relaxed text-slate-400">
            I specialize in building production-ready LLM applications, from designing complex RAG pipelines to fine-tuning specialized models. I believe in AI that isn't just powerful, but also reliable, interpretable, and user-centric.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 pt-4">
            <motion.div
              variants={featureVariants}
              className="flex items-start gap-3"
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Visionary</h4>
                <p className="text-xs text-slate-500">Scaling AI for real impact</p>
              </div>
            </motion.div>
            <motion.div
              variants={featureVariants}
              className="flex items-start gap-3"
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Efficient</h4>
                <p className="text-xs text-slate-500">Fast, robust production code</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative">
          <motion.div
            className="glass-card overflow-hidden rounded-3xl p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col gap-6">
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white">Full Profile</h3>
                  <p className="text-sm text-slate-500">Personal Details</p>
                </div>
              </motion.div>

              <div className="space-y-4 pt-4 border-t border-slate-800/50">
                {[
                  { label: "Location", value: "Bengaluru, India", icon: MapPin },
                  { label: "Focus", value: "LLMs, NLP, MLOps", icon: Target },
                  { label: "Availability", value: "Full-time / Projects", icon: Zap },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="flex items-center gap-2 text-slate-400">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </span>
                    <span className="font-medium text-slate-200">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="https://docs.google.com/document/d/1x2bC3BnoxFD0whm1eHkz2zlWMmXn72McfxMUJlWJfiI/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="mt-4 block w-full rounded-2xl bg-white/5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            className="absolute -right-4 -bottom-4 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </Section>
  )
}

