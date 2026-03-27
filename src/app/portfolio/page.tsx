import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const projects = [
  {
    slug: "multroid",
    title: "Multroid",
    tagline: "The AI Operating Layer for Modern Companies",
    description:
      "An ecosystem of intelligent products that consolidate fragmented business tools into a unified, AI-driven platform for finance, people, operations, and automation.",
    tags: ["Next.js", "React", "Python", "PostgreSQL", "Supabase", "AI Pipelines", "Stripe"],
    link: "https://multroid.com",
    color: "#0033A1",
    type: "AI Platform",
  },
  {
    slug: "notiva",
    title: "Notiva",
    tagline: "Your AI Financial Friend",
    description:
      "AI-native financial management platform. Aggregates accounts, invoices, subscriptions, and taxes in one place. Features Novi AI assistant, GDPR compliant, AES-256 encryption, data hosted in Germany.",
    tags: ["Next.js", "TypeScript", "AI", "Stripe", "GDPR", "German Market"],
    link: "https://notiva.de",
    color: "#0047BA",
    type: "FinTech SaaS",
  },
  {
    slug: "hoomara",
    title: "Hoomara",
    tagline: "The Enterprise AI Platform for People, Operations & Growth",
    description:
      "Centralizes HR, finance, IT, legal, and operations. Four modules — HR, Payroll, IT, Legal — that automate administrative workflows so teams focus on people.",
    tags: ["Next.js", "React", "TypeScript", "Enterprise", "AI", "HR Tech"],
    link: "https://hoomara.com",
    color: "#8B6914",
    type: "Enterprise SaaS",
  },
  {
    slug: "robotic-arm",
    title: "Industrial Robotic Arm",
    tagline: "Modular. Intelligent. Industrial-Grade.",
    description:
      "Industrial-grade modular robotic arm combining mechanical engineering, embedded systems, KUKA programming, and intelligent software control from the Rover To Mars competition.",
    tags: ["C++", "Embedded Systems", "3D Printing", "NVIDIA Isaac Sim", "Robotics", "KUKA"],
    link: "#",
    color: "#D4540E",
    type: "Hardware + Software",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6">
        <PageHeader
          badge="Portfolio"
          title="Things I've Built"
          subtitle="From AI-powered SaaS platforms to industrial robotics — each project pushes the boundary of what's possible."
        />

        <section className="grid gap-8 pb-20 md:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`} className="block">
              <GlassCard className="group flex flex-col overflow-hidden !p-0 cursor-pointer hover:shadow-lg">
                {/* Colored header */}
                <div
                  className="flex items-center justify-between px-6 py-4"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="text-sm font-semibold text-white/80">
                    {project.type}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-white/70">
                    View
                    <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-2xl font-bold text-multroid-dark group-hover:text-multroid-blue transition-colors">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-multroid-blue">
                    {project.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-multroid-grey">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full border border-multroid-grey/20 bg-multroid-cloud/80 text-xs font-medium text-multroid-dark backdrop-blur-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
