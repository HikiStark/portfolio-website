import type { Metadata } from "next";
import { profile } from "@/content/cv";
import { legal } from "@/content/legal";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Datenschutzerklärung" title="Privacy policy">
      <p className="text-subtle">Last updated: {legal.updated}</p>

      <div>
        <h2>1. Controller</h2>
        <p>
          {profile.name}, {legal.addressLines.join(", ")}
          <br />
          Email: <a href={`mailto:${profile.email}`}>{profile.email}</a> · Phone: {profile.phone}
        </p>
      </div>

      <div>
        <h2>2. Hosting</h2>
        <p>
          This website is hosted by Vercel Inc. (USA). When you visit, Vercel processes the technical data needed to
          deliver the site — IP address, date and time of the request, the page requested, referrer, and browser and
          device information — in server logs. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in delivering a
          secure, working website). Vercel acts as a processor; transfers to the USA rely on the EU–US Data Privacy
          Framework and/or the EU Standard Contractual Clauses.
        </p>
      </div>

      <div>
        <h2>3. Vercel Web Analytics</h2>
        <p>
          I use Vercel Web Analytics to see aggregate page views. It works without cookies: visitors are
          distinguished by a hash of the incoming request that is discarded after 24 hours, and no personal profiles
          are created. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in understanding how the site is used).
        </p>
      </div>

      <div>
        <h2>4. AI assistant (&ldquo;Ask Hiki&rdquo;)</h2>
        <p>
          <strong className="font-medium text-ink">Text chat.</strong> When you send a message, it and the earlier
          messages of the same conversation are sent through this website&rsquo;s server to OpenAI, which generates
          the reply. This website does not store your messages.
        </p>
        <p>
          <strong className="font-medium text-ink">Voice conversation.</strong> Only after you click the microphone
          and allow microphone access, your voice is streamed directly from your browser to OpenAI&rsquo;s Realtime
          API, which returns spoken replies and transcripts shown in the chat window. The session ends when you click
          End, leave the site, or after five minutes.
        </p>
        <p>
          The provider is OpenAI (OpenAI Ireland Ltd.); processing may also take place in the USA. According to
          OpenAI, data sent through its API is not used to train models by default and is retained for up to 30
          days for abuse monitoring. Please don&rsquo;t share sensitive personal information in the chat. Legal basis:
          Art. 6(1)(a) GDPR — you choose to use the assistant, and for voice you explicitly grant microphone access.
          See{" "}
          <a href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noopener noreferrer">
            OpenAI&rsquo;s privacy policy
          </a>
          .
        </p>
      </div>

      <div>
        <h2>5. Contact by email or phone</h2>
        <p>
          If you contact me, I process your details to handle your request. Legal basis: Art. 6(1)(b) GDPR where it
          concerns a contract or project, otherwise Art. 6(1)(f) GDPR. I delete the data once it is no longer needed,
          subject to statutory retention periods.
        </p>
      </div>

      <div>
        <h2>6. Fonts</h2>
        <p>Fonts are served from this website itself; no connection to Google or other font providers is made.</p>
      </div>

      <div>
        <h2>7. Your rights</h2>
        <p>
          You have the right to access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of
          processing (Art. 18), data portability (Art. 20) and to object (Art. 21). You can withdraw consent at any
          time with effect for the future (Art. 7(3)). You may also lodge a complaint with a data protection
          supervisory authority, for example the Bavarian State Office for Data Protection Supervision (
          <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">
            BayLDA
          </a>
          ).
        </p>
      </div>
    </LegalPage>
  );
}
