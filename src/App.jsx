import { motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <div className="bg-slate-900/10">
          <Skills />
        </div>
        <Projects />
        <div className="bg-slate-900/10">
          <Education />
        </div>
        <Experience />
        <Contact />
      </main>

      <motion.footer
        className="relative mt-20 border-t border-slate-800/60 bg-slate-950/80 px-4 py-12 backdrop-blur-md sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-heading text-xl font-bold text-white">Nikhil Mahesh<span className="text-primary">.</span></h3>
              <p className="text-sm text-slate-400 max-w-xs">
                AI Engineer specializing in Large Language Models and Generative AI solutions. Building the intelligent web of tomorrow.
              </p>
              <div className="flex gap-4">
                <motion.a href="https://github.com/Nikhil383" target="_blank" rel="noreferrer" whileHover={{ scale: 1.2, y: -2 }} className="text-slate-400 transition-colors hover:text-primary"><Github className="h-5 w-5" /></motion.a>
                <motion.a href="https://www.linkedin.com/in/nikhilmaheshds/" target="_blank" rel="noreferrer" whileHover={{ scale: 1.2, y: -2 }} className="text-slate-400 transition-colors hover:text-primary"><Linkedin className="h-5 w-5" /></motion.a>
                <motion.a href="mailto:nikhilmahesh89@gmail.com" whileHover={{ scale: 1.2, y: -2 }} className="text-slate-400 transition-colors hover:text-primary"><Mail className="h-5 w-5" /></motion.a>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-white/60">Quick Links</h4>
              <nav className="flex flex-col gap-2 text-sm text-slate-400">
                <motion.a href="#hero" whileHover={{ x: 5 }} className="hover:text-primary transition-colors w-fit">Home</motion.a>
                <motion.a href="#about" whileHover={{ x: 5 }} className="hover:text-primary transition-colors w-fit">About</motion.a>
                <motion.a href="#projects" whileHover={{ x: 5 }} className="hover:text-primary transition-colors w-fit">Projects</motion.a>
                <motion.a href="#contact" whileHover={{ x: 5 }} className="hover:text-primary transition-colors w-fit">Contact</motion.a>
              </nav>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-white/60">Newsletter</h4>
              <p className="text-sm text-slate-400">Join my mailing list for AI insights.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Join
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-800/60 pt-8 md:flex-row"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Nikhil Mahesh. All rights reserved.
            </p>

          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
