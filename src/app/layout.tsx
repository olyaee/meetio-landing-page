import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "meetio — Bug reporting that developers actually love",
  description:
    "Record your screen, describe the bug with your voice, and let AI write the report. Devs get console logs, network requests, and a full DOM replay.",
  openGraph: {
    title: "meetio — Bug reporting that developers actually love",
    description:
      "Record your screen, describe the bug with your voice, and let AI write the report.",
    url: "https://meetio.ai",
    siteName: "meetio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
