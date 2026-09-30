import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small brand square marking where dashed rules meet. */
export function Corner({ className }: { className?: string }) {
  return <span aria-hidden className={cn("absolute z-[2] size-[6px] bg-brand", className)} />;
}

/** Full-width dashed rule with squares on the frame rails. */
export function Rule({ corners = true, className }: { corners?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-px dash-x", className)}>
      {corners && (
        <>
          <Corner className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
          <Corner className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2" />
        </>
      )}
    </div>
  );
}

/** Hatched strip between sections, bounded by dashed rules. */
export function HatchBand({ className }: { className?: string }) {
  return (
    <div aria-hidden>
      <Rule />
      <div className={cn("h-7 bg-hatch", className)} />
      <Rule />
    </div>
  );
}

/** Uppercase label with the brand bar on its left edge. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "relative pl-3 text-[13px] uppercase tracking-[0.04em] text-subtle",
        "before:absolute before:-top-2 before:-bottom-2 before:left-0 before:w-[2px] before:bg-brand/80",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 text-[32px] leading-[1.08] font-medium tracking-[-0.035em] text-ink sm:text-[40px]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[16px] leading-relaxed text-body">{lead}</p>}
    </div>
  );
}

/** Small outlined pill, like the reference's "Hiring" badge. */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-brand/20 bg-surface px-1.5 py-0.5 text-[12px] leading-none font-medium text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-hover px-2 py-1 text-[12px] leading-none text-body">
      {children}
    </span>
  );
}

const buttonBase =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[9px] px-4 text-[15px] font-medium whitespace-nowrap transition-[background,box-shadow,color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const buttonStyles = {
  primary: cn(
    buttonBase,
    "bg-[linear-gradient(180deg,#3b3b3b_0%,#1b1b1b_100%)] text-white",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_1px_2px_rgba(0,0,0,0.3),0_6px_14px_-6px_rgba(0,0,0,0.45)]",
    "hover:bg-[linear-gradient(180deg,#464646_0%,#232323_100%)]",
  ),
  secondary: cn(
    buttonBase,
    "border border-[#e3e3e3] bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#fafafa]",
  ),
};

type ButtonLinkProps = ComponentProps<"a"> & { variant?: keyof typeof buttonStyles };

/** Anchor styled as a button. Internal paths go through next/link. */
export function ButtonLink({ variant = "primary", className, href = "#", ...props }: ButtonLinkProps) {
  const classes = cn(buttonStyles[variant], className);
  const internal = href.startsWith("/") && !props.download;
  if (internal) return <Link href={href} className={classes} {...props} />;
  return <a href={href} className={classes} {...props} />;
}
