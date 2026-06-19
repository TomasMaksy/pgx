"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const METRICS = [
  {
    value: "−30%",
    label: "30% fewer serious adverse drug reactions",
    source: "PREPARE trial — The Lancet, 2023",
  },
  {
    value: "95%",
    label:
      "95% of people carry a PGx variant that can inform prescribing",
    source: "Swiss hospital cohort study",
  },
  {
    value: "1 in 4",
    label: "1 in 4 primary-care prescriptions are PGx-relevant",
    source: "Dutch primary-care implementation data",
  },
  {
    value: "−36%",
    label: "36% shorter hospital stays when prescribing is PGx-guided",
    source: "PREPARE: 2.4 → 1.5 days average stay",
  },
  {
    value: "≈€2 500",
    label: "≈€2,500 per preventable ADR-related hospitalisation",
    source:
      "Lithuanian estimate; EU average ~€5,500 (IATROSTAT-ECO, 2023)",
  },
  {
    value: "≈€5–10M",
    label:
      "€5–10M estimated annual savings for Lithuania's healthcare system",
    source: "Modeled from PREPARE outcomes and local ADR incidence",
    highlight: true,
  },
] as const;

// Число «прокручивается» от 0 до значения, когда строка попадает в зону видимости.
function RollingValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const m = value.match(/^([^\d]*)(\d[\d\s]*\d|\d)(.*)$/);
  const hasMatch = !!m;
  const target = m ? parseInt(m[2].replace(/\s/g, ""), 10) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!hasMatch || !inView) return;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    let start: number | undefined;
    const dur = 1300;
    const tick = (t: number) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduce, hasMatch]);

  if (!m) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {m[1]}
      {n.toLocaleString("en-US")}
      {m[3]}
    </span>
  );
}

export function MetricsSection() {
  return (
    <div className="w-full">
      <p className="section-eyebrow">
        Impact
      </p>
      <h2 className="section-title max-w-3xl">
        The measurable impact of genetics-aware prescribing.
      </h2>

      <div className="mt-8 md:mt-10">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="grid grid-cols-1 gap-2 border-t border-white/10 py-5 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-8 md:py-6"
          >
            <RollingValue
              value={m.value}
              aria-hidden
              className={[
                "order-1 font-sans text-4xl leading-[1.05] font-light tracking-tight tabular-nums md:order-2 md:text-right md:text-5xl lg:text-6xl",
                "highlight" in m && m.highlight
                  ? "text-gradient-mint"
                  : "text-white/85",
              ].join(" ")}
            />
            <div className="order-2 max-w-xl md:order-1">
              <p className="text-lg leading-snug font-medium tracking-tight text-white/85 md:text-xl">
                {m.label}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-white/40 md:text-sm">
                {m.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
