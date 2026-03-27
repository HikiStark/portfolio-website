import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, ShieldCheckIcon, SparklesIcon, DocumentTextIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

const features = [
  { icon: SparklesIcon, title: "Novi AI Assistant", desc: "Monitors bills, subscriptions, and cash flow in the background with proactive alerts." },
  { icon: DocumentTextIcon, title: "Subscription Management", desc: "Detects recurring charges and flags unused subscriptions (90+ days)." },
  { icon: ChartBarIcon, title: "Tax Automation", desc: "German VAT tracking with accountant-ready exports and deadline extraction." },
  { icon: ShieldCheckIcon, title: "Security First", desc: "GDPR compliant, AES-256 encryption, data hosted in Germany, zero data selling." },
];

export default function NotivaPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-12 pb-20">
        <Link href="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm text-multroid-grey hover:text-multroid-blue">
          <ArrowLeftIcon className="h-4 w-4" /> Back to Portfolio
        </Link>

        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge className="mb-4 rounded-full bg-[#0047BA]/10 text-[#0047BA]">FinTech SaaS</Badge>
            <h1 className="font-heading text-4xl font-bold text-multroid-dark sm:text-5xl">Notiva</h1>
            <p className="mt-2 text-xl text-[#0047BA]">Your AI Financial Friend</p>
          </div>
          <a href="https://notiva.de" target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 rounded-2xl bg-[#0047BA] text-white hover:bg-[#0047BA]/90">
              Visit Site <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <GlassCard className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-multroid-dark">Overview</h2>
          <p className="leading-relaxed text-multroid-grey">
            Notiva is an AI-native financial management platform that aggregates accounts, invoices,
            subscriptions, and taxes in one place. The Novi AI assistant reads the full picture and
            keeps you one step ahead — from detecting unused subscriptions to automating German VAT
            tracking with accountant-ready exports.
          </p>
        </GlassCard>

        <h2 className="mb-4 text-lg font-bold text-multroid-dark">Key Features</h2>
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <GlassCard key={f.title} className="group hover:border-[#0047BA]/30">
              <f.icon className="mb-3 h-8 w-8 text-[#0047BA]" />
              <h3 className="mb-1 font-bold text-multroid-dark">{f.title}</h3>
              <p className="text-sm text-multroid-grey">{f.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard className="text-center">
            <p className="text-2xl font-bold text-[#0047BA]">€3.99</p>
            <p className="text-sm text-multroid-grey">Pro / month</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-2xl font-bold text-[#0047BA]">€11.99</p>
            <p className="text-sm text-multroid-grey">Family / month</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-2xl font-bold text-[#0047BA]">30 days</p>
            <p className="text-sm text-multroid-grey">Free trial</p>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
