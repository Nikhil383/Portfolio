# NikhilOS — Linux-Inspired AI Engineer Portfolio

## 1. Project Overview

**NikhilOS** is an aesthetic, interactive portfolio designed like a modern Linux desktop environment. Instead of a conventional scrolling portfolio, visitors interact with desktop icons, application windows, a terminal, project explorer, AI Lab, resume viewer, and system monitor.

The goal is to make the portfolio itself demonstrate frontend engineering, UI/UX thinking, and AI engineering work.

---

## 2. Core Concept

The website behaves like a fictional Linux distribution:

> **NikhilOS — AI Engineer Workstation**

Typical desktop layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ NikhilOS                       WiFi  🔊  02:14  Battery      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│       📁 Projects        📄 Resume        👤 About           │
│                                                              │
│       🧠 AI Lab          🛠 Skills        📡 Contact         │
│                                                              │
│              ┌────────────────────────────────────┐          │
│              │ Terminal                       ─ □ ×│          │
│              ├────────────────────────────────────┤          │
│              │ nikhil@portfolio:~$ whoami         │          │
│              │                                    │          │
│              │ AI Engineer                        │          │
│              │ Building intelligent systems       │          │
│              │ with LLMs, RAG & multimodal AI.    │          │
│              │                                    │          │
│              │ nikhil@portfolio:~$ █              │          │
│              └────────────────────────────────────┘          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│   ◉    >_    📁    🧠    🌐    ⚙                           │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Recommended Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Motion / Framer Motion**
- **Zustand** for desktop/window state
- **Lucide React** for icons

Optional additions:

- `react-rnd` for draggable/resizable windows
- `xterm.js` if a more realistic terminal is required
- MDX for project case studies
- Vercel for deployment

---

## 4. Main Applications

### Terminal

Interactive CLI-style navigation and portfolio exploration.

Example commands:

```bash
help
whoami
ls
pwd
cat about.txt
cd projects
ls
open multimodal-rag
skills
experience
resume
github
contact
clear
```

Example output:

```text
nikhil@portfolio:~/projects$ ls

multimodal-rag/
agentic-rag/
ai-data-analyst/
vision-ai/

nikhil@portfolio:~/projects$ open multimodal-rag

Launching project viewer...
```

### Projects / Files

Linux file-manager-inspired project explorer.

Each project can expose:

- Project overview
- Problem statement
- Architecture
- Technology stack
- Screenshots/demo
- Key engineering decisions
- Challenges
- Results
- GitHub repository
- Live demo

### AI Lab

Interactive area dedicated to AI/ML work.

Possible demos:

- Multimodal RAG architecture
- Agentic RAG
- Semantic search
- Embedding visualization
- Document Q&A
- Vision-language model demo
- Agent workflow visualization

### About

Contains:

- Short introduction
- Engineering interests
- Current focus
- Technical philosophy
- Experience/education timeline

### Resume

Linux document-viewer-style resume screen.

Actions:

- View resume
- Download PDF
- Open experience
- Open skills

### System Monitor / Skills

Use Linux system-monitor aesthetics to display technologies.

Example:

```text
SYSTEM MONITOR

AI / ML
████████████████░░░  Python
███████████████░░░░  PyTorch
████████████████░░░  LangChain
██████████████░░░░░  LangGraph
████████████████░░░  RAG

Backend
███████████████░░░░  FastAPI
█████████████░░░░░░  Django
██████████████░░░░░  SQL

Cloud
████████████░░░░░░░  Azure
████████████░░░░░░░  AWS
```

Do not describe the bars as arbitrary percentage proficiency. They can represent experience, usage, familiarity, or technology activity.

### Contact

Provide direct access to:

- Email
- GitHub
- LinkedIn
- Resume

---

## 5. Window Manager

The portfolio should contain a lightweight React window-management system.

Features:

- Open windows
- Close windows
- Minimize
- Maximize
- Restore
- Drag
- Resize
- Focus
- Dynamic z-index
- Dock indicators
- Multiple applications

Example state:

```ts
interface WindowState {
  id: string;
  app: AppId;
  title: string;

  position: {
    x: number;
    y: number;
  };

  size: {
    width: number;
    height: number;
  };

  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}
```

Zustand can manage global window state.

---

