// RAG knowledge base for the portfolio terminal.
// Each entry is a chunk of "documents" the assistant can retrieve from.
// The retriever uses simple TF-IDF-like cosine similarity over tokens
// (good enough for an in-browser, no-network RAG). When the user asks
// a question, we:
//   1. Chunk & embed (tokenize)
//   2. Score each chunk vs. the query
//   3. Take the top-k chunks
//   4. Inject them as context for the LLM (Gemini)
//   5. If the LLM returns nothing useful, show "Info not provided".

import { profile, projects, experience, skillGroups, education } from '../data/portfolio'

// Build a flat list of retrievable chunks.
const chunks = []

// Profile / bio
chunks.push({
  id: 'profile-name',
  source: 'about.txt',
  text: `Full name: ${profile.name}.`,
})
chunks.push({
  id: 'profile-role',
  source: 'about.txt',
  text: `${profile.name} is a ${profile.role} based in ${profile.location}.`,
})
chunks.push({
  id: 'profile-bio',
  source: 'about.txt',
  text: profile.bio,
})
chunks.push({
  id: 'profile-focus',
  source: 'about.txt',
  text: `Current focus areas: ${profile.focus.join(', ')}.`,
})
chunks.push({
  id: 'profile-availability',
  source: 'about.txt',
  text: `${profile.name} is available for full-time roles and project work.`,
})

// Contact
chunks.push({
  id: 'contact-email',
  source: 'contact.txt',
  text: `Email: ${profile.email}.`,
})
chunks.push({
  id: 'contact-github',
  source: 'contact.txt',
  text: `GitHub: ${profile.github}.`,
})
chunks.push({
  id: 'contact-linkedin',
  source: 'contact.txt',
  text: `LinkedIn: ${profile.linkedin}.`,
})
chunks.push({
  id: 'contact-resume',
  source: 'contact.txt',
  text: `Resume: ${profile.resume}.`,
})

// Projects
projects.forEach((p) => {
  chunks.push({
    id: `project-${p.id}-overview`,
    source: `projects/${p.name}.md`,
    text: `${p.label}: ${p.description} Built with ${p.stack}.`,
  })
  chunks.push({
    id: `project-${p.id}-links`,
    source: `projects/${p.name}.md`,
    text: `${p.label} source code: ${p.github}. ${p.demo ? `Live demo: ${p.demo}.` : 'No live demo available.'}`,
  })
})

// Experience
experience.forEach((e, i) => {
  chunks.push({
    id: `experience-${i}`,
    source: 'experience.md',
    text: `${e.role} at ${e.company} (${e.period}, ${e.location}). ${e.summary}`,
  })
})

// Education
if (Array.isArray(education)) {
  education.forEach((edu, i) => {
    chunks.push({
      id: `education-${i}`,
      source: 'education.md',
      text: `${edu.degree} in ${edu.field} from ${edu.institution} (${edu.period}, ${edu.location}). ${edu.grade}`,
    })
  })
}

// Recruiter FAQ & Hiring
chunks.push({
  id: 'recruiter-why-hire',
  source: 'recruiter_faq.md',
  text: 'Why hire Nikhil: Strong hands-on engineering track record in building end-to-end AI applications (LLM systems, RAG architectures, Multimodal vision-language models, and FastAPI/Flask backends). Holds an M.Tech in AI & Data Science and has 3 completed/active internships at Digital Visibility Concepts (DVC), Nexvia Technologies, and ABB.',
})
chunks.push({
  id: 'recruiter-availability',
  source: 'recruiter_faq.md',
  text: 'Availability: Nikhil is actively open and available for full-time roles as an AI Engineer, Machine Learning Engineer, Generative AI Engineer, and technical consulting. He is based in Bengaluru, India and open to on-site, hybrid, and remote opportunities.',
})
chunks.push({
  id: 'recruiter-roles',
  source: 'recruiter_faq.md',
  text: 'Target roles: AI Engineer, Machine Learning Engineer, LLM / Generative AI Developer, Full-Stack AI Engineer.',
})

// Skills
skillGroups.forEach((g) => {
  chunks.push({
    id: `skills-${g.name}`,
    source: 'skills.md',
    text: `${g.name} skills: ${g.items.map((i) => i.name).join(', ')}.`,
  })
})

