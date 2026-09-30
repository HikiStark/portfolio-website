import type { Metadata } from "next";
import { profile } from "@/content/cv";
import { legal } from "@/content/legal";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Legal notice",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Impressum" title="Legal notice">
      <div>
        <h2>Information pursuant to § 5 DDG</h2>
        <p>
          {profile.name}
          {legal.addressLines.map((line) => (
            <span key={line}>
              <br />
              {line}
            </span>
          ))}
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Phone: <a href={profile.phoneHref}>{profile.phone}</a>
          <br />
          Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </div>
      {legal.vatId && (
        <div>
          <h2>VAT ID</h2>
          <p>VAT identification number pursuant to § 27a UStG: {legal.vatId}</p>
        </div>
      )}
      <div>
        <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
        <p>{profile.name}, address as above.</p>
      </div>
    </LegalPage>
  );
}
