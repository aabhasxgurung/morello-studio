import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";

/**
 * Shop-by-category tiles — three tall image panels with the category name
 * stamped across them. Piece counts come from the catalogue so the numbers
 * never drift from the store.
 */
const tiles = [
  { label: "Essentials", c: "Essentials", image: "/home/5.jpg" },
  { label: "Long sleeves", c: "Long Sleeves", image: "/home/longsleeve.jpg" },
  { label: "Bottoms", c: "Bottoms", image: "/home/linenpants.jpg" },
];

export default function Categories() {
  return (
    <section className="relative pb-20 md:pb-28">
      <div className="mb-6 flex items-center justify-between border-b border-ink/15 px-5 pb-4 md:px-10">
        <span className="label text-ink">Shop by category</span>
        <span className="label hidden text-stone md:block">
          Wear it as language
        </span>
      </div>

      <div className="grid grid-cols-1 gap-1 px-1 md:grid-cols-3">
        {tiles.map((tile, i) => {
          const count = products.filter(
            (p) => p.category === tile.c,
          ).length;
          return (
            <Reveal key={tile.c} delay={i * 0.08}>
              <Link
                href={`/shop?c=${encodeURIComponent(tile.c)}`}
                data-cursor="Shop"
                className="group relative block aspect-[3/4] overflow-hidden bg-sand md:aspect-[3/4.4]"
              >
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                  <Media
                    src={tile.image}
                    alt={`${tile.label} — category`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-bone md:p-6">
                  <span className="font-display text-[clamp(1.8rem,4vw,3.2rem)]">
                    {tile.label}
                  </span>
                  <span className="label inline-flex items-center gap-1.5 pb-1 text-bone/80">
                    {String(count).padStart(2, "0")} pieces
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
