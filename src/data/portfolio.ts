// ─── Portfolio Data ───────────────────────────────────────────────
// Central data file – edit here to customise the portfolio

export const personalInfo = {
  name: "Aditia Pratama",
  title: "Full Stack Developer",
  taglines: [
    "Full Stack Developer",
    "Creative Technologist",
    "UI/UX Enthusiast",
    "Open Source Contributor",
    "Performance Engineer",
  ],
  bio: `(I want to lie) I architect and build digital experiences that live at the intersection of engineering rigour and design craft. With 6+ years shipping production software, I've led teams across fintech startups and growth-stage companies — always optimising for both pixel-perfect interfaces and sub-50ms server responses.`,
  bio2: `Currently exploring the edges of AI-native UX and WebGL creative coding. When I'm not shipping features, you'll find me contributing to open-source, writing on my blog, or sketching generative-art experiments.`,
  location: "Palembang, Indonesia",
  availability: "Open for Freelance",
  email: "mhdaditiapratama268@gmail.com",
  resume: "#",
  social: {
    github: "https://github.com/aditia-prtm",
    linkedin: "https://linkedin.com/in/m-aditia-putra-pratama-a3b0bb376/",
    instagram: "https://instagram.com/adtxprtm_",
    dribbble: "https://dribbble.com",
  },
  funFacts: [
    "☕  Powered by specialty coffee",
    "🎸  Plays guitar (badly, but enthusiastically)",
    "🌍  Shipped features from 14 countries",
    "🔭  Amateur astrophotographer",
  ],
};

