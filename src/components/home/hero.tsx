import { experience, profile } from "@/content/cv";
import { Badge, ButtonLink, Eyebrow } from "@/components/site/primitives";
import { Portrait } from "./portrait";

export function Hero() {
  const current = experience.filter((r) => r.current);

  return (
    <section id="about" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:min-h-[clamp(640px,calc(100svh_-_81px),1000px)] lg:grid-cols-[minmax(0,1fr)_min(47%,720px)]">
        <div className="flex flex-col justify-center px-5 pt-14 pb-12 sm:px-10 lg:px-12 lg:py-20">
          <Eyebrow>
            {profile.name} · {profile.location}
          </Eyebrow>
          <h1 className="mt-7 text-[42px] leading-[1.02] font-medium tracking-[-0.05em] text-ink sm:text-[58px] xl:text-[66px]">
            AI & Software Engineer with a robotics background.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-body">
            I&rsquo;m Hikmat — Hiki. I build AI systems end to end, from LLM-powered financial tools to industrial
            robots that diagnose their own faults.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <ButtonLink href={profile.cvPath} download>
              Download CV
            </ButtonLink>
            <ButtonLink variant="secondary" href="/portfolio">
              View portfolio
            </ButtonLink>
          </div>
          <ul className="mt-8 space-y-2.5">
            {current.map((r) => (
              <li key={r.company} className="flex flex-wrap items-center gap-2.5 text-[14px] text-body">
                <Badge>Now</Badge>
                <span>
                  <span className="font-medium text-ink">{r.company}</span> — {r.role}
                  {r.type ? `, ${r.type.toLowerCase()}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative border-t border-rule lg:border-t-0">
          <span aria-hidden className="absolute inset-y-0 left-0 z-[2] hidden w-px dash-y lg:block" />
          <Portrait />
        </div>
      </div>
    </section>
  );
}
