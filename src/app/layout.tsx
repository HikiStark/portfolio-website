import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PersistentChat } from "@/components/shared/persistent-chat";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hikmat Imanov — AI & Software Engineer",
    template: "%s — Hikmat Imanov",
  },
  description:
    "Portfolio of Hikmat Imanov — AI & Software Engineer with a robotics background, based in Munich.",
  keywords: [
    "Hikmat Imanov",
    "AI Engineer",
    "Software Engineer",
    "Robotics",
    "Notiva",
    "Multroid Robotics",
    "Munich",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-hatch px-3 lg:px-4">
        <div className="frame relative flex min-h-dvh flex-col bg-canvas">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <PersistentChat />
        <Analytics />
      </body>
    </html>
  );
}
