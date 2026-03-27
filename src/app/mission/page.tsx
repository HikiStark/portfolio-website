import { Navbar } from "@/components/shared/navbar";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/shared/glass-card";

const pillars = [
  {
    icon: "⚡",
    title: "AI-First Engineering",
    description:
      "Every product starts with AI at its core. From intelligent document processing to automated financial structuring, AI drives the architecture — not an afterthought.",
  },
  {
    icon: "🏗️",
    title: "Scalable Platforms",
    description:
      "Multi-tenant SaaS that handles real-world complexity — authentication, billing, workspace isolation, and enterprise-grade infrastructure from day one.",
  },
  {
    icon: "🤖",
    title: "Hardware Meets Software",
    description:
      "From KUKA industrial robots to modular robotic arms, bridging physical engineering with intelligent software systems.",
  },
];

const stats = [
  { value: "3", label: "AI Products Launched" },
  { value: "5+", label: "Years Engineering" },
  { value: "∞", label: "Problems to Solve" },
];

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6">
        <PageHeader
          badge="My Mission"
          title="Building the AI Operating Layer for Modern Companies"
          subtitle="I believe in a world where AI augments human potential — not replaces it. My mission is to build intelligent platforms that automate the mundane so people can focus on what truly matters."
        />

        {/* Stats row */}
        <section className="mb-16 flex flex-wrap justify-center gap-4 sm:gap-6">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="px-8 py-5 text-center">
              <p className="text-3xl font-bold text-multroid-blue">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-multroid-grey">{stat.label}</p>
            </GlassCard>
          ))}
        </section>

        {/* Vision Pillars */}
        <section className="grid gap-6 pb-16 md:grid-cols-3">
          {pillars.map((pillar) => (
            <GlassCard
              key={pillar.title}
              className="group hover:border-multroid-blue/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-multroid-blue/10 text-2xl transition-transform group-hover:scale-110">
                {pillar.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-multroid-dark">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-multroid-grey">
                {pillar.description}
              </p>
            </GlassCard>
          ))}
        </section>

        {/* Quote */}
        <section className="flex justify-center pb-20">
          <GlassCard
            variant="dark"
            className="max-w-2xl border-l-4 border-l-multroid-blue"
          >
            <p className="font-heading text-xl italic leading-relaxed">
              &ldquo;The best technology disappears into the background, letting
              people accomplish more than they thought possible.&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium text-multroid-cream/60">
              — Hikmat Imanov
            </p>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
