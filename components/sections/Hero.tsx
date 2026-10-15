"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import Media from "@/components/ui/Media";
import Magnetic from "@/components/ui/Magnetic";

const HERO_DELAY = 2.4; // wait for the preloader curtain to lift

/**
 * Full-bleed campaign hero — the whole viewport is the image, the type sits
 * on top of it, and the drop grid starts immediately below the fold.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // The image sinks slower than the scroll — classic campaign-cover
      // parallax. Oversized wrapper hides the travel.
      gsap.to(".hero-bg", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      // Type lifts away a touch faster than the image for depth.
      gsap.to(".hero-copy", {
        yPercent: -30,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative h-svh overflow-hidden bg-ink"
    >
      {/* full-viewport image, oversized so the parallax never shows edges */}
      <div className="hero-bg absolute inset-x-0 top-[-14%] h-[128%]">
        <Media
          src="/home/bg.png"
          alt="Morello Studio Vol. 03 — seaside campaign"
          preload
          sizes="100vw"
        />
      </div>

      {/* legibility gradients — heavier at the foot where the type lives */}
      {/* deep enough that the difference-blended navbar reads light over the sky */}
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink/75 via-ink/25 to-transparent" />

      {/* meta row */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between px-5 pt-28 text-bone/80 md:px-10 md:pt-32">
        <span className="label max-w-[16ch]">Spring / Summer — Vol. 03</span>
        <span className="label hidden md:block">[ Cream · Ink · Morello ]</span>
        <span className="label text-right">N 51°30′ / W 0°07′</span>
      </div>

      {/* copy block — anchored to the foot of the image */}
      <div className="hero-copy absolute inset-x-0 bottom-0 px-5 pb-8 text-bone md:px-10 md:pb-10">
        <p className="label mb-5 text-bone/70">
          Garments as cultural artifacts
        </p>
        <div className="pointer-events-none">
          <TextReveal
            as="h1"
            text="Form. Function."
            delay={HERO_DELAY}
            immediate
            className="font-display block whitespace-nowrap text-[clamp(2.8rem,9.5vw,10.5rem)]"
          />
          <span className="font-display block whitespace-nowrap text-[clamp(2.8rem,9.5vw,10.5rem)] text-bone">
            <TextReveal text="& Folklore." delay={HERO_DELAY + 0.15} immediate />
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-bone/80 md:text-base">
            A streetwear &amp; essentials label for people who treat what they
            wear as language. Heavyweight basics, considered cuts, statements
            that mean something.
          </p>
          <div className="flex items-center gap-4">
            <Magnetic>
              <a
                href="#shop"
                data-cursor="Shop"
                className="inline-flex items-center gap-2 rounded-full bg-bone px-7 py-4 text-ink transition-colors hover:bg-accent hover:text-bone"
              >
                <span className="label">Shop the drop</span>
              </a>
            </Magnetic>
            <div className="hidden items-center gap-2 md:flex">
              <span className="label text-bone/70">Scroll</span>
              <span className="block h-px w-10 bg-bone/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
