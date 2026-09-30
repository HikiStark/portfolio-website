import type { ReactNode } from "react";
import { Eyebrow } from "./primitives";

export function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="px-5 pt-14 pb-20 sm:px-10 lg:px-12 lg:pt-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-7 text-[40px] leading-[1.04] font-medium tracking-[-0.045em] text-ink sm:text-[52px]">
        {title}
      </h1>
      <div className="mt-10 max-w-[720px] space-y-9 text-[15.5px] leading-relaxed text-body [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:text-[20px] [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_p+p]:mt-3">
        {children}
      </div>
    </section>
  );
}
