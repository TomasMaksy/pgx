"use client";

import { useState } from "react";
import { ResearchReadingCard } from "@/components/research-reading-card";
import {
  EVIDENCE_CARDS,
  RESEARCH_CATEGORIES,
  type ResearchCategory,
} from "@/lib/research-evidence";
import { cn } from "@/lib/utils";

export function ResearchSection() {
  const [activeCategory, setActiveCategory] =
    useState<ResearchCategory>("genetic-variations");

  const activeCards = EVIDENCE_CARDS.filter(
    (card) => card.category === activeCategory,
  );

  return (
    <div className="w-full">
      <p className="mx-auto w-fit text-xs font-medium tracking-[0.25em] text-white/50 uppercase">
        Backed by research
      </p>

      <h2 className="mx-auto mt-4 max-w-4xl text-center text-3xl leading-[1.1] font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
        Evidence That Supports Smarter Prescribing
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-white/55 md:text-lg">
        Pharmacogenomic testing is supported by European implementation studies,
        clinical guidelines, population data, and health-economic analyses showing
        that genetic results can help reduce adverse reactions, guide prescribing,
        and support more efficient healthcare spending.
      </p>

      <div
        className="mt-10 flex flex-wrap justify-center gap-2 md:mt-12"
        role="tablist"
        aria-label="Research evidence categories"
      >
        {RESEARCH_CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors md:px-5 md:py-2.5",
                isActive
                  ? "border-mint/40 bg-mint/15 text-white"
                  : "border-white/10 bg-white/4 text-white/55 hover:border-white/20 hover:text-white/80",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div
        className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 lg:grid-cols-3 lg:gap-4"
        role="tabpanel"
      >
        {activeCards.map((card) => (
          <ResearchReadingCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
