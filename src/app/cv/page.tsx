import { Navbar } from "@/components/shared/navbar";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const highlights = [
  { value: "5+", label: "Years of software development" },
  { value: "3", label: "AI products launched" },
  { value: "AI", label: "Thesis on problem detection" },
  { value: "5", label: "Languages spoken" },
];

const techStack = [
  "Next.js", "React", "Node.js", "TypeScript", "Python", "C++",
  "PostgreSQL", "Prisma", "Supabase", "LLM Integration", "AI Pipelines",
  "REST APIs", "CI/CD", "Git", "Stripe", "Swift/SwiftUI", "NVIDIA Isaac Sim",
];

export default function CVPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        <PageHeader
          badge="Curriculum Vitae"
          title="Hikmat Imanov"
          subtitle="AI-Focused Full-Stack Engineer & Founder"
        />

        {/* Download Button */}
        <div className="mb-12 flex justify-center">
          <a href="/CV-Hikmat-Imanov.pdf" download>
            <Button
              size="lg"
              className="gap-3 rounded-2xl bg-multroid-blue px-10 py-7 text-lg font-bold text-white shadow-[0px_4px_20px_0px_rgba(0,51,161,0.3)] hover:bg-multroid-blue/90 hover:shadow-[0px_8px_30px_0px_rgba(0,51,161,0.4)]"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Download CV
            </Button>
          </a>
        </div>

        {/* Highlights */}
        <section className="mb-8">
          <GlassCard>
            <h2 className="mb-5 text-lg font-bold text-multroid-dark">
              Key Highlights
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {highlights.map((hl) => (
                <GlassCard
                  key={hl.label}
                  className="border-multroid-grey/10 bg-multroid-cream/50 p-4 text-center shadow-none"
                >
                  <p className="text-3xl font-bold text-multroid-blue">
                    {hl.value}
                  </p>
                  <p className="mt-1 text-xs text-multroid-grey">{hl.label}</p>
                </GlassCard>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <GlassCard>
            <h2 className="mb-5 text-lg font-bold text-multroid-dark">
              Core Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-full border border-multroid-grey/20 bg-multroid-cloud/80 px-3 py-1.5 text-sm backdrop-blur-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* PDF Preview */}
        <section className="pb-20">
          <GlassCard className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-multroid-grey/20 px-6 py-4">
              <h2 className="text-lg font-bold text-multroid-dark">
                CV Preview
              </h2>
              <a
                href="/CV-Hikmat-Imanov.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-multroid-blue hover:underline"
              >
                Open in new tab
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="bg-multroid-cream/50 p-4">
              <iframe
                src="/CV-Hikmat-Imanov.pdf"
                className="h-[800px] w-full rounded-xl border border-multroid-grey/20"
                title="Hikmat Imanov CV"
              />
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
