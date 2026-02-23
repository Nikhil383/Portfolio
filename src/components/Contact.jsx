import Section from './Section.jsx'

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      eyebrow="Let's talk"
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
        <div className="space-y-3 text-sm text-slate-300 sm:text-base">
          <p>
            Interested in collaborating, hiring, or chatting about AI systems? Reach out and
            I'll get back to you soon.
          </p>
          <div className="space-y-1 text-sm">
            <a
              href="mailto:nikhilmahesh89@gmail.com"
              className="block text-accent hover:underline"
            >
              Email
            </a>
            <div className="flex flex-wrap gap-3 text-xs text-slate-300 sm:text-sm">
              <a
                href="https://www.linkedin.com/in/nikhilmaheshds/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Nikhil383"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <form
          className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-200"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-xs font-medium text-slate-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-accent"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-accent"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-xs font-medium text-slate-300"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="What would you like to tell?"
              className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
          >
            Send 
          </button>
          <p className="text-xs text-slate-500">
            This form is a visual component only; use the email link above to reach out
            directly.
          </p>
        </form>
      </div>
    </Section>
  )
}

