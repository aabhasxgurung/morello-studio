import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Marquee from "@/components/ui/Marquee";

const trustmarks = [
  ["Worldwide shipping", "2–5 working days, free over $200"],
  ["Easy returns", "14 days, no questions asked"],
  ["Numbered drops", "Small runs, no restocks"],
];

const columns = [
  {
    title: "Shop",
    items: [
      { label: "Shop all", href: "/shop" },
      { label: "Graphics", href: "/shop?c=Graphics" },
      { label: "Essentials", href: "/shop?c=Essentials" },
      { label: "Long sleeves", href: "/shop?c=Long%20Sleeves" },
      { label: "Footwear", href: "/shop?c=Footwear" },
    ],
  },
  {
    title: "The house",
    items: [
      { label: "Manifesto", href: "/about#manifesto" },
      { label: "Lookbook", href: "/about#lookbook" },
      { label: "The Mansion — Kathmandu", href: "/about#mansion" },
      { label: "Journal", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Size guide", href: "#" },
      { label: "Care", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

/**
 * Sticky-reveal footer: on md+ it pins to the viewport bottom behind <main>
 * (which carries its own background and higher z-index), so the page scrolls
 * away like a curtain and the footer is revealed underneath. min-h-svh +
 * justify-between makes the content fill exactly one viewport when possible.
 * On mobile the content is taller than the screen, so it stays in normal flow.
 */
export default function Footer() {
  return (
    <footer className="relative z-0 flex flex-col justify-between overflow-hidden bg-ink text-bone md:sticky md:bottom-0 md:min-h-svh">
      {/* trustmarks */}
      <div className="grid grid-cols-1 gap-8 px-5 pb-12 pt-16 sm:grid-cols-3 md:px-10 md:pb-8 md:pt-24">
        {trustmarks.map(([title, sub]) => (
          <div key={title} className="flex flex-col gap-1.5">
            <span className="label text-bone">{title}</span>
            <span className="text-sm leading-relaxed text-bone/50">{sub}</span>
          </div>
        ))}
      </div>

      <Marquee
        items={[
          "NEW DROP — VOL. 03",
          "MANSION 2026 — OUT NOW",
          "JOIN THE MORELLO STUDIO COMMUNITY",
          "WORLDWIDE SHIPPING",
        ]}
        className="border-y border-bone/15 py-4 text-accent-soft"
        duration={32}
      />

      <div className="grid grid-cols-2 gap-10 px-5 py-14 md:grid-cols-5 md:px-10 md:py-10">
        <div className="col-span-2 flex flex-col gap-5">
          <p className="label text-bone/50">Newsletter — 01</p>
          <p className="max-w-sm text-xl leading-snug md:text-2xl">
            No spam. Early access to drops, off-record stories, and the
            occasional dispatch from the studio.
          </p>
          <form className="flex items-center gap-3 border-b border-bone/30 pb-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full bg-transparent text-base outline-none placeholder:text-bone/40"
            />
            <button
              type="submit"
              data-cursor="Send"
              className="label inline-flex shrink-0 items-center gap-1.5 text-accent-soft"
            >
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </form>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="flex flex-col gap-3">
            <p className="label text-bone/50">{col.title}</p>
            {col.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="link-underline w-fit text-sm text-bone/90"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      {/* Oversized wordmark bleeds off both edges */}
      <div className="relative px-2">
        <h2 className="font-display select-none text-center leading-[0.8] text-bone [font-size:clamp(2.4rem,14.5vw,12rem)]">
          MORELLO STUDI<span className="text-accent-soft">O</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3 border-t border-bone/15 px-5 py-6 text-bone/50 md:flex-row md:items-center md:justify-between md:px-10 md:py-5">
        <p className="label">© MMXXVI Morello Studio — All rights reserved</p>
        <p className="label">Garments as cultural artifacts</p>
        <p className="label">Designed in transit · Built with intent</p>
      </div>
    </footer>
  );
}
