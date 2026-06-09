"use client";

import { Tooltip } from "@/components/ui/tooltip-card";

type Source = {
  id: number;
  label: string;
  title: string;
  detail: string;
  url: string;
};

const SOURCES: Record<number, Source> = {
  1: {
    id: 1,
    label: "Pirmohamed et al., BMJ 2004",
    title: "Adverse drug reactions as cause of admission to hospital",
    detail:
      "Prospective analysis of 18,820 patients: 6.5% of admissions were ADR-related, most were avoidable, and ~80% directly caused the admission.",
    url: "https://www.bmj.com/content/329/7456/15",
  },
  2: {
    id: 2,
    label: "Oscanoa et al., Eur J Clin Pharmacol 2017",
    title: "ADR-related hospital admissions in older adults",
    detail:
      "Meta-analysis of patients aged 65+: roughly 1 in 10 hospital admissions in the elderly is caused by an adverse drug reaction.",
    url: "https://pubmed.ncbi.nlm.nih.gov/28251277/",
  },
  3: {
    id: 3,
    label: "Higienos institutas",
    title: "Lithuanian hospital discharge statistics",
    detail:
      "National data from the Institute of Hygiene on annual hospitalisations in Lithuania.",
    url: "https://sveikstat.hi.lt/chart-summary-ctry.aspx?lang=eng&sel_rep_panel=8&top_loc=ctry&top_uid=110",
  },
  4: {
    id: 4,
    label: "Internal estimate",
    title: "Applying international ADR rates to Lithuania",
    detail:
      "Estimate derived by applying the 6.5% ADR-related admission rate to Lithuania's annual hospitalisation volume.",
    url: "https://www.bmj.com/content/329/7456/15",
  },
};

const SUPERSCRIPTS = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];

const TOOLTIP_CLASS =
  "rounded-xl border-white/10 bg-neutral-900/95 shadow-lg shadow-black/50 ring-white/10 backdrop-blur-md";

function SourceCard({ source }: { source: Source }) {
  return (
    <div className="flex max-w-[16rem] flex-col gap-1.5">
      <p className="text-[10px] font-medium tracking-[0.18em] text-white/40 uppercase">
        Source {source.id} · {source.label}
      </p>
      <p className="text-sm leading-snug font-semibold text-white">
        {source.title}
      </p>
      <p className="text-xs leading-relaxed text-white/60">{source.detail}</p>
    </div>
  );
}

function Citation({ ids }: { ids: number[] }) {
  return (
    <span className="inline-flex gap-0.5 whitespace-nowrap">
      {ids.map((id) => (
        <a
          key={id}
          href={SOURCES[id].url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Source ${id}: ${SOURCES[id].label}`}
          className="text-white/40 underline-offset-2 transition-colors hover:text-white hover:underline"
        >
          {SUPERSCRIPTS[id]}
        </a>
      ))}
    </span>
  );
}

function SourceCards({ ids }: { ids: number[] }) {
  return (
    <div className="flex flex-col gap-4">
      {ids.map((id, index) => (
        <div key={id}>
          {index > 0 && <div className="mb-4 border-t border-white/10" />}
          <SourceCard source={SOURCES[id]} />
        </div>
      ))}
    </div>
  );
}

const STATS = [
  {
    figure: "6.5%",
    sourceIds: [1, 2],
    caption: (
      <>
        ADR-related admissions; ~10% in patients 65+ <Citation ids={[1, 2]} />
      </>
    ),
  },
  {
    figure: "80%",
    sourceIds: [1],
    caption: (
      <>
        directly cause admission — most avoidable <Citation ids={[1]} />
      </>
    ),
  },
  {
    figure: "~28k",
    sourceIds: [3, 4],
    caption: (
      <>
        hospitalisations/year in Lithuania <Citation ids={[3, 4]} />
      </>
    ),
  },
];

export function ProblemSection() {
  return (
    <div className="w-full md:max-w-[50%]">
      <p className="text-xs font-medium tracking-[0.25em] text-white/50 uppercase">
        The problem
      </p>

      <h2 className="mt-4 text-4xl leading-[0.95] font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
        <span className="text-7xl font-semibold tracking-tighter">1 in 15</span>{" "}
        <span className="mt-2 block text-2xl font-normal text-white/60 md:text-3xl">
          of all hospital admissions are caused by an adverse drug reaction
        </span>
      </h2>

      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 md:gap-6">
        {STATS.map((stat) => (
          <div key={stat.figure}>
            <Tooltip
              content={<SourceCards ids={stat.sourceIds} />}
              containerClassName="block"
              className={TOOLTIP_CLASS}
              contentClassName="p-3 md:p-4"
            >
              <p className="w-fit cursor-pointer font-serif text-4xl font-semibold tracking-tighter text-white italic transition-colors hover:text-white/80 md:text-5xl lg:text-6xl">
                {stat.figure}
              </p>
            </Tooltip>
            <p className="mt-1 text-[11px] leading-snug text-white/45 md:text-xs">
              {stat.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
