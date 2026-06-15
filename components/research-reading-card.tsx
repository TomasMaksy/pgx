import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { EvidenceCard } from "@/lib/research-evidence";

const BLOG_COVER_IMAGE = "/blog-cover-deleteme.webp";

type ResearchReadingCardProps = {
  card: EvidenceCard;
};

export function ResearchReadingCard({ card }: ResearchReadingCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/4 transition-colors hover:border-white/20">
      <div className="relative aspect-2/1 w-full shrink-0 overflow-hidden">
        <Image
          src={BLOG_COVER_IMAGE}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-medium tracking-[0.14em] text-white/35 uppercase">
          {card.journal} · {card.year}
        </p>

        <h3 className="mt-2 line-clamp-2 text-sm leading-snug font-semibold tracking-tight text-white">
          {card.headline}
        </h3>

        <div className="mt-2.5">
          <p className="text-gradient-headline text-xl font-semibold tracking-tighter">
            {card.keyNumber}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/40">
            {card.keyNumberLabel}
          </p>
        </div>

        <p className="mt-2.5 line-clamp-2 flex-1 text-xs leading-relaxed text-white/50">
          {card.explanation}
        </p>

        <a
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-mint transition-colors hover:text-mint-light"
        >
          {card.ctaLabel}
          <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
        </a>
      </div>
    </article>
  );
}
