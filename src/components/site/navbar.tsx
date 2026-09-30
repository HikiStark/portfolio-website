"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import {
  ArrowRightIcon,
  Bars2Icon,
  BeakerIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
  CpuChipIcon,
  CubeIcon,
  EyeIcon,
  PresentationChartLineIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { experience, profile } from "@/content/cv";
import { cn } from "@/lib/utils";
import { IsoScene } from "./iso-scene";
import { Logo } from "./logo";
import { NotivaMark } from "./notiva-mark";
import { ButtonLink, Corner, Eyebrow, Rule } from "./primitives";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type MenuItem = { href: string; title: string; desc: string; icon: Icon };

const PROJECT_ITEMS: MenuItem[] = [
  { href: "/portfolio#notiva", title: "Notiva", desc: "AI-native personal finance OS", icon: NotivaMark },
  { href: "/portfolio#multroid-robotics", title: "Multroid Robotics", desc: "Industrial arm with physical AI", icon: CpuChipIcon },
  { href: "/portfolio#independent-projects", title: "Independent Projects", desc: "Systems & software experiments", icon: BeakerIcon },
];

const BUILD_ITEMS: MenuItem[] = [
  { href: "/portfolio#investaz", title: "InvestAZ financial systems", desc: "Built at Algoritma, end to end", icon: PresentationChartLineIcon },
  { href: "/portfolio#manufacturing-tools", title: "Manufacturing tools", desc: "Spectrum Elektrotechnik", icon: WrenchScrewdriverIcon },
  { href: "/portfolio#rc-racer", title: "Autonomous RC racer", desc: "PyTorch computer vision", icon: EyeIcon },
  { href: "/portfolio#rover-arm", title: "Rover robotic arm", desc: "Rover To Mars team", icon: CubeIcon },
];

const NOW_ITEMS: MenuItem[] = experience
  .filter((r) => r.current)
  .map((r) => ({
    href: "/#experience",
    title: r.company,
    desc: `${r.role}${r.type ? `, ${r.type.toLowerCase()}` : ""}`,
    icon: BuildingOffice2Icon,
  }));

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

function MenuLink({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex gap-3.5 rounded-[10px] p-3 transition-colors hover:bg-hover focus-visible:bg-hover focus-visible:outline-none"
    >
      <item.icon className="mt-0.5 size-[22px] shrink-0 stroke-[1.3] text-ink" />
      <span>
        <span className="block text-[15px] font-medium text-ink">{item.title}</span>
        <span className="mt-0.5 block text-[13.5px] text-body">{item.desc}</span>
      </span>
    </Link>
  );
}

