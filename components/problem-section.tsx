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

type Source = {
  id: number;
  label: string;
  title: string;
  detail: string;
  url: string;
  fact: string;
};

const SOURCES: Record<number, Source> = {
  1: {
    id: 1,
    label: "Pirmohamed et al., BMJ 2004",
    title: "Adverse drug reactions as cause of admission to hospital",
    detail:
      "Prospective analysis of 18,820 admissions across two UK hospitals over six months.",
    url: "https://www.bmj.com/content/329/7456/15",
    fact: "6.5% ADR-related admissions · >70% avoidable",
  },
  2: {
    id: 2,
    label: "Oscanoa et al., Eur J Clin Pharmacol 2017",
    title: "Hospital admissions due to adverse drug reactions in the elderly",
    detail: "Meta-analysis of 42 studies in patients over 60.",
    url: "https://pubmed.ncbi.nlm.nih.gov/28251277/",
    fact: "8.7% pooled in patients 60+ (~1 in 10)",
  },
  3: {
    id: 3,
    label: "Institute of Hygiene Lithuania",
    title: "Health Statistics of Lithuania 2023",
    detail:
      "Official national inpatient episode volume from the Institute of Hygiene.",
    url: "https://sveikstat.hi.lt/chart-summary-ctry.aspx?lang=eng&sel_rep_panel=8&top_loc=ctry&top_uid=110",
    fact: "560,362 annual hospital discharges",
  },
  4: {
    id: 4,
    label: "Haerdtlein et al., J Clin Med 2023",
    title:
      "Which Adverse Events and Which Drugs Are Implicated in Drug-Related Hospital Admissions?",
    detail:
      "Systematic review and meta-analysis of 12 studies on ADR-related admissions.",
    url: "https://www.mdpi.com/2077-0383/12/4/1320",
    fact: "8.3% prevalence — ≈1 in 12 admissions ADR-related",
  },
  5: {
    id: 5,
    label: "Williams et al., Age Ageing 2025",
    title:
      "Hospital admissions due to adverse drug reactions and adverse drug events in older adults: a systematic review",
    detail:
      "Systematic review of ADR- and ADE-related hospital admissions in older adults.",
    url: "https://doi.org/10.1093/ageing/afaf231",
    fact: "80% of medication-related admissions predictable or preventable",
  },
};

const TOOLTIP_CLASS =
  "rounded-xl border-white/10 bg-neutral-900/95 shadow-lg shadow-black/50 ring-white/10 backdrop-blur-md";

type StatKey = "8.3%" | "80%" | "~47k";

type StatModal = {
  key: StatKey;
  figure: string;
  sourceIds: number[];
  title: string;
  summary: string;
  caption: React.ReactNode;
};

const STATS: StatModal[] = [
  {
    key: "8.3%",
    figure: "8.3%",
    sourceIds: [4],
    title: "8.3% ADR-related admissions",
    summary: "Approximately 1 in 12 hospital admissions are related to adverse drug reactions.",
    caption: (
      <>
        ADR-related admissions <Citation ids={[4]} />
      </>
    ),
  },
  {
    key: "80%",
    figure: "80%",
    sourceIds: [5],
    title: "80% predictable or preventable",
    summary:
      "80% of medication-related admissions may be predictable or preventable.",
    caption: (
      <>
        of medication-related admissions predictable or preventable{" "}
        <Citation ids={[5]} />
      </>
    ),
  },
  {
    key: "~47k",
    figure: "~47k",
    sourceIds: [3, 4],
    title: "~46,700 ADR hospitalisations/year",
    summary:
      "560,362 annual Lithuanian hospital discharges × 8.33% (1 in 12) ≈ 46,700. Estimate calculated from published discharge volume and ADR-related admission prevalence.",
    caption: (
      <>
        estimated hospitalisations/year in Lithuania <Citation ids={[3, 4]} />
      </>
    ),
  },
];

function TooltipSourceCard({ source }: { source: Source }) {
  return (
    <div className="flex max-w-[16rem] flex-col gap-1.5">
      <p className="text-[10px] font-medium tracking-[0.18em] text-white/40 uppercase">
        Source {source.id} · {source.label}
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
          <TooltipSourceCard source={SOURCES[id]} />
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
          href={SOURCES[id].url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Source ${id}: ${SOURCES[id].label}`}
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

function SourceReference({ source }: { source: Source }) {
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
  const [openStat, setOpenStat] = useState<StatKey | null>(null);
  const activeStat = STATS.find((stat) => stat.key === openStat);

  return (
    <div className="w-full md:max-w-[50%]">
      <p className="section-eyebrow">
        The problem
      </p>

      <h2 className="section-title section-title-lg max-w-none">
        <span className="text-gradient-headline text-7xl font-medium tracking-tighter">
          1 in 12
        </span>{" "}
        <span className="mt-2 block text-2xl font-normal text-white/55 md:text-3xl">
          hospital admissions are related to adverse drug reactions
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
              {stat.caption}
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
                {activeStat.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs leading-snug md:text-sm">
                {activeStat.summary}
              </DialogDescription>
            </DialogHeader>

            <div className="divide-border border-border divide-y border-t">
              {activeStat.sourceIds.map((id) => (
                <SourceReference key={id} source={SOURCES[id]} />
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
