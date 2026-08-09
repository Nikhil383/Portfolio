// Portfolio data used by the macOS-style desktop apps.

export const profile = {
  name: 'Nikhil Mahesh',
  role: 'AI Engineer',
  tagline: 'Building intelligent systems with LLMs, RAG & multimodal AI.',
  location: 'Bengaluru, India',
  email: 'nikhilmahesh89@gmail.com',
  github: 'https://github.com/Nikhil383',
  linkedin: 'https://www.linkedin.com/in/nikhilmaheshds/',
  resume:
    'https://docs.google.com/document/d/1x2bC3BnoxFD0whm1eHkz2zlWMmXn72McfxMUJlWJfiI/edit?usp=sharing',
  bio: 'I design and build end-to-end AI systems that make complex information easier to work with. My focus is LLM applications, RAG pipelines, multimodal systems, and dependable software around them.',
  focus: ['LLMs', 'RAG', 'Multimodal AI', 'Agentic Systems'],
}

export const projects = [
  {
    id: 'vqa',
    name: 'visual-question-answering',
    label: 'Visual Question Answering',
    description: 'Answers natural-language questions from image content.',
    stack: 'Python · PyTorch · Gemini · Flask',
    github: 'https://github.com/Nikhil383/Visual_Question_Answer',
    demo: 'https://multimodal-ai-50ad.onrender.com',
  },
  {
    id: 'caption',
    name: 'image-caption-engine',
    label: 'Multimodal Image Captioning',
    description: 'Generates useful natural-language descriptions from images.',
    stack: 'Python · LangChain · Gemini · Flask',
    github: 'https://github.com/Nikhil383/Image-Caption',
    demo: 'https://image-caption-ejph.onrender.com',
  },
  {
    id: 'rag',
    name: 'agentic-rag',
    label: 'Agentic RAG Document Q&A',
    description: 'Grounded document question answering with retrieval.',
    stack: 'React · FastAPI · ChromaDB · LLMs',
    github: 'https://github.com/Nikhil383/RAG-Document-Q-A-App',
  },
  {
    id: 'analyst',
    name: 'ai-data-analyst',
    label: 'Personal AI Data Analyst',
    description: 'Data analysis and visualisation through a focused AI workflow.',
    stack: 'Python · Streamlit · Pandas · Matplotlib',
    github: 'https://github.com/Nikhil383/Personal-AI-Data-Analyst',
  },
]

export const experience = [
  {
    company: 'ABB',
    role: 'Student Intern',
    period: 'Feb 2024 — Jul 2024',
    location: 'Bengaluru, India',
    summary:
      'Built a robot performance monitoring application using Django, including NLP-powered multilingual content support and backend logic for efficient data handling.',
  },
]

export const skillGroups = [
  {
    name: 'AI / ML',
    color: '#7c3aed',
    items: [
      { name: 'Python', level: 0.95 },
      { name: 'PyTorch', level: 0.86 },
      { name: 'Transformers', level: 0.88 },
      { name: 'Hugging Face', level: 0.85 },
      { name: 'RAG', level: 0.92 },
    ],
  },
  {
    name: 'Generative AI',
    color: '#06b6d4',
    items: [
      { name: 'LLMs', level: 0.93 },
      { name: 'LangChain', level: 0.9 },
      { name: 'Embeddings', level: 0.88 },
      { name: 'Vector databases', level: 0.85 },
      { name: 'Multimodal AI', level: 0.9 },
    ],
  },
  {
    name: 'Engineering',
    color: '#22c55e',
    items: [
      { name: 'FastAPI', level: 0.85 },
      { name: 'Flask', level: 0.88 },
      { name: 'React', level: 0.82 },
      { name: 'Docker', level: 0.78 },
      { name: 'Git', level: 0.9 },
    ],
  },
  {
    name: 'Data & Cloud',
    color: '#f59e0b',
    items: [
      { name: 'Pandas', level: 0.88 },
      { name: 'SQL', level: 0.8 },
      { name: 'AWS', level: 0.72 },
      { name: 'Azure', level: 0.7 },
      { name: 'Linux', level: 0.86 },
    ],
  },
]

export const ragPipeline = [
  'Image / PDF / Text',
  'Document Processing',
  'Vision + Text Models',
  'Embeddings',
  'Vector Database',
  'Retriever',
  'Context + LLM',
  'Grounded Answer',
]

export const agenticRag = {
  user: 'User Query',
  router: 'Router Agent',
  tools: ['Web Search', 'Vector Search', 'SQL Agent', 'Document Agent'],
  output: 'Synthesizer → Grounded Response',
}
