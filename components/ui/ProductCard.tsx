import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import Media from "@/components/ui/Media";

/**
 * Catalogue card shared by the home drop grid and the store, styled like the
 * big streetwear storefronts: flat image block, hover swaps to the second
 * shot, a flat size strip slides up, and the name/price sit centered beneath
 * in small caps.
 */
export default function ProductCard({
  product,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  product: Product;
  sizes?: string;
}) {
  const [cover, alt] = product.images;
  const soldOut = new Set(product.soldOut ?? []);

  return (
    <article className="group">
      <Link
        href={`/shop/${product.slug}`}
        data-cursor="View"
        className="block"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-sand">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <Media src={cover} alt={product.name} sizes={sizes} />
            {alt && (
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Media
                  src={alt}
                  alt={`${product.name} — alternate view`}
                  sizes={sizes}
                />
              </div>
            )}
          </div>

          <span className="label absolute left-0 top-0 z-10 bg-bone/90 px-2.5 py-1.5 text-ink">
            {product.drop}
          </span>
          {product.badge && (
            <span className="label absolute right-0 top-0 z-10 bg-accent px-2.5 py-1.5 text-bone">
              {product.badge}
            </span>
          )}

          {/* flat quick-size strip */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full items-center justify-center gap-x-3 gap-y-1 bg-bone/90 px-4 py-3 text-ink backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
            {product.sizes.map((s) => (
              <span
                key={s}
                className={`label ${
                  soldOut.has(s) ? "text-ink/30 line-through" : ""
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* name inherits the section's text color — the card sits on cream
            in the store and on navy in the capsule block */}
        <div className="mt-3 flex flex-col items-center gap-1 text-center">
          <h3 className="label">{product.name}</h3>
          <p className="label text-stone">
            {formatPrice(product.price)}
            {product.colorways?.length
              ? ` · +${product.colorways.length} ${
                  product.colorways.length === 1 ? "colour" : "colours"
                }`
              : ""}
          </p>
        </div>
      </Link>
    </article>
  );
}
