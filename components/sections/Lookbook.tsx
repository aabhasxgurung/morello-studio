"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { lookbook } from "@/lib/products";
import Media from "@/components/ui/Media";

// Run GSAP in a layout effect so the cleanup (which removes ScrollTrigger's
// pin-spacer wrapper) fires during React's mutation phase — before React
// detaches this subtree on route change. With a passive `useEffect`, the
// unwrap happens too late and React throws "removeChild ... not a child of
// this node" trying to remove the now-reparented <section>. Fall back to
// useEffect on the server to avoid the SSR layout-effect warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Lookbook() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduce) return; // native horizontal scroll fallback

    const ctx = gsap.context(() => {
      const distance = () => trackEl.scrollWidth - window.innerWidth;
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={section}
      className="relative overflow-hidden bg-cream"
    >
      <div
        ref={track}
        className="flex w-max items-stretch gap-5 overflow-x-auto px-5 py-20 md:gap-8 md:overflow-x-visible md:px-10 md:py-28 [scrollbar-width:none]"
      >
        {/* intro panel */}
        <div className="flex w-[78vw] shrink-0 flex-col justify-between py-2 md:w-[34vw]">
          <span className="label text-accent">Lookbook — 02</span>
          <div>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.88]">
              Off
              <br />
              Hours
            </h2>
            <p className="mt-6 max-w-xs text-ink-soft">
              Five frames shot between shifts, last trains, and slow mornings.
              The drop, worn the way it&apos;s meant to live.
            </p>
            <p className="label mt-8 hidden items-center gap-1.5 text-stone md:inline-flex">
              [ Scroll to advance
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /> ]
            </p>
          </div>
        </div>

        {/* slides */}
        {lookbook.map((look, i) => (
          <figure key={look.id} className="group relative shrink-0">
            <div className="relative h-[58vh] w-[78vw] overflow-hidden rounded-sm bg-sand md:h-[68vh] md:w-[42vw]">
              <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                <Media
                  src={look.image}
                  alt={look.title}
                  sizes="(max-width: 768px) 78vw, 42vw"
                />
              </div>
              <span className="label absolute left-4 top-4 text-bone mix-blend-difference">
                {String(i + 1).padStart(2, "0")} / {String(lookbook.length).padStart(2, "0")}
              </span>
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between">
              <span className="text-lg">{look.title}</span>
              <span className="label text-stone">{look.tag}</span>
            </figcaption>
          </figure>
        ))}

        {/* outro CTA panel */}
        <div className="flex w-[78vw] shrink-0 flex-col justify-center md:w-[30vw]">
          <h3 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.9]">
            See the
            <br />
            <span className="text-accent">whole</span> story
          </h3>
          <a
            href="#"
            data-cursor="Open"
            className="label link-underline mt-6 inline-flex w-fit items-center gap-1.5 text-ink-soft"
          >
            Open the full lookbook
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
