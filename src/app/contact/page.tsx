import { Navbar } from "@/components/shared/navbar";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/shared/glass-card";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hikmat-imanov",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const contactInfo = [
  { icon: EnvelopeIcon, label: "hikmat.imanov@multroid.com", href: "mailto:hikmat.imanov@multroid.com" },
  { icon: PhoneIcon, label: "+49 152 22912285", href: "tel:+4915222912285" },
  { icon: MapPinIcon, label: "Munich, Germany", href: null },
  { icon: GlobeAltIcon, label: "multroid.com", href: "https://multroid.com" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-multroid-cream">
      <Navbar />

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <PageHeader
          badge="Contact"
          title="Let's Connect"
          subtitle="Have a project in mind, a question, or just want to say hello? Reach out through any channel below."
        />

        <div className="grid grid-cols-1 gap-6 pb-20 sm:gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <GlassCard>
            <h3 className="mb-6 text-lg font-bold text-multroid-dark">
              Get in Touch
            </h3>
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-multroid-blue/10">
                    <item.icon className="h-5 w-5 text-multroid-blue" />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-multroid-dark transition-colors hover:text-multroid-blue"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm text-multroid-dark">{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Socials */}
          <div className="space-y-6">
            <GlassCard>
              <h3 className="mb-5 text-lg font-bold text-multroid-dark">
                Socials
              </h3>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-multroid-blue/10 text-multroid-blue transition-all hover:bg-multroid-blue hover:text-white hover:shadow-lg"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </GlassCard>

            <GlassCard variant="blue">
              <h3 className="mb-3 text-lg font-bold">Available for</h3>
              <ul className="space-y-1.5 text-sm text-white/80">
                <li>Freelance projects</li>
                <li>Technical consulting</li>
                <li>AI integration partnerships</li>
                <li>Speaking opportunities</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