// ─── Skills ──────────────────────────────────────────────────────
export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    color: "violet",
    skills: [
      { name: "React / Next.js", level: 96, icon: "⚛️" },
      { name: "TypeScript", level: 93, icon: "🔷" },
      { name: "Tailwind CSS", level: 95, icon: "🌊" },
      { name: "Framer Motion", level: 88, icon: "🎭" },
      { name: "Three.js / WebGL", level: 72, icon: "🌐" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "blue",
    skills: [
      { name: "Node.js / Express", level: 91, icon: "🟢" },
      { name: "Python / FastAPI", level: 85, icon: "🐍" },
      { name: "PostgreSQL", level: 88, icon: "🐘" },
      { name: "Redis", level: 80, icon: "🔴" },
      { name: "GraphQL", level: 82, icon: "◈" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    color: "cyan",
    skills: [
      { name: "AWS / GCP", level: 84, icon: "☁️" },
      { name: "Docker / K8s", level: 79, icon: "🐳" },
      { name: "CI/CD Pipelines", level: 88, icon: "⚙️" },
      { name: "Terraform", level: 70, icon: "🏗️" },
    ],
  },
  {
    id: "design",
    label: "Design & UX",
    color: "pink",
    skills: [
      { name: "Figma", level: 90, icon: "🎨" },
      { name: "Design Systems", level: 87, icon: "📐" },
      { name: "Motion Design", level: 78, icon: "✨" },
      { name: "User Research", level: 72, icon: "🔍" },
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: "Nexus Finance",
    subtitle: "Real-time trading dashboard",
    description:
      "A high-performance trading dashboard handling 50k WebSocket events per second. Built with React, D3.js charts, and a Go microservice backend. Features live order books, portfolio analytics, and AI-powered trade signals.",
    longDescription:
      "Nexus Finance started as an internal tool for a quantitative hedge fund and grew into a full SaaS product. The core challenge was rendering thousands of real-time data points without frame drops. I achieved this by virtualising chart canvases, off-loading heavy computation to Web Workers, and using a delta-compression protocol for WebSocket payloads — cutting bandwidth by 70%.\n\nThe design system was built from scratch in Figma and translated to a Tailwind-based component library, later open-sourced with 600+ GitHub stars.",
    tags: ["React", "TypeScript", "D3.js", "WebSocket", "Go", "Redis"],
    category: "FinTech",
    color: "#8b5cf6",
    gradient: "from-violet-600 to-blue-600",
    image: null,
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    metrics: ["50k events/s", "70% bandwidth ↓", "< 16ms render"],
  },
  {
    id: 2,
    title: "Aura CMS",
    subtitle: "Headless content platform",
    description:
      "A developer-first headless CMS with a visual block editor, real-time collaboration, and a GraphQL API. Deployed on 1,200+ marketing sites generating $4M ARR.",
    longDescription:
      "Aura was built to solve the frustration of inflexible CMS tooling. The block editor uses a custom JSON schema that compiles to optimised HTML, keeping Lighthouse scores above 95 across all client sites. Real-time collaboration is powered by CRDTs (Yjs), enabling conflict-free multi-author editing.\n\nThe platform includes a visual workflow builder for content approval, a media CDN with automatic WebP conversion, and a plugin marketplace.",
    tags: ["Next.js", "Yjs", "GraphQL", "Postgres", "Node.js", "AWS"],
    category: "SaaS",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-500",
    image: null,
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    metrics: ["1,200+ sites", "$4M ARR", ">95 Lighthouse"],
  },
  {
    id: 3,
    title: "Luminary UI",
    subtitle: "Open-source design system",
    description:
      "A fully accessible, themeable React component library with 80+ components, Storybook documentation, and automated visual regression testing via Chromatic.",
    longDescription:
      "Luminary began as an internal design system and was open-sourced after the team realised other companies faced the same accessibility gaps in popular libraries. Every component meets WCAG 2.1 AA, is keyboard navigable, and is tested with VoiceOver and NVDA.\n\nThe token system is powered by CSS custom properties and supports unlimited themes with a single JSON file. CI runs visual regression checks on every PR, catching pixel-level regressions before they reach production.",
    tags: ["React", "TypeScript", "Storybook", "Radix UI", "CSS Variables"],
    category: "Open Source",
    color: "#10b981",
    gradient: "from-emerald-500 to-cyan-500",
    image: null,
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    metrics: ["80+ components", "WCAG 2.1 AA", "4.2k ⭐ GitHub"],
  },
  {
    id: 4,
    title: "Chronicle",
    subtitle: "AI-powered writing assistant",
    description:
      "A writing tool that uses Claude to provide contextual suggestions, tone analysis, and SEO optimisation in real time — integrated directly into the editor.",
    longDescription:
      "Chronicle integrates LLM capabilities directly into a ProseMirror editor. The AI sidebar analyses the current document context and provides structured suggestions without interrupting writing flow. A background worker handles embedding generation for semantic search across the user's document library.\n\nBuilt with the Vercel AI SDK and streamed responses to keep suggestion latency under 300ms on median hardware.",
    tags: ["Next.js", "Anthropic API", "ProseMirror", "Postgres", "Vercel"],
    category: "AI / Productivity",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-500",
    image: null,
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    metrics: ["<300ms latency", "Semantic search", "Streaming UI"],
  },
];

// ─── Experience ───────────────────────────────────────────────────
export const experiences = [
  {
    id: 1,
    role: "Senior Full Stack Engineer",
    company: "Stellar Labs",
    period: "2022 – Present",
    type: "Full-time",
    description:
      "Leading frontend architecture for a Series B fintech product with 200k DAU. Migrated a legacy Angular app to Next.js 14, reducing bundle size by 58% and improving Core Web Vitals to all-green. Built and mentored a team of 5 engineers.",
    highlights: [
      "Led migration from Angular to Next.js 14",
      "Reduced bundle size by 58%",
      "Mentored team of 5 engineers",
      "Architected real-time WebSocket infrastructure",
    ],
    color: "#8b5cf6",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Mosaic Digital",
    period: "2020 – 2022",
    type: "Full-time",
    description:
      "Shipped 3 major product releases for a marketing SaaS platform. Designed and built a white-label CMS used by 400+ agencies. Collaborated with design team to create a component library adopted across all products.",
    highlights: [
      "Shipped 3 major product releases",
      "Built white-label CMS for 400+ agencies",
      "Created cross-product component library",
      "Reduced API response time by 45%",
    ],
    color: "#3b82f6",
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Pixel & Code Studio",
    period: "2019 – 2020",
    type: "Full-time",
    description:
      "Joined as a junior developer at a boutique agency. Built 20+ client websites, developed an internal React template system, and gained experience working directly with clients on UX feedback cycles.",
    highlights: [
      "Built 20+ production websites",
      "Developed internal React template system",
      "Direct client collaboration on UX",
      "Launched first open-source project",
    ],
    color: "#06b6d4",
  },
  {
    id: 4,
    role: "Freelance Developer",
    company: "Self-employed",
    period: "2017 – 2019",
    type: "Freelance",
    description:
      "Started freelancing during university, delivering e-commerce sites, landing pages, and custom WordPress themes. Built the foundation of my full-stack skills and client communication.",
    highlights: [
      "30+ freelance projects",
      "E-commerce & WordPress builds",
      "Self-taught React and Node.js",
      "First introduction to DevOps",
    ],
    color: "#10b981",
  },
];

// ─── Nav Links ────────────────────────────────────────────────────
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
