import { ArrowUpRight } from "lucide-react";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";

/**
 * Physical home of the label — part store, part clubhouse. One address for
 * now; the grid is ready for more when the label lands in a second city.
 */
export default function Stores() {
  return (
    <section id="mansion" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col gap-4 border-b border-ink/15 pb-8">
        <span className="label text-accent">The Mansion — 05</span>
        <TextReveal
          as="h2"
          text="Come by the house"
          className="font-display block whitespace-nowrap text-[clamp(2.4rem,7vw,6rem)] leading-[0.9]"
        />
      </div>

      <div className="mt-12 grid grid-cols-1 items-start gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand">
              <Media
                src="/about/ab6.jpg"
                alt="Inside the Argyle Mansion, Kathmandu"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <span className="label absolute bottom-3 left-3 z-10 rounded-full bg-bone/85 px-3 py-1 text-ink backdrop-blur-sm">
                Mansion 01 — Kathmandu
              </span>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 md:col-span-5 md:pt-6">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ink-soft">
              Part store, part clubhouse. The Mansion is where the drop is
              drawn, printed and first worn — try the pieces on, flip through
              the archive, stay for a coffee. Check-in, tune out.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-6 border-t border-ink/15 pt-8">
              <div className="flex flex-col gap-1">
                <span className="label text-stone">Address</span>
                <p className="leading-relaxed">
                  Argyle Mansion
                  <br />
                  Thamel, Kathmandu 44600
                  <br />
                  Nepal
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="label text-stone">Hours</span>
                <p className="leading-relaxed">
                  Wed – Sun, 11:00 – 19:00
                  <br />
                  Walk-ins welcome
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Thamel,+Kathmandu,+Nepal"
                target="_blank"
                rel="noreferrer"
                data-cursor="Map"
                className="label link-underline inline-flex w-fit items-center gap-1.5 text-ink-soft"
              >
                Get directions
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
