import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'

function App() {
  return (
    <div className="min-h-screen bg-background text-slate-100">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-slate-900/60 bg-surface px-4 py-6 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="text-[11px] text-slate-500">
            Built as an AI Engineer portfolio.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
