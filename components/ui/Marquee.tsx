import { Fragment } from "react";

/**
 * Infinite horizontal ticker. Two identical halves slide left in a seamless
 * loop (the keyframe shifts by -50%). Pauses on hover.
 */
export default function Marquee({
  items,
  duration = 28,
  className = "",
  separator = "✳",
}: {
  items: string[];
  duration?: number;
  className?: string;
  separator?: string;
}) {
  const half = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="font-display whitespace-nowrap px-6 text-[clamp(1.6rem,4vw,3.4rem)]">
            {item}
          </span>
          <span className="px-2 text-[clamp(0.9rem,1.6vw,1.4rem)] opacity-60">
            {separator}
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`group/marquee overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {half}
        {half}
      </div>
    </div>
  );
}