// AI / RAG explanations (factual, safe to include)
chunks.push({
  id: 'kb-rag',
  source: 'kb/rag.md',
  text:
    'Retrieval-Augmented Generation (RAG) is a pattern that grounds LLM answers in external documents. The pipeline: load sources, chunk them, embed each chunk into a vector, store in a vector database, retrieve the top-k most similar chunks for a query, inject them as context for the LLM, and generate a grounded answer.',
})
chunks.push({
  id: 'kb-llm',
  source: 'kb/llm.md',
  text:
    'A large language model (LLM) is a neural network trained on large text corpora to predict the next token. Modern LLMs are used for chat, reasoning, code, summarization, and tool use. Common stacks: Hugging Face Transformers, LangChain, LlamaIndex, and provider APIs like Gemini, OpenAI, and Anthropic.',
})
chunks.push({
  id: 'kb-agentic',
  source: 'kb/agentic.md',
  text:
    'An agentic AI system uses an LLM as a router: it inspects the user query, decides which tool to call (web search, vector retrieval, SQL, calculator, code execution, or APIs), gathers results, and synthesises a final response. Agentic RAG is the same idea applied to retrieval: the agent picks the best retrieval strategy per query.',
})
chunks.push({
  id: 'kb-multimodal',
  source: 'kb/multimodal.md',
  text:
    'Multimodal AI combines vision and language. Typical tasks: image captioning, visual question answering, document understanding, OCR. Common building blocks: CLIP-style vision encoders, BLIP, Gemini, GPT-4V, and open-source models like LLaVA.',
})
chunks.push({
  id: 'kb-embeddings',
  source: 'kb/embeddings.md',
  text:
    'Embeddings map text (or images) to dense vectors such that semantically similar items are close in vector space. They power semantic search, RAG, clustering, and recommendation. Popular models: sentence-transformers, OpenAI text-embedding-3, Cohere embed-v3.',
})
chunks.push({
  id: 'kb-vectordb',
  source: 'kb/vectordb.md',
  text:
    'Vector databases store embeddings and run approximate nearest-neighbour search. Common choices: Chroma, FAISS, Pinecone, Weaviate, Qdrant, pgvector.',
})
chunks.push({
  id: 'kb-langchain',
  source: 'kb/langchain.md',
  text:
    'LangChain and LlamaIndex are popular frameworks for composing LLM applications: prompts, chains, agents, retrievers, and tools. They integrate with most vector databases and model providers.',
})

export { chunks }

// -------------------- Retrieval --------------------

const STOP = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'or', 'that', 'the', 'this', 'to', 'was',
  'were', 'will', 'with', 'you', 'your', 'i', 'me', 'my', 'we', 'us', 'our',
  'they', 'them', 'their', 'do', 'does', 'did', 'have', 'had', 'can', 'could',
  'should', 'would', 'what', 'which', 'who', 'whom', 'how', 'when', 'where',
  'why', 'tell', 'about', 'please', 'show', 'give', 'get', 'find',
])

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+.#/-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && t.length > 1 && !STOP.has(t))
}

function termFreq(tokens) {
  const tf = new Map()
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1)
  return tf
}

function l2norm(map) {
  let s = 0
  for (const v of map.values()) s += v * v
  return Math.sqrt(s) || 1
}

// Pre-compute document vectors once.
const docVectors = chunks.map((c) => {
  const tf = termFreq(tokenize(c.text))
  return { id: c.id, source: c.source, text: c.text, tf, norm: l2norm(tf) }
})

