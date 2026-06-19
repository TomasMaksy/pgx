"use client";

import { PinContainer } from "@/components/ui/3d-pin";
import type { EvidenceCard } from "@/lib/research-evidence";

type ResearchReadingCardProps = {
  card: EvidenceCard;
};

export function ResearchReadingCard({ card }: ResearchReadingCardProps) {
  return (
    <PinContainer
      href={card.url}
      title="Read the full article"
      target="_blank"
      rel="noopener noreferrer"
      containerClassName="h-full w-full"
    >
      <article className="glass-inset flex h-full w-full flex-col overflow-hidden rounded-xl border border-neutral-500/30 bg-neutral-900/70 backdrop-blur-xs transition-[border-color] duration-500 ease-in-out [transform-style:preserve-3d] group-hover/pin:border-neutral-400/40">
        <div className="relative aspect-2/1 w-full shrink-0 overflow-hidden rounded-t-xl bg-white/5">
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-[10px] font-medium tracking-[0.14em] text-white/35 uppercase">
            {card.journal} · {card.year}
          </p>

          <h3 className="section-heading mt-2 line-clamp-2 text-sm leading-snug">
            {card.headline}
          </h3>

          <p className="mt-2.5 line-clamp-2 flex-1 text-xs leading-relaxed text-white/50">
            {card.explanation}
          </p>
        </div>
      </article>
    </PinContainer>
  );
}
