import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CALL_URL =
  "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/HORIZON-HLTH-2027-01-CARE-02";

const CARD_CLASS =
  "glass-inset flex flex-col rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-md md:p-6";

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

        <div className="flex flex-col gap-3 md:gap-4">
          <article className={cn(CARD_CLASS, "min-w-0 overflow-hidden")}>
            <div className="flex min-w-0 items-center justify-between gap-4">
              <div className="min-w-0">
                <p
                  className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-medium tracking-tighter text-white/85 tabular-nums"
                  aria-label="Horizon Europe — EU grant per project"
                >
                  €10M
                </p>
                <p className="mt-2 text-sm leading-snug text-white/45 md:text-base">
                  Horizon Europe — EU grant per project
                </p>
              </div>
              <div className="flex h-14 w-28 max-w-[42%] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2 py-1.5">
                <Image
                  src="/logo-es.webp"
                  alt="Horizon Europe"
                  width={291}
                  height={72}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
            <article className={CARD_CLASS}>
              <div className="flex h-12 w-18 items-center justify-center overflow-hidden rounded-xl bg-white px-2">
                <Image
                  src="/IA-logo.webp"
                  alt="Inovacijų agentūra"
                  width={72}
                  height={48}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
              <p
                className="mt-4 text-4xl leading-none font-light tracking-tight text-white/85 tabular-nums md:text-5xl"
                aria-label="Inovacijų agentūra — Lithuanian innovation funding"
              >
                €100K
              </p>
              <p className="mt-3 text-sm leading-snug text-white/45">
                Inovacijų agentūra — Lithuanian innovation funding
              </p>
            </article>

            <article className={CARD_CLASS}>
              <div className="flex h-12 w-18 items-center justify-center overflow-hidden rounded-xl bg-white px-2">
                <Image
                  src="/eureka-logo.png"
                  alt="Eurostars 3 / Eureka"
                  width={72}
                  height={48}
                  className="max-h-9 w-auto object-contain"
                />
              </div>
              <p
                className="mt-4 text-4xl leading-none font-light tracking-tight text-white/85 tabular-nums md:text-5xl"
                aria-label="Eurostars 3 / Eureka — cross-border R&D"
              >
                €300K
              </p>
              <p className="mt-3 text-sm leading-snug text-white/45">
                Eurostars 3 / Eureka — cross-border R&amp;D
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