## 6. Suggested Architecture

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── desktop/
│   │   ├── Desktop.tsx
│   │   ├── DesktopIcon.tsx
│   │   ├── TopBar.tsx
│   │   ├── Dock.tsx
│   │   └── Wallpaper.tsx
│   │
│   ├── window/
│   │   ├── Window.tsx
│   │   ├── WindowManager.tsx
│   │   ├── TitleBar.tsx
│   │   └── WindowControls.tsx
│   │
│   ├── terminal/
│   │   ├── Terminal.tsx
│   │   ├── Prompt.tsx
│   │   ├── TerminalOutput.tsx
│   │   └── commands.ts
│   │
│   └── apps/
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── ProjectViewer.tsx
│       ├── AILab.tsx
│       ├── Skills.tsx
│       ├── Resume.tsx
│       ├── Contact.tsx
│       └── SystemMonitor.tsx
│
├── store/
│   └── desktop.ts
│
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   └── commands.ts
│
├── hooks/
│   ├── useWindowManager.ts
│   └── useTerminal.ts
│
├── lib/
│   └── utils.ts
│
└── types/
    ├── app.ts
    └── window.ts
```

---

## 7. Visual Design

Design direction:

**GNOME + Hyprland + terminal aesthetics + restrained glassmorphism**

Suggested palette:

```text
Background
#09090b

Window
rgba(20, 20, 24, 0.88)

Border
rgba(255,255,255,0.08)

Primary text
#f4f4f5

Secondary text
#a1a1aa

Terminal accent
#4ade80

AI accent
#8b5cf6
```

Typography:

```text
UI
Geist / Inter

Terminal
JetBrains Mono

Headings
Geist / Space Grotesk
```

Design principles:

- Dark by default
- Minimal borders
- Subtle transparency
- Small amount of blur
- Smooth window animations
- Consistent spacing
- High readability
- Avoid excessive neon effects
- Avoid excessive glassmorphism

---

## 8. Boot Sequence

On first visit, briefly show a Linux-inspired boot sequence.

```text
NikhilOS 1.0

Initializing kernel............. OK
Loading AI modules.............. OK
Mounting /projects.............. OK
Starting portfolio.service...... OK

Welcome, visitor.

nikhil@portfolio:~$
```

Transition into the desktop after approximately 1–2 seconds.

Requirements:

- Do not replay boot animation unnecessarily
- Allow skipping
- Respect `prefers-reduced-motion`

---

## 9. Terminal Command System

Commands should map to actual portfolio actions.

Example:

```ts
const commands = {
  help: showHelp,
  whoami: showProfile,
  ls: listDirectory,
  pwd: showCurrentDirectory,
  cd: changeDirectory,
  cat: readFile,
  open: openApplication,
  skills: showSkills,
  experience: showExperience,
  resume: openResume,
  github: openGitHub,
  contact: openContact,
  clear: clearTerminal,
};
```

The terminal should support:

- Command history
- Up/down arrow navigation
- Tab completion
- Current directory
- Unknown-command handling
- Keyboard focus
- `help` command

Example error:

```text
nikhil@portfolio:~$ docker

command not found: docker
Type `help` to see available commands.
```

---

## 10. AI Lab Architecture Visualizations

### Multimodal RAG

```text
Image / PDF / Text
        ↓
Document Processing
        ↓
Vision / Text Model
        ↓
Embeddings
        ↓
Vector Database
        ↓
Retriever
        ↓
Context
        ↓
LLM
        ↓
Grounded Answer
```

### Agentic RAG

```text
User
 ↓
Router Agent
 ├── Web Search
 ├── Vector Search
 ├── SQL Agent
 └── Document Agent
       ↓
    Synthesizer
       ↓
    Response
```

Architecture nodes can be clickable and display explanations in a side panel.

---

## 11. Project Viewer

Each project should be presented as an engineering case study rather than only a card.

Recommended structure:

```text
Project Name

