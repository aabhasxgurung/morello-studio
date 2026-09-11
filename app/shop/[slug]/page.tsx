import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import {
  formatPrice,
  getProduct,
  products,
  relatedProducts,
  sizeGuideFor,
} from "@/lib/products";
import Media from "@/components/ui/Media";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import SizePicker from "@/components/product/SizePicker";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found — Maison Argyle" };
  return {
    title: `${product.name} — Maison Argyle`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Maison Argyle`,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const guide = sizeGuideFor(product);
  const colorways = (product.colorways ?? [])
    .map((slug) => getProduct(slug))
    .filter((p) => p !== undefined);

  return (
    <section className="relative px-5 pb-28 pt-28 md:px-10 md:pb-36 md:pt-36">
      {/* breadcrumb */}
      <nav className="mb-8 flex items-center gap-3">
        <Link
          href="/shop"
          data-cursor="Store"
          className="label link-underline inline-flex items-center gap-1.5 text-ink-soft"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Store
        </Link>
        <span className="label text-stone">
          / {product.category} / {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* gallery */}
        <div className="flex flex-col gap-4">
          {product.images.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand">
                <Media
                  src={src}
                  alt={`${product.name} — view ${i + 1}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  preload={i === 0}
                />
                <span className="label absolute bottom-3 right-3 z-10 rounded-full bg-bone/85 px-3 py-1 text-ink backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(product.images.length).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* info */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="label rounded-full border border-ink/20 px-3 py-1 text-ink-soft">
                  {product.drop}
                </span>
                {product.badge && (
                  <span className="label rounded-full bg-accent px-3 py-1 text-bone">
                    {product.badge}
                  </span>
                )}
              </div>
              <h1 className="font-display mt-5 text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.92]">
                {product.name}
              </h1>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="font-display text-3xl">
                  {formatPrice(product.price)}
                </span>
                <span className="label text-stone">{product.category}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="max-w-[52ch] leading-relaxed text-ink-soft">
                {product.description}
              </p>
              {product.fit && <p className="label text-stone">{product.fit}</p>}
            </div>

            {colorways.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="label text-ink-soft">Also in</span>
                <div className="flex gap-3">
                  {colorways.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop/${c.slug}`}
                      data-cursor={c.name}
                      className="group/swatch w-16"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand ring-1 ring-ink/10 transition-shadow duration-300 group-hover/swatch:ring-ink">
                        <Media src={c.images[0]} alt={c.name} sizes="64px" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <SizePicker sizes={product.sizes} soldOut={product.soldOut} />

            {/* accordions */}
            <div id="details" className="border-t border-ink/15">
              <details className="group border-b border-ink/15 py-5" open>
                <summary
                  data-cursor="Open"
                  className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden"
                >
                  <span className="label text-ink">Details &amp; fit</span>
                  <span className="label text-stone transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <ul className="mt-4 flex flex-col gap-2">
                  {product.details.map((d) => (
                    <li
                      key={d}
                      className="text-sm leading-relaxed text-ink-soft"
                    >
                      — {d}
                    </li>
                  ))}
                </ul>
              </details>

              <details
                id="size-guide"
                className="group border-b border-ink/15 py-5"
              >
                <summary
                  data-cursor="Open"
                  className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden"
                >
                  <span className="label text-ink">Size guide</span>
                  <span className="label text-stone transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[22rem] border-collapse text-sm">
                    <thead>
                      <tr>
                        {guide.columns.map((col) => (
                          <th
                            key={col}
                            className="label border-b border-ink/15 pb-2 pr-4 text-left font-normal text-stone"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guide.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, i) => (
                            <td
                              key={i}
                              className="border-b border-ink/10 py-2 pr-4 text-ink-soft"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {guide.note}
                </p>
              </details>

              <details className="group border-b border-ink/15 py-5">
                <summary
                  data-cursor="Open"
                  className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden"
                >
                  <span className="label text-ink">Shipping &amp; returns</span>
                  <span className="label text-stone transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  Worldwide shipping, 2–5 working days. Free over $200. Unworn
                  pieces can be returned within 14 days of delivery — garments
                  are made to be worn, but only after you&apos;re sure.
                </p>
              </details>
            </div>

            {/* trustmarks */}
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Worldwide", "Shipping 2–5 days"],
                ["Easy returns", "14 days, no fuss"],
                ["Numbered", "Small-batch drops"],
              ].map(([title, sub]) => (
                <div key={title} className="flex flex-col gap-1">
                  <span className="label text-ink">{title}</span>
                  <span className="text-xs leading-relaxed text-stone">
                    {sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-24 md:mt-32">
          <div className="mb-10 flex items-end justify-between border-b border-ink/15 pb-6">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.92]">
              Wears well with
            </h2>
            <Link
              href="/shop"
              data-cursor="All"
              className="label link-underline inline-flex items-center gap-1.5 text-ink-soft"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-1 gap-y-10 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.08}>
                <ProductCard
                  product={p}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
