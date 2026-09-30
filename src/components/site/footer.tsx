import Link from "next/link";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import { profile, projects } from "@/content/cv";
import { Dither } from "./dither";
import { ButtonLink, Corner, Eyebrow, HatchBand, Rule } from "./primitives";

type FooterLink = { label: string; href: string; external?: boolean; download?: boolean };

const COLUMNS: { label: string; links: FooterLink[] }[] = [
  {
    label: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Experience", href: "/#experience" },
      { label: "Skills", href: "/#skills" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    label: "Projects",
    links: [
      ...projects.map((p) => ({ label: p.title, href: `/portfolio#${p.slug}` })),
      { label: "Builds from my roles", href: "/portfolio#builds" },
    ],
  },
  {
    label: "Connect",
    links: [
      { label: "LinkedIn", href: profile.linkedin, external: true },
      { label: "GitHub", href: profile.github, external: true },
      { label: "Instagram", href: profile.instagram, external: true },
    ],
  },
  {
    label: "Get in touch",
    links: [
      { label: "Email me", href: `mailto:${profile.email}` },
      { label: profile.phone, href: profile.phoneHref },
      { label: "Download CV", href: profile.cvPath, download: true },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Legal notice", href: "/impressum" },
      { label: "Privacy policy", href: "/privacy" },
    ],
  },
];

function FooterAnchor({ link }: { link: FooterLink }) {
  const className = "text-[15px] text-ink transition-colors hover:text-brand";
  if (link.href.startsWith("/") && !link.download) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      className={className}
      download={link.download || undefined}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
    >
      {link.label}
    </a>
  );
}

export function Footer() {
  return (
    <footer>
      <HatchBand />

      {/* CTA — white card over the blue pixel field */}
      <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-brand">
        <div className="absolute inset-0">
          <Dither field="cta" fg="#ffffff" cell={11} />
        </div>
        <div className="relative flex justify-center px-4 py-20 sm:px-10 sm:py-28">
          <div className="w-full max-w-[720px] bg-surface px-6 py-12 text-center sm:px-14 sm:py-14">
            <h2 className="text-[34px] leading-[1.04] font-medium tracking-[-0.045em] text-ink sm:text-[52px]">
              Ready to put AI to work?
            </h2>
            <p className="mx-auto mt-4 max-w-[440px] text-[16px] leading-relaxed text-body">
              I&rsquo;ve guided finance and fintech teams through their AI transformation — embedded in the team,
              shipping the solutions myself.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
              <ButtonLink variant="secondary" href={profile.cvPath} download>
                Download CV
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Link columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {COLUMNS.map((col) => (
          <div key={col.label} className="relative pt-12 pb-14 lg:min-h-[320px]">
            <span aria-hidden className="absolute inset-y-0 left-0 w-px dash-y" />
            <Corner className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
            <Eyebrow>{col.label}</Eyebrow>
            <ul className="mt-9 space-y-3 px-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <FooterAnchor link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Rule />

      {/* Fine print */}
      <div className="flex flex-col gap-6 px-5 pt-8 pb-28 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <p className="max-w-[820px] text-[12.5px] leading-relaxed text-subtle">
          © {new Date().getFullYear()} {profile.name}. {profile.headline}, based in {profile.location}. The
          assistant on this site answers as Hiki using OpenAI models and can make mistakes — please confirm anything
          important by email. Text and voice you send to it are processed by OpenAI; see the{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
            privacy policy
          </Link>
          .
        </p>
        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-[9px] border border-[#e3e3e3] bg-surface px-3 py-2 text-[14px] text-ink">
          <GlobeEuropeAfricaIcon className="size-4 stroke-[1.5] text-body" />
          {profile.location}
        </span>
      </div>
    </footer>
  );
}
