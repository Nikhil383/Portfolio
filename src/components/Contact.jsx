import { Mail, Github, Linkedin, Send, MessageSquare } from 'lucide-react'
import Section from './Section.jsx'

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Get In Touch"
      eyebrow="Contact Me"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Let's build something intelligent.</h3>
            <p className="text-slate-400 leading-relaxed">
              Whether you have a specific project in mind or just want to chat about the future of AI, my inbox is always open.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:nikhilmahesh89@gmail.com"
              className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:bg-slate-800 hover:border-primary/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Email Me</p>
                <p className="text-sm font-semibold text-white">nikhilmahesh89@gmail.com</p>
              </div>
            </a>

            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/nikhilmaheshds/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 group flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:bg-slate-800 hover:border-primary/50"
              >
                <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-slate-300">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Nikhil383"
                target="_blank"
                rel="noreferrer"
                className="flex-1 group flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:bg-slate-800 hover:border-primary/50"
              >
                <Github className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-slate-300">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <form
          className="glass-card flex flex-col gap-6 rounded-3xl p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
            <textarea
              id="message"
              rows={4}
              placeholder="How can I help you?"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="group flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <span>Send Message</span>
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <div className="flex items-center gap-2 text-[11px] text-slate-600 italic">
            <MessageSquare className="h-3 w-3" />
            <span>Currently responding in ~24 hours</span>
          </div>
        </form>
      </div>
    </Section>
  )
}

