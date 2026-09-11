import { ArrowRight } from "lucide-react";
import Media from "@/components/ui/Media";
import Magnetic from "@/components/ui/Magnetic";
import TextReveal from "@/components/ui/TextReveal";

export default function CTA() {
  return (
    <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
      <Media src="/home/poster.jpg" alt="Maison Argyle Vol. 03 campaign" sizes="100vw" />
      <div className="absolute inset-0 bg-ink/45" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-30 px-5 text-center text-bone">
        <span className="label text-bone/70">Out now — worldwide</span>

        <TextReveal
          as="h2"
          text="Vol. 03 is live"
          className="font-display block whitespace-nowrap py-[0.12em] text-[clamp(2.5rem,9vw,8rem)] leading-[0.9]"
        />
        <Magnetic>
          <a
            href="/shop"
            data-cursor="Shop"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-9 py-5 text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <span className="label">Shop the drop</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
