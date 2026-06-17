"use client";

import { useEffect, useRef, useState } from "react";
import { MatterButton } from "@/components/ui/matter-button";

const FEATURES = [
  "Precision Prescribing",
  "Medication Safety",
  "Pharmacogenomics",
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
// three copies for a seamless infinite loop
const LIST = [...FEATURES, ...FEATURES, ...FEATURES];
const ITEM = 64; // px, must match h-16

export function MoreFeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [center, setCenter] = useState<number>(N); // absolute centered row index

  // start in the middle copy
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = N * ITEM;
    setCenter(N);
  }, []);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const block = N * ITEM;
    // wrap invisibly to keep within the middle copy
    if (el.scrollTop < block * 0.5) el.scrollTop += block;
    else if (el.scrollTop > block * 2.5) el.scrollTop -= block;
    setCenter(Math.round(el.scrollTop / ITEM));
  };

  const pauseFor = (ms = 2800) => {
    pausedRef.current = true;
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, ms);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      const el = ref.current;
      if (!el || pausedRef.current) return;
      const cur = Math.round(el.scrollTop / ITEM);
      el.scrollTo({ top: (cur + 1) * ITEM, behavior: "smooth" });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      <p className="mb-10 text-center text-xs font-medium tracking-[0.25em] text-white/40 uppercase md:hidden">
        More features
      </p>

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[14ch_1fr_auto] md:gap-12">
        <p className="text-center text-sm leading-snug font-medium text-white/70 md:text-left">
          GenoLink powers
        </p>

        <div
          ref={ref}
          onScroll={onScroll}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onWheel={() => pauseFor()}
          onTouchStart={() => pauseFor()}
          className="relative h-[28rem] snap-y snap-mandatory overflow-y-auto [-ms-overflow-style:none] [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_76%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="h-48 shrink-0" aria-hidden />
          {LIST.map((f, idx) => {
            const d = Math.abs(idx - center);
            const color =
              d === 0
                ? "text-white"
                : d === 1
                  ? "text-white/35"
                  : d === 2
                    ? "text-white/15"
                    : "text-white/[0.06]";
            return (
              <div
                key={`${f}-${idx}`}
                className="flex h-16 snap-center items-center justify-center text-center"
              >
                <span
                  className={[
                    "text-2xl font-semibold tracking-tight transition-colors duration-300 md:text-4xl",
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

        <MatterButton
          type="button"
          wrapperClassName="justify-self-center md:justify-self-end"
          className="h-11 px-6 text-sm"
          onClick={() =>
            document
              .getElementById("platform")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore platform
        </MatterButton>
      </div>
    </div>
  );
}
