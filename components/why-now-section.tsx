"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Sheet, SheetPanel, SheetPopup } from "@/components/ui/sheet";

const CX = 230;
const CY = 122;

const CALL_URL =
  "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/HORIZON-HLTH-2027-01-CARE-02";

// Single source of truth: same nodes drive the diagram and the cards.
const FORCES = [
  {
    n: "01",
    tag: "EU Grant",
    img: "/eur.webp",
    node: { x: 95, y: 46, labelY: 46 - 28 },
  },
  {
    n: "02",
    tag: "AI Technology",
    img: "/ai.webp",
    node: { x: 95, y: 198, labelY: 198 + 34 },
  },
  {
    n: "03",
    tag: "First-Mover Edge",
    img: "/time.webp",
    node: { x: 365, y: 46, labelY: 46 - 28 },
  },
  {
    n: "04",
    tag: "Lithuanian Talent",
    img: "/lithuania.webp",
    node: { x: 365, y: 198, labelY: 198 + 34 },
  },
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

function nodePath(x: number, y: number) {
  // start from the icon border (box 38px → half 19px), toward the center
  const edgeX = x < CX ? x + 20 : x - 20;
  const handleX = x < CX ? edgeX + 52 : edgeX - 52;
  const midX = x < CX ? CX - 55 : CX + 55;
  return `M ${edgeX} ${y} C ${handleX} ${y}, ${midX} ${CY}, ${CX} ${CY}`;
}

function ConvergenceGraphic({
  openSheet,
  onSelect,
}: {
  openSheet: number | null;
  onSelect: (i: number | null) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black/20 px-2 py-4 backdrop-blur-sm md:px-8 md:py-7">
      <svg viewBox="26 8 408 228" className="h-auto w-full" aria-hidden>
        <defs>
          <radialGradient id="now-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {FORCES.map(({ n, tag, img, node }, i) => {
          const path = nodePath(node.x, node.y);
          const isOpen = openSheet === i;
          const isHovered = hovered === i;
          const active = isOpen || isHovered;
          return (
            <g
              key={n}
              onClick={() => onSelect(isOpen ? null : i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              style={{ cursor: "pointer" }}
            >
              <path
                d={path}
                fill="none"
                stroke={
                  active ? "rgba(45,212,191,0.95)" : "rgba(45,212,191,0.35)"
                }
                strokeWidth={active ? "2.2" : "1.5"}
                strokeDasharray={active ? "4 5" : "3 5"}
                style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
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

              {/* Larger transparent hit area for easier interaction */}
              <rect
                x={node.x - 26}
                y={node.y - 26}
                width="52"
                height="52"
                fill="transparent"
              />

              {/* Icon button — scales and glows on hover/open */}
              <g
                style={{
                  transformBox: "view-box",
                  transformOrigin: `${node.x}px ${node.y}px`,
                  transform: active ? "scale(1.14)" : "scale(1)",
                  transition:
                    "transform 0.28s cubic-bezier(0.16,1,0.3,1), filter 0.28s",
                  filter: active
                    ? "drop-shadow(0 0 9px rgba(45,212,191,0.75))"
                    : "drop-shadow(0 0 0 rgba(45,212,191,0))",
                }}
              >
                <rect
                  x={node.x - 19}
                  y={node.y - 19}
                  width="38"
                  height="38"
                  rx="10"
                  fill={
                    active ? "rgba(45,212,191,0.24)" : "rgba(45,212,191,0.13)"
                  }
                  stroke={
                    active ? "rgba(45,212,191,1)" : "rgba(45,212,191,0.45)"
                  }
                  strokeWidth={active ? "1.4" : "1"}
                  style={{
                    transition: "fill 0.25s, stroke 0.25s, stroke-width 0.25s",
                  }}
                />
                <image
                  href={img}
                  x={node.x - 13}
                  y={node.y - 13}
                  width="26"
                  height="26"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>

              <text
                x={node.x}
                y={node.labelY}
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize="12"
                fontWeight="600"
                letterSpacing="0.5"
                style={{ transition: "fill 0.25s" }}
              >
                <tspan fill={active ? "#ffffff" : "rgba(255,255,255,0.78)"}>
                  {tag}
                </tspan>
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r="32" fill="url(#now-glow)" />
        <circle
          cx={CX}
          cy={CY}
          r="26"
          fill="rgba(0,0,0,0.92)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
        />
        <text
          x={CX}
          y={CY + 3}
          textAnchor="middle"
          fill="rgba(255,255,255,0.55)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="1.2"
          fontFamily="system-ui, sans-serif"
        >
          NOW
        </text>
      </svg>
    </div>
  );
}

/* ── Expandable detail panel for the selected factor ── */
function DetailPanel({ detail }: { detail: (typeof DETAILS)[number] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <div className="border-b border-white/10 p-8 md:p-10 lg:border-r lg:border-b-0">
        <div className="text-mint-lighter text-[11px] font-medium tracking-[0.18em] uppercase">
          {detail.eyebrow}
        </div>

        <h3 className="section-heading mt-4 text-2xl md:text-3xl">
          {detail.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
          {detail.intro}
        </p>

        <ul className="mt-5 space-y-3">
          {detail.points.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check
                className="text-mint mt-0.5 size-4 shrink-0"
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
            "text-mint-lighter mt-3 font-bold tracking-tight",
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
                <p className="text-xl font-medium tracking-tight text-white/85 md:text-2xl">
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
            className="group border-mint/40 bg-mint/10 text-mint-lighter hover:border-mint/60 hover:bg-mint/20 mt-6 flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
          >
            Full call details on the EU portal
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        )}
      </div>
    </div>
  );
}

export function WhyNowSection() {
  const [openSheet, setOpenSheet] = useState<number | null>(null);

  return (
    <div className="w-full">
      <p className="section-eyebrow">Why now</p>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <h2 className="section-title max-w-3xl">Limited Window</h2>

          <p className="mt-2 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg">
            Europe is funding the build-out of sovereign health and biotech
            infrastructure across the current 2021–2027 cycle. The same money is
            available to every EU country — and whoever moves first sets the
            standard for the whole region. Lithuania has both the funding
            channels and the talent to do it first. The question isn&apos;t{" "}
            <em className="text-white/75 not-italic">whether</em> it gets built,
            but <em className="text-white/75 not-italic">who</em> and{" "}
            <em className="text-white/75 not-italic">when</em>.
          </p>
        </div>
        <ConvergenceGraphic openSheet={openSheet} onSelect={setOpenSheet} />
      </div>

      <Sheet
        open={openSheet !== null}
        onOpenChange={(open) => {
          if (!open) setOpenSheet(null);
        }}
      >
        <SheetPopup
          side="bottom"
          showCloseButton={false}
          className="glass-inset max-h-[88vh] rounded-t-[28px] border border-b-0 border-white/15 bg-black/60 text-white shadow-[0_-12px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl before:hidden"
        >
          <div className="flex shrink-0 justify-center pt-4 pb-2" aria-hidden>
            <div className="h-1 w-10 rounded-full bg-white/25" />
          </div>
          <SheetPanel className="mx-auto w-full max-w-7xl px-8 py-8 md:px-16 md:py-12 lg:px-24">
            {openSheet !== null && <DetailPanel detail={DETAILS[openSheet]} />}
          </SheetPanel>
        </SheetPopup>
      </Sheet>
    </div>
  );
}
