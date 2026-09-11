import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Maison Argyle — Garments as cultural artifacts",
  description:
    "Maison Argyle is a streetwear and essentials label. Considered basics, bold statements, and pieces that carry meaning. Made to be worn, made to mean something.",
  keywords: [
    "streetwear",
    "essentials",
    "fashion",
    "clothing",
    "Maison Argyle",
    "basics",
  ],
  openGraph: {
    title: "Maison Argyle — Garments as cultural artifacts",
    description:
      "Considered basics, bold statements, and pieces that carry meaning.",
    type: "website",
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
      className={`${anton.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="grain bg-cream text-ink antialiased">
        <Preloader />
        <Cursor />
        <SmoothScroll>
          <Navbar />
          {/* main sits on its own layer and scrolls over the sticky footer —
              the page lifts away like a sheet to reveal it (footer parallax).
              The #contact sentinel is the anchor target: the footer itself is
              pinned to the viewport, so its own position can't be scrolled to. */}
          <main className="relative z-10 bg-cream shadow-[0_32px_64px_-16px_rgba(21,18,12,0.5)]">
            {children}
            <div id="contact" aria-hidden />
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
