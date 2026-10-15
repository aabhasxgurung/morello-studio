import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";

/**
 * A quiet capsule edit: a compact editorial header and the same tight
 * storefront grid as the main drop. The garments carry the colour.
 */
export default function MansionDrop() {
  const graphics = products.filter((p) => p.category === "Graphics");

  return (
    <section
      id="mansion-drop"
      className="relative overflow-hidden border-t border-ink/15 bg-cream pb-16 text-ink md:pb-20"
    >
      {/* header — label row, display line, then a ruled row holding the
          description and CTA so the heading never crowds the products */}
      <div className="px-5 pt-8 md:px-10 md:pt-10">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-accent">Capsule — Mansion 2026</span>
          <span className="label hidden text-stone md:block">
            Kathmandu, Nepal
          </span>
          <span className="label shrink-0 text-stone">
            {String(graphics.length).padStart(2, "0")} back prints
          </span>
        </div>

        <TextReveal
          as="h2"
          text="Check-in, tune out."
          className="font-display mt-6 block py-[0.08em] text-[clamp(2rem,4.5vw,3.75rem)]"
        />

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">
            Three back prints drawn at the Morello Mansion — printed and numbered
            in Kathmandu, for people who don&apos;t like resorts.
          </p>
          <Link
            href="/shop?c=Graphics"
            data-cursor="Shop"
            className="inline-flex min-h-11 w-fit shrink-0 items-center gap-3 border-b border-accent/30 py-3 text-accent transition-colors duration-200 hover:border-accent hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="label">Shop the capsule</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* products — same tight storefront grid as the main drop */}
      <div className="mt-8 grid grid-cols-1 gap-x-1 gap-y-10 px-1 sm:grid-cols-3 md:mt-10">
        {graphics.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <ProductCard product={p} sizes="(max-width: 640px) 100vw, 33vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
