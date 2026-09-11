"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

/**
 * A custom cursor: a small ink dot that trails the pointer and swells into a
 * red ring when hovering interactive elements tagged with `data-cursor`.
 * Disabled on touch / coarse-pointer devices.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring_ = { x: pos.x, y: pos.y };
    let raf = 0;

    const render = () => {
      ring_.x += (pos.x - ring_.x) * 0.18;
      ring_.y += (pos.y - ring_.y) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${ring_.x}px, ${ring_.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  useEffect(() => {
    if (!ring.current) return;
    animate(ring.current, { scale: hovering ? 1 : 0.42 }, { duration: 0.4 });
  }, [hovering]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
    >
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-20 w-20 items-center justify-center rounded-full border border-accent bg-accent/5 mix-blend-multiply backdrop-blur-[1px]"
      >
        {label && (
          <span className="label text-[0.55rem] text-accent-deep">{label}</span>
        )}
      </div>
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-ink"
      />
    </div>
  );
}
