import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const CALL_URL =
  "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/HORIZON-HLTH-2027-01-CARE-02";

const PRIMARY_STAT = {
  amount: "€10M",
  label: "Horizon Europe — EU grant per project",
} as const;

export function EuGrantSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16 xl:gap-24">
        <div className="max-w-xl">
          <p className="section-eyebrow">Horizon Europe</p>
          <h2 className="section-title section-title-lg mt-4 max-w-md">
            EU funding matched to what we build
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/55 md:text-lg">
            A matched EU Research &amp; Innovation Action under Cluster 1
            Health. Direct contribution covering 100% of eligible costs — and
            the call scope reads almost line-for-line like the GenoLink
            platform.
          </p>
          <a
            href={CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-mint/40 bg-mint/10 text-mint-lighter hover:border-mint/60 hover:bg-mint/20 mt-8 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
          >
            Full call details on the EU portal
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>

        <div className="flex flex-col gap-12 md:gap-16 lg:pt-2">
          <div>
            <p
              className="text-[clamp(3.5rem,9vw,6.5rem)] leading-[1.05] font-light tracking-tight text-white/85 tabular-nums"
              aria-label={PRIMARY_STAT.label}
            >
              {PRIMARY_STAT.amount}
            </p>
            <p className="mt-3 max-w-md text-base leading-snug text-white/45 md:text-lg">
              {PRIMARY_STAT.label}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <div className="flex items-end gap-2">
                <div className="flex h-12 w-18 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2">
                  <Image
                    src="/IA-logo.webp"
                    alt="Inovacijų agentūra"
                    width={72}
                    height={48}
                    className="max-h-7 w-auto object-contain"
                  />
                </div>
                <p
                  className="flex h-12 items-end text-5xl leading-none font-light tracking-tight text-white/85 tabular-nums"
                  aria-label="Inovacijų agentūra — Lithuanian innovation funding"
                >
                  €100K
                </p>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-snug text-white/45 md:text-base">
                Inovacijų agentūra — Lithuanian innovation funding
              </p>
            </div>

            <div>
              <div className="flex items-end gap-2">
                <div className="flex h-12 w-18 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2">
                  <Image
                    src="/eureka-logo.png"
                    alt="Eurostars 3 / Eureka"
                    width={72}
                    height={48}
                    className="max-h-9 w-auto object-contain"
                  />
                </div>
                <p
                  className="flex h-12 items-end text-5xl leading-none font-light tracking-tight text-white/85 tabular-nums"
                  aria-label="Eurostars 3 / Eureka — cross-border R&D"
                >
                  €300K
                </p>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-snug text-white/45 md:text-base">
                Eurostars 3 / Eureka — cross-border R&amp;D
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
