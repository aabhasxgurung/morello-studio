"use client";

import { useState } from "react";

/**
 * Visual size selection for the product page. Purely presentational for now —
 * there is no cart yet, so the CTA acknowledges the pick without going
 * anywhere.
 */
export default function SizePicker({
  sizes,
  soldOut = [],
}: {
  sizes: string[];
  soldOut?: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const gone = new Set(soldOut);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between">
        <span className="label text-ink-soft">Select size</span>
        <a
          href="#size-guide"
          data-cursor="Guide"
          className="label link-underline text-stone"
        >
          Size guide
        </a>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {sizes.map((s) => {
          const isGone = gone.has(s);
          const isActive = selected === s;
          return (
            <button
              key={s}
              disabled={isGone}
              onClick={() => setSelected(s)}
              data-cursor={isGone ? undefined : s}
              aria-pressed={isActive}
              className={`label flex h-11 items-center justify-center rounded-sm border transition-colors duration-300 ${
                isGone
                  ? "cursor-not-allowed border-ink/10 text-stone/50 line-through"
                  : isActive
                    ? "border-ink bg-ink text-bone"
                    : "border-ink/20 text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {soldOut.length > 0 && (
        <p className="label text-stone">
          Crossed-out sizes are gone — pieces are numbered, no restocks.
        </p>
      )}

      <button
        data-cursor="Soon"
        className="group flex items-center justify-between rounded-full bg-ink px-7 py-5 text-bone transition-colors duration-300 hover:bg-accent"
      >
        <span className="label">
          {selected ? `Add to bag — ${selected}` : "Add to bag"}
        </span>
        <span className="label text-bone/60 transition-colors duration-300 group-hover:text-bone">
          Coming soon
        </span>
      </button>
    </div>
  );
}
