import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cpu, Github, Linkedin, Mail } from 'lucide-react'
import { cn } from '../lib/utils'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (!el) continue
        const { offsetTop, offsetHeight } = el
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActive(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 px-4 py-4 sm:px-6 lg:px-8",
        scrolled ? "top-2" : "top-0"
      )}
    >
      <nav className={cn(
        "mx-auto flex max-w-5xl items-center justify-between px-6 py-3 transition-all duration-300",
        scrolled ? "glass rounded-full shadow-lg shadow-black/20" : "bg-transparent"
      )}>
        <button
          type="button"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 text-xl font-heading font-bold tracking-tight text-white group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary transition-transform group-hover:scale-110">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="hidden sm:inline-block">Nikhil<span className="text-primary"> Mahesh</span></span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleNavClick(section.id)}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full",
                active === section.id
                  ? "text-primary bg-primary/10"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {section.label}
              {active === section.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border-r border-slate-700/50 pr-3 sm:flex">
            <a href="https://github.com/Nikhil383" className="p-1.5 text-slate-400 transition-colors hover:text-primary">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/nikhilmaheshds/" className="p-1.5 text-slate-400 transition-colors hover:text-primary">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-95"
            onClick={() => handleNavClick('contact')}
          >
            Hire Me
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-slate-100 hover:bg-slate-800 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-4 top-20 z-50 overflow-hidden rounded-3xl glass p-4 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleNavClick(section.id)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-all active:scale-[0.98]",
                    active === section.id
                      ? "bg-primary/20 text-primary"
                      : "text-slate-300 hover:bg-slate-800/50"
                  )}
                >
                  {section.label}
                  {active === section.id && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

