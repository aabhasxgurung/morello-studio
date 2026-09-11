import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import Marquee from "@/components/ui/Marquee";

/**
 * Themed capsule block for the home page — the Mansion 2026 graphics
 * merchandised as their own mini-drop, Nude Project style: marquee, an
 * editorial header ruled off from the grid, then the same tight storefront
 * grid as the main drop.
 */
export default function MansionDrop() {
  const graphics = products.filter((p) => p.category === "Graphics");

  return (
    <section
      id="mansion-drop"
      className="relative overflow-hidden bg-accent-deep pb-20 text-bone md:pb-28"
    >
      <Marquee
        items={[
          "ARGYLE MANSION",
          "KATHMANDU 2026",
          "CHECK-IN, TUNE OUT",
          "FOR PEOPLE WHO DON'T LIKE RESORTS",
        ]}
        className="border-b border-bone/15 py-4 text-bone/70"
        duration={34}
        separator="✳"
      />

      {/* header — label row, display line, then a ruled row holding the
          description and CTA so the heading never crowds the products */}
      <div className="px-5 pt-16 md:px-10 md:pt-24">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-bone/60">Capsule — Mansion 2026</span>
          <span className="label hidden text-bone/60 md:block">
            Kathmandu, Nepal
          </span>
          <span className="label text-bone/60">
            {String(graphics.length).padStart(2, "0")} back prints
          </span>
        </div>

        <TextReveal
          as="h2"
          text="Check-in, tune out."
          className="font-display mt-8 block whitespace-nowrap py-[0.08em] text-[clamp(2.2rem,7.5vw,7rem)] md:mt-10"
        />

        <div className="mt-8 flex flex-col gap-8 border-t border-bone/15 pt-8 md:mt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-bone/70">
            Three back prints drawn at the Argyle Mansion — printed and numbered
            in Kathmandu, for people who don&apos;t like resorts.
          </p>
          <Link
            href="/shop?c=Graphics"
            data-cursor="Shop"
            className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-bone px-8 py-4 text-ink transition-colors duration-300 hover:bg-accent hover:text-bone"
          >
            <span className="label">Shop the capsule</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* products — same tight storefront grid as the main drop */}
      <div className="mt-12 grid grid-cols-1 gap-x-1 gap-y-10 px-1 sm:grid-cols-3 md:mt-16">
        {graphics.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <ProductCard product={p} sizes="(max-width: 640px) 100vw, 33vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
