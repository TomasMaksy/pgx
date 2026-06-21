"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  BrainCircuit,
  Check,
  FlaskConical,
  Landmark,
  Microscope,
  Sparkles,
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
  {
    n: "04",
    years: "2030+",
    tag: "Horizon 2030+",
    icon: Sparkles,
    image: "/test4.webp",
    title: "A genomic profile from birth — for life",
    desc: "Our vision — that a genetic profile is created early in life, with parental consent, and accompanies a person throughout their life. For any illness, any doctor immediately sees the patient's drug predispositions and receives ready-made recommendations — treatment stays precise from day one. This requires a clear legal framework and data protection, and is built together with the government and regulators. As genomic science advances, the accumulated profiles will become the foundation of preventive medicine: more and more conditions can be predicted and prevented in advance.",
    state: "dream" as const,
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

/* ── Потоки: три верхних этапа сливаются в один луч и питают цель ── */
type FlowGeom = {
  w: number;
  h: number;
  conduits: string[]; // карточка → узел слияния
  trunk: string | null; // узел → цель
  junction: { x: number; y: number } | null;
  core: { x: number; y: number } | null;
};

const PULSE = 2.6; // базовая длительность цикла, с

function ConvergeFlow({
  containerRef,
  topRefs,
  bottomRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  topRefs: React.RefObject<HTMLDivElement | null>[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduce = useReducedMotion();
  const [geom, setGeom] = useState<FlowGeom>({
    w: 0,
    h: 0,
    conduits: [],
    trunk: null,
    junction: null,
    core: null,
  });

  useEffect(() => {
    const measure = () => {
      const cont = containerRef.current;
      const bottom = bottomRef.current;
      if (!cont || !bottom) return;
      const c = cont.getBoundingClientRect();
      const b = bottom.getBoundingClientRect();

      const gx = b.left - c.left + b.width / 2; // центр цели по X
      const goalTopY = b.top - c.top;

      const starts: { x: number; y: number }[] = [];
      topRefs.forEach((r) => {
        const el = r.current;
        if (!el) return;
        const t = el.getBoundingClientRect();
        starts.push({
          x: t.left - c.left + t.width / 2,
          y: t.bottom - c.top, // низ-центр верхней карточки
        });
      });
      if (starts.length === 0) return;

      const maxStartY = Math.max(...starts.map((s) => s.y));
      // узел слияния — в просвете между рядами, ближе к цели
      const jy = maxStartY + (goalTopY - maxStartY) * 0.62;
      const junction = { x: gx, y: jy };

      const conduits = starts.map((s) => {
        const midY = (s.y + jy) / 2;
        return `M ${s.x} ${s.y} C ${s.x} ${midY}, ${gx} ${midY}, ${gx} ${jy}`;
      });

      const trunk = `M ${gx} ${jy} L ${gx} ${goalTopY}`;

      setGeom({
        w: c.width,
        h: c.height,
        conduits,
        trunk,
        junction,
        core: { x: gx, y: goalTopY },
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, topRefs, bottomRef]);

  if (!geom.w || geom.conduits.length === 0) return null;
  const j = geom.junction!;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden md:block"
      width={geom.w}
      height={geom.h}
      viewBox={`0 0 ${geom.w} ${geom.h}`}
      fill="none"
    >
      <defs>
        <filter id="flow-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="flow-glow-soft" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id="conduit-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(45,212,191,0.05)" />
          <stop offset="1" stopColor="rgba(45,212,191,0.4)" />
        </linearGradient>
      </defs>

      {/* статичные направляющие: карточки → узел */}
      {geom.conduits.map((d, i) => (
        <path
          key={`c-${i}`}
          d={d}
          stroke="url(#conduit-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      {/* ствол: узел → цель (ярче — это объединённый поток) */}
      {geom.trunk && (
        <path
          d={geom.trunk}
          stroke="rgba(94,234,212,0.55)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}

      {!reduce && (
        <>
          {/* импульсы по трём каналам → к узлу */}
          {geom.conduits.map((d, i) => (
            <circle
              key={`p-${i}`}
              r="3"
              fill="#5eead4"
              opacity="0"
              filter="url(#flow-glow)"
            >
              <animateMotion
                dur={`${PULSE}s`}
                begin={`${i * (PULSE / 3)}s`}
                repeatCount="indefinite"
                path={d}
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0.6"
                keyTimes="0;0.15;0.85;1"
                dur={`${PULSE}s`}
                begin={`${i * (PULSE / 3)}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* узел слияния — пульсирующее кольцо */}
          <circle cx={j.x} cy={j.y} r="9" fill="rgba(45,212,191,0.18)" filter="url(#flow-glow-soft)">
            <animate attributeName="r" values="7;13;7" dur={`${PULSE}s`} repeatCount="indefinite" />
          </circle>
          <circle
            cx={j.x}
            cy={j.y}
            r="4"
            fill="none"
            stroke="#5eead4"
            strokeWidth="1.5"
            filter="url(#flow-glow)"
          >
            <animate attributeName="r" values="3;6;3" dur={`${PULSE}s`} repeatCount="indefinite" />
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur={`${PULSE}s`}
              repeatCount="indefinite"
            />
          </circle>

          {/* объединённые импульсы по стволу → в цель */}
          {geom.trunk &&
            [0, 1].map((k) => (
              <circle
                key={`t-${k}`}
                r="3.6"
                fill="#ccfbf1"
                opacity="0"
                filter="url(#flow-glow)"
              >
                <animateMotion
                  dur={`${PULSE}s`}
                  begin={`${k * (PULSE / 2)}s`}
                  repeatCount="indefinite"
                  path={geom.trunk!}
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.8;1"
                  dur={`${PULSE}s`}
                  begin={`${k * (PULSE / 2)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

          {/* ядро на цели — разгорается при приходе потока */}
          {geom.core && (
            <>
              <circle
                cx={geom.core.x}
                cy={geom.core.y}
                r="16"
                fill="rgba(45,212,191,0.22)"
                filter="url(#flow-glow-soft)"
              >
                <animate
                  attributeName="r"
                  values="10;20;10"
                  dur={`${PULSE}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.85;0.3"
                  dur={`${PULSE}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={geom.core.x} cy={geom.core.y} r="3.5" fill="#ccfbf1" filter="url(#flow-glow)">
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur={`${PULSE}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}
        </>
      )}
    </svg>
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
        state === "build" || state === "now" || state === "grow"
          ? CARD_STYLES[state]
          : `border ${CARD_STYLES[state]}`,
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
        <div
          className={[
            "relative z-10 mt-6 flex size-12 items-center justify-center rounded-xl border",
            state === "dream"
              ? "border-mint/50 bg-mint/25"
              : "border-mint/25 bg-mint/15",
          ].join(" ")}
        >
          <Icon
            className={
              state === "dream"
                ? "size-6 text-mint-lighter"
                : "size-6 text-mint"
            }
            strokeWidth={2}
          />
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
  const flowRef = useRef<HTMLDivElement>(null);
  const top0 = useRef<HTMLDivElement>(null);
  const top1 = useRef<HTMLDivElement>(null);
  const top2 = useRef<HTMLDivElement>(null);
  const topRefs = [top0, top1, top2];
  const bottomRef = useRef<HTMLDivElement>(null);

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

      {/* Этапы по годам: верхние три питают нижнюю цель */}
      <div className="mt-12 md:mt-16">
        <div ref={flowRef} className="relative">
          <ConvergeFlow
            containerRef={flowRef}
            topRefs={topRefs}
            bottomRef={bottomRef}
          />

          <div className="relative z-10">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {STAGES.slice(0, 3).map((stage, i) => (
                <Reveal key={stage.n} delay={i * 0.08}>
                  <div ref={topRefs[i]} className="h-full">
                    <StageCard stage={stage} />
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-20 flex justify-center md:mt-28">
              <Reveal delay={0.24} className="w-full md:max-w-[60%]">
                <div ref={bottomRef}>
                  <StageCard stage={STAGES[3]} big />
                </div>
              </Reveal>
            </div>
          </div>
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
