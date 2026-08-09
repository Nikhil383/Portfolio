// Lightweight Gemini client (REST) used by the terminal.
// Uses `GEMINI_API_KEY` (or `VITE_GEMINI_API_KEY`). If the key is missing
// or the request fails, the caller receives a grounded snippet taken
// directly from the provided context (about.txt) instead of a static error.

import { pickRelevantSnippet } from './rag'

const MODEL = 'gemini-3.6-flash'
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
 * Ask Gemini a question grounded in the provided context (full about.txt).
 * Returns { text, source: 'gemini' | 'fallback' }.
 *
 * - If the model is reachable and produces a non-empty answer, source='gemini'.
 * - If Gemini is unreachable (no key, network, auth, or empty output),
 *   source='fallback' and the answer is the most relevant snippet extracted
 *   directly from the provided context — still file-grounded.
 */
export async function askGemini({ question, context }) {
  const key = getKey()
  const safeContext = context || ''

  const systemInstruction = `You are the local assistant for Nikhil Mahesh's portfolio.

You will be given a single document called CONTEXT, taken verbatim from the file about.txt.

Strict rules:
1. Use ONLY information that is explicitly present in CONTEXT.
2. If CONTEXT does not contain the answer, reply with exactly: dont know
3. Never use outside knowledge, even if you "know" the answer.
4. Never invent emails, links, dates, employers, project names, technologies, or numbers.
5. Quote or paraphrase only what CONTEXT says. Keep answers concise (1-6 short lines).
6. If the user asks something unrelated to Nikhil's portfolio, reply: dont know`

  const userPrompt = `CONTEXT (verbatim from about.txt):
"""
${safeContext || '(empty context)'}
"""

User question: ${question}

Answer (from CONTEXT only):`

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
          temperature: 0.2,
          topP: 0.9,
          maxOutputTokens: 512,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
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
