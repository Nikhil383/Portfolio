// Lightweight Gemini client (REST) used by the terminal.
// Uses `GEMINI_API_KEY` (or `VITE_GEMINI_API_KEY`). If the key is missing
// or the request fails, the caller receives a grounded snippet taken
// directly from the provided context (about.txt) instead of a static error.

import { pickRelevantSnippet } from './rag'

const MODEL = 'gemini-2.5-flash'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

function getKey() {
  try {
    return (
      import.meta.env.GEMINI_API_KEY ||
      import.meta.env.VITE_GEMINI_API_KEY ||
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
 *
 * - If the model is reachable and produces a non-empty answer, source='gemini'.
 * - If Gemini is unreachable (no key, network, auth, or empty output),
 *   source='fallback' and the answer is the most relevant snippet extracted
 *   directly from the provided context.
 */
export async function askGemini({ question, context }) {
  const key = getKey()
  const safeContext = context || ''

  const systemInstruction = `You are Nikhil Mahesh's AI portfolio assistant.
Answer questions warmly, accurately, and naturally based on the provided portfolio context.

Guidelines:
1. Base your answers primarily on the facts in the CONTEXT (Nikhil's background, projects, skills, experience, contact details, AI concepts).
2. Generate friendly, well-structured, clear responses (bullet points, short paragraphs, or concise answers as appropriate).
3. If the user asks something completely outside Nikhil's portfolio or general AI/tech knowledge that cannot be answered from the context, politely state that you do not have that information.
4. Keep links, contact info, and project names accurate to what is in the context.`

  const userPrompt = `CONTEXT:
"""
${safeContext || '(empty context)'}
"""

User question: ${question}

Response:`

  const fallback = () => {
    const snippet = pickRelevantSnippet(question, safeContext, 600)
    return { source: 'fallback', text: snippet || 'dont know' }
  }

  if (!key) return fallback()

  try {
    const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(key)}`, {
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
      console.warn(`Gemini API call failed with status ${res.status}`)
      return fallback()
    }

    const data = await res.json()
    const candidate = data?.candidates?.[0]
    const text = candidate?.content?.parts?.map((p) => p.text).filter(Boolean).join('\n').trim()

    if (!text) return fallback()

    return { source: 'gemini', text }
  } catch (err) {
    console.error('Error invoking Gemini API:', err)
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