export function retrieve(query, k = 4) {
  const qTokens = tokenize(query)
  if (!qTokens.length) return []
  const qtf = termFreq(qTokens)
  const qnorm = l2norm(qtf)
  const scored = docVectors.map((d) => {
    let dot = 0
    for (const [term, qf] of qtf) {
      const df = d.tf.get(term)
      if (df) dot += qf * df
    }
    return { ...d, score: dot / (d.norm * qnorm) }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.filter((s) => s.score > 0).slice(0, k)
}

// Build a compact context block for the LLM.
export function buildContext(retrieved) {
  if (!retrieved.length) return ''
  return retrieved
    .map((r, i) => `[${i + 1}] (${r.source}) ${r.text}`)
    .join('\n')
}

// Detect whether the user's query is asking for a fact that isn't covered.
export const RAG_FALLBACK_MESSAGE =
  "I couldn't find a direct answer in Nikhil's portfolio. Try asking about his 3 internships (DVC, Nexvia, ABB), projects, tech stack, education, or contact details."

// Heuristic: if no chunk scored > 0, the knowledge base has nothing relevant.
export function hasRelevantContext(retrieved) {
  return Array.isArray(retrieved) && retrieved.length > 0 && retrieved[0].score > 0
}

/**
 * Intelligent, grounded RAG synthesizer for the terminal.
 * Provides structured, recruiter-ready responses for common questions
 * even when running purely offline / in-browser without external APIs.
 */
export function generateRagAnswer(question, retrieved = [], fullText = '') {
  const q = (question || '').toLowerCase().trim()

  // 1. Experience & Internships
  if (
    q.includes('experience') ||
    q.includes('intern') ||
    q.includes('work') ||
    q.includes('company') ||
    q.includes('companies') ||
    q.includes('abb') ||
    q.includes('nexvia') ||
    q.includes('dvc') ||
    q.includes('digital visibility')
  ) {
    return [
      "Here is Nikhil's work and internship experience:",
      '',
      '• Research Analyst Intern — Digital Visibility Concepts (DVC) (Oct 2026 — Present | Bengaluru, India)',
      '  - Analyzed AI-generated search results across ChatGPT, Gemini, Claude, and Google AI Mode.',
      '  - Researched AI platform visibility and performed competitive keyword analysis via Ahrefs & SEMrush.',
      '  - Executed Python-based automation and data collection pipelines.',
      '',
      '• AI/ML Intern — Nexvia Technologies (Oct 2026 — Nov 2026 | Hyderabad, India)',
      '  - Developed Python-based AI/ML components utilizing machine learning and deep learning.',
      '  - Implemented end-to-end data preprocessing and feature engineering workflows.',
      '  - Evaluated ML models and managed code version control with Git/GitHub.',
      '',
      '• Student Intern — ABB (Feb 2024 — Jul 2024 | Bengaluru, India)',
      '  - Developed a robot performance monitoring web application using Django.',
      '  - Implemented Natural Language Processing (NLP) techniques for multilingual translation.',
      '  - Designed robust backend logic for performance tracking and data ingestion.',
    ].join('\n')
  }

  // 2. Why hire Nikhil / Availability / Target roles
  if (
    q.includes('why hire') ||
    q.includes('hire') ||
    q.includes('recruit') ||
    q.includes('available') ||
    q.includes('availability') ||
    q.includes('role') ||
    q.includes('relocate') ||
    q.includes('full-time') ||
    q.includes('full time')
  ) {
    return [
      'Why Hire Nikhil Mahesh for Your Engineering Team:',
      '',
      '• Production AI Experience: Hands-on background building LLM applications, RAG pipelines, and Multimodal systems (VQA, Image Captioning).',
      '• Solid Academic Grounding: M.Tech in Artificial Intelligence & Data Science from Amrita Vishwa Vidyapeetham.',
      '• 3 Industry Internships: Practical track record spanning AI visibility research (DVC), ML engineering (Nexvia), and enterprise web/NLP systems (ABB).',
      '• Modern Tech Stack: Python, PyTorch, Transformers, LangChain, FastAPI, Flask, React, ChromaDB, and Docker.',
      '• Actively Available: Open to full-time AI Engineer, ML Engineer, and GenAI developer roles (Bengaluru, hybrid, or remote).',
    ].join('\n')
  }

  // 3. Projects
  if (
    q.includes('project') ||
    q.includes('portfolio') ||
    q.includes('build') ||
    q.includes('built') ||
    q.includes('app') ||
    q.includes('vqa') ||
    q.includes('caption') ||
    q.includes('analyst')
  ) {
    return [
      "Nikhil has built 4 key AI engineering projects:",
      '',
      '1. Visual Question Answering (VQA)',
      '   - Answers natural language questions from image content.',
      '   - Stack: Python · PyTorch · Hugging Face · Transformers · Gemini · Flask',
      '   - Demo: https://multimodal-ai-50ad.onrender.com | Source: https://github.com/Nikhil383/Visual_Question_Answer',
      '',
      '2. Multimodal Image Captioning Engine',
      '   - Generates natural-language image captions combining vision & language models.',
      '   - Stack: Python · LangChain · Gemini AI · Flask',
      '   - Demo: https://image-caption-ejph.onrender.com | Source: https://github.com/Nikhil383/Image-Caption',
      '',
      '3. Agentic RAG Document Q&A App',
      '   - Grounded document question-answering with hybrid retrieval and intelligent routing.',
      '   - Stack: React · Python · FastAPI · ChromaDB · LLMs',
      '   - Source: https://github.com/Nikhil383/RAG-Document-Q-A-App',
      '',
      '4. Personal AI Data Analyst',
      '   - High-precision data analysis and interactive visualization.',
      '   - Stack: Streamlit · Python · Pandas · Matplotlib',
      '   - Source: https://github.com/Nikhil383/Personal-AI-Data-Analyst',
    ].join('\n')
  }

  // 4. Skills & Tech Stack
  if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('language') ||
    q.includes('python') ||
    q.includes('framework') ||
    q.includes('tool')
  ) {
    return [
      "Nikhil's Core Technical Skills:",
      '',
      '• AI & Machine Learning: Python, PyTorch, Transformers, Hugging Face, Supervised/Unsupervised Learning, Feature Engineering, Model Evaluation (ROC, AUC).',
      '• Generative AI & LLMs: Large Language Models (LLMs), RAG Systems, Vector Databases (ChromaDB, FAISS, Pinecone), Embeddings, Multimodal AI, LangChain, Prompt Engineering.',
      '• Engineering & Backend: FastAPI, Flask, React, Docker, Git/GitHub, REST APIs.',
      '• Data & Cloud: Pandas, NumPy, SQL, Matplotlib, Linux, Cloud concepts (AWS / Azure / GCP).',
    ].join('\n')
  }

  // 5. Education
  if (
    q.includes('education') ||
    q.includes('degree') ||
    q.includes('college') ||
    q.includes('university') ||
    q.includes('study') ||
    q.includes('studied') ||
    q.includes('cgpa') ||
    q.includes('m.tech') ||
    q.includes('b.tech')
  ) {
    return [
      "Nikhil's Academic Background:",
      '',
      '• Master of Technology (M.Tech) in Artificial Intelligence and Data Science',
      '  - Amrita Vishwa Vidyapeetham, Bengaluru (2022 — 2024)',
      '  - CGPA: 7.0 | Advanced coursework in Machine Learning, Deep Learning, and NLP.',
      '',
      '• Bachelor of Technology (B.Tech) in Computer Science and Engineering',
      '  - Gyan Ganga Institute of Technology and Science, Jabalpur (2018 — 2022)',
      '  - CGPA: 8.34',
    ].join('\n')
  }

  // 6. Contact & Socials
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('linkedin') ||
    q.includes('github') ||
    q.includes('resume') ||
    q.includes('reach') ||
    q.includes('phone')
  ) {
    return [
      'Contact Details for Nikhil Mahesh:',
      '',
      '• Email: nikhilmahesh89@gmail.com',
      '• LinkedIn: https://www.linkedin.com/in/nikhilmaheshds/',
      '• GitHub: https://github.com/Nikhil383',
      '• Resume: https://docs.google.com/document/d/1x2bC3BnoxFD0whm1eHkz2zlWMmXn72McfxMUJlWJfiI/edit?usp=sharing',
      '• Location: Bengaluru, India',
    ].join('\n')
  }

  // 7. If retrieved chunks exist with positive score
  if (Array.isArray(retrieved) && retrieved.length > 0 && retrieved[0].score > 0) {
    const topChunks = retrieved.slice(0, 3)
    return topChunks.map((c) => `• ${c.text}`).join('\n\n')
  }

  // 8. Fallback snippet from text
  const snippet = pickRelevantSnippet(question, fullText, 500)
  if (snippet && snippet.length > 20) {
    return snippet
  }

  // 9. Default Recruiter Prompt
  return [
    "I am grounded in Nikhil Mahesh's AI engineering portfolio.",
    'You can ask me:',
    '  • "What is his work experience and internships?" (DVC, Nexvia, ABB)',
    '  • "What projects has he built?" (VQA, Image Captioning, Agentic RAG, Data Analyst)',
    '  • "What is his tech stack?" (Python, PyTorch, LLMs, RAG, FastAPI)',
    '  • "Why should we hire Nikhil?"',
    '  • "What is his educational background?" (M.Tech in AI & Data Science)',
    '  • "How can I contact Nikhil?"',
  ].join('\n')
}

