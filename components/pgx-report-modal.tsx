"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Info, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type PgxReportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GENOTYPE_ROWS = [
  {
    gene: "CYP2D6",
    diplotype: "*4 / *4",
    activity: "0",
    phenotype: "Poor metabolizer",
    variant: "danger" as const,
    highlight: true,
  },
  {
    gene: "CYP2C19",
    diplotype: "*1 / *2",
    activity: "1.0",
    phenotype: "Intermediate",
    variant: "warning" as const,
  },
  {
    gene: "CYP2C9",
    diplotype: "*1 / *1",
    activity: "2.0",
    phenotype: "Normal",
    variant: "success" as const,
  },
  {
    gene: "CYP3A5",
    diplotype: "*3 / *3",
    activity: "—",
    phenotype: "Non-expresser",
    variant: "success" as const,
  },
] as const;

const PHENOTYPE_STYLES = {
  danger: "bg-red-50 text-red-700",
  warning: "bg-amber-50 text-amber-700",
  success: "bg-emerald-50 text-emerald-700",
} as const;

const BORDER_STYLES = {
  danger: "border-l-red-500",
  warning: "border-l-amber-500",
  success: "border-l-emerald-500",
} as const;

const ACCENT_STYLES = {
  danger: "text-red-700",
  warning: "text-amber-700",
  success: "text-emerald-700",
} as const;

function PhenotypeBadge({
  label,
  variant,
}: {
  label: string;
  variant: keyof typeof PHENOTYPE_STYLES;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-md px-2 py-0.5 text-[11px] font-medium",
        PHENOTYPE_STYLES[variant],
      )}
    >
      {label}
    </span>
  );
}

