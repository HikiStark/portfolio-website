import { Navbar } from "@/components/shared/navbar";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";

const skillGroups = [
  {
    label: "Core Engineering",
    skills: ["Next.js", "React", "Node.js", "TypeScript", "Python", "C++", "PostgreSQL", "SQL", "REST APIs"],
  },
  {
    label: "AI & Data",
    skills: ["LLM Integration", "AI Pipelines", "Document Parsing", "Multi-tenant SaaS", "Auth Systems"],
  },
  {
    label: "DevOps & Tools",
    skills: ["CI/CD", "Git", "Supabase", "Stripe", "Figma", "NVIDIA Isaac Sim", "Swift/SwiftUI"],
  },
];

const experience = [
  {
    company: "Multroid",
    role: "Founder & AI-Focused Full-Stack Engineer",
    period: "Jan 2025 — Present",
    location: "Munich, Germany",
    description: "Architected AI-native multi-tenant SaaS platforms. Built cloud infrastructure, AI pipelines, REST APIs, and iOS components.",
    current: true,
  },
  {
    company: "Soluware",
    role: "Werkstudent Software Developer",
    period: "Oct 2022 — Jun 2023",
    location: "Ravensburg, Germany",
    description: "Developed internal web tools, automation scripts, and database-driven dashboards.",
    current: false,
  },
  {
    company: "RWU",
    role: "Jr. Software Developer Werkstudent",
    period: "Jan 2019 — Aug 2021",
    location: "Munich, Germany",
    description: "Built client-facing web apps with React/Next.js, backend services, and database integrations.",
    current: false,
  },
  {
    company: "Rover To Mars Team",
    role: "Robotic Engineering Intern",
    period: "Feb 2019 — Aug 2020",
    location: "Munich, Germany",
    description: "Autonomous vehicle software, 3D-printed components, robotic arm redesign.",
    current: false,
  },
];

const languages = [
  { name: "English", level: "Native (C2+)", width: "100%" },
  { name: "Azerbaijani", level: "Native (C2+)", width: "100%" },
  { name: "Turkish", level: "Native (C2+)", width: "100%" },
  { name: "German", level: "Fluent (C1)", width: "85%" },
  { name: "Russian", level: "Basic (A2)", width: "25%" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6">
        <PageHeader
          badge="About Me"
          title="Hikmat Imanov"
          subtitle="AI-Focused Full-Stack Engineer & Founder building the AI operating layer for modern companies."
        />

        {/* Skills */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-xl font-bold text-multroid-dark">
            Skills & Technologies
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {skillGroups.map((group) => (
              <GlassCard key={group.label} className="hover:border-multroid-blue/30">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-multroid-blue">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="rounded-full border border-multroid-grey/20 bg-multroid-cloud/80 text-sm backdrop-blur-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-xl font-bold text-multroid-dark">
            Experience
          </h2>
          <div className="mx-auto max-w-3xl">
            <div className="relative space-y-6 pl-6 sm:pl-8 before:absolute before:left-[9px] sm:before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-multroid-blue/20">
              {experience.map((exp) => (
                <div key={exp.company} className="relative">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 ${
                      exp.current
                        ? "border-multroid-blue bg-multroid-blue"
                        : "border-multroid-blue/40 bg-multroid-cream"
                    }`}
                  >
                    {exp.current && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-multroid-blue/30" />
                    )}
                  </div>

                  <GlassCard className="hover:border-multroid-blue/30">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-multroid-dark">
                          {exp.company}
                        </h3>
                        <p className="text-sm font-medium text-multroid-blue">
                          {exp.role}
                        </p>
                      </div>
                      <div className="text-right text-sm text-multroid-grey">
                        <p>{exp.period}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-multroid-grey">
                      {exp.description}
                    </p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-xl font-bold text-multroid-dark">
            Education
          </h2>
          <div className="mx-auto max-w-3xl">
            <GlassCard variant="dark">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    Ravensburg Weingarten University
                  </h3>
                  <p className="text-sm font-medium text-multroid-blue">
                    Electrical Engineering & Information Technology
                  </p>
                </div>
                <p className="text-sm text-multroid-cream/60">2021 — 2025</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-multroid-cream/80">
                <strong className="text-multroid-cream">Thesis:</strong> AI-Driven Problem Detection and Automated
                Solution Generation. Practical coursework in KUKA industrial robotics, embedded
                systems, AI fundamentals, and real-time system control.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Languages */}
        <section className="pb-20">
          <h2 className="mb-6 text-center text-xl font-bold text-multroid-dark">
            Languages
          </h2>
          <div className="mx-auto max-w-2xl space-y-3">
            {languages.map((lang) => (
              <GlassCard key={lang.name} className="flex items-center gap-4 py-4">
                <span className="w-28 text-sm font-bold text-multroid-dark">
                  {lang.name}
                </span>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-multroid-cloud">
                    <div
                      className="h-full rounded-full bg-multroid-blue transition-all"
                      style={{ width: lang.width }}
                    />
                  </div>
                </div>
                <span className="w-24 text-right text-xs text-multroid-grey">
                  {lang.level}
                </span>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
