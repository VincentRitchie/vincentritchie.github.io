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
  title: "Vincent Chimaobi Obasiochie | Multimodal Prompt Engineer, AI Video Producer & Video Annotation Specialist",
  description:
    "Professional portfolio of Vincent Chimaobi Obasiochie, a Multimodal Prompt Engineer, AI Video Producer and Video Annotation Specialist with experience in AI film and documentary production, robot-arm video annotation, CVAT image annotation, instance segmentation, scene continuity, research and quality assurance.",
  keywords: [
    "Vincent Chimaobi Obasiochie",
    "Multimodal Prompt Engineer",
    "AI Video Producer",
    "Video Annotation Specialist",
    "Generative AI",
    "AI Video Production",
    "Video Annotation",
    "Robot-Arm Video Annotation",
    "CVAT",
    "Instance Segmentation",
    "Image Annotation",
    "Character Consistency",
    "Scene Continuity",
    "Annotation Quality Assurance",
    "Abuja Nigeria",
  ],
  authors: [{ name: "Vincent Chimaobi Obasiochie" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Vincent Chimaobi Obasiochie | Multimodal Prompt Engineer, AI Video Producer & Video Annotation Specialist",
    description:
      "Multimodal Prompt Engineering, AI Video Production and Video Annotation for AI training data. Personal portfolio of Vincent Chimaobi Obasiochie.",
    siteName: "Vincent Chimaobi Obasiochie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincent Chimaobi Obasiochie | Multimodal Prompt Engineer, AI Video Producer & Video Annotation Specialist",
    description:
      "Multimodal Prompt Engineering, AI Video Production, Video Annotation and Annotation Quality Assurance.",
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
