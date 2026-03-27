"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Bars3Icon,
  XMarkIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
  BriefcaseIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Mission", href: "/mission", icon: RocketLaunchIcon },
  { label: "Portfolio", href: "/portfolio", icon: BriefcaseIcon },
  { label: "About", href: "/about", icon: UserIcon },
  { label: "Contact", href: "/contact", icon: ChatBubbleLeftIcon },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-multroid-grey/30 bg-multroid-white/80 backdrop-blur-md">
        <nav className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between px-4 sm:h-[76px] sm:px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/multroid-logo.svg"
              alt="Hiki Logo"
              width={48}
              height={48}
              className="h-10 w-10 rounded-lg sm:h-12 sm:w-12"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-3 md:flex">
            {navLinks.map((link, i) => (
              <div key={link.href} className="flex items-center gap-3">
                {i > 0 && (
                  <div className="h-[18px] w-[2px] rounded-sm bg-multroid-dark" />
                )}
                <Link
                  href={link.href}
                  className={`rounded-lg px-[18px] py-2 text-base transition-colors hover:bg-multroid-cloud ${
                    pathname === link.href ||
                    pathname.startsWith(link.href + "/")
                      ? "font-medium text-multroid-blue"
                      : "text-multroid-dark"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* CV Button */}
          <div className="hidden items-center gap-2.5 px-[18px] md:flex">
            <Link href="/cv">
              <Button className="h-9 gap-2 rounded-[10px] bg-multroid-blue px-[18px] font-bold text-multroid-white hover:bg-multroid-blue/90">
                <DocumentTextIcon className="h-4 w-4" />
                CV
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-multroid-dark hover:bg-multroid-cloud md:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-multroid-cream md:hidden">
          {/* Mobile Nav Header */}
          <div className="flex h-[60px] items-center justify-between px-4">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image
                src="/images/multroid-logo.svg"
                alt="Hiki Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-multroid-dark/5 text-multroid-dark transition-colors hover:bg-multroid-dark/10"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-1 flex-col justify-center px-8">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between rounded-2xl px-6 py-5 transition-all ${
                      isActive
                        ? "bg-multroid-blue text-white"
                        : "text-multroid-dark hover:bg-multroid-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <link.icon
                        className={`h-6 w-6 ${isActive ? "text-white" : "text-multroid-blue"}`}
                      />
                      <span className="text-2xl font-bold">{link.label}</span>
                    </div>
                    <ArrowRightIcon
                      className={`h-5 w-5 opacity-0 transition-all group-hover:opacity-100 ${
                        isActive
                          ? "text-white opacity-100"
                          : "text-multroid-grey"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CV Button */}
            <div className="mt-8 px-6">
              <Link href="/cv" onClick={() => setOpen(false)}>
                <Button className="w-full gap-3 rounded-2xl bg-multroid-blue py-6 text-lg font-bold text-white shadow-[0px_4px_20px_0px_rgba(0,51,161,0.3)] hover:bg-multroid-blue/90">
                  <DocumentTextIcon className="h-5 w-5" />
                  Download CV
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8">
            <p className="text-center text-sm text-multroid-grey">
              hikmat.imanov@multroid.com
            </p>
          </div>
        </div>
      )}
    </>
  );
}
