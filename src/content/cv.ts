// Single source of truth for site copy and the AI assistant's knowledge.
// Mirrors public/CV-Hikmat-Imanov.pdf — update both together.

export const profile = {
  name: "Hikmat Imanov",
  nickname: "Hiki",
  headline: "AI & Software Engineer with a robotics background",
  location: "Munich, Germany",
  email: "hikmat.imanov@notiva.de",
  phone: "+49 152 22912285",
  phoneHref: "tel:+4915222912285",
  website: "www.hikistark.com",
  linkedin: "https://linkedin.com/in/hikmat-imanov",
  github: "https://github.com/HikiStark",
  instagram: "https://www.instagram.com/hiki_stark/",
  cvPath: "/CV-Hikmat-Imanov.pdf",
};

export type Role = {
  company: string;
  role: string;
  type?: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "Spectrum Elektrotechnik GmbH",
    role: "Engineering & Sales",
    type: "Part-time",
    location: "Munich, Germany",
    period: "Aug 2026 – Present",
    current: true,
    bullets: [
      "Engineering (Entwicklung): built mechanical and electronic tools that speed up manufacturing and cut the error rate while holding the same quality standard.",
      "Sales: talk with customers, understand their needs and problems, match them to the right products and prepare quotes.",
    ],
  },
  {
    company: "Freelance",
    role: "AI Consultant",
    location: "Munich, Germany",
    period: "Feb 2026 – Aug 2026",
    bullets: [
      "Guided finance and fintech companies across the DACH region through their AI transformation.",
      "Worked embedded in their teams and shipped the solutions myself instead of only advising.",
    ],
  },
  {
    company: "Algoritma",
    role: "AI Software Engineer, Full Stack",
    type: "Remote",
    location: "Baku, Azerbaijan",
    period: "Jun 2025 – Jul 2026",
    bullets: [
      "Embedded with InvestAZ to build internal financial systems end to end, from trading operations tooling to reporting.",
      "Improved platform performance by 12% and cut manual back-office work through AI-assisted automation.",
      "Owned the full stack: frontend, backend, data pipelines and LLM integration.",
    ],
  },
  {
    company: "Soluware",
    role: "Working Student, Software Development",
    location: "Ravensburg, Germany",
    period: "Oct 2022 – Jun 2023",
    bullets: [
      "Built internal tools that automated testing and reporting of products for customer companies.",
      "Built database-driven dashboards showing the results of the tests.",
    ],
  },
  {
    company: "Ravensburg-Weingarten University",
    role: "Software Developer & Engineer, Working Student",
    location: "Weingarten, Germany",
    period: "Jan 2019 – Aug 2021",
    bullets: [
      "Built an autonomous racing RC vehicle end to end: CAD, 3D printing, sensors and control logic.",
      "Gave it visual understanding of the road with PyTorch computer vision.",
    ],
  },
  {
    company: "Rover To Mars (RWU)",
    role: "Robotics Engineering Internship",
    location: "Weingarten, Germany",
    period: "Feb 2019 – Aug 2020",
    bullets: [
      "CAD-modelled a rover robotic arm, 3D-printed prototypes and iterated the design through testing to hit the defined targets.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  details: string[];
  tags: string[];
  scene: "notiva" | "robotics" | "lab";
  url?: string;
  urlLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "notiva",
    title: "Notiva",
    role: "Software Engineer, AI Engineer, System Architect",
    period: "2025 – 2026",
    summary:
      "An AI-native personal finance OS: an agent reads emails, bank data and documents to cancel unnecessary spending, switch providers, file taxes and report fraud.",
    details: ["Built the agentic AI workflows, OCR systems, memory layer and tax intelligence."],
    tags: ["Agentic AI", "OCR", "Memory layer", "Tax intelligence", "LLM integration"],
    scene: "notiva",
    url: "https://notiva.de",
    urlLabel: "notiva.de",
  },
  {
    slug: "multroid-robotics",
    title: "Multroid Robotics",
    role: "AI VLM Engineer, Robotics & Mechanical Engineer",
    period: "2020 – 2024",
    summary: "An industrial-grade robotic arm and a modular AI manufacturing system.",
    details: [
      "Designed the mechanics in CAD, validated them in a simulator I built myself, and detailed the models for CNC-machined production.",
      "Built an AI hub with Physical AI integrated — years before the LLM hype — letting robots diagnose and resolve their own faults, with a small VLM describing detected problems in natural language.",
    ],
    tags: ["Physical AI", "VLM", "CAD", "Simulation", "CNC production"],
    scene: "robotics",
  },
  {
    slug: "independent-projects",
    title: "Independent Projects",
    role: "Systems & Software Experiments",
    period: "2018 – 2026",
    summary:
      "Experimental systems across robotics, web, embedded and AI — deliberately never commercialised.",
    details: [],
    tags: ["Robotics", "Web", "Embedded", "AI"],
    scene: "lab",
    url: "https://github.com/HikiStark",
    urlLabel: "GitHub",
  },
];

