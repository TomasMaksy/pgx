"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { MatterButton } from "@/components/ui/matter-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { useI18n } from "@/lib/i18n";

const headlineSegmentClass = "text-gradient-headline font-sans tracking-tight";

const WORD_STAGGER = 0.05;
const ANIM_BUFFER = 0.1;
const INITIAL_DELAY = 0;
const PHASE_GAP = 0.1;

const firstLines = ["Your DNA", "Doesn't Change."] as const;
const secondLine = "Prescribing Should.";
const subheadline =
  "Clinical decision support powered by pharmacogenomics and AI";

function segmentCount(text: string) {
  return text.split(/(\s+)/).length;
}

function lineDuration(text: string) {
  return segmentCount(text) * WORD_STAGGER;
}

function lineEndTime(delay: number, text: string) {
  return delay + lineDuration(text) + ANIM_BUFFER;
}

function buildTimeline() {
  let cursor = INITIAL_DELAY;

  const first = firstLines.map((line) => {
    const delay = cursor;
    cursor = lineEndTime(delay, line);
    return { line, delay };
  });

  const second = { line: secondLine, delay: cursor + PHASE_GAP };
  cursor = lineEndTime(second.delay, second.line);

  const subheadlineDelay = cursor + PHASE_GAP;
  cursor = lineEndTime(subheadlineDelay, subheadline);

  const buttonDelay = cursor + PHASE_GAP;

  return { first, second, subheadlineDelay, buttonDelay };
}

const { first, second, subheadlineDelay, buttonDelay } = buildTimeline();

export function HeroSection() {
  const { t } = useI18n();
  return (
    <>
      <h1 className="max-w-5xl pb-1 text-4xl leading-[1.08] font-medium md:text-7xl">
        {first.map(({ line, delay }) => (
          <TextAnimate
            key={line}
            as="span"
            by="word"
            animation="blurInUp"
            startOnView={false}
            once
            delay={delay}
            duration={lineDuration(line)}
            className="block"
            segmentClassName={headlineSegmentClass}
          >
            {t(line)}
          </TextAnimate>
        ))}
        <TextAnimate
          as="span"
          by="word"
          animation="blurInUp"
          startOnView={false}
          once
          delay={second.delay}
          duration={lineDuration(second.line)}
          className="block"
          segmentClassName={headlineSegmentClass}
        >
          {t(second.line)}
        </TextAnimate>
      </h1>

      <TextAnimate
        as="p"
        by="word"
        animation="blurInUp"
        startOnView={false}
        once
        delay={subheadlineDelay}
        duration={lineDuration(subheadline)}
        className="mt-6 max-w-md text-base text-white/70 md:text-2xl"
      >
        {t(subheadline)}
      </TextAnimate>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: buttonDelay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mt-10"
      >
        <MatterButton
          render={<Link href="#contact" />}
          className="inline-flex items-center gap-2"
        >
          {t("Contact Us")}
          <ChevronRight className="size-4" strokeWidth={2} />
        </MatterButton>
      </motion.div>
    </>
  );
}
