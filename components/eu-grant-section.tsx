"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const CALL_URL =
  "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/HORIZON-HLTH-2027-01-CARE-02";

const CARD_CLASS =
  "glass-inset flex flex-col rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-md md:p-6";

export function EuGrantSection() {
  const { t } = useI18n();
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16 xl:gap-24">
        <div className="max-w-xl">
          <p className="section-eyebrow">{t("Horizon Europe")}</p>
          <h2 className="section-title max-w-3xl">
            {t("EU funding matched to what we build")}
          </h2>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg">
            {t(
              "A matched EU Research & Innovation Action under Cluster 1 Health. Direct contribution covering 100% of eligible costs — and the call scope reads almost line-for-line like the GenoLink platform.",
            )}
          </p>
          <a
            href={CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-mint/40 bg-mint/10 text-mint-lighter hover:border-mint/60 hover:bg-mint/20 mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
          >
            {t("Full call details on the EU portal")}
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <article className={cn(CARD_CLASS, "min-w-0 overflow-hidden")}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
              <div className="order-1 flex h-12 w-18 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2 md:order-2 md:h-14 md:w-28 md:max-w-[42%] md:py-1.5">
                <Image
                  src="/logo-es.webp"
                  alt="Horizon Europe"
                  width={291}
                  height={72}
                  className="max-h-7 w-auto object-contain md:h-full md:w-full"
                />
              </div>
              <div className="order-2 min-w-0 md:order-1">
                <p
                  className="mt-4 text-4xl leading-none font-light tracking-tight text-white/85 tabular-nums md:mt-0 md:text-[clamp(2.5rem,7vw,4.5rem)] md:font-medium md:leading-[1.05] md:tracking-tighter"
                  aria-label="Horizon Europe — EU grant per project"
                >
                  €10M
                </p>
                <p className="mt-3 text-sm leading-snug text-white/45 md:mt-2 md:text-base">
                  {t("Horizon Europe — EU grant per project")}
                </p>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
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
                {t("Inovacijų agentūra — Lithuanian innovation funding")}
              </p>
            </article>

            <article className={CARD_CLASS}>
              <div className="flex h-12 w-18 items-center justify-center overflow-hidden rounded-xl bg-white px-2">
                <Image
                  src="/eureka-logo.png"
                  alt="Eurostars 3 / Eureka"
                  width={72}
                  height={48}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
              <p
                className="mt-4 text-4xl leading-none font-light tracking-tight text-white/85 tabular-nums md:text-5xl"
                aria-label="Eurostars 3 / Eureka — cross-border R&D"
              >
                €300K
              </p>
              <p className="mt-3 text-sm leading-snug text-white/45">
                {t("Eurostars 3 / Eureka — cross-border R&D")}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
