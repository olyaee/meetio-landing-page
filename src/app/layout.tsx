import type { Metadata } from "next";
import { Inter, Geist_Mono, Space_Grotesk } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import { ToastProvider } from "@/components/toast";
import { BRAND_DESCRIPTION, BRAND_NAME, BRAND_OG_IMAGE, SITE_URL } from "@/lib/brand";
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
  metadataBase: new URL(SITE_URL),
  title: "nicecatch — Bug reporting that developers actually love",
  description: BRAND_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "nicecatch — Bug reporting that developers actually love",
    description:
      "Record your screen, describe the bug with your voice, and let AI write the report.",
    url: SITE_URL,
    siteName: BRAND_NAME,
    type: "website",
    images: [
      {
        url: BRAND_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "nicecatch — Report bugs in seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nicecatch — Bug reporting that developers actually love",
    description: "Record your screen, describe the bug with your voice, and let AI write the report.",
    images: [
      {
        url: BRAND_OG_IMAGE,
        alt: "nicecatch — Report bugs in seconds",
      },
    ],
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
        <PostHogProvider>{children}</PostHogProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
