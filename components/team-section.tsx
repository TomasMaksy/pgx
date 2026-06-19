"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type TeamMemberId = "tomas" | "alan" | "third";

type CardPose = { rotate: number; x: number };

type TeamMember = {
  id: TeamMemberId;
  name: string;
  image?: string;
};

const EXPAND_EASE = [0.22, 1, 0.36, 1] as const;

const DESKTOP_POSES: Record<
  TeamMemberId,
  { collapsed: CardPose; expanded: CardPose }
> = {
  tomas: {
    collapsed: { rotate: -5, x: 32 },
    expanded: { rotate: 0, x: -40 },
  },
  alan: {
    collapsed: { rotate: 0, x: 0 },
    expanded: { rotate: 0, x: 0 },
  },
  third: {
    collapsed: { rotate: 5, x: -32 },
    expanded: { rotate: 0, x: 40 },
  },
};

const MOBILE_POSES: Record<TeamMemberId, CardPose> = {
  tomas: { rotate: 0, x: 0 },
  alan: { rotate: 0, x: 0 },
  third: { rotate: 0, x: 0 },
};

const CARD_Z: Record<TeamMemberId, string> = {
  tomas: "z-10",
  alan: "z-20",
  third: "z-10",
};

function TomasDescription({ compact }: { compact?: boolean }) {
  if (compact) {
    return <span className="line-clamp-2 block">MSc Bioinformatics</span>;
  }

  return (
    <>
      <span className="block">MSc Bioinformatics</span>
      <span className="block text-white/40">@University of Edinburgh</span>
    </>
  );
}

function AlanDescription({ compact }: { compact?: boolean }) {
  if (compact) {
    return <span className="line-clamp-2 block">MD Medicine</span>;
  }

  return (
    <>
      <span className="block">MD Medicine</span>
      <span className="block text-white/40">@Vilnius University</span>
    </>
  );
}

function NikitaDescription({ compact }: { compact?: boolean }) {
  if (compact) {
    return <span className="line-clamp-2 block">Serial entrepreneur</span>;
  }

  return (
    <>
      <span className="block">
        Serial entrepreneur
        <br />
        Scaled Ventures Beyond €3M+/yr
      </span>
    </>
  );
}

const TEAM: TeamMember[] = [
  {
    id: "tomas",
    name: "Tomas Maksimovič",
    image: "/team/tomas.webp",
  },
  {
    id: "alan",
    name: "Alan Rynkevič",
    image: "/team/alan.webp",
  },
  {
    id: "third",
    name: "Nikita Rancev",
  },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function TeamCard({
  name,
  description,
  image,
  compact = false,
}: {
  name: string;
  description: ReactNode;
  image?: string;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "group hover:border-mint/25 overflow-hidden border border-white/10 bg-white/4 transition-[border-color,box-shadow] duration-500 hover:shadow-[inset_0_0_0_1px_rgba(45,212,191,0.12),0_0_40px_-12px_rgba(45,212,191,0.25)]",
        compact ? "rounded-lg" : "rounded-2xl",
      )}
    >
      <div className="relative aspect-3/4 w-full overflow-hidden bg-black">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black via-black/10 to-transparent",
            compact ? "p-2" : "p-5",
          )}
        >
          <h3
            className={cn(
              "section-heading",
              compact ? "text-[9px] leading-tight" : "text-base",
            )}
          >
            {name}
          </h3>
          <div
            className={cn(
              "leading-snug text-white/50",
              compact ? "mt-0.5 text-[7px]" : "mt-1 text-sm",
            )}
          >
            {description}
          </div>
        </div>
      </div>
    </article>
  );
}

function getDescription(member: TeamMember, compact: boolean) {
  switch (member.id) {
    case "tomas":
      return <TomasDescription compact={compact} />;
    case "alan":
      return <AlanDescription compact={compact} />;
    case "third":
      return <NikitaDescription compact={compact} />;
  }
}

export function TeamSection() {
  const [expanded, setExpanded] = useState(false);
  const isDesktop = useIsDesktop();
  const gap = expanded ? 40 : 0;

  const setOpen = () => setExpanded(true);
  const setClosed = () => setExpanded(false);

  return (
    <div
      className="w-full"
      onMouseEnter={isDesktop ? setOpen : undefined}
      onMouseLeave={isDesktop ? setClosed : undefined}
    >
      <p className="section-eyebrow mx-auto w-fit">
        Our team
      </p>

      <h2 className="section-title mx-auto max-w-4xl text-center">
        Why us?
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-white/55 md:text-lg">
        Young team combining expertise in Medicine, Biochemistry, and
        Bioinformatics, with hands-on experience in personalized medicine at
        AskBio and Bayer Pharmaceuticals. Our background ranges from VC-backed
        startups to leading teams and companies with multimillion-euro annual
        revenues. We believe the time for personalized healthcare is now, and
        with your support, we can make it more effective, efficient, and
        accessible for everyone.
      </p>

      <div className="mx-auto mt-12 w-full overflow-visible pb-4 md:mt-14 md:max-w-4xl md:px-2 md:pb-6">
        <motion.div
          className={cn(
            "flex w-full flex-row items-stretch gap-2 sm:items-end sm:justify-center",
          )}
          animate={isDesktop ? { gap } : undefined}
          transition={{ duration: 0.9, ease: EXPAND_EASE }}
        >
          {TEAM.map((member) => {
            const pose = isDesktop
              ? expanded
                ? DESKTOP_POSES[member.id].expanded
                : DESKTOP_POSES[member.id].collapsed
              : MOBILE_POSES[member.id];

            return (
              <motion.div
                key={member.id}
                className={cn(
                  "min-w-0 flex-1 sm:flex-none sm:shrink-0",
                  isDesktop && "w-[32%] max-w-[280px]",
                  isDesktop && CARD_Z[member.id],
                )}
                style={isDesktop ? { transformOrigin: "50% 100%" } : undefined}
                animate={
                  isDesktop ? { rotate: pose.rotate, x: pose.x } : undefined
                }
                transition={{ duration: 0.9, ease: EXPAND_EASE }}
              >
                <TeamCard
                  name={member.name}
                  description={getDescription(member, !isDesktop)}
                  image={member.image}
                  compact={!isDesktop}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