// -------------------- Snippet extraction from a single text document --------------------

/**
 * Tokenize a single string using the same rules as the retriever above.
 * Kept local so this helper has no dependency on `chunks`/`docVectors`.
 */
function snippetTokens(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+.#/-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && t.length > 1 && !STOP.has(t))
}

/**
 * Pick the most relevant window from `fullText` for `question`, capped at
 * `maxChars`. Splits the document into paragraphs (blank-line separated),
 * scores each paragraph by token overlap with the question, and returns the
 * best-matching paragraph(s) joined together. If nothing matches, returns
 * the first paragraph as a sane default.
 *
 * Used as the file-grounded fallback when Gemini is unavailable.
 */
export function pickRelevantSnippet(question, fullText, maxChars = 600) {
  if (!fullText || !fullText.trim()) return ''
  const qTokens = snippetTokens(question || '')
  const qSet = new Set(qTokens)

  const paragraphs = fullText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const scored = paragraphs.map((p) => {
    const pTokens = snippetTokens(p)
    if (!pTokens.length) return { text: p, score: 0 }
    let hits = 0
    for (const t of pTokens) if (qSet.has(t)) hits += 1
    return { text: p, score: hits / pTokens.length + hits * 0.01 }
  })

  scored.sort((a, b) => b.score - a.score)

  const best = scored[0]
  if (!best || best.score <= 0) {
    return paragraphs[0].slice(0, maxChars)
  }

  const out = [best.text]
  let len = best.text.length
  for (let i = 1; i < scored.length && len < maxChars; i += 1) {
    if (scored[i].score <= 0) break
    out.push(scored[i].text)
    len += scored[i].text.length
  }
  return out.join('\n\n').slice(0, maxChars)
}
