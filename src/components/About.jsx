import Section from './Section.jsx'

export default function About() {
  return (
    <Section
      id="about"
      title="About"
      eyebrow="Profile"
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.35fr)] md:items-start">
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          Im an AI Engineer focused on shipping practical machine learning and large
          language model solutions. I bridge research and production, from shaping problem
          statements and data pipelines to deploying robust, observable systems in
          production environments.
        </p>
        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-200 sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Location</span>
            <span>Bengaluru, India</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Focus areas</span>
            <span>LLMs, NLP, ML Systems</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Open to</span>
            <span>Full-time, consulting, collaborations</span>
          </div>
        </div>
      </div>
    </Section>
  )
}