function MenuColumn({ label, items, onNavigate }: { label: string; items: MenuItem[]; onNavigate: () => void }) {
  return (
    <div className="flex flex-col">
      <div className="border-b border-rule px-6 pt-6 pb-4">
        <Eyebrow className="before:hidden pl-0">{label}</Eyebrow>
      </div>
      <div className="flex flex-col gap-1 p-3">
        {items.map((item) => (
          <MenuLink key={item.title} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

/** Hatched gutter between mega-menu columns, with dashed rails. */
function Gutter() {
  return (
    <div aria-hidden className="relative bg-hatch">
      <span className="absolute inset-y-0 left-0 w-px dash-y" />
      <span className="absolute inset-y-0 right-0 w-px dash-y" />
      <Corner className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <Corner className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      id="portfolio-menu"
      className="absolute inset-x-0 top-full z-30 hidden bg-canvas shadow-[0_32px_48px_-32px_rgba(0,0,0,0.28)] animate-in fade-in slide-in-from-top-1 duration-150 lg:block"
    >
      <div className="grid grid-cols-[1fr_20px_1fr_20px_1.1fr]">
        <MenuColumn label="Projects" items={PROJECT_ITEMS} onNavigate={onNavigate} />
        <Gutter />
        <MenuColumn label="From my roles" items={BUILD_ITEMS} onNavigate={onNavigate} />
        <Gutter />
        <div className="flex flex-col p-6">
          <div className="flex items-center justify-center rounded-[4px] bg-brand-soft px-8 py-6">
            <IsoScene scene="hub" className="max-h-[170px]" />
          </div>
          <p className="mt-5 text-[20px] font-medium tracking-[-0.02em] text-ink">See everything I&rsquo;ve built</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-body">
            Projects, builds from my roles, and the stack behind them.
          </p>
          <div className="mt-auto pt-5">
            <Rule corners={false} className="mb-4" />
            <Link
              href="/portfolio"
              onClick={onNavigate}
              className="flex items-center justify-between text-[15px] font-medium text-ink hover:text-brand"
            >
              View portfolio <ArrowRightIcon className="size-5 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-6 bg-hatch" />
      <Rule />
      <div className="px-6 pt-5 pb-1">
        <Eyebrow className="before:hidden pl-0">Currently</Eyebrow>
      </div>
      <div className="flex items-center gap-2 p-3">
        {NOW_ITEMS.map((item) => (
          <div key={item.title} className="min-w-[320px]">
            <MenuLink item={item} onNavigate={onNavigate} />
          </div>
        ))}
        <Link
          href="/#experience"
          onClick={onNavigate}
          className="mr-3 ml-auto flex items-center gap-2 text-[15px] font-medium text-ink hover:text-brand"
        >
          Full experience <ArrowRightIcon className="size-5 stroke-[1.5]" />
        </Link>
      </div>
      <Rule />
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas lg:hidden">
      <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-10 items-center justify-center rounded-[9px] border border-[#e3e3e3] bg-surface"
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
      <Rule corners={false} />
      <nav className="flex flex-col px-5 py-4">
        {[...LINKS.slice(0, 2), { href: "/portfolio", label: "Portfolio" }, ...LINKS.slice(2)].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="border-b border-rule py-4 text-[26px] font-medium tracking-[-0.03em] text-ink"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="px-5 pb-2">
        <Eyebrow className="before:hidden pl-0">Projects</Eyebrow>
      </div>
      <div className="flex flex-col px-2">
        {PROJECT_ITEMS.map((item) => (
          <MenuLink key={item.title} item={item} onNavigate={onClose} />
        ))}
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2 p-5">
        <ButtonLink variant="secondary" href={`mailto:${profile.email}`}>
          Email me
        </ButtonLink>
        <ButtonLink href={profile.cvPath} download>
          Download CV
        </ButtonLink>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // A click right after hover opened the menu shouldn't toggle it shut again.
  const hoverOpenedAt = useRef(0);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    if (!menuOpen) hoverOpenedAt.current = Date.now();
    setMenuOpen(true);
  };
  const toggleMenu = () => {
    if (Date.now() - hoverOpenedAt.current < 500) return;
    setMenuOpen((o) => !o);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 140);
  };
  const closeMenu = () => {
    window.clearTimeout(closeTimer.current);
    setMenuOpen(false);
  };

  const onPortfolio = pathname === "/portfolio";

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={scheduleClose}
        onMouseEnter={() => menuOpen && openMenu()}
        className="sticky top-0 z-30 bg-canvas/90 backdrop-blur-md"
      >
        <div className="flex h-[72px] items-center justify-between gap-6 px-5 lg:h-20 lg:px-8">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {LINKS.slice(0, 2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-[9px] px-3.5 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-hover"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="portfolio-menu"
              onClick={toggleMenu}
              onMouseEnter={openMenu}
              className={cn(
                "flex items-center gap-1.5 rounded-[9px] px-3.5 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-hover",
                (menuOpen || onPortfolio) && "bg-hover",
              )}
            >
              Portfolio
              <ChevronDownIcon className={cn("size-4 stroke-2 transition-transform", menuOpen && "rotate-180")} />
            </button>
            {LINKS.slice(2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-[9px] px-3.5 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-hover"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <ButtonLink variant="secondary" href={`mailto:${profile.email}`}>
              Email me
            </ButtonLink>
            <ButtonLink href={profile.cvPath} download>
              Download CV
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex size-10 items-center justify-center rounded-[9px] border border-[#e3e3e3] bg-surface lg:hidden"
          >
            <Bars2Icon className="size-5" />
          </button>
        </div>
        <Rule />

        {menuOpen && <MegaMenu onNavigate={closeMenu} />}
      </header>
      {/* Outside the header: its backdrop-filter would trap position: fixed. */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}
