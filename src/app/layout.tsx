import type { Metadata } from "next";
import { Inter, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "meetio — Bug reporting that developers actually love",
  description:
    "Record your screen, describe the bug with your voice, and let AI write the report. Devs get console logs, network requests, and a full DOM replay.",
  alternates: { canonical: "https://meetio.ai" },
  openGraph: {
    title: "meetio — Bug reporting that developers actually love",
    description:
      "Record your screen, describe the bug with your voice, and let AI write the report.",
    url: "https://meetio.ai",
    siteName: "meetio",
    type: "website",
    images: [{ url: "https://meetio.ai/og-image.png", width: 1200, height: 630, alt: "meetio — Report bugs in seconds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "meetio — Bug reporting that developers actually love",
    description: "Record your screen, describe the bug with your voice, and let AI write the report.",
    images: ["https://meetio.ai/og-image.png"],
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
      className={`${inter.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-clip">
        <a href="#demo" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-foreground focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