export type Build = {
  slug: string;
  title: string;
  org: string;
  period: string;
  text: string;
  tags: string[];
};

// Notable builds from the roles above, shown on the portfolio page.
export const builds: Build[] = [
  {
    slug: "investaz",
    title: "Internal financial systems for InvestAZ",
    org: "Algoritma",
    period: "2025 – 2026",
    text: "Built end to end, from trading operations tooling to reporting. Improved platform performance by 12% and cut manual back-office work through AI-assisted automation.",
    tags: ["Full stack", "Data pipelines", "LLM integration"],
  },
  {
    slug: "manufacturing-tools",
    title: "Manufacturing tools",
    org: "Spectrum Elektrotechnik",
    period: "2026 – Present",
    text: "Mechanical and electronic tools that speed up manufacturing and cut the error rate while holding the same quality standard.",
    tags: ["Mechanical", "Electronics", "Manufacturing"],
  },
  {
    slug: "rc-racer",
    title: "Autonomous racing RC vehicle",
    org: "Ravensburg-Weingarten University",
    period: "2019 – 2021",
    text: "Built end to end — CAD, 3D printing, sensors and control logic — then gave it visual understanding of the road with PyTorch computer vision.",
    tags: ["PyTorch", "Computer vision", "CAD", "3D printing"],
  },
  {
    slug: "rover-arm",
    title: "Rover robotic arm",
    org: "Rover To Mars (RWU)",
    period: "2019 – 2020",
    text: "CAD-modelled the arm, 3D-printed prototypes and iterated the design through testing to hit the defined targets.",
    tags: ["CAD", "3D printing", "Testing"],
  },
];

export const education = {
  school: "RWU – Ravensburg-Weingarten University",
  degree: "B.Eng. Electrical Engineering & Information Technology",
  location: "Weingarten, Germany",
  period: "Mar 2019 – Aug 2025",
  thesis: "AI-based problem detection & automated solution generation",
  grade: "1.7",
};

export const skills = [
  {
    label: "Engineering",
    items: ["Next.js", "React", "TypeScript & JavaScript", "Python", "C++", "PostgreSQL", "Swift/SwiftUI"],
  },
  {
    label: "AI & Data",
    items: ["LLM Integration", "AI Pipelines", "Document Processing", "Multi-Tenant SaaS", "MCP Integration"],
  },
  {
    label: "DevOps & Tools",
    items: ["CI/CD", "Git", "AWS", "Redis", "Sentry", "Claude API", "Supabase", "Stripe", "Figma", "NVIDIA Isaac Sim"],
  },
];

export const languages = [
  { name: "English", level: "Native", cefr: "C2+", score: 5 },
  { name: "Azerbaijani", level: "Native", cefr: "C2+", score: 5 },
  { name: "Turkish", level: "Native", cefr: "C2+", score: 5 },
  { name: "German", level: "Professional fluency", cefr: "C1", score: 4 },
  { name: "Russian", level: "Basic", cefr: "A2", score: 2 },
];
