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

import { profile, projects, experience, skillGroups } from '../data/portfolio'

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
const FALLBACK_MSG = 'dont know'

export const RAG_FALLBACK_MESSAGE = FALLBACK_MSG

// Heuristic: if no chunk scored > 0, the knowledge base has nothing relevant.
export function hasRelevantContext(retrieved) {
  return retrieved.length > 0 && retrieved[0].score > 0
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
