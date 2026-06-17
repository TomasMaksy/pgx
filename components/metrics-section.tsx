"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const METRICS = [
  {
    value: "−30%",
    label: "Fewer serious adverse drug reactions",
    source: "PREPARE study, The Lancet, 2023",
  },
  {
    value: "80%",
    label:
      "of people get the right drug and dose for their genetics — no trial and error",
    source: "Lifetime electronic health record analysis",
  },
  {
    value: "1 in 4",
    label: "primary-care prescriptions adjusted to the patient's genome",
    source: "Implementation data, primary care (Netherlands)",
  },
  {
    value: "−36%",
    label: "shorter hospital stays — fewer occupied beds, shorter queues",
    source: "PREPARE: average stay 2.4 → 1.5 days",
  },
  {
    value: "≈€2 500",
    label: "cost of one preventable drug-reaction hospitalisation (Lithuania)",
    source:
      "Estimate for Lithuania; EU average ~€5,500 (IATROSTAT-ECO, France, 2023)",
  },
  {
    value: "≈€5–10M / year",
    label: "potential saving for Lithuania's healthcare system",
    source: "Preliminary estimate; the exact figure to be set by the project",
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
      <p className="text-xs font-medium tracking-[0.25em] text-white/50 uppercase">
        Impact
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
        What this changes — in numbers.
      </h2>

      <div className="mt-10 md:mt-14">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="grid grid-cols-1 gap-3 border-t border-white/10 py-7 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10 md:py-9"
          >
            <div className="max-w-md">
              <p className="text-base leading-snug text-white/80 md:text-lg">
                {m.label}
              </p>
              <p className="mt-2 text-xs leading-snug text-white/35">
                {m.source}
              </p>
            </div>
            <RollingValue
              value={m.value}
              className={[
                "font-serif text-5xl leading-[1.05] font-light tracking-tight tabular-nums md:text-right md:text-6xl",
                "highlight" in m && m.highlight
                  ? "text-mint-lighter"
                  : "text-white",
              ].join(" ")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
