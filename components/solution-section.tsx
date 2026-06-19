import { cn } from "@/lib/utils";
import Image from "next/image";

const STEPS = [
  {
    number: "01",
    title: "Test Once",
    description: "Identify clinically actionable genetic variants.",
    graphic: "test",
  },
  {
    number: "02",
    title: "Interpret With Bioinformatics",
    description:
      "An AI-assisted analysis layer processes raw genomic data — identifying clinically relevant variants and structuring them into profile-ready pharmacogenomic insights.",
    graphic: "analysis",
  },
  {
    number: "03",
    title: "Get a Pharmacogenomic Passport",
    description:
      "A lifelong profile containing medication-relevant genetic information.",
    graphic: "passport",
  },
  {
    number: "04",
    title: "Integrate With Any Platform",
    description: "Results become available across healthcare settings.",
    graphic: "esveikata",
  },
] as const;

const CONNECTOR_GRADIENTS = [
  "linear-gradient(to bottom, #2DD4BF, #20B8A5)",
  "linear-gradient(to bottom, #20B8A5, #179E8D)",
  "linear-gradient(to bottom, #179E8D, #0F8475)",
] as const;

function StepImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className="flex h-full max-h-62 min-h-36 items-end justify-center overflow-hidden rounded-2xl border-4 border-white/10 bg-black/50 backdrop-blur-sm">
      <Image
        src={src}
        alt={alt}
        width={280}
        height={380}
        className={cn(
          "h-full w-full object-contain object-bottom pt-8",
          className,
        )}
      />
    </div>
  );
}

function StepGraphic({ type }: { type: (typeof STEPS)[number]["graphic"] }) {
  if (type === "test") {
    return (
      <StepImage
        src="/how-it-works/1.webp"
        alt="Cheek swab DNA test sample collection"
      />
    );
  }

  if (type === "analysis") {
    return (
      <StepImage
        src="/how-it-works/2.webp"
        alt="DNA sequence analysis with AI-assisted bioinformatics"
        className="-mt-20"
      />
    );
  }

  if (type === "passport") {
    return (
      <div className="flex h-full min-h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm">
        <svg
          viewBox="0 0 200 140"
          className="h-full w-full max-w-xs"
          aria-hidden
        >
          <rect
            x="50"
            y="15"
            width="100"
            height="110"
            rx="8"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.15)"
          />
          <circle cx="100" cy="55" r="18" fill="rgba(255,255,255,0.08)" />
          <circle cx="100" cy="50" r="8" fill="rgba(255,255,255,0.2)" />
          <path
            d="M 88 62 C 88 58, 112 58, 112 62 C 112 68, 88 68, 88 62"
            fill="rgba(255,255,255,0.15)"
          />
          <rect
            x="65"
            y="82"
            width="70"
            height="5"
            rx="2.5"
            fill="rgba(255,255,255,0.12)"
          />
          <rect
            x="65"
            y="93"
            width="50"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="65"
            y="104"
            width="55"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.08)"
          />
          <text
            x="100"
            y="128"
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize="8"
            fontFamily="system-ui, sans-serif"
          >
            PGx Passport
          </text>
        </svg>
      </div>
    );
  }

  if (type === "esveikata") {
    return (
      <div className="flex h-full min-h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm">
        <svg
          viewBox="0 0 200 140"
          className="h-full w-full max-w-xs"
          aria-hidden
        >
          <rect
            x="30"
            y="30"
            width="60"
            height="50"
            rx="8"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.12)"
          />
          <rect
            x="110"
            y="30"
            width="60"
            height="50"
            rx="8"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.12)"
          />
          <rect
            x="70"
            y="80"
            width="60"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(32,184,165,0.45)"
          />
          <path
            d="M 90 55 L 110 55 M 60 55 L 70 55 L 75 90 M 130 55 L 140 55 L 135 90"
            stroke="rgba(32,184,165,0.55)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x="100"
            y="104"
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize="7"
            fontFamily="system-ui, sans-serif"
          >
            eSveikata
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm">
      <svg viewBox="0 0 200 140" className="h-full w-full max-w-xs" aria-hidden>
        <rect
          x="40"
          y="20"
          width="120"
          height="100"
          rx="10"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.12)"
        />
        <rect
          x="55"
          y="38"
          width="90"
          height="8"
          rx="4"
          fill="rgba(255,255,255,0.1)"
        />
        <rect
          x="55"
          y="54"
          width="70"
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.08)"
        />
        <rect
          x="55"
          y="66"
          width="80"
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.08)"
        />
        <rect
          x="55"
          y="84"
          width="50"
          height="20"
          rx="6"
          fill="rgba(45,212,191,0.2)"
          stroke="rgba(32,184,165,0.5)"
        />
        <text
          x="80"
          y="97"
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="7"
          fontFamily="system-ui, sans-serif"
        >
          PGx OK
        </text>
        <path
          d="M 120 94 L 128 102 L 145 85"
          fill="none"
          stroke="rgba(74,222,128,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function SolutionSection() {
  return (
    <div className="w-full">
      <p className="section-eyebrow mx-auto w-fit">The solution</p>

      <h2 className="section-title section-title-lg mx-auto max-w-3xl text-center">
        <span className="text-gradient-headline">One Profile.</span>{" "}
        <span className="block text-white/85 md:inline">
          A Lifetime of Smarter Prescribing.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-white/60 md:text-lg">
        Once a pharmacogenomic profile is generated, it can guide medication
        selection, dosing, and safety decisions whenever a relevant drug is
        prescribed.
      </p>

      <div className="mx-auto mt-16 max-w-5xl md:mt-20">
        <ol className="flex flex-col">
          {STEPS.map((step, index) => (
            <li
              key={step.number}
              className={[
                "relative grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-12",
                index < STEPS.length - 1 ? "pb-16 md:pb-24" : "",
              ].join(" ")}
            >
              {index < STEPS.length - 1 && (
                <div
                  className="pointer-events-none absolute top-10 bottom-0 left-4.5 w-0.5 -translate-x-1/2 rounded-full md:top-11 md:left-5"
                  style={{
                    backgroundImage: CONNECTOR_GRADIENTS[index],
                  }}
                  aria-hidden
                />
              )}

              <div className="flex min-w-0 items-start gap-3 md:gap-4">
                <div className="flex w-9 shrink-0 justify-center md:w-10">
                  <span className="relative z-10 text-3xl font-medium tracking-tight text-white/15 md:text-4xl">
                    {step.number}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="section-heading text-3xl md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50 md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>

              <StepGraphic type={step.graphic} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
