import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Terminal, FolderOpen, BrainCircuit, UserRound, FileText, Cpu,
  Search, Wifi, BatteryFull, Apple, ChevronRight, Github, Linkedin, Mail,
  Sparkles, X, Minus, Maximize2, Command, Power, RotateCcw,
  Sun, Moon, Volume2, Maximize, Bot, Zap, Globe, ExternalLink, KeyRound,
} from 'lucide-react'
import { profile, projects, experience, skillGroups, ragPipeline, agenticRag } from './data/portfolio'
import { retrieve, buildContext, RAG_FALLBACK_MESSAGE, hasRelevantContext } from './lib/rag'
import { askGemini, hasGeminiKey, setGeminiKey } from './lib/gemini'
import './App.css'
import './aesthetic.css'
import MacDock from './components/MacDock'
import aboutText from './data/about.txt?raw'
const APPS = [
  { id: 'about', title: 'About Me', icon: UserRound, color: '#0a84ff', hint: 'Profile & bio', kind: 'window' },
  { id: 'projects', title: 'Projects', icon: FolderOpen, color: '#ff9f0a', hint: 'Selected engineering work', kind: 'window' },
  { id: 'ai-lab', title: 'AI Lab', icon: BrainCircuit, color: '#bf5af2', hint: 'RAG & agentic systems', kind: 'window' },
  { id: 'skills', title: 'System', icon: Cpu, color: '#30d158', hint: 'Tech activity monitor', kind: 'window' },
  { id: 'resume', title: 'Resume', icon: FileText, color: '#ff375f', hint: 'Background & contact', kind: 'window' },
  { id: 'safari', title: 'Web', icon: Globe, color: '#64d2ff', hint: 'Open GitHub / LinkedIn', kind: 'window' },
  { id: 'terminal', title: 'Terminal', icon: Terminal, color: '#5e5ce6', hint: 'Ask anything', kind: 'window' },
]

const BOOT_LINES = [
  ['PORTFOLIOOS ', 'booting…'],
  ['Loading AI modules', 'OK'],
  ['Mounting /projects', 'OK'],
  ['Indexing knowledge base', 'OK'],
  ['Connecting Gemini API', 'OK'],
  ['Starting portfolio.service', 'OK'],
  ['Welcome, visitor.', '·'],
]

const ease = [0.22, 1, 0.36, 1]

/* ----------------------------- BOOT SCREEN ----------------------------- */

function BootScreen({ onDone }) {
  const [shown, setShown] = useState([])
  const reduced = useReducedMotion()

  useEffect(() => {
    const timers = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setShown((s) => [...s, i]), reduced ? 0 : 180 + i * 320),
      )
    })
    timers.push(setTimeout(onDone, reduced ? 200 : BOOT_LINES.length * 320 + 700))
    return () => timers.forEach(clearTimeout)
  }, [onDone, reduced])

  return (
    <motion.div
      className="boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="boot-inner">
        <motion.div
          className="boot-logo"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
        >
          <Apple size={42} strokeWidth={1.4} />
        </motion.div>
        <motion.h1
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease }}
        >
          {profile.name}
        </motion.h1>
        <p className="boot-sub">{profile.role} · Portfolio</p>
        <div className="boot-log">
          {shown.map((i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <span>{BOOT_LINES[i][0]}</span>
              <b>{BOOT_LINES[i][1]}</b>
            </motion.p>
          ))}
        </div>
        <div className="boot-progress">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: reduced ? 0.1 : 1.6, ease: 'easeInOut' }}
          />
        </div>
        <button className="boot-skip" onClick={onDone}>Skip</button>
      </div>
    </motion.div>
  )
}

/* ----------------------------- TOP BAR (macOS menu bar) ----------------------------- */

