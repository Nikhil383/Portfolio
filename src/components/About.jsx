import { User, MapPin, Target, Zap } from 'lucide-react'
import Section from './Section.jsx'

export default function About() {
  return (
    <Section
      id="about"
      title="My Story"
      eyebrow="Introduction"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-300">
            I'm an <span className="text-white font-semibold">AI Engineer</span> dedicated to crafting intelligent systems that solve real-world problems. My passion lies at the intersection of <span className="text-primary italic">Deep Learning</span> and <span className="text-primary italic">Software Engineering</span>.
          </p>
          <p className="text-base leading-relaxed text-slate-400">
            I specialize in building production-ready LLM applications, from designing complex RAG pipelines to fine-tuning specialized models. I believe in AI that isn't just powerful, but also reliable, interpretable, and user-centric.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Visionary</h4>
                <p className="text-xs text-slate-500">Scaling AI for real impact</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Efficient</h4>
                <p className="text-xs text-slate-500">Fast, robust production code</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass-card overflow-hidden rounded-3xl p-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white">Full Profile</h3>
                  <p className="text-sm text-slate-500">Personal Details</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800/50">
                {[
                  { label: "Location", value: "Bengaluru, India", icon: MapPin },
                  { label: "Focus", value: "LLMs, NLP, MLOps", icon: Target },
                  { label: "Availability", value: "Full-time / Projects", icon: Zap },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-400">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </span>
                    <span className="font-medium text-slate-200">{item.value}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="mt-4 block w-full rounded-2xl bg-white/5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
              >
                Download Resume PDF
              </a>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute -right-4 -bottom-4 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
        </div>
      </div>
    </Section>
  )
}

