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

const siteUrl = "https://retracelab.com";
const title = "Retrace — AI coaching through smart glasses";
const description =
  "Record an expert once; coach every learner forever. Gemini Live carries the voice, a separate Flash oracle verifies each step from the camera, and the phone joins the two. Built with FastAPI, SwiftUI and the Meta DAT SDK.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/LogoIcon.svg",
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
