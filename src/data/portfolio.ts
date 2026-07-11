import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython} from "react-icons/fa6";
import { SiTailwindcss, SiNextdotjs, SiCplusplus, SiTypescript, SiMysql, SiPostgresql, SiSupabase, SiC} from "react-icons/si";

// ─── Portfolio Data ───────────────────────────────────────────────
// Central data file – edit here to customise the portfolio

export const personalInfo = {
  name: "Aditia Pratama",
  title: "Junior Frontend Developer",
  taglines: [
    "Sriwijaya University student",
    "Junior Frontend Developer", 
    
  ],
  bio: `I am an Computer Science (Informatics Engineering) student with a passion for software development, especially in full-stack web development. I enjoy turning ideas into real products by building responsive, scalable, and user-friendly applications. I continuously improve my skills by learning modern technologies, working on personal projects, and exploring new tools that can make development more efficient.`,
  bio2: `My goal is to become a software engineer who creates impactful digital products while constantly growing as a developer. I believe that consistency, curiosity, and problem-solving are the keys to building great software. Outside of coding, I enjoy competitive programming, learning new technologies, and challenging myself through projects that expand both my technical and creative abilities.`,
  location: "Ogan Komering Ilir, Indonesia",
  availability: "Open for Freelance",
  email: "mhdaditiapratama268@gmail.com",
  resume: "#",
  social: {
    github: "https://github.com/aditia-prtm",
    linkedin: "https://linkedin.com/in/m-aditia-putra-pratama-a3b0bb376/",
    instagram: "https://instagram.com/adtxprtm_",
    email: "mailto:mhdaditiapratama268@gmail.com",
  },
  funFacts: [
    "☕  Powered by specialty coffee",
    "⚽  Enjoying watching and playing football",
    "🎞️  I like watching movies",
  ],
};

// ─── Skills ──────────────────────────────────────────────────────
export const techStack = [
  {
    id : 1, 
    label : "HTML", 
    icon : FaHtml5, 
  },
  {
    id : 2, 
    label : "CSS", 
    icon : FaCss3Alt
  }, 
  {
    id : 3, 
    label : "Javascript", 
    icon : FaJs
  },
  {
    id : 4,
    label : "TypeScript", 
    icon : SiTypescript
  },
  {
    id : 5,
    label : "TailwindCSS", 
    icon : SiTailwindcss, 
  }, 
  {
    id : 6,
    label : "ReactJS", 
    icon : FaReact, 
  }, 
  {
    id : 7, 
    label : "NextJS", 
    icon : SiNextdotjs
  },
  {
    id : 8, 
    label : "Java", 
    icon : FaJava
  },
  {
    id : 9, 
    label : "Python", 
    icon : FaPython
  },
  {
    id : 10, 
    label : "C++", 
    icon : SiCplusplus
  },
  {
    id : 11, 
    label : "C", 
    icon : SiC
  },
  {
    id : 12, 
    label : "MySQL", 
    icon : SiMysql
  },
  {
    id : 13, 
    label : "PostgreSQL", 
    icon : SiPostgresql
  },
  {
    id : 14, 
    label : "Supabase", 
    icon : SiSupabase
  }
];

export const tools = [
  "Git",
  "Github", 
  "Vercel",
  "Visual Studio Code", 
  "Figma"
];

