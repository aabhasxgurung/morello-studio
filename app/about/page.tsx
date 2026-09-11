import type { Metadata } from "next";
import Manifesto from "@/components/sections/Manifesto";
import Studio from "@/components/sections/Studio";
import Stores from "@/components/sections/Stores";
import Lookbook from "@/components/sections/Lookbook";
import CTA from "@/components/sections/CTA";
import TextReveal from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "About — Maison Argyle",
  description:
    "The story behind Maison Argyle — a streetwear and essentials label working in small runs with named makers, drawing on folklore, workwear, and the quiet codes of the street.",
};

export default function AboutPage() {
  return (
    <>
      {/* page intro */}
      <header className="relative flex min-h-[68svh] flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <span className="label text-accent">About — Maison Argyle</span>
        {/* whitespace-nowrap keeps each line on one row, and an inline
            line-height overrides `.font-display`'s 0.86 (too tight for these
            long, full-width caps stacked together — they'd overlap). */}
        <div className="mt-8 flex flex-col">
          <TextReveal
            as="h1"
            text="Garments as"
            immediate
            style={{ lineHeight: 1.1 }}
            className="font-display block whitespace-nowrap text-[clamp(2.6rem,9vw,8rem)]"
          />
          <TextReveal
            as="h1"
            text="cultural"
            immediate
            delay={0.1}
            style={{ lineHeight: 1.1 }}
            className="font-display block whitespace-nowrap text-[clamp(2.6rem,9vw,8rem)] text-accent"
          />
          <TextReveal
            as="h1"
            text="artifacts."
            immediate
            delay={0.2}
            style={{ lineHeight: 1.1 }}
            className="font-display block whitespace-nowrap text-[clamp(2.6rem,9vw,8rem)] text-accent"
          />
        </div>
        <p className="mt-[clamp(4rem,9vw,8rem)] max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
          Maison Argyle is a streetwear &amp; essentials label for people who
          treat what they wear as language. What follows is where it comes from
          — the thinking, the studio, and the people behind the drop.
        </p>
      </header>

      <Manifesto />
      <Studio />
      <Lookbook />
      <Stores />
      <CTA />
    </>
  );
}
