import { skills } from "@/content/cv";
import { Corner, Eyebrow, Rule, SectionHeading } from "@/components/site/primitives";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <Rule />
      <div className="px-5 pt-16 pb-12 sm:px-10 lg:px-12 lg:pt-24">
        <SectionHeading eyebrow="Skills" title="The stack I ship with." />
      </div>
      <div className="relative grid grid-cols-1 sm:grid-cols-3">
        <Rule className="absolute inset-x-0 top-0" />
        {skills.map((group, i) => (
          <div key={group.label} className="relative px-5 pt-10 pb-14 sm:px-8 lg:px-12">
            {i > 0 && (
              <>
                <span aria-hidden className="absolute inset-x-0 top-0 h-px dash-x sm:hidden" />
                <span aria-hidden className="absolute inset-y-0 left-0 hidden w-px dash-y sm:block" />
                <Corner className="top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 sm:block" />
              </>
            )}
            <Eyebrow>{group.label}</Eyebrow>
            <ul className="mt-8 space-y-3 pl-3">
              {group.items.map((item) => (
                <li key={item} className="text-[15px] text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
