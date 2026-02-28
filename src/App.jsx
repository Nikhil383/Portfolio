import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
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
          <Experience />
        </div>
        <Contact />
      </main>

      <footer className="relative mt-20 border-t border-slate-800/60 bg-slate-950/80 px-4 py-12 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-xl font-bold text-white">Nikhil Mahesh<span className="text-primary">.</span></h3>
              <p className="text-sm text-slate-400 max-w-xs">
                AI Engineer specializing in Large Language Models and Generative AI solutions. Building the intelligent web of tomorrow.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 transition-colors hover:text-primary"><Github className="h-5 w-5" /></a>
                <a href="#" className="text-slate-400 transition-colors hover:text-primary"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="text-slate-400 transition-colors hover:text-primary"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="text-slate-400 transition-colors hover:text-primary"><Mail className="h-5 w-5" /></a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-white/60">Quick Links</h4>
              <nav className="flex flex-col gap-2 text-sm text-slate-400">
                <a href="#hero" className="hover:text-primary transition-colors w-fit">Home</a>
                <a href="#about" className="hover:text-primary transition-colors w-fit">About</a>
                <a href="#projects" className="hover:text-primary transition-colors w-fit">Projects</a>
                <a href="#contact" className="hover:text-primary transition-colors w-fit">Contact</a>
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-white/60">Newsletter</h4>
              <p className="text-sm text-slate-400">Join my mailing list for AI insights.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-800/60 pt-8 md:flex-row">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Nikhil Mahesh. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              Designed with <Heart className="h-3 w-3 text-red-500 fill-current" /> by Antigravity AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
