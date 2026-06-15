"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { TextAnimate } from "@/components/ui/text-animate";

const headlineSegmentClass = "text-gradient-headline font-sans tracking-tight";

const WORD_STAGGER = 0.05;
const ANIM_BUFFER = 0.1;
const INITIAL_DELAY = 0;
const PHASE_GAP = 0.1;

const firstLines = ["Nikita Your DNA", "Doesn't Change."] as const;
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
  return (
    <>
      <h1 className="max-w-5xl text-5xl leading-none font-medium md:text-7xl">
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
            {line}
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
          {second.line}
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
        {subheadline}
      </TextAnimate>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: buttonDelay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="glass-inset mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 md:text-base"
      >
        Get Started
        <ChevronRight className="size-4" strokeWidth={2} />
      </motion.button>
    </>
  );
}
