import type { Metadata } from "next";
import { Inter, Montserrat, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PersistentChat } from "@/components/shared/persistent-chat";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hikmat Imanov — AI-Focused Full-Stack Engineer",
  description:
    "Portfolio of Hikmat Imanov — Founder of Multroid, building scalable SaaS and AI-native platforms.",
  keywords: [
    "Hikmat Imanov",
    "Multroid",
    "AI Engineer",
    "Full-Stack Developer",
    "Portfolio",
  ],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          {children}
          <PersistentChat />
          <Analytics />
        </TooltipProvider>
      </body>
    </html>
  );
}