// ─── Projects ─────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: "Book Vault",
    subtitle: "Library Management",
    description:
      "Modern dark book management system.",
    longDescription:
      "A personal book management system built with Next.js, TypeScript, Tailwind CSS v4, and Framer Motion. Features full CRUD operations, real-time search, status filtering, multi-criteria sorting, and a collection statistics dashboard — all managed with React useState, no additional state library required. This project will use Supabase soon.",
    tags: ["Next.js", "TailwindCSS"],
    category: "Mini Project",
    color: "#8b5cf6",
    gradient: "from-[#FFD166] via-[#F5A623] to-[#FF4D6D]",
    image: "BookVault.png",
    liveUrl: "https://book-vault-phi.vercel.app/",
    githubUrl: "https://github.com/aditia-prtm/BookVault",
    featured: false,
  },
  {
    id: 2,
    title: "Tic-Tac-Toe",
    subtitle: "Play a Game vs Computer",
    description:
      "My first-ever toy project while learning basic HTML.",
    longDescription:
      "A simple web-based Tic-Tac-Toe game. Built entirely with Vanilla JS, it focuses on core looping logic and HTML element manipulation. The game includes a computer opponent that utilizes Math.random() to place its marks.",
    tags: ["HTML", "CSS", "Javascript"],
    category: "Toy Project",
    color: "#8b5cf6",
    gradient: "from-[#FFD166] via-[#F5A623] to-[#FF4D6D]",
    image: "tic-tac-toe.png",
    liveUrl: "https://aditia-prtm.github.io/tic-tac-toe/",
    githubUrl: "https://github.com/aditia-prtm/tic-tac-toe",
    featured: false,
  },
  // {
  //   id: 2,
  //   title: "Aura CMS",
  //   subtitle: "Headless content platform",
  //   description:
  //     "A developer-first headless CMS with a visual block editor, real-time collaboration, and a GraphQL API. Deployed on 1,200+ marketing sites generating $4M ARR.",
  //   longDescription:
  //     "Aura was built to solve the frustration of inflexible CMS tooling. The block editor uses a custom JSON schema that compiles to optimised HTML, keeping Lighthouse scores above 95 across all client sites. Real-time collaboration is powered by CRDTs (Yjs), enabling conflict-free multi-author editing.\n\nThe platform includes a visual workflow builder for content approval, a media CDN with automatic WebP conversion, and a plugin marketplace.",
  //   tags: ["Next.js", "Yjs", "GraphQL", "Postgres", "Node.js", "AWS"],
  //   category: "SaaS",
  //   color: "#06b6d4",
  //   gradient: "from-cyan-500 to-blue-500",
  //   image: null,
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   featured: true,
  //   metrics: ["1,200+ sites", "$4M ARR", ">95 Lighthouse"],
  // },
  // {
  //   id: 3,
  //   title: "Luminary UI",
  //   subtitle: "Open-source design system",
  //   description:
  //     "A fully accessible, themeable React component library with 80+ components, Storybook documentation, and automated visual regression testing via Chromatic.",
  //   longDescription:
  //     "Luminary began as an internal design system and was open-sourced after the team realised other companies faced the same accessibility gaps in popular libraries. Every component meets WCAG 2.1 AA, is keyboard navigable, and is tested with VoiceOver and NVDA.\n\nThe token system is powered by CSS custom properties and supports unlimited themes with a single JSON file. CI runs visual regression checks on every PR, catching pixel-level regressions before they reach production.",
  //   tags: ["React", "TypeScript", "Storybook", "Radix UI", "CSS Variables"],
  //   category: "Open Source",
  //   color: "#10b981",
  //   gradient: "from-emerald-500 to-cyan-500",
  //   image: null,
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   featured: false,
  //   metrics: ["80+ components", "WCAG 2.1 AA", "4.2k ⭐ GitHub"],
  // },
  // {
  //   id: 4,
  //   title: "Chronicle",
  //   subtitle: "AI-powered writing assistant",
  //   description:
  //     "A writing tool that uses Claude to provide contextual suggestions, tone analysis, and SEO optimisation in real time — integrated directly into the editor.",
  //   longDescription:
  //     "Chronicle integrates LLM capabilities directly into a ProseMirror editor. The AI sidebar analyses the current document context and provides structured suggestions without interrupting writing flow. A background worker handles embedding generation for semantic search across the user's document library.\n\nBuilt with the Vercel AI SDK and streamed responses to keep suggestion latency under 300ms on median hardware.",
  //   tags: ["Next.js", "Anthropic API", "ProseMirror", "Postgres", "Vercel"],
  //   category: "AI / Productivity",
  //   color: "#f59e0b",
  //   gradient: "from-amber-500 to-orange-500",
  //   image: null,
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   featured: false,
  //   metrics: ["<300ms latency", "Semantic search", "Streaming UI"],
  // },
];

// ─── Experience ───────────────────────────────────────────────────
export const experiences = [
  {
    id: 1,
    role: "HMIF UNSRI - PTI Division",
    company: "Sriwijaya University",
    period: "2025 - 2026",
    type: "",
    description:
      "Currently exploring front-end web development within the PTI division of HMIF. I am focusing on building responsive user interfaces and applying my skills by developing foundational, hands-on web projects from scratch.",
    highlights: [
      "Built 5+ mini-projects",
      "Exploring TailwindCSS, React.js, and Next.js",
      "Integrated Supabase for database/auth",
      "Focused on writing clean code",
    ],
    color: "#ffc700",
  },
  {
    id: 2,
    role: "National Olympiad (OSN) Team",
    company: "SMA Negeri 1 Jejawi",
    period: "2023 - 2024",
    type: "",
    description:
      "Selected for the OSN team at senior high school, focusing on competitive programming. I explored advanced concepts like Dynamic Programming, Graph Algorithms, and Segment Trees to solve complex problems while competing directly against top students.",
    highlights: [
      "Top 7 Province Level 2024 (OSN-P)",
      "Top 2 Regency Level 2024 (OSN-K)",
      "Problem Solving and Algorithm",
      "First introduction to Informatics",
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
