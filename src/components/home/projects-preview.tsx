import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { projects } from "@/content/cv";
import { IsoScene } from "@/components/site/iso-scene";
import { ButtonLink, Corner, Rule, SectionHeading } from "@/components/site/primitives";

export function ProjectsPreview() {
  return (
    <section id="projects" className="scroll-mt-24">
      <Rule />
      <div className="flex flex-col gap-6 px-5 pt-16 pb-12 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pt-24">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built on my own."
          lead="Personal projects: an AI-native finance OS, industrial robotics with physical AI, and years of experiments."
        />
        <ButtonLink variant="secondary" href="/portfolio" className="self-start lg:self-auto">
          View portfolio
        </ButtonLink>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3">
        <Rule className="absolute inset-x-0 top-0" />
        {projects.map((p, i) => (
          <Link key={p.slug} href={`/portfolio#${p.slug}`} className="group relative flex flex-col p-5 sm:p-8">
            {i > 0 && (
              <>
                <span aria-hidden className="absolute inset-x-0 top-0 h-px dash-x md:hidden" />
                <span aria-hidden className="absolute inset-y-0 left-0 hidden w-px dash-y md:block" />
                <Corner className="top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 md:block" />
              </>
            )}
            <div className="relative aspect-[16/10] bg-brand-soft">
              <IsoScene scene={p.scene} className="absolute inset-0 size-full p-6 sm:p-8" />
            </div>
            <p className="mt-6 text-[13px] text-subtle">
              Project · <span className="tabular-nums">{p.period}</span>
            </p>
            <h3 className="mt-1 text-[22px] font-medium tracking-[-0.03em] text-ink transition-colors group-hover:text-brand">
              {p.title}
            </h3>
            <p className="mt-1 text-[14px] text-brand">{p.role}</p>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">{p.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors group-hover:text-brand">
              Read more <ArrowRightIcon className="size-4 stroke-2 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
