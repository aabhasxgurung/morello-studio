import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";

/** Curated cut of the drop for the home page — the store carries the rest. */
const FEATURED_COUNT = 8;

/**
 * Storefront-style drop grid: a thin utility header, then the products
 * nearly edge-to-edge with hairline gaps — the clothes are the layout.
 */
export default function Featured() {
  const featured = products.slice(0, FEATURED_COUNT);

  return (
    <section id="shop" className="relative pb-20 pt-6 md:pb-28">
      <div className="mb-6 flex items-center justify-between border-b border-ink/15 px-5 pb-4 md:px-10">
        <span className="label text-ink">
          New drop — Vol. 03{" "}
          <span className="text-stone">({products.length})</span>
        </span>
        <a
          href="/shop"
          data-cursor="All"
          className="label link-underline inline-flex items-center gap-1.5 text-ink-soft"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-x-1 gap-y-10 px-1 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.06}>
            <ProductCard
              product={p}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
