"use client";

import { useState } from "react";
import { Check, ExternalLink, X } from "lucide-react";
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

const TOOLTIP_CLASS =
  "rounded-xl border-white/10 bg-neutral-900/95 shadow-lg shadow-black/50 ring-white/10 backdrop-blur-md";

type Cite = {
  key: string;
  sourceIds: number[];
  title: string;
  summary: string;
};

type Side = {
  text: string;
  cite?: Cite;
};

const COMPARISONS: { traditional: Side; precision: Side }[] = [
  {
    traditional: {
      text: "23.6% actionable gene–drug interactions go unidentified",
      cite: {
        key: "unidentified-gdi",
        sourceIds: [6],
        title: "23.6% of prescriptions carry an actionable gene-drug interaction",
        summary:
          "In a nationwide analysis of 3.6M Dutch first prescriptions, 23.6% involved an actionable gene-drug interaction — interactions that go unidentified without pharmacogenomic testing.",
      },
    },
    precision: {
      text: "95% have actionable genetic insights",
      cite: {
        key: "actionable-insights",
        sourceIds: [5],
        title: "Nearly everyone carries an actionable PGx variant",
        summary:
          "A Swiss hospital-based cohort of 1,533 patients found 97.3% carried at least one clinically actionable pharmacogenetic variant relevant to prescribing.",
      },
    },
  },
  {
    traditional: { text: "Medication risks discovered after treatment begins" },
    precision: { text: "Risks identified before the first dose" },
  },
  {
    traditional: { text: "Higher rates of adverse drug reactions" },
    precision: {
      text: "↓30% clinically relevant ADRs",
      cite: {
        key: "adr-reduction",
        sourceIds: [4],
        title: "30% fewer clinically relevant adverse drug reactions",
        summary:
          "The PREPARE trial — a 12-gene panel implementation study across seven European countries (n=6,944) — showed genotype-guided prescribing reduced clinically relevant ADRs by 30% (OR 0.70).",
      },
    },
  },
  {
    traditional: { text: "Longer hospital stays" },
    precision: {
      text: "↓36% hospitalization duration",
      cite: {
        key: "hospitalization-duration",
        sourceIds: [7],
        title: "36% shorter hospitalisations",
        summary:
          "In the U-PGx PREPARE cost-utility analysis, mean hospitalisation duration fell from 2.37 days in the control group to 1.51 days in the PGx-guided group — a 36% reduction.",
      },
    },
  },
  {
    traditional: {
      text: "Higher downstream healthcare costs",
      cite: {
        key: "downstream-costs",
        sourceIds: [8],
        title: "ADR hospitalisations are expensive",
        summary:
          "The IATROSTAT-ECO study estimated each adverse-drug-reaction-related hospital admission in France costs ≈€5,974, driving substantial avoidable downstream healthcare spending.",
      },
    },
    precision: {
      text: "€276 lower costs per actionable patient",
      cite: {
        key: "lower-costs",
        sourceIds: [7],
        title: "€276 lower cost per actionable patient",
        summary:
          "In the U-PGx PREPARE cost-utility analysis, actionable PGx-guided patients cost €491 versus €767 for control patients — an incremental difference of €276 favouring PGx-guided care.",
      },
    },
  },
  {
    traditional: { text: "One prescription at a time" },
    precision: { text: "One profile, lifelong guidance" },
  },
];

function TooltipSourceCard({ source }: { source: CitationSource }) {
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

function CitedText({
  side,
  tone,
  onOpen,
}: {
  side: Side;
  tone: "traditional" | "precision";
  onOpen: (cite: Cite) => void;
}) {
  if (!side.cite) {
    return <>{side.text}</>;
  }

  return (
    <Tooltip
      content={<TooltipSourceCards ids={side.cite.sourceIds} />}
      containerClassName="block"
      className={TOOLTIP_CLASS}
      contentClassName="p-3 md:p-4"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onOpen(side.cite!);
        }}
        aria-label={`View sources: ${side.cite.title}`}
        className={
          tone === "precision"
            ? "cursor-pointer text-left transition-colors hover:text-white"
            : "cursor-pointer text-left transition-colors hover:text-white/60"
        }
      >
        {side.text}
        <sup className="ml-0.5 text-[0.65em] leading-none font-medium text-white/35">
          {side.cite.sourceIds.join(",")}
        </sup>
      </button>
    </Tooltip>
  );
}

export function ImpactSection() {
  const [activeCite, setActiveCite] = useState<Cite | null>(null);

  return (
    <div className="w-full">
      <p className="section-eyebrow mx-auto w-fit">The impact</p>

      <h2 className="section-title mx-auto max-w-4xl text-center">
        What Happens When Prescribing Becomes Genetics-Aware?
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-white/55 md:text-lg">
        When medication decisions are informed by pharmacogenomics, clinicians
        can identify inherited medication risks before treatment begins—reducing
        avoidable adverse drug reactions, improving treatment effectiveness, and
        lowering healthcare utilization.
      </p>

      <div className="glass-inset mt-12 rounded-2xl border border-white/10 bg-white/4 backdrop-blur-md md:mt-16">
        <div className="grid grid-cols-1 border-b border-white/10 md:grid-cols-2">
          <div className="border-b border-white/10 px-6 py-5 text-center md:border-r md:border-b-0 md:px-8 md:py-6">
            <h3 className="section-heading text-lg text-white/50 md:text-xl">
              Traditional Care
            </h3>
          </div>
          <div className="border-mint/20 bg-linear-to-b from-mint/10 to-transparent px-6 py-5 text-center md:px-8 md:py-6">
            <h3 className="section-heading text-lg md:text-xl">
              Precision Prescribing
            </h3>
          </div>
        </div>

        <ul className="divide-y divide-white/10">
          {COMPARISONS.map((row) => (
            <li key={row.traditional.text} className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex items-start gap-3 border-b border-white/8 px-6 py-4 md:gap-4 md:border-r md:border-b-0 md:px-8 md:py-5">
                <X
                  className="mt-0.5 size-4 shrink-0 text-white/25"
                  strokeWidth={2}
                />
                <p className="text-sm leading-relaxed text-white/40 md:text-base">
                  <CitedText
                    side={row.traditional}
                    tone="traditional"
                    onOpen={setActiveCite}
                  />
                </p>
              </div>
              <div className="flex items-start gap-3 bg-mint/5 px-6 py-4 md:gap-4 md:px-8 md:py-5">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mint"
                  strokeWidth={2}
                />
                <p className="text-sm leading-relaxed text-white/75 md:text-base">
                  <CitedText
                    side={row.precision}
                    tone="precision"
                    onOpen={setActiveCite}
                  />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        open={activeCite !== null}
        onOpenChange={(open) => !open && setActiveCite(null)}
      >
        {activeCite && (
          <DialogContent className="gap-5 p-6 md:max-w-md md:gap-6 md:p-8">
            <DialogHeader className="gap-2">
              <DialogTitle className="text-2xl leading-tight font-medium tracking-tight md:text-3xl">
                {activeCite.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs leading-snug md:text-sm">
                {activeCite.summary}
              </DialogDescription>
            </DialogHeader>

            <div className="divide-border border-border divide-y border-t">
              {activeCite.sourceIds.map((id) => (
                <SourceReference key={id} source={CITATION_SOURCES[id]} />
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
