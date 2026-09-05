import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteProtection } from "@/components/portfolio/site-protection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vincent Chimaobi Obasiochie | Multimodal Prompt Engineer",
  description:
    "Professional portfolio of Vincent Chimaobi Obasiochie, a Multimodal Prompt Engineer with practical experience across generative AI text, image and video production, AI video production, creative direction, character and scene consistency, prompt refinement, content research and quality control.",
  keywords: [
    "Vincent Chimaobi Obasiochie",
    "Multimodal Prompt Engineer",
    "Generative AI",
    "AI Video Production",
    "AI Creative Direction",
    "Character Consistency",
    "Scene Continuity",
    "Prompt Refinement",
    "Prompt Stress Testing",
    "Content Quality",
    "Abuja Nigeria",
  ],
  authors: [{ name: "Vincent Chimaobi Obasiochie" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Vincent Chimaobi Obasiochie | Multimodal Prompt Engineer",
    description:
      "Multimodal Prompt Engineering, Generative AI Content, AI Video Production, Creative Direction and Content Quality. Personal portfolio of Vincent Chimaobi Obasiochie.",
    siteName: "Vincent Chimaobi Obasiochie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincent Chimaobi Obasiochie | Multimodal Prompt Engineer",
    description:
      "Multimodal Prompt Engineering, Generative AI Content, AI Video Production, Creative Direction and Content Quality.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="bottom-right" theme="dark" richColors closeButton />
        <SiteProtection />
      </body>
    </html>
  );
}
