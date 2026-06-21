"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
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

type StatKey = "8.3%" | "80%" | "~47k";

type StatModal = {
  key: StatKey;
  figure: string;
  sourceIds: number[];
  title: string;
  summary: string;
  captionText: string;
  captionIds: number[];
};

const STATS: StatModal[] = [
  {
    key: "8.3%",
    figure: "8.3%",
    sourceIds: [1],
    title: "8.3% ADR-related admissions",
    summary: "Approximately 1 in 12 hospital admissions are related to adverse drug reactions.",
    captionText: "ADR-related admissions",
    captionIds: [1],
  },
  {
    key: "80%",
    figure: "80%",
    sourceIds: [2],
    title: "80% predictable or preventable",
    summary:
      "80% of medication-related admissions may be predictable or preventable.",
    captionText: "of medication-related admissions predictable or preventable",
    captionIds: [2],
  },
  {
    key: "~47k",
    figure: "~47k",
    sourceIds: [1, 3],
    title: "~46,700 ADR hospitalisations/year",
    summary:
      "560,362 annual Lithuanian hospital discharges × 8.33% (1 in 12) ≈ 46,700. Estimate calculated from published discharge volume and ADR-related admission prevalence.",
    captionText: "estimated hospitalisations/year in Lithuania",
    captionIds: [1, 3],
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

function Citation({ ids }: { ids: number[] }) {
  return (
    <span className="inline-flex whitespace-nowrap">
      {ids.map((id) => (
        <a
          key={id}
          href={CITATION_SOURCES[id].url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Source ${id}: ${CITATION_SOURCES[id].label}`}
          className="text-white/40 underline-offset-2 transition-colors hover:text-white hover:underline"
        >
          <sup className="ml-px text-[0.65em] leading-none font-normal">
            {id}
          </sup>
        </a>
      ))}
    </span>
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

export function ProblemSection() {
  const { t } = useI18n();
  const [openStat, setOpenStat] = useState<StatKey | null>(null);
  const activeStat = STATS.find((stat) => stat.key === openStat);

  return (
    <div className="w-full md:max-w-[50%]">
      <p className="section-eyebrow">
        {t("The problem")}
      </p>

      <h2 className="section-title section-title-lg max-w-none">
        <span className="text-gradient-headline text-7xl font-medium tracking-tighter">
          {t("1 in 12")}
        </span>{" "}
        <span className="mt-2 block text-2xl font-normal text-white/55 md:text-3xl">
          {t("hospital admissions are related to adverse drug reactions")}
        </span>
      </h2>

      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 md:gap-6">
        {STATS.map((stat) => (
          <div key={stat.figure}>
            <Tooltip
              content={<TooltipSourceCards ids={stat.sourceIds} />}
              containerClassName="block"
              className={TOOLTIP_CLASS}
              contentClassName="p-3 md:p-4"
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenStat(stat.key);
                }}
                className="text-gradient-headline w-fit cursor-pointer text-left text-4xl font-medium tracking-tighter transition-colors hover:opacity-80 md:text-5xl"
              >
                {stat.figure}
              </button>
            </Tooltip>
            <p className="mt-1 text-[11px] leading-snug text-white/45 md:text-xs">
              {t(stat.captionText)} <Citation ids={stat.captionIds} />
            </p>
          </div>
        ))}
      </div>

      <Dialog
        open={openStat !== null}
        onOpenChange={(open) => !open && setOpenStat(null)}
      >
        {activeStat && (
          <DialogContent className="gap-5 p-6 md:max-w-md md:gap-6 md:p-8">
            <DialogHeader className="gap-2">
              <DialogTitle className="text-2xl leading-tight font-medium tracking-tight md:text-3xl">
                {t(activeStat.title)}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs leading-snug md:text-sm">
                {t(activeStat.summary)}
              </DialogDescription>
            </DialogHeader>

            <div className="divide-border border-border divide-y border-t">
              {activeStat.sourceIds.map((id) => (
                <SourceReference key={id} source={CITATION_SOURCES[id]} />
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