Problem
↓
Approach
↓
Architecture
↓
Technology Stack
↓
Implementation
↓
Challenges
↓
Results
↓
What I Learned
↓
GitHub / Demo
```

Example project metadata:

```ts
interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  architecture?: string;
  github?: string;
  demo?: string;
  featured: boolean;
}
```

---

## 12. Dock

Desktop dock applications:

```text
Launcher
Terminal
Projects
AI Lab
Browser/About
Resume
Settings
```

Behavior:

- Hover animation
- Active application indicator
- Click to open
- Click active app to focus
- Minimized app indicator

---

## 13. Mobile Experience

Do not force desktop window management onto mobile devices.

Use an application launcher instead:

```text
┌─────────────────────┐
│ NikhilOS       02:14│
│                     │
│ Hello, I'm Nikhil   │
│ AI Engineer         │
│                     │
│ ┌────┐ ┌────┐ ┌────┐│
│ │ >_ │ │ 📁 │ │ 🧠 ││
│ │Term│ │Proj│ │ AI ││
│ └────┘ └────┘ └────┘│
│                     │
│ ┌────┐ ┌────┐ ┌────┐│
│ │ 👤 │ │ 📄 │ │ 📡 ││
│ │About││ CV │ │Mail││
│ └────┘ └────┘ └────┘│
│                     │
│        ━━━━━         │
└─────────────────────┘
```

Applications should become full-screen views on smaller devices.

---

## 14. Accessibility

The Linux metaphor must not reduce usability.

Requirements:

- Keyboard navigation
- Visible focus states
- ARIA labels
- Semantic HTML
- Sufficient color contrast
- Reduced-motion support
- Mouse-independent terminal navigation
- Mobile fallback

Visitors should never need Linux knowledge to access important information.

---

## 15. Performance

Target:

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lazy-load heavy applications
- Dynamically import AI visualizations
- Optimize images
- Avoid unnecessary animation libraries
- Avoid rendering every application at startup

---

## 16. SEO

Even though the interface behaves like an OS, important portfolio information should remain indexable.

Include metadata for:

- AI Engineer
- Machine Learning Engineer
- Generative AI
- LLM
- Retrieval-Augmented Generation
- Agentic AI
- Multimodal AI
- Python
- React / Next.js

Use structured project pages where useful.

---

## 17. Development Roadmap

### Phase 1 — Foundation

- Create Next.js project
- Configure TypeScript
- Configure Tailwind
- Create global theme
- Add fonts
- Create desktop shell

### Phase 2 — Window Manager

- Window component
- Window controls
- Dragging
- Resizing
- Focus/z-index
- Minimize/maximize
- Zustand state

### Phase 3 — Core Applications

- About
- Projects
- Skills
- Resume
- Contact

### Phase 4 — Terminal

- Terminal UI
- Command parser
- Command history
- Directory simulation
- Application launch commands
- Tab completion

### Phase 5 — AI Lab

- RAG architecture
- Agentic RAG visualization
- Project architecture viewer
- Interactive AI demos

### Phase 6 — Polish

- Boot sequence
- Dock animations
- Window transitions
- Responsive design
- Mobile launcher
- Accessibility
- Performance optimization

### Phase 7 — Deployment

- Production build
- SEO metadata
- Analytics
- Vercel deployment
- Custom domain

---

## 18. MVP

Build the first version with only:

1. Desktop
2. Top bar
3. Dock
4. Window manager
5. Terminal
6. About
7. Projects
8. Resume
9. Contact

Do not start with every advanced animation or AI demo.

Once the desktop/window architecture is stable, add AI Lab and advanced interactions.

---

## 19. Final User Flow

```text
Visit Portfolio
      ↓
Boot Sequence
      ↓
Linux Desktop
      ↓
┌──────────────┬──────────────┐
│ Mouse / Touch│   Terminal   │
└──────┬───────┴───────┬──────┘
       ↓               ↓
 Applications       Commands
       ↓               ↓
 Projects / AI Lab / About
       ↓
 Project Case Studies
       ↓
 Resume / GitHub / Contact
```

The Linux interface should be a presentation layer over a highly accessible portfolio, not a barrier to navigation.

---

## 20. Primary Goal

The finished portfolio should communicate three things immediately:

1. **AI Engineer** — strong focus on LLMs, RAG, multimodal systems, agents, and ML.
2. **Builder** — projects are implemented and explained as engineering systems.
3. **Software Engineer** — the portfolio itself demonstrates React architecture, state management, responsive design, and frontend engineering.

The result should feel like an actual developer workstation rather than a conventional portfolio website with a Linux wallpaper.
