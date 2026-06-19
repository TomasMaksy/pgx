"use client";

import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, ChevronDown, X } from "lucide-react";

const CX = 230;
const CY = 122;

const CALL_URL =
  "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/HORIZON-HLTH-2027-01-CARE-02";

const EASE = [0.16, 1, 0.3, 1] as const;

// Exact center of each of the 4 columns (grid lg:grid-cols-4, gap 20px) for the connector.
const CONNECTOR_LEFT = [
  "calc(12.5% - 7.5px)",
  "calc(37.5% - 2.5px)",
  "calc(62.5% + 2.5px)",
  "calc(87.5% + 7.5px)",
] as const;

// Single source of truth: same nodes drive the diagram and the cards.
const FORCES = [
  {
    n: "01",
    tag: "EU Grant",
    img: "/eur.webp",
    description:
      "Horizon Europe — €95.5B for 2021–2027. The capital to build the infrastructure exists right now.",
    highlight: true,
    node: { x: 95, y: 46, labelY: 46 - 23},
  },
  {
    n: "02",
    tag: "AI Technology",
    img: "/ai.webp",
    description:
      "Patient analysis and recommendations in seconds — no manual clinician work, no error risk. The technology is ready.",
    highlight: false,
    node: { x: 95, y: 198, labelY: 198 + 29},
  },
  {
    n: "03",
    tag: "First-Mover Edge",
    img: "/time.webp",
    description:
      "The same money is open to every EU country. Whoever builds first sets the standard the whole region follows.",
    highlight: false,
    node: { x: 365, y: 46, labelY: 46 - 23},
  },
  {
    n: "04",
    tag: "Lithuanian Talent",
    img: "/lithuania.webp",
    description:
      "Lithuania is strong in life sciences: specialists are plentiful, and bringing them onto the project is realistic right now.",
    highlight: false,
    node: { x: 365, y: 198, labelY: 198 + 29},
  },
] as const;

const TIMELINE = [
  { year: "2021 year", label: "Funding cycle starts", state: "past", mark: "check" },
  { year: "2023 year", label: "Past calls", state: "past", mark: null },
  { year: "2025 year", label: "Past calls", state: "past", mark: null },
  { year: "2027 year", label: "Last entry point", state: "now", mark: null },
  { year: "after 2027", label: "Window closed", state: "closed", mark: "cross" },
] as const;

const CALL_STATS = [
  { value: "€8–10M", label: "EU contribution per project" },
  { value: "100%", label: "of eligible costs covered (RIA)" },
  { value: "4", label: "projects to be funded" },
  { value: "~€38M", label: "total topic budget" },
] as const;

const CALL_SCOPE = [
  "Pharmacogenomics, PK & PD to predict and prevent adverse drug reactions in polypharmacy",
  "Personalised-medicine strategies — biomarkers, targeted therapy, patient stratification",
  "Drug–drug, drug–gene and drug–food interaction biomarkers",
  "Prescribing powered by EHR, AI and clinical decision-support systems",
] as const;

// Expandable content for each of the 4 factors (same order as FORCES).
const DETAILS = [
  {
    eyebrow: "The matched call",
    code: "horizon-hlth-2027-01-care-02",
    title: "The EU grant reads as if it were written for what we build.",
    intro:
      "A Horizon Europe call (Research & Innovation Action) under Cluster 1 “Health.” Its scope reads almost line-for-line like the GenoLink platform:",
    points: CALL_SCOPE,
    statLabel: "What a single project can secure",
    statBig: "€8–10M",
    statSub: "direct EU contribution, 100% of eligible costs covered",
    tiles: CALL_STATS,
    link: CALL_URL,
  },
  {
    eyebrow: "Technology",
    code: "ai-driven cds",
    title: "A system that thinks alongside the clinician.",
    intro:
      "The model is trained on pharmacogenomic data and assists right at the point of prescribing:",
    points: [
      "Genetic profile and lab interpretation in seconds",
      "Drug–gene and drug–drug interaction checks",
      "Dosing recommendations tailored to each patient",
      "The decision stays with the clinician — the system assists, not replaces",
    ],
    statLabel: "Decision-support speed",
    statBig: "Seconds",
    statSub: "instead of hours of manual interpretation",
    tiles: null,
    link: null,
  },
  {
    eyebrow: "Position",
    code: "first-mover",
    title: "Whoever builds first sets the standard.",
    intro:
      "The region's pharmacogenomics infrastructure is built once. After that, everyone plugs into it:",
    points: [
      "The reference platform clinics and systems integrate with (eSveikata, etc.)",
      "A regional PGx database as a strategic asset",
      "The position holds for a decade ahead",
      "The alternative — licensing someone else's solution later",
    ],
    statLabel: "The advantage of entering now",
    statBig: "1st",
    statSub: "becomes the region's reference",
    tiles: null,
    link: null,
  },
  {
    eyebrow: "Team",
    code: "talent pool",
    title: "Lithuania has enough people to build this.",
    intro: "Lithuania is one of Europe's most developed life-sciences markets:",
    points: [
      "Strong universities and specialised departments",
      "A deep biotech and engineering talent pool",
      "A world-class, export-oriented sector",
      "Specialists are easy to bring onto the project locally",
    ],
    statLabel: "Talent base",
    statBig: "Life sciences",
    statSub: "one of the EU's fastest-growing sectors",
    tiles: null,
    link: null,
  },
] as const;