function DrugCard({
  name,
  gene,
  source,
  children,
  variant,
}: {
  name: string;
  gene: string;
  source: string;
  children: ReactNode;
  variant: keyof typeof BORDER_STYLES;
}) {
  return (
    <div
      className={cn(
        "mb-2.5 rounded-r-md border border-neutral-200 border-l-[3px] bg-neutral-50/60 px-4 py-3.5 last:mb-0",
        BORDER_STYLES[variant],
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-neutral-900">
          {name}{" "}
          <span className="text-xs font-normal text-neutral-500">({gene})</span>
        </p>
        <span className="shrink-0 text-[11px] text-neutral-400">{source}</span>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">
        {children}
      </p>
    </div>
  );
}

export function PgxReportModal({ open, onOpenChange }: PgxReportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex max-h-[min(720px,92vh)] w-full max-w-[600px] flex-col gap-0 overflow-hidden border-neutral-200 bg-white p-0 text-neutral-900 ring-neutral-200 sm:max-w-[600px]"
      >
        <DialogTitle className="sr-only">
          Pharmacogenomic profile — nebivolol CYP2D6 poor metabolizer
          demonstration report
        </DialogTitle>
        <DialogDescription className="sr-only">
          A demonstration pharmacogenomic report for V. Pavardenis highlighting
          nebivolol as the primary drug for a CYP2D6 poor metabolizer.
        </DialogDescription>

        <div className="flex items-center gap-3 border-b border-neutral-200 px-6 py-5 pr-14 md:gap-3.5 md:px-7 md:pr-16">
          <Image
            src="/logo_icon.webp"
            alt="GenoLink"
            width={36}
            height={36}
            className="size-9 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <p className="text-[17px] font-medium text-neutral-900">
              Pharmacogenomic profile
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Drug-gene interaction report · CPIC / FDA-guided
            </p>
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-5 md:px-7 md:pb-6">
          <div className="mb-5 flex items-start gap-2.5 rounded-md border border-mint-dark/20 bg-mint/10 p-3.5">
            <Info
              className="text-mint-dark mt-0.5 size-4 shrink-0"
              strokeWidth={2}
              aria-hidden
            />
            <p className="text-xs leading-relaxed text-neutral-600">
              Demonstration only. Synthetic data — not for diagnostic or
              prescribing use.
            </p>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
            {[
              { label: "Patient", value: "V. Pavardenis · 41 y" },
              { label: "Indication", value: "Secondary HTN (I15)" },
              { label: "Sample", value: "Buccal swab" },
              { label: "Method", value: "Targeted NGS + CNV" },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="text-neutral-400">{label}</span>
                <br />
                <span className="text-neutral-800">{value}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 mb-2.5 text-[13px] font-medium text-neutral-900">
            Genotype results
          </p>
          <div className="overflow-x-auto rounded-md border border-neutral-200">
            <table className="w-full table-fixed border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 text-left text-neutral-500">
                  <th className="w-[24%] px-3 py-2.5 font-normal">Gene</th>
                  <th className="w-[22%] px-3 py-2.5 font-normal">
                    Diplotype
                  </th>
                  <th className="w-[20%] px-3 py-2.5 font-normal">
                    Activity
                  </th>
                  <th className="w-[34%] px-3 py-2.5 font-normal">
                    Phenotype
                  </th>
                </tr>
              </thead>
              <tbody className="text-neutral-800">
                {GENOTYPE_ROWS.map((row) => (
                  <tr
                    key={row.gene}
                    className={cn(
                      "border-t border-neutral-200",
                      "highlight" in row && row.highlight && "bg-mint/8",
                    )}
                  >
                    <td className="px-3 py-3 font-mono">{row.gene}</td>
                    <td className="px-3 py-3 font-mono">{row.diplotype}</td>
                    <td className="px-3 py-3">{row.activity}</td>
                    <td className="px-3 py-3">
                      <PhenotypeBadge
                        label={row.phenotype}
                        variant={row.variant}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 mb-2.5 text-[13px] font-medium text-neutral-900">
            Drug recommendations
          </p>

          <div className="mb-3 rounded-lg border-2 border-mint-dark/30 bg-mint/5 p-5">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-mint-darker inline-flex items-center gap-1 rounded-md bg-mint/15 px-2.5 py-0.5 text-[11px] font-medium">
                <Target className="size-3" strokeWidth={2} aria-hidden />
                Primary finding · current therapy
              </span>
              <span className="text-[11px] text-neutral-400">
                FDA label · CPIC
              </span>
            </div>
            <p className="text-[15px] font-medium text-neutral-900">
              Nebivolol{" "}
              <span className="text-xs font-normal text-neutral-500">
                (CYP2D6 — poor metabolizer)
              </span>
            </p>

            <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-neutral-600">
              <li>
                <span className="font-medium text-neutral-800">
                  Exposure:
                </span>{" "}
                CYP2D6 poor metabolizer → ~10–15× higher steady-state levels,
                higher bioavailability, longer half-life.
              </li>
              <li>
                <span className="font-medium text-neutral-800">
                  Clinical effect:
                </span>{" "}
                Trials show similar blood-pressure response and safety vs.
                normal metabolizers.
              </li>
              <li>
                <span className="font-medium text-neutral-800">Label:</span> No
                mandatory dose adjustment required.
              </li>
            </ul>

            <div className="mt-4 rounded-md border border-mint-dark/25 bg-white px-4 py-3.5">
              <p className="text-[11px] font-semibold tracking-wide text-mint-darker uppercase">
                Clinical suggestion
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-neutral-700">
                Start at the lowest dose, titrate slowly to blood-pressure
                response, and monitor for bradycardia, hypotension, or fatigue.
                Review concurrent CYP2D6 inhibitors (e.g. paroxetine, fluoxetine,
                bupropion).
              </p>
            </div>
          </div>

          <DrugCard
            name="Codeine"
            gene="CYP2D6"
            source="CPIC level A · strong"
            variant="danger"
          >
            Poor analgesia due to minimal morphine conversion.{" "}
            <span className={ACCENT_STYLES.danger}>
              Avoid — use a non-codeine analgesic.
            </span>
          </DrugCard>

          <DrugCard
            name="Metoprolol"
            gene="CYP2D6"
            source="DPWG"
            variant="warning"
          >
            Raised plasma levels as an alternative β-blocker.{" "}
            <span className={ACCENT_STYLES.warning}>
              Use lowest effective dose; monitor heart rate.
            </span>
          </DrugCard>

          <DrugCard
            name="Clopidogrel"
            gene="CYP2C19"
            source="CPIC level A"
            variant="warning"
          >
            Reduced antiplatelet activation.{" "}
            <span className={ACCENT_STYLES.warning}>
              Prefer prasugrel or ticagrelor if an antiplatelet is needed.
            </span>
          </DrugCard>

          <DrugCard
            name="Warfarin"
            gene="CYP2C9"
            source="CPIC level A"
            variant="success"
          >
            No CYP2C9-driven change.{" "}
            <span className={ACCENT_STYLES.success}>
              Dose per standard algorithm (also consider VKORC1).
            </span>
          </DrugCard>

          <div className="mt-5 flex flex-wrap gap-3.5 text-[11px] text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-red-500" aria-hidden />
              Avoid / major change
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-amber-500" aria-hidden />
              Adjust / monitor
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-emerald-500" aria-hidden />
              Standard dosing
            </span>
          </div>

          <p className="mt-5 border-t border-neutral-200 pt-4 text-[11px] leading-relaxed text-neutral-400">
            Reflects tested variants only. Interpretation evolves with
            guidelines; drug interactions can alter phenotype. Not a substitute
            for clinical judgment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
