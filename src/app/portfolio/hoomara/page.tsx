import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, UserGroupIcon, BanknotesIcon, ComputerDesktopIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

const modules = [
  { icon: UserGroupIcon, title: "HR", desc: "Elevate employee potential and boost productivity through human-AI collaboration." },
  { icon: BanknotesIcon, title: "Payroll", desc: "Automated payroll processing with error-free guarantee for complex workforce scenarios." },
  { icon: ComputerDesktopIcon, title: "IT", desc: "Unified identity, access, and device management with automated security controls." },
  { icon: ScaleIcon, title: "Legal", desc: "Contract management that converts contract data into actionable business insights." },
];

export default function HoomaraPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-12 pb-20">
        <Link href="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm text-multroid-grey hover:text-multroid-blue">
          <ArrowLeftIcon className="h-4 w-4" /> Back to Portfolio
        </Link>

        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge className="mb-4 rounded-full bg-amber-600/10 text-amber-700">Enterprise SaaS</Badge>
            <h1 className="font-heading text-4xl font-bold text-multroid-dark sm:text-5xl">Hoomara</h1>
            <p className="mt-2 text-xl text-amber-700">The Enterprise AI Platform for People, Operations & Growth</p>
          </div>
          <a href="https://hoomara.com" target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 rounded-2xl bg-amber-700 text-white hover:bg-amber-700/90">
              Visit Site <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <GlassCard className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-multroid-dark">Overview</h2>
          <p className="leading-relaxed text-multroid-grey">
            Hoomara centralizes HR, finance, IT, legal, and operations into one intelligent
            platform — automating everything that slows you down. &ldquo;Powerful alone. Stronger
            together.&rdquo; Currently in early access with a waitlist for enterprise customers.
          </p>
        </GlassCard>

        <h2 className="mb-4 text-lg font-bold text-multroid-dark">Platform Modules</h2>
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {modules.map((m) => (
            <GlassCard key={m.title} className="group hover:border-amber-600/30">
              <m.icon className="mb-3 h-8 w-8 text-amber-700" />
              <h3 className="mb-1 font-bold text-multroid-dark">{m.title}</h3>
              <p className="text-sm text-multroid-grey">{m.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard variant="dark" className="text-center">
          <p className="text-lg font-bold">Currently in Beta</p>
          <p className="mt-1 text-sm text-multroid-cream/70">
            Join the waitlist at{" "}
            <a href="https://hoomara.com" target="_blank" rel="noopener noreferrer" className="underline">
              hoomara.com
            </a>
          </p>
        </GlassCard>
      </main>
    </div>
  );
}
