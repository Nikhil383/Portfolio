// Lightweight Gemini client (REST) used by the terminal.
// Uses `VITE_GEMINI_API_KEY` (or `GEMINI_API_KEY`). If the key is missing
// or the request fails, the terminal uses in-browser RAG generation grounded
// directly in the portfolio knowledge base.

import { generateRagAnswer, pickRelevantSnippet } from './rag'

const PRIMARY_MODEL = 'gemini-1.5-pro'
const FALLBACK_MODEL = 'gemini-2.0-flash'

function getKey() {
  try {
    return (
      import.meta.env.VITE_GEMINI_API_KEY ||
      import.meta.env.GEMINI_API_KEY ||
      window.__GEMINI_KEY__ ||
      ''
    )
  } catch {
    return window.__GEMINI_KEY__ || ''
  }
}

export function hasGeminiKey() {
  return Boolean(getKey())
}

export function setGeminiKey(key) {
  window.__GEMINI_KEY__ = key?.trim() || ''
}

/**
 * Ask Gemini a question grounded in the provided context.
 * Returns { text, source: 'gemini' | 'fallback' }.
 */
export async function askGemini({ question, context, retrieved = [] }) {
  const key = getKey()
  const safeContext = context || ''

  const systemInstruction = `You are Nikhil Mahesh's AI portfolio assistant.
You are speaking directly to recruiters, hiring managers, and engineers exploring Nikhil's portfolio.

Your goals:
1. Provide polished, professional, accurate answers grounded in Nikhil's portfolio facts and technical expertise.
2. When asked recruiter questions (e.g., "Why should we hire Nikhil?", "What is his experience?", "Is he available?"):
   - Clearly highlight his 3 internships: Research Analyst Intern at Digital Visibility Concepts (DVC), AI/ML Intern at Nexvia Technologies, and Student Intern at ABB.
   - Mention his M.Tech in Artificial Intelligence & Data Science from Amrita Vishwa Vidyapeetham.
   - Emphasize his specialized expertise in LLMs, RAG pipelines, Multimodal AI (VQA, Image Captioning), PyTorch, and backend APIs.
   - Confirm he is actively available for full-time AI Engineer / ML Engineer roles.
3. Structure answers cleanly with concise bullet points, bold headers, or quick summaries so recruiters can read them in seconds.
4. If a question is about technical AI/ML concepts (RAG, embeddings, transformers, agentic systems), explain them clearly, accurately, and with reference to how Nikhil applies them.
5. If a question is completely unrelated to Nikhil or AI/technology, answer politely and guide the user back to Nikhil's projects and background.`

  const userPrompt = `CONTEXT:
"""
${safeContext || '(empty context)'}
"""

User question: ${question}

Response:`

  const fallback = () => {
    const text = generateRagAnswer(question, retrieved, safeContext)
    return { source: 'fallback', text }
  }

  if (!key) return fallback()

  const callModel = async (modelName) => {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(key)}`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!res.ok) {
      throw new Error(`Gemini API returned status ${res.status}`)
    }

    const data = await res.json()
    const candidate = data?.candidates?.[0]
    const text = candidate?.content?.parts?.map((p) => p.text).filter(Boolean).join('\n').trim()

    if (!text) throw new Error('Empty candidate text')
    return text
  }

  try {
    try {
      const text = await callModel(PRIMARY_MODEL)
      return { source: 'gemini', text }
    } catch (primaryErr) {
      console.warn(`Primary model (${PRIMARY_MODEL}) failed, trying fallback model (${FALLBACK_MODEL}):`, primaryErr)
      const text = await callModel(FALLBACK_MODEL)
      return { source: 'gemini', text }
    }
  } catch (err) {
    console.warn('Gemini API call failed, falling back to local RAG generation:', err)
    return fallback()
  }
}

/**
 * Format retrieved RAG chunks as a stand-alone answer when Gemini is
 * unavailable. Kept for backwards compatibility.
 */
export function formatRagAnswer(question, retrieved) {
  if (!retrieved || !retrieved.length) return 'dont know'
  const top = retrieved.slice(0, 2)
  return top.map((r) => r.text).join('\n')
}
