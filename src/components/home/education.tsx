import { education, languages } from "@/content/cv";
import { Corner, Eyebrow, Rule } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24">
      <Rule />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-5 py-16 sm:px-10 lg:px-12 lg:py-20">
          <Eyebrow>Education</Eyebrow>
          <h2 className="mt-6 text-[28px] leading-[1.1] font-medium tracking-[-0.035em] text-ink sm:text-[34px]">
            {education.degree}
          </h2>
          <p className="mt-3 text-[15px] text-body">
            {education.school} · {education.location}
          </p>
          <p className="mt-1 text-[14px] text-subtle tabular-nums">{education.period}</p>
          <div className="mt-8 flex rounded-[12px] border border-[#e3e3e3] bg-surface">
            <div className="flex-1 p-5">
              <p className="text-[12px] tracking-[0.04em] text-subtle uppercase">Thesis</p>
              <p className="mt-2 text-[16px] leading-snug text-ink">{education.thesis}</p>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-rule px-6">
              <span className="text-[40px] leading-none font-medium tracking-[-0.04em] text-brand">
                {education.grade}
              </span>
              <span className="mt-1.5 text-[12px] tracking-[0.04em] text-subtle uppercase">Grade</span>
            </div>
          </div>
        </div>

        <div className="relative px-5 pb-16 sm:px-10 lg:px-12 lg:py-20">
          <span aria-hidden className="absolute inset-y-0 left-0 hidden w-px dash-y lg:block" />
          <Corner className="top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
          <Eyebrow>Languages</Eyebrow>
          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {languages.map((l) => (
              <li key={l.name} className="flex items-center gap-4 py-3.5">
                <span className="w-28 text-[16px] font-medium text-ink">{l.name}</span>
                <span className="flex gap-[3px]" role="img" aria-label={`${l.score} of 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={cn("size-[10px]", n <= l.score ? "bg-brand" : "bg-rule")} />
                  ))}
                </span>
                <span className="ml-auto text-right text-[14px] text-body">
                  <span className="hidden sm:inline">{l.level} · </span>
                  <span className="text-subtle">{l.cefr}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
