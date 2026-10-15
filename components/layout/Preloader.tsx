"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["MORELLO", "モレロ", "ESSENTIALS", "STREETWEAR", "STUDIO"];

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Count 0 → 100 with an ease-out cadence.
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const DURATION = 1900;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      setWordIndex(
        Math.min(words.length - 1, Math.floor(eased * words.length)),
      );
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Lock scrolling while the loader is on screen.
  useEffect(() => {
    if (done) {
      window.__lenis?.start();
      document.body.style.overflow = "";
    } else {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-ink px-6 py-6 text-bone md:px-10 md:py-9"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-bone/60">
              <span className="logo-mark h-5 w-[0.95rem] shrink-0" />
              <span className="label">MORELLO STUDIO™ — Vol. 03</span>
            </span>
            <span className="label text-bone/60">Est. MMXXVI</span>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="font-display text-[clamp(3rem,16vw,13rem)] leading-none"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between">
            <span className="label max-w-[12ch] text-bone/60">
              Garments as cultural artifacts
            </span>
            <span className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-none text-accent-soft">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
