"use client";

import {
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Word-by-word reveal that triggers when the block scrolls into view. Each
 * word rises and fades into place. We deliberately avoid an `overflow:hidden`
 * mask here: with the tight display line-height it would clip the tops of tall
 * capitals, so a rise+fade keeps glyphs fully visible at every font size.
 */
export default function TextReveal({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.045,
  immediate = false,
  style,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Play on mount instead of waiting for a scroll trigger (use above the fold). */
  immediate?: boolean;
  /** Inline styles on the wrapper — use to override `.font-display`'s tight
      line-height (which, being unlayered, wins over `leading-*` utilities). */
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const inner = el.querySelectorAll<HTMLElement>("[data-word]");

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      gsap.set(inner, { y: 0, yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // GSAP owns yPercent/opacity so the inline initial styles can't get
      // baked into mismatched units. The inline translateY(80%) is parsed
      // into GSAP's px-based `y` channel, which the yPercent tween would
      // never touch — zero it explicitly or every word settles 80% low.
      gsap.set(inner, { y: 0, yPercent: 80, opacity: 0 });
      gsap.to(inner, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        delay,
        stagger,
        // Above the fold: play on mount. Below the fold: wait for scroll.
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 90%" },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, immediate]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            data-word
            className="inline-block will-change-transform"
            style={{ opacity: 0, transform: "translateY(80%)" }}
          >
            {word}
          </span>
          {/* space lives between the spans (not inside) so it isn't trimmed */}
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
