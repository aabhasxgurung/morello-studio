"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import TextReveal from "@/components/ui/TextReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Store() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [],
  );
  // Nav / footer links can land here pre-filtered via /shop?c=<category>.
  const searchParams = useSearchParams();
  const requested = searchParams.get("c");
  const initial =
    requested && categories.includes(requested) ? requested : "All";
  const [active, setActive] = useState(initial);
  const [cols, setCols] = useState<2 | 3 | 4>(3);

  useEffect(() => {
    setActive(initial);
  }, [initial]);

  const shown =
    active === "All" ? products : products.filter((p) => p.category === active);

  const gridCols: Record<2 | 3 | 4, string> = {
    2: "grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <section className="relative pb-24 pt-32 md:pb-32 md:pt-40">
      {/* header */}
      <div className="flex flex-col gap-6 px-5 pb-8 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              data-cursor="Home"
              className="label link-underline inline-flex items-center gap-1.5 text-ink-soft"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              Morello Studio
            </Link>
            <span className="label text-stone">Store — Vol. 03</span>
          </div>
          <TextReveal
            as="h1"
            text="The Collection"
            immediate
            className="font-display block whitespace-nowrap text-[clamp(2.6rem,8vw,7rem)] leading-[0.9]"
          />
        </div>
        <p className="label max-w-[34ch] text-ink-soft md:text-right">
          Every piece from the current drop. Heavyweight basics and considered
          cuts, made to be worn.
        </p>
      </div>

      {/* filter bar — full-bleed utility strip, ruled top and bottom */}
      <div className="sticky top-0 z-20 mb-8 flex flex-wrap items-center gap-2 border-y border-ink/15 bg-cream/85 px-5 py-4 backdrop-blur-sm md:px-10">
        {categories.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-cursor="Filter"
              className={`label rounded-full px-4 py-2 transition-colors duration-300 ${
                isActive
                  ? "bg-ink text-bone"
                  : "border border-ink/20 text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-3">
          {/* column view toggle — hidden on small screens where layout is fixed */}
          <div className="hidden items-center gap-1 rounded-full border border-ink/20 p-1 sm:flex">
            {([2, 3, 4] as const).map((n) => {
              const isActive = cols === n;
              return (
                <button
                  key={n}
                  onClick={() => setCols(n)}
                  data-cursor="View"
                  aria-label={`${n} columns`}
                  aria-pressed={isActive}
                  className={`label flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300 ${
                    isActive
                      ? "bg-ink text-bone"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <span className="label text-stone">
            {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          </span>
        </div>
      </div>

      {/* grid */}
      <motion.div
        layout
        className={`grid gap-x-1 gap-y-10 px-1 ${gridCols[cols]}`}
      >
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ProductCard
                product={p}
                sizes={
                  cols === 4
                    ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
