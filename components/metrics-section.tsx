"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip-card";
import {
  CITATION_SOURCES,
  type CitationSource,
} from "@/lib/citation-sources";
import { useI18n } from "@/lib/i18n";

const TOOLTIP_CLASS =
  "rounded-xl border-white/10 bg-neutral-900/95 shadow-lg shadow-black/50 ring-white/10 backdrop-blur-md";

type MetricKey =
  | "adr-reduction"
  | "actionable-variants"
  | "pgx-relevant-prescriptions"
  | "hospital-stays"
  | "adr-cost"
  | "annual-savings";

const METRICS: {
  key: MetricKey;
  value: string;
  label: string;
  source: string;
  sourceIds: number[];
  title: string;
  summary: string;
  highlight?: boolean;
}[] = [
  {
    key: "adr-reduction",
    value: "−30%",
    label: "30% fewer serious adverse drug reactions",
    source: "PREPARE trial — The Lancet, 2023",
    sourceIds: [4],
    title: "30% fewer clinically relevant adverse drug reactions",
    summary:
      "The PREPARE trial — a 12-gene panel implementation study across seven European countries (n=6,944) — showed genotype-guided prescribing reduced clinically relevant ADRs by 30% (OR 0.70).",
  },
  {
    key: "actionable-variants",
    value: "95%",
    label: "95% of people carry a PGx variant that can inform prescribing",
    source: "Swiss hospital cohort study",
    sourceIds: [5],
    title: "Nearly everyone carries an actionable PGx variant",
    summary:
      "A Swiss hospital-based cohort of 1,533 patients found 97.3% carried at least one clinically actionable pharmacogenetic variant relevant to prescribing.",
  },
  {
    key: "pgx-relevant-prescriptions",
    value: "1 in 4",
    label: "1 in 4 primary-care prescriptions are PGx-relevant",
    source: "Dutch primary-care implementation data",
    sourceIds: [6],
    title: "1 in 4 prescriptions carry an actionable gene-drug interaction",
    summary:
      "In a nationwide analysis of 3.6M Dutch first prescriptions, 23.6% involved an actionable gene-drug interaction — approximately 1 in 4.",
  },
  {
    key: "hospital-stays",
    value: "−36%",
    label: "36% shorter hospital stays when prescribing is PGx-guided",
    source: "PREPARE: 2.4 → 1.5 days average stay",
    sourceIds: [7],
    title: "36% shorter hospitalisations",
    summary:
      "In the U-PGx PREPARE cost-utility analysis, mean hospitalisation duration fell from 2.37 days in the control group to 1.51 days in the PGx-guided group — a 36% reduction.",
  },
  {
    key: "adr-cost",
    value: "≈€2 500",
    label: "≈€2,500 per preventable ADR-related hospitalisation",
    source: "Lithuanian estimate; EU average ~€5,500 (IATROSTAT-ECO, 2023)",
    sourceIds: [8],
    title: "ADR hospitalisations are expensive",
    summary:
      "The IATROSTAT-ECO study estimated each adverse-drug-reaction-related hospital admission in France costs ≈€5,974. The Lithuanian estimate of ≈€2,500 is a local adjustment of this EU benchmark.",
  },
  {
    key: "annual-savings",
    value: "≈€5–10M",
    label: "€5–10M estimated annual savings for Lithuania's healthcare system",
    source: "Modeled from PREPARE outcomes and local ADR incidence",
    sourceIds: [4],
    title: "€5–10M estimated annual savings",
    summary:
      "Estimated annual savings for Lithuania's healthcare system, modeled from PREPARE trial outcomes and local adverse drug reaction incidence data.",
    highlight: true,
  },
];

function TooltipSourceCard({ source }: { source: CitationSource }) {
  const { t } = useI18n();
  return (
    <div className="flex max-w-[16rem] flex-col gap-1.5">
      <p className="text-[10px] font-medium tracking-[0.18em] text-white/40 uppercase">
        {t("Source")} {source.id} · {source.label}
      </p>
      <p className="text-sm leading-snug font-medium text-white/80">
        {source.title}
      </p>
      <p className="text-xs leading-relaxed text-white/60">{source.detail}</p>
    </div>
  );
}

function TooltipSourceCards({ ids }: { ids: number[] }) {
  return (
    <div className="flex flex-col gap-4">
      {ids.map((id, index) => (
        <div key={id}>
          {index > 0 && <div className="mb-4 border-t border-white/10" />}
          <TooltipSourceCard source={CITATION_SOURCES[id]} />
        </div>
      ))}
    </div>
  );
}

