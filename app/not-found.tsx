import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-5 pt-24 text-center">
      <span className="label text-stone">404 — Nothing here</span>
      <h1 className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.9]">
        Off the rack
      </h1>
      <p className="label max-w-[36ch] text-ink-soft">
        This piece doesn&apos;t exist — or it sold out so hard we removed the
        page.
      </p>
      <Link
        href="/shop"
        data-cursor="Shop"
        className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-bone transition-colors duration-300 hover:bg-accent"
      >
        <span className="label">Back to the store</span>
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </Link>
    </section>
  );
}
