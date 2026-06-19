"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  "Precision Prescribing",
  "Medication Safety",
  "Pharmacogenomics",
  "Personalised Medicine",
  "Polypharmacy Intelligence",
  "Clinical Decision Support",
  "Population Health Analytics",
  "Healthcare Efficiency",
  "Treatment Optimization",
  "Real-Time Alerts",
  "PGx Interpretation",
  "Outcome Analytics",
] as const;

const N = FEATURES.length;
const LIST = [...FEATURES, ...FEATURES, ...FEATURES];
const ITEM = 64;
const SCROLL_SPEED = 24;

export function MoreFeaturesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(N * ITEM);
  const [center, setCenter] = useState<number>(N);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    offsetRef.current = N * ITEM;
    track.style.transform = `translate3d(0, -${offsetRef.current}px, 0)`;
    setCenter(N);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf: number;
    let last = performance.now();
    let lastCenter: number = N;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;

      let pos = offsetRef.current + SCROLL_SPEED * dt;
      const block = N * ITEM;
      if (pos >= block * 2) pos -= block;
      if (pos < block * 0.5) pos += block;

      offsetRef.current = pos;
      track.style.transform = `translate3d(0, -${pos}px, 0)`;

      const nextCenter = Math.round(pos / ITEM);
      if (nextCenter !== lastCenter) {
        lastCenter = nextCenter;
        setCenter(nextCenter);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-xl">
        <div className="pointer-events-none relative h-[28rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_76%,transparent)]">
          <div
            ref={trackRef}
            className="will-change-transform"
          >
            <div className="h-48 shrink-0" aria-hidden />
            {LIST.map((f, idx) => {
              const d = Math.abs(idx - center);
              const color =
                d === 0
                  ? "text-white/90"
                  : d === 1
                    ? "text-white/35"
                    : d === 2
                      ? "text-white/15"
                      : "text-white/[0.06]";
              return (
                <div
                  key={`${f}-${idx}`}
                  className="flex h-16 items-center justify-center text-center"
                >
                  <span
                    className={[
                      "text-2xl font-medium tracking-tight transition-colors duration-500 md:text-4xl",
                      color,
                    ].join(" ")}
                  >
                    {f}
                  </span>
                </div>
              );
            })}
            <div className="h-48 shrink-0" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
