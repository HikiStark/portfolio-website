import { experience } from "@/content/cv";
import { Badge, Rule, SectionHeading } from "@/components/site/primitives";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <Rule />
      <div className="px-5 pt-16 pb-12 sm:px-10 lg:px-12 lg:pt-24">
        <SectionHeading
          eyebrow="Experience"
          title="From robotics labs to AI in finance."
          lead="Six roles across software, AI and hardware — most recent first."
        />
      </div>
      <ol>
        {experience.map((r) => (
          <li
            key={r.company}
            className="relative grid grid-cols-1 gap-4 px-5 py-8 sm:px-10 lg:grid-cols-[240px_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-0 lg:p-0"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-px dash-x" />
            <div className="lg:py-9 lg:pr-6 lg:pl-12">
              <p className="text-[14px] font-medium text-ink tabular-nums">{r.period}</p>
              <p className="mt-1 text-[13.5px] text-subtle">
                {r.location}
                {r.type ? ` · ${r.type}` : ""}
              </p>
            </div>
            <div className="relative lg:px-8 lg:py-9">
              <span aria-hidden className="absolute inset-y-0 left-0 hidden w-px dash-y lg:block" />
              <h3 className="flex flex-wrap items-center gap-2.5 text-[20px] leading-tight font-medium tracking-[-0.025em] text-ink">
                {r.company}
                {r.current && <Badge>Now</Badge>}
              </h3>
              <p className="mt-1.5 text-[14.5px] text-brand">{r.role}</p>
            </div>
            <div className="relative lg:py-9 lg:pr-12 lg:pl-8">
              <span aria-hidden className="absolute inset-y-0 left-0 hidden w-px dash-y lg:block" />
              <ul className="max-w-[720px] space-y-2.5">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-body">
                    <span aria-hidden className="mt-[10px] size-[5px] shrink-0 bg-brand" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
