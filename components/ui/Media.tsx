"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A fill image that fades in once loaded and degrades to an on-brand
 * placeholder if the remote source ever fails — so the layout never looks
 * broken regardless of network conditions.
 */
export default function Media({
  src,
  alt,
  sizes = "100vw",
  preload = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  /** Preload via <head> — reserve for the LCP / hero image. */
  preload?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-sand ${className}`}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand via-cream to-stone/40">
          <span className="label max-w-[70%] text-center text-ink-soft/70">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
