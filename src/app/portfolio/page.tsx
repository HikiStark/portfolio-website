import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { builds, projects, type Project } from "@/content/cv";
import { Dither } from "@/components/site/dither";
import { IsoScene } from "@/components/site/iso-scene";
import { ButtonLink, Corner, Eyebrow, Rule, SectionHeading, Tag } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects by Hikmat Imanov — Notiva, Multroid Robotics, independent experiments, and builds from his roles.",
};

function ProjectFeature({ project: p, flip }: { project: Project; flip: boolean }) {
  return (
    <section id={p.slug} className="scroll-mt-24">
      <Rule />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className={cn("px-5 py-14 sm:px-10 lg:px-12 lg:py-20 [&>*]:max-w-[680px]", flip && "lg:order-2")}>
          <Eyebrow>Project · {p.period}</Eyebrow>
          <h2 className="mt-6 text-[40px] leading-none font-medium tracking-[-0.045em] text-ink sm:text-[52px]">
            {p.title}
          </h2>
          <p className="mt-3 text-[15px] font-medium text-brand">{p.role}</p>
          <p className="mt-7 text-[18px] leading-relaxed text-ink">{p.summary}</p>
          {p.details.length > 0 && (
            <ul className="mt-5 space-y-3">
              {p.details.map((d) => (
                <li key={d} className="flex gap-3 text-[15.5px] leading-relaxed text-body">
                  <span aria-hidden className="mt-[10px] size-[5px] shrink-0 bg-brand" />
                  {d}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-7 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          {p.url && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink variant="secondary" href={p.url} target="_blank" rel="noopener noreferrer">
                {p.urlLabel} <ArrowUpRightIcon className="size-4 stroke-2" />
              </ButtonLink>
            </div>
          )}
        </div>
        <div
          className={cn(
            "relative flex min-h-[320px] items-center justify-center bg-brand-soft px-8 py-12 sm:px-16",
            flip && "lg:order-1",
          )}
        >
          <span aria-hidden className={cn("absolute inset-y-0 hidden w-px dash-y lg:block", flip ? "right-0" : "left-0")} />
          <Corner
            className={cn(
              "top-0 hidden -translate-y-1/2 lg:block",
              flip ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2",
            )}
          />
          <IsoScene scene={p.scene} className="max-w-[460px]" />
        </div>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        <div className="px-5 pt-14 pb-12 sm:px-10 lg:px-12 lg:py-24">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 className="mt-7 text-[44px] leading-[1.02] font-medium tracking-[-0.05em] text-ink sm:text-[64px]">
            Things I&rsquo;ve built.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-body">
            Personal projects — from an AI-native finance OS to industrial robots that diagnose their own faults —
            plus the builds that came out of my roles.
          </p>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              [String(projects.length), "Projects"],
              [String(builds.length), "Builds from roles"],
              ["2018", "Building since"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-[12px] tracking-[0.04em] text-subtle uppercase">{label}</dt>
                <dd className="mt-1 text-[28px] font-medium tracking-[-0.04em] text-ink tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative hidden min-h-[280px] lg:block">
          <span aria-hidden className="absolute inset-y-0 left-0 z-[2] w-px dash-y" />
          <div className="absolute inset-0">
            <Dither field="band" cell={9} seed={3} />
          </div>
        </div>
      </section>

      {projects.map((p, i) => (
        <ProjectFeature key={p.slug} project={p} flip={i % 2 === 1} />
      ))}

      <section id="builds" className="scroll-mt-24">
        <Rule />
        <div className="px-5 pt-16 pb-12 sm:px-10 lg:px-12 lg:pt-24">
          <SectionHeading
            eyebrow="From my roles"
            title="Built on the job."
            lead="Notable builds from the roles on my CV."
          />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          <Rule className="absolute inset-x-0 top-0" />
          {builds.map((b, i) => (
            <article key={b.slug} id={b.slug} className="relative scroll-mt-24 px-5 py-10 sm:px-10 lg:px-12 lg:py-12">
              {i > 0 && <span aria-hidden className={cn("absolute inset-x-0 top-0 h-px dash-x", i === 1 && "md:hidden")} />}
              {i % 2 === 1 && (
                <>
                  <span aria-hidden className="absolute inset-y-0 left-0 hidden w-px dash-y md:block" />
                  <Corner className="top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 md:block" />
                </>
              )}
              <p className="text-[13px] text-subtle">
                {b.org} · <span className="tabular-nums">{b.period}</span>
              </p>
              <h3 className="mt-2 text-[22px] leading-tight font-medium tracking-[-0.03em] text-ink">{b.title}</h3>
              <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-body">{b.text}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {b.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
