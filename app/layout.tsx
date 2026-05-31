import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Agentation } from "agentation";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono-jb",
  display: "swap",
});

const siteUrl = "https://retrace.systems";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Retrace — AI copilot for field technicians",
  description:
    "Retrace records one expert demo and turns it into real-time AI coaching for every junior technician — voice + camera, through smart glasses or their phone.",
  openGraph: {
    title: "Retrace — AI copilot for field technicians",
    description:
      "Record one expert. Coach every learner. Real-time voice + visual coaching through smart glasses or iPhone.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Retrace — AI copilot for field technicians",
    description:
      "Record one expert. Coach every learner. Real-time voice + visual coaching through smart glasses or iPhone.",
  },
  icons: {
    icon: "/logo-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-canvas text-ink">
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
        <CustomCursor />
      </body>
    </html>
  );
}