const FUNDING = [
  {
    name: "Horizon Europe",
    note: "EU grant",
    amount: "up to €10M",
    logo: "/logo-es.svg",
    logoClass: "max-h-11",
  },
  {
    name: "Inovacijų agentūra",
    note: "Lithuania's innovation agency",
    amount: "up to €100K",
    logo: "/IA-logo.webp",
    logoClass: "max-h-9",
  },
  {
    name: "Eurostars 3 / Eureka",
    note: "Cross-border R&D funding",
    amount: "up to €300K",
    logo: "/eureka-logo.png",
    logoClass: "max-h-[52px]",
  },
] as const;

function nodePath(x: number, y: number) {
  // start from the icon border (box 26px → half 13px), toward the center
  const edgeX = x < CX ? x + 15 : x - 15;
  const handleX = x < CX ? edgeX + 52 : edgeX - 52;
  const midX = x < CX ? CX - 55 : CX + 55;
  return `M ${edgeX} ${y} C ${handleX} ${y}, ${midX} ${CY}, ${CX} ${CY}`;
}

// Тонкая ДНК-спираль на фоне, медленно «течёт» сквозь центр.
function DnaHelix() {
  const A = 11;
  const wl = 46;
  const y0 = CY;
  const step = 4;
  const xEnd = 486;
  const k = (2 * Math.PI) / wl;
  let s1 = "";
  let s2 = "";
  for (let x = 0; x <= xEnd; x += step) {
    const y1 = (y0 + A * Math.sin(k * x)).toFixed(2);
    const y2 = (y0 + A * Math.sin(k * x + Math.PI)).toFixed(2);
    s1 += x === 0 ? `M ${x} ${y1}` : ` L ${x} ${y1}`;
    s2 += x === 0 ? `M ${x} ${y2}` : ` L ${x} ${y2}`;
  }
  const rungs: { x: number; y1: string; y2: string }[] = [];
  for (let x = wl / 4; x <= xEnd; x += wl / 2) {
    rungs.push({
      x,
      y1: (y0 + A * Math.sin(k * x)).toFixed(2),
      y2: (y0 + A * Math.sin(k * x + Math.PI)).toFixed(2),
    });
  }
  return (
    <g opacity="0.13">
      <animateTransform
        attributeName="transform"
        type="translate"
        from="0 0"
        to={`-${wl} 0`}
        dur="9s"
        repeatCount="indefinite"
      />
      <path d={s1} fill="none" stroke="rgba(45,212,191,0.9)" strokeWidth="1.1" />
      <path d={s2} fill="none" stroke="rgba(45,212,191,0.9)" strokeWidth="1.1" />
      {rungs.map((r, i) => (
        <line
          key={i}
          x1={r.x}
          y1={r.y1}
          x2={r.x}
          y2={r.y2}
          stroke="rgba(125,245,232,0.65)"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function ConvergenceGraphic({
  active,
  onSelect,
}: {
  active: number | null;
  onSelect: (i: number | null) => void;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20 px-2 py-4 backdrop-blur-sm md:px-8 md:py-7">
      <svg viewBox="26 8 408 228" className="h-auto w-full" aria-hidden>
        <defs>
          <radialGradient id="now-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="35%" stopColor="rgba(125,245,232,0.55)" />
            <stop offset="100%" stopColor="rgba(45,212,191,0)" />
          </radialGradient>
        </defs>

        <DnaHelix />

        {FORCES.map(({ n, tag, img, node }, i) => {
          const path = nodePath(node.x, node.y);
          const isActive = active === i;
          return (
            <g
              key={n}
              onClick={() => onSelect(isActive ? null : i)}
              style={{ cursor: "pointer" }}
            >
              <path
                d={path}
                fill="none"
                stroke={
                  isActive ? "rgba(45,212,191,0.95)" : "rgba(45,212,191,0.35)"
                }
                strokeWidth={isActive ? "2.2" : "1.5"}
                strokeDasharray={isActive ? "4 5" : "3 5"}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </path>

              <circle r="2.6" fill="rgba(125,245,232,0.95)">
                <animateMotion
                  dur="2.6s"
                  repeatCount="indefinite"
                  path={path}
                  calcMode="spline"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  keySplines="0.4 0 0.2 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.8;1"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </circle>

              <rect
                x={node.x - 15}
                y={node.y - 15}
                width="30"
                height="30"
                rx="8"
                fill="rgba(45,212,191,0.15)"
                stroke={
                  isActive ? "rgba(45,212,191,1)" : "rgba(45,212,191,0.45)"
                }
                strokeWidth={isActive ? "1.25" : "1"}
                style={
                  isActive
                    ? { filter: "drop-shadow(0 0 6px rgba(45,212,191,0.7))" }
                    : undefined
                }
              />
              <image
                href={img}
                x={node.x - 10}
                y={node.y - 10}
                width="20"
                height="20"
                preserveAspectRatio="xMidYMid meet"
              />

              <text
                x={node.x}
                y={node.labelY}
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize="12"
                fontWeight="600"
                letterSpacing="0.5"
              >
                <tspan fill={isActive ? "#ffffff" : "rgba(255,255,255,0.78)"}>
                  {tag}
                </tspan>
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r="52" fill="url(#now-glow)">
          <animate
            attributeName="opacity"
            values="0.65;1;0.65"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={CX}
          cy={CY}
          r="38"
          fill="rgba(0,0,0,0.45)"
          stroke="rgba(125,245,232,0.85)"
          strokeWidth="1.5"
        />
        <circle
          cx={CX}
          cy={CY}
          r="38"
          fill="none"
          stroke="rgba(125,245,232,0.5)"
          strokeWidth="1.5"
        >
          <animate
            attributeName="r"
            values="38;48;38"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="12"
          fontWeight="700"
          letterSpacing="1.5"
          fontFamily="system-ui, sans-serif"
        >
          NOW
        </text>
      </svg>
    </div>
  );
}

/* ── Funding-window timeline ── */
function FundingTimeline() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <div className="absolute top-1 bottom-1 left-[8px] w-px bg-white/12 md:hidden" />
      <div className="absolute top-[10px] right-0 left-0 hidden h-px bg-white/12 md:block" />
      <motion.div
        className="absolute top-[10px] left-[calc(10%+10px)] hidden h-px origin-left bg-mint/80 md:block"
        style={{ width: "calc(60% - 10px)" }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: EASE }}
      />

      <ol className="relative flex flex-col gap-7 md:flex-row md:justify-between md:gap-0">
        {TIMELINE.map(({ year, label, state, mark }) => {
          const isNow = state === "now";
          return (
            <li
              key={year + label}
              className="flex items-start gap-4 md:flex-1 md:flex-col md:items-center md:gap-3 md:text-center"
            >
              <span className="relative mt-0.5 flex size-4 shrink-0 items-center justify-center">
                {isNow && !reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                )}
                {mark === "check" ? (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-mint/60 bg-mint/20">
                    <Check className="size-3 text-mint" strokeWidth={3} />
                  </span>
                ) : mark === "cross" ? (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-red-500/60 bg-red-500/20">
                    <X className="size-3 text-red-400" strokeWidth={3} />
                  </span>
                ) : (
                  <span
                    className={[
                      "relative inline-flex rounded-full",
                      isNow
                        ? "size-4 bg-mint shadow-[0_0_18px_2px_rgba(45,212,191,0.7)]"
                        : "size-3 bg-white/35",
                    ].join(" ")}
                  />
                )}
              </span>

              <div className="md:mt-1">
                {isNow && (
                  <span className="mb-1 inline-block rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold tracking-[0.15em] text-mint-lighter uppercase">
                    Now
                  </span>
                )}
                <p
                  className={[
                    "text-sm font-semibold",
                    isNow ? "text-white" : "text-white/55",
                  ].join(" ")}
                >
                  {year}
                </p>
                <p
                  className={[
                    "mt-0.5 text-xs leading-snug",
                    isNow
                      ? "text-mint-lighter"
                      : state === "closed"
                        ? "text-red-400/70"
                        : "text-white/40",
                  ].join(" ")}
                >
                  {label}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── Expandable detail panel for the selected factor ── */
function DetailPanel({ detail }: { detail: (typeof DETAILS)[number] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-mint/55 bg-linear-to-b from-mint/15 to-mint/4 shadow-[0_0_70px_-18px_rgba(45,212,191,0.6)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        <div className="border-b border-mint/20 p-8 md:p-10 lg:border-r lg:border-b-0">
          <div className="text-[11px] font-medium tracking-[0.18em] text-mint-lighter uppercase">
            {detail.eyebrow}
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {detail.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
            {detail.intro}
          </p>

          <ul className="mt-5 space-y-3">
            {detail.points.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mint"
                  strokeWidth={2.5}
                />
                <span className="text-sm leading-relaxed text-white/75">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 md:p-10">
          <p className="text-xs font-medium tracking-[0.2em] text-white/45 uppercase">
            {detail.statLabel}
          </p>
          <p
            className={[
              "mt-3 font-bold tracking-tight text-mint-lighter",
              detail.tiles ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
            ].join(" ")}
          >
            {detail.statBig}
          </p>
          <p className="mt-1 text-sm text-white/60">{detail.statSub}</p>

          {detail.tiles && (
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8">
              {detail.tiles.map(({ value, label }) => (
                <div key={label} className="bg-black/40 p-4">
                  <p className="text-xl font-bold tracking-tight text-white md:text-2xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-white/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {detail.link && (
            <a
              href={detail.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex w-fit items-center gap-2 rounded-xl border border-mint/40 bg-mint/10 px-4 py-2.5 text-sm font-medium text-mint-lighter transition-colors hover:border-mint/60 hover:bg-mint/20"
            >
              Full call details on the EU portal
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* Factor detail: panel + (only for "EU Grant") the linked timeline. */
function ForceDetail({ index }: { index: number }) {
  return (
    <>
      <DetailPanel detail={DETAILS[index]} />
      {index === 0 && (
        <div className="relative mt-5">
          {/* link grant panel → timeline (same as card → panel) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-5 left-1/2 h-5 w-px -translate-x-1/2 bg-gradient-to-b from-mint/0 to-mint/70"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[6px] left-1/2 size-0 -translate-x-1/2 border-x-[6px] border-b-[6px] border-x-transparent border-b-mint/70"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[22px] left-1/2 size-2 -translate-x-1/2 rounded-full bg-mint shadow-[0_0_10px_2px_rgba(45,212,191,0.6)]"
          />
          <div className="rounded-3xl border border-mint/40 bg-linear-to-b from-mint/8 to-transparent p-8 md:p-10">
            <FundingTimeline />
          </div>
        </div>
      )}
    </>
  );
}

export function WhyNowSection() {
  // Collapsed by default; on desktop (≥1024px) open the first card.
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) setActive(0);
  }, []);

  return (
    <div className="w-full">
      <p className="text-xs font-medium tracking-[0.25em] text-white/50 uppercase">
        Why now
      </p>

      <h2 className="mt-4 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
        A narrow window — open right now.
      </h2>

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg">
        Europe is funding the build-out of sovereign health and biotech
        infrastructure across the current 2021–2027 cycle. The same money is
        available to every EU country — and whoever moves first sets the standard
        for the whole region. Lithuania has both the funding channels and the
        talent to do it first. The question isn't{" "}
        <em className="text-white/75 not-italic">whether</em> it gets built, but{" "}
        <em className="text-white/75 not-italic">who</em> and{" "}
        <em className="text-white/75 not-italic">when</em>.
      </p>

      {/* Thesis card: text left, diagram right */}
      <div className="glass-inset mt-12 grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-mint/20 bg-linear-to-b from-mint/12 to-transparent p-6 md:mt-16 md:grid-cols-2 md:items-center md:p-10">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Four factors are converging right now
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
            Capital, technology, the chance to be first, and talented people
            rarely line up —{" "}
            <span className="font-medium text-white">right now they have</span>.
            World-class pharmacogenomics and mature artificial intelligence{" "}
            <span className="font-medium text-white">
              can finally be combined into a working clinical system
            </span>
            : safer and more precise for the patient, more sustainable and
            cheaper for healthcare.{" "}
            <span className="font-medium text-mint-lighter">
              Lithuania can be the place where this becomes the standard first.
            </span>
          </p>
        </div>
        <ConvergenceGraphic active={active} onSelect={setActive} />
      </div>

      {/* Four factors */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {FORCES.map(({ n, tag, img, description }, i) => {
          const isActive = active === i;
          return (
            <Fragment key={n}>
              <button
                type="button"
                onClick={() => setActive(isActive ? null : i)}
                aria-expanded={isActive}
                className={[
                  "relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border p-6 text-left backdrop-blur-md transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-mint/60 md:p-7",
                  isActive
                    ? "border-mint/60 bg-linear-to-b from-mint/20 to-mint/5 shadow-[0_0_50px_-12px_rgba(45,212,191,0.55)]"
                    : "glass-inset border-white/10 bg-white/4 hover:border-white/25",
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

                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className={[
                      "flex size-11 items-center justify-center rounded-xl border",
                      isActive
                        ? "border-mint/60 bg-mint/30"
                        : "border-mint/25 bg-mint/15",
                    ].join(" ")}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt=""
                      className={[
                        "size-7 object-contain",
                        isActive ? "brightness-125" : "",
                      ].join(" ")}
                    />
                  </div>
                  <span className="font-mono text-sm font-semibold text-mint/70">
                    {n}
                  </span>
                </div>

                <h3 className="relative z-10 mt-5 text-base font-semibold tracking-tight text-white">
                  {tag}
                </h3>
                <p
                  className={[
                    "relative z-10 mt-2 text-sm leading-relaxed",
                    isActive ? "text-white/70" : "text-white/50",
                  ].join(" ")}
                >
                  {description}
                </p>

                <div className="relative z-10 mt-4 flex items-center gap-1.5 text-xs font-medium text-mint-lighter">
                  {isActive ? "Hide" : "Details"}
                  <ChevronDown
                    className={[
                      "size-4 transition-transform duration-300",
                      isActive ? "rotate-180" : "",
                    ].join(" ")}
                    strokeWidth={2}
                  />
                </div>
              </button>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative col-span-full lg:hidden"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-4 left-1/2 h-4 w-px -translate-x-1/2 bg-gradient-to-b from-mint/0 to-mint/70"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-[6px] left-1/2 size-0 -translate-x-1/2 border-x-[6px] border-b-[6px] border-x-transparent border-b-mint/70"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-[18px] left-1/2 size-2 -translate-x-1/2 rounded-full bg-mint shadow-[0_0_10px_2px_rgba(45,212,191,0.6)]"
                  />
                  <ForceDetail index={i} />
                </motion.div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Expandable detail panel for the selected factor (desktop) */}
      <AnimatePresence initial={false} mode="wait">
        {active !== null && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative mt-5 hidden lg:block"
          >
            {/* connector from the active card to the panel (desktop) */}
            <div
              aria-hidden
              style={{ left: CONNECTOR_LEFT[active] }}
              className="pointer-events-none absolute -top-5 hidden h-5 w-px -translate-x-1/2 bg-gradient-to-b from-mint/0 to-mint/70 lg:block"
            />
            <div
              aria-hidden
              style={{ left: CONNECTOR_LEFT[active] }}
              className="pointer-events-none absolute -top-[6px] hidden size-0 -translate-x-1/2 border-x-[6px] border-b-[6px] border-x-transparent border-b-mint/70 lg:block"
            />
            <div
              aria-hidden
              style={{ left: CONNECTOR_LEFT[active] }}
              className="pointer-events-none absolute -top-[22px] hidden size-2 -translate-x-1/2 rounded-full bg-mint shadow-[0_0_10px_2px_rgba(45,212,191,0.6)] lg:block"
            />
            <ForceDetail index={active} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Funding channels */}
      <div className="mt-12 md:mt-16">
        <p className="text-center text-xs font-medium tracking-[0.25em] text-white/40 uppercase">
          Funding channels aligned with this project
        </p>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
          {FUNDING.map(({ name, note, amount, logo, logoClass }) => (
            <div
              key={name}
              className="glass-inset flex w-[70%] shrink-0 snap-start flex-col rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-md md:w-auto md:shrink md:p-7"
            >
              <div className="flex h-14 w-2/5 items-center justify-center overflow-hidden rounded-xl bg-white px-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt={name}
                  className={`${logoClass} w-auto object-contain`}
                />
              </div>

              <h4 className="mt-5 text-base font-semibold tracking-tight text-white">
                {name}
              </h4>
              {note && (
                <p className="mt-1 text-xs leading-snug text-white/45">{note}</p>
              )}

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-[11px] tracking-wide text-white/40 uppercase">
                  Available to raise
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-mint-lighter">
                  {amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
