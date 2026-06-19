"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ResearchReadingCard } from "@/components/research-reading-card";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import {
  EVIDENCE_CARDS,
  RESEARCH_CATEGORIES,
  type ResearchCategory,
} from "@/lib/research-evidence";
import { cn } from "@/lib/utils";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.018,
      staggerDirection: -1,
    },
  },
};

const cardVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 16,
    y: 6,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -12,
    y: -4,
    transition: {
      duration: 0.12,
      ease: "easeIn" as const,
    },
  }),
};

export function ResearchSection() {
  const [activeCategory, setActiveCategory] =
    useState<ResearchCategory>("genetic-variations");
  const [direction, setDirection] = useState(1);

  const activeCards = useMemo(
    () => EVIDENCE_CARDS.filter((card) => card.category === activeCategory),
    [activeCategory],
  );

  const handleCategoryChange = (category: ResearchCategory) => {
    if (category === activeCategory) return;

    const currentIndex = RESEARCH_CATEGORIES.findIndex(
      (item) => item.id === activeCategory,
    );
    const nextIndex = RESEARCH_CATEGORIES.findIndex(
      (item) => item.id === category,
    );

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveCategory(category);
  };

  return (
    <div className="w-full">
      <p className="section-eyebrow mx-auto w-fit">
        Backed by research
      </p>

      <h2 className="section-title mx-auto max-w-4xl text-center">
        <PointerHighlight
          containerClassName="inline-block"
          rectangleClassName="rounded-sm border-mint/50 scale-110"
          pointerClassName="text-mint"
          hideAfterMs={3000}
        >
          <span className="relative z-10">Evidence</span>
        </PointerHighlight>{" "}
        That Supports Smarter Prescribing
      </h2>

      {/* <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-white/55 md:text-lg">
        Clinical evidence shows pharmacogenomics can improve prescribing
        decisions and help prevent adverse drug reactions.
      </p> */}

      <div className="mx-auto mt-10 max-w-6xl md:mt-12">
        <div
          className="flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10"
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
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "relative cursor-pointer pb-3 text-sm font-medium transition-colors md:text-base",
                  isActive
                    ? "text-white"
                    : "text-white/45 hover:text-white/70",
                )}
              >
                {category.label}
                {isActive && (
                  <motion.span
                    layoutId="research-category-tab"
                    className="absolute inset-x-0 -bottom-px h-px bg-white"
                    transition={{
                      type: "spring",
                      stiffness: 620,
                      damping: 42,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="relative mt-8 md:mt-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCategory}
              role="tabpanel"
              custom={direction}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
            >
              {activeCards.map((card) => (
                <motion.div
                  key={card.id}
                  custom={direction}
                  variants={cardVariants}
                  className="h-full [transform-style:preserve-3d]"
                >
                  <ResearchReadingCard card={card} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
