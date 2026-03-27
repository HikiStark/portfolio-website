import { Navbar } from "@/components/shared/navbar";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/shared/glass-card";
import {
  BoltIcon as BoltOutline,
  SparklesIcon as SparklesOutline,
  WrenchScrewdriverIcon as WrenchOutline,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import {
  BoltIcon as BoltSolid,
  SparklesIcon as SparklesSolid,
  WrenchScrewdriverIcon as WrenchSolid,
} from "@heroicons/react/24/solid";

const principles = [
  {
    OutlineIcon: BoltOutline,
    SolidIcon: BoltSolid,
    title: "Problems first, technology second",
    text: "I start with a problem that shouldn't exist, then build the simplest, most elegant solution. Code, hardware, AI, or all three.",
  },
  {
    OutlineIcon: SparklesOutline,
    SolidIcon: SparklesSolid,
    title: "AI as infrastructure, not decoration",
    text: "The best AI is invisible. It makes products faster, smarter, and simpler without anyone noticing it's there.",
  },
  {
    OutlineIcon: WrenchOutline,
    SolidIcon: WrenchSolid,
    title: "Own the full stack",
    text: "From database schema to deployment pipeline to the button the user clicks. End-to-end ownership is how you ship products that hold together.",
  },
];

const journey = [
  {
    icon: WrenchScrewdriverIcon,
    year: "2019",
    title: "Started with hardware",
    text: "Built autonomous vehicles and robotic arms at university. Learned that the best engineering lives at the intersection of hardware and software.",
  },
  {
    icon: CpuChipIcon,
    year: "2022",
    title: "Went deep into software",
    text: "Shipped production web apps, internal tools, and dashboards. Discovered that most business software is broken, fragmented, manual, and stuck in 2010.",
  },
  {
    icon: LightBulbIcon,
    year: "2025",
    title: "Founded Multroid",
    text: "Started building the AI operating layer for modern companies. One ecosystem. Finance, HR, operations. All connected, all intelligent.",
  },
  {
    icon: ArrowTrendingUpIcon,
    year: "Now",
    title: "Scaling the ecosystem",
    text: "Notiva handles finance. Hoomara handles people. More products are coming. Every one is AI-native from day one.",
  },
];

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        <PageHeader
          badge="My Mission"
          title="I solve problems that shouldn't exist and build what replaces them"
          subtitle="I see broken processes and can't stop until I've built something better. Software, robotics, AI pipelines. I live for turning complex problems into simple, elegant solutions."
        />

        {/* Principles */}
        <section className="mb-20 grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <GlassCard
              key={p.title}
              className="group hover:border-multroid-blue/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-multroid-blue/10 transition-transform group-hover:scale-110">
                <p.OutlineIcon className="h-7 w-7 text-multroid-blue group-hover:hidden" />
                <p.SolidIcon className="hidden h-7 w-7 text-multroid-blue group-hover:block" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-multroid-dark">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-multroid-grey">
                {p.text}
              </p>
            </GlassCard>
          ))}
        </section>

        {/* Journey Timeline */}
        <section className="mb-20">
          <h2 className="mb-3 text-center text-xl font-bold text-multroid-dark">
            The path so far
          </h2>
          <p className="mx-auto mb-10 max-w-md text-center text-sm text-multroid-grey">
            From robotics labs to founding an AI company.
          </p>

          <div className="relative mx-auto max-w-2xl space-y-6 pl-10 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-multroid-blue/20 sm:pl-14 sm:before:left-[21px]">
            {journey.map((step, i) => (
              <div key={step.year} className="relative">
                <div
                  className={`absolute -left-10 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 sm:-left-14 sm:h-11 sm:w-11 ${
                    i === journey.length - 1
                      ? "border-multroid-blue bg-multroid-blue"
                      : "border-multroid-blue/30 bg-multroid-cream"
                  }`}
                >
                  <step.icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      i === journey.length - 1
                        ? "text-white"
                        : "text-multroid-blue"
                    }`}
                  />
                </div>

                <GlassCard className="hover:border-multroid-blue/30">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-bold ${
                        i === journey.length - 1
                          ? "bg-multroid-blue text-white"
                          : "bg-multroid-blue/10 text-multroid-blue"
                      }`}
                    >
                      {step.year}
                    </span>
                    <h3 className="font-bold text-multroid-dark">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-multroid-grey">
                    {step.text}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="flex justify-center pb-20">
          <GlassCard
            variant="dark"
            className="max-w-2xl border-l-4 border-l-multroid-blue"
          >
            <p className="font-heading text-lg italic leading-relaxed sm:text-xl">
              &ldquo;The world doesn&rsquo;t need another tool. It needs someone
              to look at the problem differently and build what should have
              existed all along.&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium text-multroid-cream/60">
              — Hiki
            </p>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
