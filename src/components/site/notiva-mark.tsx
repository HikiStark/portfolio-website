import type { SVGProps } from "react";

/** Notiva's logo mark, from the Notiva design system (notiva-mark.svg). */
export function NotivaMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden {...props}>
      <path
        d="M40 37.626V14.793c0-.8-.451-1.526-1.152-1.855L11.767.182c-.669-.316-1.454-.215-2.03.261L.74 7.88C.273 8.266 0 8.853 0 9.474V35.964c0 1.803 2.088 2.717 3.329 1.457l8.467-8.588c.58-.588 1.447-.744 2.185-.395l23.242 11.041C38.521 40.096 40 39.11 40 37.626z"
        fill="#0047BA"
      />
      <path d="M40 9.424V3.469C40 1.554 38.505 0 36.661 0H20.935" fill="none" stroke="#0047BA" strokeWidth={2} />
    </svg>
  );
}
