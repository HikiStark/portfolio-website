import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function RoboticArmPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-12 pb-20">
        <Link href="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm text-multroid-grey hover:text-multroid-blue">
          <ArrowLeftIcon className="h-4 w-4" /> Back to Portfolio
        </Link>

        <div className="mb-12">
          <Badge className="mb-4 rounded-full bg-orange-600/10 text-orange-700">Hardware + Software</Badge>
          <h1 className="font-heading text-4xl font-bold text-multroid-dark sm:text-5xl">Industrial Robotic Arm</h1>
          <p className="mt-2 text-xl text-orange-700">Modular. Intelligent. Industrial-Grade.</p>
        </div>

        <GlassCard className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-multroid-dark">Overview</h2>
          <p className="leading-relaxed text-multroid-grey">
            An industrial-grade modular robotic arm that combines mechanical engineering expertise
            with embedded systems and intelligent software control. Born from experience programming
            KUKA industrial robots at university and contributing to the Rover To Mars competition team.
          </p>
        </GlassCard>

        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <h2 className="mb-3 text-lg font-bold text-multroid-dark">Technical Highlights</h2>
            <ul className="space-y-2 text-sm text-multroid-grey">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                Autonomous navigation and control software
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                Custom 3D-printed mechanical components
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                Embedded system integration and real-time control
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                NVIDIA Isaac Sim for simulation and testing
              </li>
            </ul>
          </GlassCard>
          <GlassCard>
            <h2 className="mb-3 text-lg font-bold text-multroid-dark">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {["C++", "Embedded Systems", "3D Printing", "NVIDIA Isaac Sim", "Robotics", "KUKA Programming", "Real-time Control"].map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full border border-multroid-grey/20 bg-multroid-cloud/80 text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
