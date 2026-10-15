"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Media from "@/components/ui/Media";
import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { k: "MMXXVI", v: "Founded" },
  { k: "12", v: "Named makers" },
  { k: "100%", v: "Considered materials" },
];

export default function Studio() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".par-a", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".par-b", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="studio"
      ref={root}
      className="relative px-5 py-24 md:px-10 md:py-32"
    >
      <div className="flex flex-col gap-4 border-b border-ink/15 pb-8">
        <span className="label text-accent">Studio — 04</span>
        <TextReveal
          as="h2"
          text="A studio in transit"
          className="font-display block whitespace-nowrap text-[clamp(2.4rem,7vw,6rem)] leading-[0.9]"
        />
      </div>

      <div className="mt-12 grid grid-cols-1 items-start gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
        {/* tall image */}
        <div className="md:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand">
            <div className="par-a absolute inset-x-0 -top-[16%] h-[132%]">
              <Media
                src="/about/ab8.jpg"
                alt="Inside the Morello Studio studio"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>

        {/* copy + stats */}
        <div className="flex flex-col gap-10 md:col-span-4 md:pt-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              Morello Studio moves between cities. We work in small runs with
              named makers, drawing on folklore, workwear and the quiet codes of
              the street. Every piece is a record of where it was made and who
              it was made for.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-ink-soft">
              We&apos;d rather release less and mean more. No seasonal noise, no
              logos for the sake of it — just garments that earn their place in
              your rotation and keep it.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 border-t border-ink/15 pt-8">
            {stats.map((s) => (
              <div key={s.v} className="flex flex-col gap-1">
                <span className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-none">
                  {s.k}
                </span>
                <span className="label text-stone">{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* offset image */}
        <div className="md:col-span-3 md:pt-24">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
            <div className="par-b absolute inset-x-0 -top-[12%] h-[124%]">
              <Media
                src="/about/ab9.jpg"
                alt="Morello Studio fabric study"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
