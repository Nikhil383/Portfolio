import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Section from './Section.jsx'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
}

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
}

export default function Contact() {
  const form = useRef()
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null)

  const sendEmail = async (e) => {
    e.preventDefault()
    setIsSending(true)
    setStatus(null)

    try {
      await emailjs.sendForm(
        'service_t9jknwj',
        'template_ugckyeo',
        form.current,
        'kkEP75ET7msBd4V2h'
      )

      setStatus('success')
      form.current.reset()
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
    } finally {
      setIsSending(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <Section
      id="contact"
      title="Get In Touch"
      eyebrow="Contact Me"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Let's build something intelligent.</h3>
            <p className="text-slate-400 leading-relaxed">
              Whether you have a specific project in mind or just want to chat about the future of AI, my inbox is always open.
            </p>
          </motion.div>

          <div className="space-y-4">
            <motion.a
              variants={linkVariants}
              href="mailto:nikhilmahesh89@gmail.com"
              className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:bg-slate-800 hover:border-primary/50"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Email Me</p>
                <p className="text-sm font-semibold text-white">nikhilmahesh89@gmail.com</p>
              </div>
            </motion.a>

            <div className="flex gap-4">
              <motion.a
                variants={linkVariants}
                href="https://www.linkedin.com/in/nikhilmaheshds/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 group flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:bg-slate-800 hover:border-primary/50"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-slate-300">LinkedIn</span>
              </motion.a>
              <motion.a
                variants={linkVariants}
                href="https://github.com/Nikhil383"
                target="_blank"
                rel="noreferrer"
                className="flex-1 group flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:bg-slate-800 hover:border-primary/50"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-slate-300">GitHub</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.form
          ref={form}
          className="glass-card flex flex-col gap-6 rounded-3xl p-8"
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="user_name" className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
              <motion.input
                id="user_name"
                name="user_name"
                type="text"
                required
                placeholder="Enter name"
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <label htmlFor="user_email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
              <motion.input
                id="user_email"
                name="user_email"
                type="email"
                required
                placeholder="Enter email"
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
            <motion.textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="How can I help you?"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSending}
            className={`group flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold shadow-lg transition-all ${status === 'success'
              ? 'bg-emerald-500 text-white shadow-emerald-500/20'
              : status === 'error'
                ? 'bg-rose-500 text-white shadow-rose-500/20'
                : 'bg-primary text-primary-foreground shadow-primary/20 hover:opacity-90'
              } disabled:opacity-70`}
            whileHover={!isSending ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isSending ? { scale: 0.98 } : {}}
          >
            {isSending ? (
              <>
                <span>Sending...</span>
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : status === 'success' ? (
              <>
                <span>Message Sent!</span>
                <CheckCircle2 className="h-4 w-4" />
              </>
            ) : status === 'error' ? (
              <>
                <span>Failed to Send</span>
                <AlertCircle className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </>
            )}
          </motion.button>

          <motion.div
            className="flex items-center gap-2 text-[11px] text-slate-600 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <MessageSquare className="h-3 w-3" />
            <span>Currently responding in 24 hours</span>
          </motion.div>
        </motion.form>
      </div>
    </Section>
  )
}

