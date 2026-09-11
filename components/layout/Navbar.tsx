"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";

const links = [
  { label: "Shop", href: "/shop", n: "01" },
  { label: "About", href: "/about", n: "02" },
  { label: "Contact", href: "#contact", n: "03" },
];

/** Store categories — links deep-link into the shop's filter via ?c=. */
const categories = [
  { label: "Shop all", c: null },
  { label: "Graphics", c: "Graphics" },
  { label: "Essentials", c: "Essentials" },
  { label: "Long sleeves", c: "Long Sleeves" },
  { label: "Bottoms", c: "Bottoms" },
  { label: "Denim", c: "Denim" },
  { label: "Knitwear", c: "Knitwear" },
  { label: "Shirting", c: "Shirting" },
  { label: "Footwear", c: "Footwear" },
];

const house = [
  { label: "Manifesto", href: "/about#manifesto" },
  { label: "The Mansion", href: "/about#mansion" },
  { label: "Lookbook", href: "/about#lookbook" },
];

function categoryHref(c: string | null) {
  return c ? `/shop?c=${encodeURIComponent(c)}` : "/shop";
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  // Hide the bar on scroll-down, reveal on scroll-up; track how far down we
  // are so the nav can switch tone (see `light` below).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 600 && !open);
      setScrolled(y > 80);
      setPastHero(y > window.innerHeight * 0.7);
      last = y;
    };
    onScroll(); // sync immediately — the page may load mid-scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Light (bone) type over the home hero image and the ink menu overlay;
  // ink type on every cream surface. A translucent cream bar backs the nav
  // once the page scrolls, storefront-style.
  const light = open || (pathname === "/" && !pastHero);
  const tone = light ? "text-bone" : "text-ink";
  const barTone = light ? "bg-bone" : "bg-ink";
  const barBg =
    scrolled && !light
      ? "border-b border-ink/10 bg-cream/85 backdrop-blur-sm"
      : "border-b border-transparent";

  const go = (href: string) => {
    setOpen(false);
    // Hash links scroll within the current page; paths change route.
    if (href.startsWith("#")) {
      setTimeout(() => scrollTo(href), 50);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[60]"
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* announcement bar — fixed h-8 so the nav below can anchor to it */}
        <div className="bg-accent-deep text-bone">
          <div className="flex h-8 items-center justify-center px-5 md:justify-between md:px-10">
            <Link
              href="/shop?c=Graphics"
              data-cursor="Shop"
              className="label link-underline hidden md:block"
            >
              Mansion 2026 — out now
            </Link>
            <span className="label text-center">
              Free worldwide shipping over $200
            </span>
            <span className="label hidden md:block">
              Numbered small-batch drops
            </span>
          </div>
        </div>
      </motion.header>

      {/* The nav lives outside the header so the menu overlay (z-55) can sit
          between them; its tone flips with what's beneath it instead of
          relying on mix-blend-difference, which washes out on mid-tone
          photography and can't composite from inside a fixed z-indexed
          ancestor anyway. */}
      <motion.nav
        className={`fixed inset-x-0 top-8 z-[60] flex items-center justify-between px-5 py-5 transition-colors duration-300 md:px-10 ${tone} ${
          open ? "" : barBg
        }`}
        animate={{ y: hidden ? "-150%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Magnetic>
          <Link
            href="/"
            className="font-display text-xl leading-none tracking-tight md:text-2xl"
          >
            MAISON ARGYLE
          </Link>
        </Magnetic>

        <div className="hidden items-center gap-8 md:flex">
          {links.slice(0, 3).map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className={`label link-underline transition-colors duration-300 ${tone}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            className={`label link-underline hidden transition-colors duration-300 sm:block ${tone}`}
          >
            Bag (0)
          </button>
          <Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor={open ? "Close" : "Menu"}
              aria-label="Toggle menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
            >
              <span
                className={`block h-[2px] w-6 transition-[transform,background-color] duration-300 ${barTone} ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 transition-[transform,background-color] duration-300 ${barTone} ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </Magnetic>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto bg-ink px-5 pb-8 pt-28 text-bone md:px-10 md:pt-32"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          >
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr]">
              <nav className="flex flex-col">
                {links.map((l, i) => (
                  <motion.button
                    key={l.href}
                    onClick={() => go(l.href)}
                    data-cursor="Go"
                    className="group flex items-baseline justify-between border-b border-bone/15 py-3 text-left md:py-4"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.18 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="font-display text-[clamp(2.4rem,11vw,8rem)] leading-[0.95] transition-colors duration-300 group-hover:text-accent">
                      {l.label}
                    </span>
                    <span className="label hidden text-bone/50 sm:block">
                      {l.n}
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* mega-menu columns */}
              <motion.div
                className="flex flex-col gap-10 md:pt-2"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.34,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div>
                  <p className="label text-bone/50">Shop by</p>
                  <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5">
                    {categories.map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => go(categoryHref(cat.c))}
                        data-cursor="Shop"
                        className="link-underline w-fit text-left text-sm text-bone/90"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="label text-bone/50">The house</p>
                  <div className="mt-4 flex flex-col gap-2.5">
                    {house.map((h) => (
                      <button
                        key={h.label}
                        onClick={() => go(h.href)}
                        data-cursor="Go"
                        className="link-underline w-fit text-left text-sm text-bone/90"
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="label max-w-[28ch] text-bone/60">
                A streetwear &amp; essentials label. Considered basics, bold
                statements, pieces that carry meaning.
              </p>
              <div className="flex gap-6">
                {["Instagram", "TikTok", "Journal"].map((s) => (
                  <a key={s} href="#" className="label link-underline">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
