"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  BrainCircuit,
  Check,
  FlaskConical,
  Landmark,
  Microscope,
  Stethoscope,
  User,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const STAGES = [
  {
    n: "01",
    years: "2027–2028",
    tag: "Stage 1 · Core",
    icon: BrainCircuit,
    image: "/1test.webp",
    title: "AI recommendation platform",
    desc: "Analyzes the patient's genetic data and, at the moment of prescribing, helps the doctor choose the right drug and dose — and flags dangerous drug combinations.",
    state: "now" as const,
  },
  {
    n: "02",
    years: "2028–2029",
    tag: "Stage 2",
    icon: FlaskConical,
    image: "/test32.webp",
    title: "In-house laboratory",
    desc: "A full cycle of genetic testing in Lithuania — from sample collection to interpretation and recommendations. Quality control at every step, fast turnaround, and sovereign data.",
    state: "build" as const,
  },
  {
    n: "03",
    years: "2029–2030",
    tag: "Stage 3",
    icon: Microscope,
    image: "/2test.webp",
    title: "New fields and a scientific base",
    desc: "Building on a working system and accumulated data — expansion into new areas of medicine, new tests, and joint research with universities and clinics.",
    state: "grow" as const,
  },
] as const;

const VALUE = [
  {
    icon: User,
    title: "For patients",
    points: [
      "Treatment matched to the individual genome",
      "The right drug and dose from the first prescription",
      "Fewer adverse reactions and ineffective treatments",
    ],
  },
  {
    icon: Stethoscope,
    title: "For doctors",
    points: [
      "A ready recommendation at the moment of prescribing",
      "No manual interpretation of genetics",
      "Lower risk, greater confidence in the decision",
    ],
  },
  {
    icon: Landmark,
    title: "For the healthcare system",
    points: [
      "Lower costs for complications and therapy selection",
      "Shorter hospital waiting times",
      "Citizens' data kept under control in Lithuania",
    ],
  },
] as const;

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const CARD_STYLES = {
  now: "glass-inset border-white/12 bg-white/4",
  build: "glass-inset border-white/12 bg-white/4",
  grow: "glass-inset border-white/12 bg-white/4",
  dream:
    "border-mint/60 bg-linear-to-br from-mint/25 via-mint/8 to-transparent shadow-[0_0_70px_-14px_rgba(45,212,191,0.65)]",
} as const;

const TAG_STYLES = {
  now: "border-mint/40 bg-mint/10 text-mint-lighter",
  build: "border-mint/40 bg-mint/10 text-mint-lighter",
  grow: "border-mint/40 bg-mint/10 text-mint-lighter",
  dream: "border-transparent bg-mint/20 text-mint-lighter",
} as const;

function StageCard({
  stage,
  big = false,
}: {
  stage: (typeof STAGES)[number];
  big?: boolean;
}) {
  const { years, tag, icon: Icon, title, desc, state } = stage;
  const image = "image" in stage ? (stage.image as string) : null;
  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1",
        big ? "p-7 md:p-9" : "p-6",
        CARD_STYLES[state],
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span
          className={[
            "inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase",
            TAG_STYLES[state],
          ].join(" ")}
        >
          {tag}
        </span>
        <span className="rounded-md bg-mint/15 px-2.5 py-1 font-mono text-sm font-bold tracking-tight text-mint-lighter">
          {years}
        </span>
      </div>

      {image ? (
        <div
          className={[
            "relative z-10 mt-4 w-full",
            big ? "h-48 md:h-60" : "h-36 md:h-40",
          ].join(" ")}
        >
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 90vw, 33vw"
            className="object-contain object-center"
          />
        </div>
      ) : (
        <div className="relative z-10 mt-6 flex size-12 items-center justify-center rounded-xl border border-mint/25 bg-mint/15">
          <Icon className="size-6 text-mint" strokeWidth={2} />
        </div>
      )}

      <h3
        className={[
          "relative z-10 mt-5 section-heading",
          big ? "text-xl md:text-2xl" : "text-lg",
        ].join(" ")}
      >
        {title}
      </h3>
      <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/55">
        {desc}
      </p>
    </article>
  );
}

export function VisionSection() {
  return (
    <div className="w-full">
      <Reveal className="text-center">
        <p className="section-eyebrow">
          Our goals
        </p>
        <h2 className="section-title mx-auto max-w-4xl text-center">
          Make genetics the backbone of every prescription — and grow from there
          into the medicine of the future.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg">
          We&apos;re building a system that uses genetic testing to help doctors
          make precise decisions — which drug, at what dose, and in what
          combination is safe for each patient. This reduces ineffective
          treatment, adverse reactions, and dosing errors — and, for the
          healthcare system, the cost of medications and the load on hospitals.
        </p>
      </Reveal>

      {/* Этапы по годам */}
      <div className="mt-12 md:mt-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.n} delay={i * 0.08}>
              <div className="h-full">
                <StageCard stage={stage} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Ради чего — ценность платформы */}
      <Reveal delay={0.05}>
        <div className="mt-12 md:mt-16">
          <h3 className="section-heading text-2xl md:text-3xl">
            Why we do this
          </h3>
          <div className="glass-inset mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/4 backdrop-blur-md">
            <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {VALUE.map(({ icon: Icon, title, points }) => (
                <div key={title} className="p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-mint/25 bg-mint/15">
                      <Icon className="size-5 text-mint" strokeWidth={2} />
                    </div>
                    <h4 className="section-heading text-base">
                      {title}
                    </h4>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-mint/15">
                          <Check className="size-3 text-mint" strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-snug font-medium text-white/75">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