function MenuBar({ onLaunch, theme, onToggleTheme }) {
  const [now, setNow] = useState(() => {
    const d = new Date()
    return `${d.toLocaleDateString([], { weekday: 'short' })} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  })
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date()
      const day = d.toLocaleDateString([], { weekday: 'short' })
      const t = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setNow(`${day} ${t}`)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="menubar">
      <div className="menubar-left">
        <button className="apple-btn" aria-label="Apple menu"><Apple size={16} strokeWidth={2.2} /></button>
        <button className="menubar-name" onClick={() => onLaunch('about')}>{profile.name.split(' ')[0]}</button>
        <span className="menubar-item">File</span>
        <span className="menubar-item">Edit</span>
        <span className="menubar-item">View</span>
        <span className="menubar-item">Window</span>
        <span className="menubar-item">Help</span>
      </div>
      <div className="menubar-center">
        <button className="menubar-icon" title={`Battery ${100}%`}><BatteryFull size={16} /></button>
        <button className="menubar-icon" title="Wi-Fi"><Wifi size={16} /></button>
        <button className="menubar-icon" title="Search" onClick={() => onLaunch('spotlight')}><Search size={16} /></button>
        <button className="menubar-icon" title="Toggle theme" onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      <div className="menubar-right">
        <span className="menubar-time">{now}</span>
      </div>
    </header>
  )
}

/* ----------------------------- WINDOW ----------------------------- */

function AppWindow({ app, active, onFocus, onClose, onMinimize, onMaximize, position, onDragStart, children, maximized, zIndex }) {
  return (
    <motion.section
      className={`os-window ${active ? 'is-active' : ''} win-${app.id} ${maximized ? 'is-max' : ''}`}
      style={{ zIndex, left: position.x, top: position.y }}
      onMouseDown={onFocus}
      initial={{ scale: 0.92, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.85, y: 60, opacity: 0, transition: { duration: 0.22, ease } }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
    >
      <header
        className="window-titlebar"
        onPointerDown={(e) => {
          // Allow drag only if the press didn't start on a control button,
          // the title pill, or any inner interactive element.
          if (e.target.closest('.window-controls')) return
          if (e.target.closest('.title-action')) return
          if (e.target.closest('.title-pill')) return
          if (!maximized) onDragStart(e)
        }}
        onDoubleClick={(e) => {
          if (e.target.closest('.window-controls')) return
          onMaximize()
        }}
        style={{ cursor: maximized ? 'default' : 'grab' }}
      >
        {/* The controls block sits on top of the titlebar (z-index: 2)
            and stops pointer events from reaching the titlebar drag handler. */}
        <div className="window-controls">
          <button
            type="button"
            className="ctrl close"
            onClick={(e) => { e.stopPropagation(); onClose() }}
            aria-label="Close"
          >
            <X size={11} strokeWidth={3} />
          </button>
          <button
            type="button"
            className="ctrl min"
            onClick={(e) => { e.stopPropagation(); onMinimize() }}
            aria-label="Minimize"
          >
            <Minus size={11} strokeWidth={3} />
          </button>
          <button
            type="button"
            className="ctrl max"
            onClick={(e) => { e.stopPropagation(); onMaximize() }}
            aria-label="Maximize"
          >
            <Maximize2 size={9} strokeWidth={3} />
          </button>
        </div>
        <div className="title-pill" onPointerDown={(e) => e.stopPropagation()}>
          <app.icon size={13} />
          <span>{app.title}</span>
        </div>
        <div className="title-right" onPointerDown={(e) => e.stopPropagation()}>
          <button className="title-action" aria-label="Search" type="button"><Search size={12} /></button>
        </div>
      </header>
      <div className="window-content">{children}</div>
    </motion.section>
  )
}

/* ----------------------------- APP: ABOUT ----------------------------- */

function AboutApp() {
  return (
    <div className="app-about">
      <div className="about-hero">
        <motion.div
          className="about-avatar"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease }}
        >
          <span>{profile.name.split(' ').map((n) => n[0]).join('')}</span>
          <div className="avatar-ring" />
        </motion.div>
        <div>
          <p className="eyebrow">PROFILE</p>
          <h2>{profile.name}</h2>
          <p className="about-role">{profile.role} · {profile.location}</p>
        </div>
      </div>
      <div className="about-body">
        <p>{profile.bio}</p>
        <p>I care about AI that is practical, understandable, and built with attention to the people using it.</p>
        <div className="chip-row">
          {profile.focus.map((f) => (
            <span key={f} className="chip"><Sparkles size={11} /> {f}</span>
          ))}
        </div>
      </div>
      <div className="about-meta">
        <div>
          <dt>Email</dt>
          <dd><a href={`mailto:${profile.email}`}><Mail size={13} /> {profile.email}</a></dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd><a href={profile.github} target="_blank" rel="noreferrer"><Github size={13} /> /Nikhil383</a></dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={13} /> /in/nikhilmaheshds</a></dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>Full-time / projects</dd>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- APP: PROJECTS ----------------------------- */

function ProjectsApp() {
  return (
    <div className="app-projects">
      <div className="app-intro">
        <span>~/projects</span>
        <h2>Selected engineering work</h2>
        <p>Applications built around useful, grounded AI experiences.</p>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.article
            className="project-card"
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease }}
            whileHover={{ y: -4 }}
          >
            <div className="project-thumb" style={{ background: `linear-gradient(135deg, ${APPS[i % APPS.length].color}30, transparent)` }}>
              <FolderOpen size={22} color={APPS[i % APPS.length].color} />
            </div>
            <h3>{p.label}</h3>
            <p>{p.description}</p>
            <small>{p.stack}</small>
            <div className="project-links">
              <a href={p.github} target="_blank" rel="noreferrer"><Github size={13} /> Source</a>
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Demo <ExternalLink size={12} /></a>}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------- APP: AI LAB ----------------------------- */

function AILabApp() {
  return (
    <div className="app-ailab">
      <div className="app-intro">
        <span>ai-lab · architectures</span>
        <h2>RAG &amp; Agentic systems</h2>
        <p>How Nikhil designs grounded, multi-tool AI workflows.</p>
      </div>

      <section className="lab-section">
        <h3><span className="lab-num">01</span> Multimodal RAG pipeline</h3>
        <div className="flow">
          {ragPipeline.map((step, i) => (
            <motion.div
              className="flow-step"
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, ease }}
            >
              <span className="flow-dot">{i + 1}</span>
              {step}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="lab-section">
        <h3><span className="lab-num">02</span> Agentic RAG</h3>
        <div className="agent-graph">
          <div className="agent-node user"><Bot size={16} /> {agenticRag.user}</div>
          <div className="agent-arrow">→</div>
          <div className="agent-node router"><Sparkles size={16} /> {agenticRag.router}</div>
          <div className="agent-tools">
            {agenticRag.tools.map((t) => (
              <motion.div className="agent-node tool" key={t} whileHover={{ scale: 1.05 }}>{t}</motion.div>
            ))}
          </div>
          <div className="agent-arrow">→</div>
          <div className="agent-node out"><Zap size={16} /> {agenticRag.output}</div>
        </div>
      </section>
    </div>
  )
}

/* ----------------------------- APP: SYSTEM / SKILLS ----------------------------- */

function SkillsApp() {
  return (
    <div className="app-skills">
      <div className="app-intro">
        <span>system monitor</span>
        <h2>Technology activity</h2>
        <p>Tools used across learning, prototypes, and production-oriented projects.</p>
      </div>
      <div className="skill-cores">
        {skillGroups.map((group, gi) => (
          <motion.section
            className="skill-core"
            key={group.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.08, ease }}
          >
            <header>
              <span className="core-dot" style={{ background: group.color }} />
              <h3>{group.name}</h3>
            </header>
            {group.items.map((item, i) => (
              <div className="meter" key={item.name}>
                <span>{item.name}</span>
                <div className="meter-bar">
                  <motion.i
                    initial={{ width: 0 }}
                    animate={{ width: `${item.level * 100}%` }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.9, ease }}
                    style={{ background: `linear-gradient(90deg, ${group.color}, ${group.color}99)` }}
                  />
                </div>
                <small>{Math.round(item.level * 100)}%</small>
              </div>
            ))}
          </motion.section>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------- APP: RESUME ----------------------------- */

function ResumeApp() {
  return (
    <div className="app-resume">
      <motion.div
        className="resume-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="resume-cover" style={{ background: 'linear-gradient(135deg, #ff375f, #ff9f0a)' }}>
          <FileText size={36} color="#fff" />
        </div>
        <p className="eyebrow">RESUME</p>
        <h2>{profile.name}</h2>
        <p className="about-role">{profile.role}</p>
        <div className="contact-grid">
          <a href={`mailto:${profile.email}`}><Mail size={14} /> {profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={14} /> github</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14} /> linkedin</a>
        </div>
        <h3 className="resume-h3">Experience</h3>
        {experience.map((e) => (
          <div className="resume-item" key={e.company}>
            <strong>{e.role} · {e.company}</strong>
            <small>{e.period} · {e.location}</small>
            <p>{e.summary}</p>
          </div>
        ))}
        <a className="resume-button" href={profile.resume} target="_blank" rel="noreferrer">
          Open full resume <ChevronRight size={15} />
        </a>
      </motion.div>
    </div>
  )
}

/* ----------------------------- APP: SAFARI / WEB ----------------------------- */

function SafariApp() {
  const sites = [
    { label: 'GitHub', url: profile.github, icon: Github, color: '#f4f4f5' },
    { label: 'LinkedIn', url: profile.linkedin, icon: Linkedin, color: '#0a66c2' },
    { label: 'Email', url: `mailto:${profile.email}`, icon: Mail, color: '#ff453a' },
  ]
  return (
    <div className="app-safari">
      <div className="safari-bar">
        <button className="safari-nav" aria-label="Back" type="button">‹</button>
        <button className="safari-nav" aria-label="Forward" type="button">›</button>
        <div className="safari-url">
          <Search size={12} />
          <span>nikhil-portfolio://connect</span>
        </div>
        <button className="safari-nav" aria-label="Share" type="button"><ExternalLink size={12} /></button>
      </div>
      <div className="safari-grid">
        {sites.map((s) => (
          <motion.a
            key={s.label}
            className="safari-card"
            href={s.url}
            target={s.url.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            whileHover={{ y: -4 }}
          >
            <div className="safari-favicon" style={{ background: s.color }}>
              <s.icon size={18} color="#fff" />
            </div>
            <strong>{s.label}</strong>
            <small>{s.url.replace(/^https?:\/\//, '')}</small>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------- APP: TERMINAL (Gemini + RAG) ----------------------------- */

const COMMANDS_HELP = [
  'help                         list commands',
  'whoami                       short profile',
  'ls                           list entries',
  'open [app]                   open an app (terminal, projects, about, resume, web, ai-lab, skills)',
  'skills                       open system monitor',
  'experience / about           open about',
  'resume                       open resume',
  'github | linkedin | mail     open contact link',
  'clear                        clear the terminal',
  'rag [question]               show retrieved context (debug)',
  'set key [api-key]            set Gemini API key at runtime',
  '',
  'Anything else is sent to the local LLM (Gemini + RAG).',
  'Examples:',
  '  what projects has Nikhil built?',
  '  explain RAG in simple terms',
  "  what's his email?",
  '  which company did he intern at?',
]

function TerminalApp({ onLaunch }) {
  const [history, setHistory] = useState(() => [
    { kind: 'sys', text: 'PORTFOLIOOS Terminal 3.0 — local assistant enabled.' },
    { kind: 'sys', text: 'Retrieval: in-browser RAG · LLM: Gemini 2.0 Flash.' },
    { kind: 'sys', text: hasGeminiKey() ? 'Gemini key: loaded from GEMINI_API_KEY.' : 'No GEMINI_API_KEY set — using RAG-only mode. Run `set key YOUR_KEY` to enable Gemini.' },
    { kind: 'sys', text: 'Ask anything. Try `help`, `whoami`, or just type a question.' },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [history, busy])

  const append = (items) => setHistory((h) => [...h, ...items])

  /** Core RAG + Gemini call. */
  const askLLM = async (question) => {
    setBusy(true)
    append([{ kind: 'you', text: `nikhil@portfolio ~ % ${question}` }])

    // 1. Retrieve the most relevant chunks using RAG
    const retrieved = retrieve(question, 5)
    const ragContext = buildContext(retrieved)
    const context = ragContext ? `${ragContext}\n\n[Full Profile Reference]\n${aboutText}` : aboutText

    // 2. Query Gemini with the grounded context (or fallback to snippet extraction if unavailable)
    const { text, source } = await askGemini({ question, context })

    // 3. Output response
    const finalText = text && text.trim().length > 0 ? text : RAG_FALLBACK_MESSAGE

    const tag = source === 'gemini'
      ? '— answered with Gemini (grounded in portfolio knowledge base)'
      : '— answered from local knowledge base'

    append([
      ...(tag ? [{ kind: 'sys', text: tag }] : []),
      ...finalText.split('\n').map((line) => ({ kind: 'llm', text: line })),
    ])
    setBusy(false)
  }

  /** Show retrieved RAG chunks verbatim. Used by `rag ...` command. */
  const showRag = (question) => {
    const retrieved = retrieve(question, 4)
    append([{ kind: 'you', text: `rag ${question}` }])
    if (!retrieved.length) {
      append([{ kind: 'llm', text: RAG_FALLBACK_MESSAGE }])
      return
    }
    append([
      ...retrieved.map((r, i) => ({ kind: 'rag', text: `[${i + 1}] (${r.source}, score ${r.score.toFixed(3)}) ${r.text}` })),
    ])
  }

  const runCommand = (raw) => {
    const command = raw.trim()
    if (!command) return
    append([{ kind: 'you', text: `nikhil@portfolio ~ % ${command}` }])
    const lower = command.toLowerCase()

    if (lower === 'clear') { setHistory([]); return }
    if (lower === 'help') { append([{ kind: 'out', text: COMMANDS_HELP.join('\n') }]); return }
    if (lower === 'whoami') { append([{ kind: 'out', text: `${profile.name} — ${profile.role} building with LLMs, RAG & multimodal AI.` }]); return }
    if (lower === 'ls') { append([{ kind: 'out', text: 'projects/  about.txt  skills/  resume.pdf  contact.txt' }]); return }
    if (lower === 'skills') { onLaunch('skills'); append([{ kind: 'out', text: 'Opening System Monitor…' }]); return }
    if (lower === 'experience' || lower === 'about') { onLaunch('about'); append([{ kind: 'out', text: 'Opening About…' }]); return }
    if (lower === 'resume') { onLaunch('resume'); append([{ kind: 'out', text: 'Opening Resume…' }]); return }
    if (lower === 'github') { window.open(profile.github, '_blank'); append([{ kind: 'out', text: 'Opening GitHub…' }]); return }
    if (lower === 'linkedin') { window.open(profile.linkedin, '_blank'); append([{ kind: 'out', text: 'Opening LinkedIn…' }]); return }
    if (lower === 'mail' || lower === 'email') { window.open(`mailto:${profile.email}`, '_self'); append([{ kind: 'out', text: `Opening mail client for ${profile.email}…` }]); return }
    if (lower === 'contact') { onLaunch('resume'); append([{ kind: 'out', text: 'Opening contact details…' }]); return }
    if (lower.startsWith('open ')) {
      const map = { terminal: 'terminal', projects: 'projects', 'ai-lab': 'ai-lab', about: 'about', skills: 'skills', resume: 'resume', web: 'safari', safari: 'safari' }
      const id = map[lower.slice(5).trim()]
      if (id) { onLaunch(id); append([{ kind: 'out', text: `Launching ${id}…` }]) }
      else append([{ kind: 'err', text: `open: ${lower.slice(5).trim()}: application not found` }])
      return
    }
    if (lower.startsWith('rag ')) { showRag(command.slice(4).trim()); return }
    if (lower.startsWith('set key ')) {
      const k = command.slice('set key '.length).trim()
      setGeminiKey(k)
      append([{ kind: 'out', text: k ? 'Gemini key set for this session.' : 'Gemini key cleared.' }])
      return
    }
    if (lower === 'set key') {
      append([{ kind: 'err', text: 'usage: set key YOUR_GEMINI_API_KEY' }])
      return
    }

    // Default: ask the LLM (Gemini + RAG).
    askLLM(command)
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-scroll" ref={scrollRef}>
        {history.map((line, i) => (
          <motion.p
            key={i}
            className={`tline t-${line.kind}`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
          >
            {line.text}
          </motion.p>
        ))}
        {busy && (
          <p className="tline t-llm">
            <span className="typing"><span /><span /><span /></span> thinking…
          </p>
        )}
      </div>
      <form
        className="terminal-prompt"
        onSubmit={(e) => { e.preventDefault(); runCommand(input); setInput('') }}
      >
        <span className="prompt-arrow">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck={false}
          placeholder='Ask anything · "what is RAG" · "open projects"'
          aria-label="Terminal input"
        />
        <kbd>⏎</kbd>
      </form>
    </div>
  )
}

/* ----------------------------- CONTROL CENTER ----------------------------- */

function ControlCenter({ open, onClose, theme, onToggleTheme }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="control-center"
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.25, ease }}
        >
          <div className="cc-row">
            <button className="cc-tile cc-tile-wifi" onClick={onClose} type="button">
              <Wifi size={22} />
              <span>Wi-Fi<br /><small>Home Network</small></span>
              <i className="cc-on" />
            </button>
            <button className="cc-tile cc-tile-bt" type="button">
              <span style={{ fontSize: 22 }}>⌬</span>
              <span>Bluetooth<br /><small>On</small></span>
              <i className="cc-on" />
            </button>
          </div>
          <div className="cc-row">
            <button className="cc-tile cc-tile-airdrop" type="button">
              <span style={{ fontSize: 22 }}>⇧</span>
              <span>AirDrop<br /><small>Contacts Only</small></span>
            </button>
            <button className="cc-tile cc-tile-focus" type="button">
              <Moon size={20} />
              <span>Focus<br /><small>Off</small></span>
            </button>
          </div>
          <div className="cc-slider">
            <label><Sun size={14} /> Display</label>
            <input type="range" defaultValue={75} />
          </div>
          <div className="cc-slider">
            <label><Volume2 size={14} /> Sound</label>
            <input type="range" defaultValue={40} />
          </div>
          <button className="cc-theme" onClick={onToggleTheme} type="button">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

/* ----------------------------- SPOTLIGHT / COMMAND PALETTE ----------------------------- */

function Spotlight({ open, onClose, onLaunch }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 30) }, [open])

  const matches = useMemo(() => {
    if (!q.trim()) return APPS
    const lower = q.toLowerCase()
    return APPS.filter((a) => a.title.toLowerCase().includes(lower) || a.hint.toLowerCase().includes(lower))
  }, [q])

  if (!open) return null
  return (
    <motion.div
      className="spotlight-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="spotlight"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -20, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <div className="spotlight-input">
          <Search size={16} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search apps, projects, or ask a question…"
            onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
          />
          <kbd>esc</kbd>
        </div>
        <div className="spotlight-results">
          {matches.length ? matches.map((app) => (
            <button key={app.id} className="spotlight-item" onClick={() => { onLaunch(app.id); onClose() }} type="button">
              <span className="spotlight-icon" style={{ background: app.color }}>
                <app.icon size={16} color="#fff" />
              </span>
              <div>
                <strong>{app.title}</strong>
                <small>{app.hint}</small>
              </div>
              <ChevronRight size={14} />
            </button>
          )) : (
            <p className="spotlight-empty">No matches. Press <kbd>esc</kbd> to close.</p>
          )}
        </div>
        <div className="spotlight-foot">
          <span><Command size={11} /> ⏎ open</span>
          <span>esc close</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ----------------------------- DESKTOP ICONS ----------------------------- */

function DesktopIcon({ app, onOpen, index }) {
  return (
    <motion.button
      className="desktop-icon"
      onDoubleClick={() => onOpen(app.id)}
      onClick={() => onOpen(app.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.05, duration: 0.4, ease }}
      whileHover={{ y: -3 }}
      type="button"
    >
      <span className="desktop-icon-glyph" style={{ background: `linear-gradient(160deg, ${app.color}, ${app.color}99)` }}>
        <app.icon size={26} color="#fff" strokeWidth={1.8} />
      </span>
      <b>{app.title}</b>
      <small>{app.hint}</small>
    </motion.button>
  )
}

/* ----------------------------- MAIN APP ----------------------------- */

const DEFAULT_POSITIONS = {
  about:    { x: 220, y: 110 },
  projects: { x: 300, y: 100 },
  'ai-lab': { x: 260, y: 90 },
  skills:   { x: 340, y: 120 },
  resume:   { x: 380, y: 90 },
  safari:   { x: 280, y: 110 },
  // terminal opens centered-ish by default
  terminal: { x: 280, y: 100 },
}

export default function App() {
  const [booting, setBooting] = useState(true)
  // Terminal opens at startup as the active app.
  const [open, setOpen] = useState(['terminal'])
  const [minimized, setMinimized] = useState([])
  const [maximized, setMaximized] = useState([])
  const [active, setActive] = useState('terminal')
  const [positions, setPositions] = useState(DEFAULT_POSITIONS)
  const [spotlight, setSpotlight] = useState(false)
  const [cc, setCC] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [zCounter, setZCounter] = useState(10)
  const dragRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setSpotlight((s) => !s)
      }
      if (e.key === 'Escape') { setSpotlight(false); setCC(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const focus = useCallback((id) => {
    setZCounter((c) => c + 1)
    setActive(id)
  }, [])

  const launch = useCallback((id) => {
    if (id === 'spotlight') { setSpotlight(true); return }
    setOpen((items) => (items.includes(id) ? items : [...items, id]))
    setMinimized((m) => m.filter((x) => x !== id))
    setZCounter((c) => c + 1)
    setActive(id)
  }, [])

  const closeApp = useCallback((id) => {
    setOpen((items) => {
      const next = items.filter((x) => x !== id)
      if (active === id) {
        const remaining = next.filter((x) => !minimized.includes(x))
        setActive(remaining[remaining.length - 1] || '')
      }
      return next
    })
    setMinimized((m) => m.filter((x) => x !== id))
    setMaximized((mx) => mx.filter((x) => x !== id))
  }, [active, minimized])

  const minimize = useCallback((id) => {
    setMinimized((m) => {
      // toggle: if already minimized, restore; else add
      if (m.includes(id)) {
        // restoring: also focus it
        setZCounter((c) => c + 1)
        setActive(id)
        return m.filter((x) => x !== id)
      }
      if (active === id) setActive('')
      return [...m, id]
    })
  }, [active])

  const maximize = useCallback((id) => {
    setMaximized((mx) => (mx.includes(id) ? mx.filter((x) => x !== id) : [...mx, id]))
  }, [])

  /* dragging */
  const startDrag = (id, e) => {
    setZCounter((c) => c + 1)
    setActive(id)
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, pos: positions[id] }
  }
  useEffect(() => {
    const move = (e) => {
      const d = dragRef.current
      if (!d) return
      const x = Math.max(10, Math.min(window.innerWidth - 340, d.pos.x + e.clientX - d.startX))
      const y = Math.max(60, Math.min(window.innerHeight - 140, d.pos.y + e.clientY - d.startY))
      setPositions((p) => ({ ...p, [d.id]: { x, y } }))
    }
    const stop = () => { dragRef.current = null }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop) }
  }, [])

  const content = {
    about: <AboutApp />,
    projects: <ProjectsApp />,
    'ai-lab': <AILabApp />,
    skills: <SkillsApp />,
    resume: <ResumeApp />,
    safari: <SafariApp />,
    terminal: <TerminalApp onLaunch={launch} />,
  }

  // Compute z-index for each open window based on focus order.
  const visible = open.filter((id) => !minimized.includes(id))
  const zIndexFor = (id) => (active === id ? 100 + zCounter : 5 + Math.max(0, visible.indexOf(id)))

  return (
    <div className="desktop">
      <AnimatePresence>
        {booting && <BootScreen onDone={() => setBooting(false)} />}
      </AnimatePresence>

      {/* wallpaper */}
      <div className="wallpaper">
        <div className="wallpaper-glow g1" />
        <div className="wallpaper-glow g2" />
        <div className="wallpaper-glow g3" />
        <div className="wallpaper-grain" />
        <div className="wallpaper-mesh" />
      </div>

      <MenuBar
        onLaunch={launch}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      {/* desktop icons */}
      <section className="desktop-icons" aria-label="Applications">
        {APPS.map((app, i) => (
          <DesktopIcon key={app.id} app={app} onOpen={launch} index={i} />
        ))}
      </section>

      {/* welcome panel — hidden when an app is open so the desktop
          feels like a real mac. Clicking a desktop icon opens an app
          and dismisses the welcome. */}
      <AnimatePresence>
        {open.length === 0 && (
          <motion.section
            className="welcome"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
          >
            <p className="welcome-line"><span>❯</span> whoami</p>
            <h1>Building intelligent systems<br />with <em>LLMs, RAG</em> &amp; multimodal AI.</h1>
            <p className="welcome-sub">{profile.bio}</p>
            <div className="welcome-actions">
              <motion.button className="btn-primary" onClick={() => launch('projects')} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="button">
                Explore projects <ChevronRight size={16} />
              </motion.button>
              <motion.button className="btn-ghost" onClick={() => launch('terminal')} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="button">
                <Terminal size={15} /> Open terminal
              </motion.button>
              <motion.button className="btn-ghost" onClick={() => setSpotlight(true)} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="button">
                <Search size={15} /> Search
              </motion.button>
            </div>
            <div className="welcome-stats">
              <div><b>{projects.length}</b><span>projects</span></div>
              <div><b>{skillGroups.reduce((n, g) => n + g.items.length, 0)}</b><span>tech items</span></div>
              <div><b>1</b><span>internship</span></div>
              <div><b>∞</b><span>questions to ask</span></div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* control center toggle (top right) */}
      <motion.button
        className="cc-toggle"
        onClick={() => setCC((v) => !v)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        title="Control Center"
        aria-label="Control Center"
        type="button"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="6" r="2.4" /><circle cx="12" cy="6" r="2.4" /><circle cx="18" cy="6" r="2.4" />
          <circle cx="6" cy="12" r="2.4" /><circle cx="12" cy="12" r="2.4" /><circle cx="18" cy="12" r="2.4" />
          <circle cx="6" cy="18" r="2.4" /><circle cx="12" cy="18" r="2.4" /><circle cx="18" cy="18" r="2.4" />
        </svg>
      </motion.button>
      <ControlCenter
        open={cc}
        onClose={() => setCC(false)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      {/* windows */}
      <div className="window-layer">
        <AnimatePresence>
          {visible.map((id) => {
            const app = APPS.find((a) => a.id === id)
            if (!app) return null
            const isMax = maximized.includes(id)
            return (
              <AppWindow
                key={id}
                app={app}
                active={active === id}
                maximized={isMax}
                position={isMax ? { x: 12, y: 56 } : positions[id]}
                onFocus={() => focus(id)}
                onClose={() => closeApp(id)}
                onMinimize={() => minimize(id)}
                onMaximize={() => maximize(id)}
                onDragStart={(e) => startDrag(id, e)}
                zIndex={zIndexFor(id)}
              >
                {content[id]}
              </AppWindow>
            )
          })}
        </AnimatePresence>
      </div>

      {/* dock */}
      <MacDock
        apps={APPS}
        open={open}
        active={active}
        onLaunch={launch}
        onClose={closeApp}
      />

      {/* spotlight */}
      <AnimatePresence>
        {spotlight && (
          <Spotlight open={spotlight} onClose={() => setSpotlight(false)} onLaunch={launch} />
        )}
      </AnimatePresence>

      {/* minimized indicator bar */}
      {minimized.length > 0 && (
        <div className="min-bar">
          {minimized.map((id) => {
            const app = APPS.find((a) => a.id === id)
            if (!app) return null
            return (
              <button key={id} className="min-item" onClick={() => minimize(id)} title={`Restore ${app.title}`} type="button">
                <span style={{ background: app.color }}><app.icon size={12} color="#fff" /></span>
                {app.title}
              </button>
            )
          })}
        </div>
      )}

      {/* restart boot */}
      <button
        className="restart-btn"
        onClick={() => setBooting(true)}
        title="Replay boot sequence"
        aria-label="Restart"
        type="button"
      >
        <RotateCcw size={13} /> <span>Reboot</span>
      </button>
    </div>
  )
}
