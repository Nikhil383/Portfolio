import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
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
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-800 bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleNavClick('hero')}
          className="text-lg font-semibold tracking-tight text-white"
        >
          AI Engineer<span className="text-accent">.</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleNavClick(section.id)}
              className={`text-sm font-medium transition-colors ${
                active === section.id
                  ? 'text-accent'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-accent hover:text-accent md:text-sm"
          onClick={() => handleNavClick('contact')}
        >
          Contact
        </button>

        <button
          type="button"
          className="ml-3 inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-100 hover:border-accent hover:text-accent md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="h-0.5 w-5 bg-current" />
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-800 bg-surface/95 px-4 py-3 sm:px-6 md:hidden">
          <div className="flex flex-col gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleNavClick(section.id)}
                className={`rounded-md px-2 py-1 text-left text-sm font-medium ${
                  active === section.id
                    ? 'bg-slate-800 text-accent'
                    : 'text-slate-200 hover:bg-slate-900'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