function SourceReference({ source }: { source: CitationSource }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group hover:text-foreground flex items-start justify-between gap-3 py-2.5 transition-colors"
    >
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs">{source.label}</p>
        <p className="text-foreground mt-0.5 text-sm leading-snug">
          {source.title}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs">{source.fact}</p>
      </div>
      <ExternalLink className="text-muted-foreground group-hover:text-foreground mt-0.5 size-3.5 shrink-0 transition-colors" />
    </a>
  );
}

type ValueSegment =
  | { type: "text"; value: string }
  | { type: "number"; target: number };

function parseValueSegments(value: string): ValueSegment[] {
  const segments: ValueSegment[] = [];
  const regex = /(\d[\d\s]*\d|\d)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(value)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        value: value.slice(lastIndex, match.index),
      });
    }

    const raw = match[0];
    segments.push({
      type: "number",
      target: parseInt(raw.replace(/\s/g, ""), 10),
    });
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < value.length) {
    segments.push({ type: "text", value: value.slice(lastIndex) });
  }

  return segments;
}

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
  const segments = parseValueSegments(value);
  const hasNumbers = segments.some((segment) => segment.type === "number");
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progress =
    reduce && inView && hasNumbers ? 1 : animatedProgress;

  useEffect(() => {
    if (!hasNumbers || !inView || reduce) return;
    let raf = 0;
    let start: number | undefined;
    const dur = 1300;
    const tick = (t: number) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / dur);
      setAnimatedProgress(1 - Math.pow(1 - p, 4));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, hasNumbers]);

  if (!hasNumbers) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {segments.map((segment, index) =>
        segment.type === "text" ? (
          <span key={index}>{segment.value}</span>
        ) : (
          <span key={index}>
            {Math.round(segment.target * progress).toLocaleString("en-US")}
          </span>
        ),
      )}
    </span>
  );
}

export function MetricsSection() {
  const { t } = useI18n();
  const [openMetric, setOpenMetric] = useState<MetricKey | null>(null);
  const activeMetric = METRICS.find((metric) => metric.key === openMetric);

  return (
    <div className="w-full">
      <p className="section-eyebrow">{t("Impact")}</p>
      <h2 className="section-title max-w-3xl">
        {t("The measurable impact of genetics-aware prescribing.")}
      </h2>

      <div className="mt-8 md:mt-10">
        {METRICS.map((metric) => (
          <Tooltip
            key={metric.key}
            content={<TooltipSourceCards ids={metric.sourceIds} />}
            containerClassName="block"
            className={TOOLTIP_CLASS}
            contentClassName="p-3 md:p-4"
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setOpenMetric(metric.key);
              }}
              className="grid w-full cursor-pointer grid-cols-1 gap-2 border-t border-white/10 py-5 text-left transition-colors hover:bg-white/2 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-8 md:py-6"
            >
              <RollingValue
                value={metric.value}
                aria-hidden
                className={[
                  "order-1 font-sans text-4xl leading-[1.05] font-light tracking-tight tabular-nums md:order-2 md:text-right md:text-5xl lg:text-6xl",
                  metric.highlight ? "text-gradient-mint" : "text-white/85",
                ].join(" ")}
              />
              <div className="order-2 max-w-xl md:order-1">
                <p className="text-lg leading-snug font-medium tracking-tight text-white/85 md:text-xl">
                  {t(metric.label)}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-white/40 md:text-sm">
                  {metric.source}
                </p>
              </div>
            </button>
          </Tooltip>
        ))}
      </div>

      <Dialog
        open={openMetric !== null}
        onOpenChange={(open) => !open && setOpenMetric(null)}
      >
        {activeMetric && (
          <DialogContent className="gap-5 p-6 md:max-w-md md:gap-6 md:p-8">
            <DialogHeader className="gap-2">
              <DialogTitle className="text-2xl leading-tight font-medium tracking-tight md:text-3xl">
                {t(activeMetric.title)}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs leading-snug md:text-sm">
                {t(activeMetric.summary)}
              </DialogDescription>
            </DialogHeader>

            <div className="divide-border border-border divide-y border-t">
              {activeMetric.sourceIds.map((id) => (
                <SourceReference key={id} source={CITATION_SOURCES[id]} />
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
