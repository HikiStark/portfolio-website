import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function MultroidPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pt-12 pb-20">
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-sm text-multroid-grey transition-colors hover:text-multroid-blue"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back to Portfolio
        </Link>

        {/* Hero */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge className="mb-4 rounded-full bg-multroid-blue/10 text-multroid-blue">
              AI Platform
            </Badge>
            <h1 className="font-heading text-4xl font-bold text-multroid-dark sm:text-5xl">
              Multroid
            </h1>
            <p className="mt-2 text-xl text-multroid-blue">
              The AI Operating Layer for Modern Companies
            </p>
          </div>
          <a href="https://multroid.com" target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 rounded-2xl bg-multroid-blue text-white hover:bg-multroid-blue/90">
              Visit Site <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Description */}
        <GlassCard className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-multroid-dark">Overview</h2>
          <p className="leading-relaxed text-multroid-grey">
            Multroid is an ecosystem of intelligent products designed to consolidate fragmented
            business tools into a unified, AI-driven platform. It builds AI-native software
            solutions that simplify how companies manage finance, people, operations, and
            automation — replacing dozens of disconnected tools with one intelligent layer.
          </p>
        </GlassCard>

        {/* Products under Multroid */}
        <h2 className="mb-4 text-lg font-bold text-multroid-dark">Products</h2>
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <GlassCard className="group hover:border-multroid-blue/30">
            <h3 className="text-lg font-bold text-multroid-dark">Notiva</h3>
            <p className="mt-1 text-sm font-medium text-multroid-blue">
              AI-powered financial management
            </p>
            <p className="mt-2 text-sm text-multroid-grey">
              Subscription tracking, document processing, tax automation, and spending analytics
              — all powered by the Novi AI assistant.
            </p>
            <Link
              href="/portfolio/notiva"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-multroid-blue"
            >
              Learn more <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </Link>
          </GlassCard>
          <GlassCard className="group hover:border-multroid-blue/30">
            <h3 className="text-lg font-bold text-multroid-dark">Hoomara</h3>
            <p className="mt-1 text-sm font-medium text-multroid-blue">
              Enterprise HR & operations platform
            </p>
            <p className="mt-2 text-sm text-multroid-grey">
              Centralizes HR, payroll, IT, and legal — automating administrative workflows so
              teams focus on people, not paperwork.
            </p>
            <Link
              href="/portfolio/hoomara"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-multroid-blue"
            >
              Learn more <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </Link>
          </GlassCard>
        </div>

        {/* Tech & Role */}
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <h2 className="mb-3 text-lg font-bold text-multroid-dark">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Python", "PostgreSQL", "Supabase", "Prisma", "Stripe", "AI Pipelines", "REST APIs", "CI/CD", "Swift/SwiftUI"].map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full border border-multroid-grey/20 bg-multroid-cloud/80 text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <h2 className="mb-3 text-lg font-bold text-multroid-dark">My Role</h2>
            <p className="text-sm leading-relaxed text-multroid-grey">
              Founder & AI-Focused Full-Stack Engineer. Architected the entire platform from
              scratch — cloud infrastructure, AI pipelines, multi-tenant auth with RBAC,
              billing systems, and iOS app components.
            </p>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
