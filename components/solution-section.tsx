"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const STEPS = [
  {
    number: "01",
    title: "Sequence Once",
    description:
      "A one-time sample is sequenced to identify the clinically actionable genetic variants that influence drug response. No repeat testing — the same data supports prescribing decisions for years to come.",
    graphic: "test",
  },
  {
    number: "02",
    title: "Interpret With Bioinformatics",
    description:
      "An AI-assisted analysis layer processes the raw genomic data, flags clinically relevant variants, and structures them into standardized, prescribing-ready pharmacogenomic insights.",
    graphic: "analysis",
  },
  {
    number: "03",
    title: "Generate a Pharmacogenomic Passport",
    description:
      "The result is a lifelong profile that consolidates each patient's medication-relevant genetics into a single, portable record clinicians can reference at the point of care.",
    graphic: "passport",
  },
  {
    number: "04",
    title: "Integrate With Any Platform",
    description:
      "Profiles surface across healthcare settings and systems — supporting consistent, evidence-based prescribing at both the individual and population level.",
    graphic: "esveikata",
  },
] as const;

const CONNECTOR_GRADIENTS = [
  "linear-gradient(to bottom, #2DD4BF, #20B8A5)",
  "linear-gradient(to bottom, #20B8A5, #179E8D)",
  "linear-gradient(to bottom, #179E8D, #0F8475)",
] as const;

const stepGraphicShell =
  "relative flex h-48 w-full shrink-0 overflow-hidden rounded-2xl border-4 border-white/10 bg-black/50 backdrop-blur-sm md:h-62";

function PlatformIntegrationGraphic() {
  return (
    <div className={cn(stepGraphicShell, "items-center")}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <pattern
            id="integration-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="rgba(45,212,191,0.22)"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id="integration-grid-fade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </radialGradient>
          <mask id="integration-grid-mask">
            <rect
              width="100%"
              height="100%"
              fill="url(#integration-grid-fade)"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#integration-grid)"
          mask="url(#integration-grid-mask)"
        />
      </svg>

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.08)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full w-full items-center gap-4 px-8 py-6 md:gap-6 md:px-12 md:py-8">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center md:h-16 md:w-16">
          <div
            className="absolute inset-[-20%] rounded-full bg-mint/15 blur-2xl"
            aria-hidden
          />
          <Image
            src="/logo_icon.webp"
            alt="GenoLink"
            width={96}
            height={96}
            className="relative h-full w-full object-contain drop-shadow-[0_0_18px_rgba(45,212,191,0.45)]"
          />
        </div>

        <div className="relative flex min-w-0 flex-1 items-center">
          <div
            className="absolute inset-y-1/2 h-px w-full -translate-y-1/2 bg-white/10"
            aria-hidden
          />
          <div
            className="integration-dash absolute inset-y-1/2 h-0.5 w-full -translate-y-1/2 opacity-80"
            aria-hidden
          />

          <div className="relative h-8 w-full" aria-hidden>
            <span className="integration-packet absolute top-1/2 size-2 rounded-full bg-mint shadow-[0_0_10px_rgba(45,212,191,0.9)]" />
            <span className="integration-packet integration-packet-delay-1 absolute top-1/2 size-1.5 rounded-full bg-mint-light/90 shadow-[0_0_8px_rgba(94,234,212,0.8)]" />
            <span className="integration-packet integration-packet-delay-2 absolute top-1/2 size-1 rounded-full bg-mint/70 shadow-[0_0_6px_rgba(45,212,191,0.7)]" />
          </div>

          <div
            className="absolute top-1/2 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint/40 bg-mint/20"
            aria-hidden
          />
          <div
            className="absolute top-1/2 right-0 size-2 translate-x-1/2 -translate-y-1/2 rounded-full border border-mint/40 bg-mint/20"
            aria-hidden
          />
        </div>

        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center md:h-16 md:w-16">
          <div
            className="absolute inset-[-20%] rounded-full bg-mint/15 blur-2xl"
            aria-hidden
          />
          <Image
            src="/esvlogo.webp"
            alt="eSveikata"
            width={96}
            height={96}
            className="relative h-full w-full object-contain drop-shadow-[0_0_18px_rgba(45,212,191,0.45)]"
          />
        </div>
      </div>
    </div>
  );
}

function StepImage({
  src,
  alt,
  imageClassName,
  priority = false,
  fit = "portrait",
}: {
  src: string;
  alt: string;
  imageClassName?: string;
  priority?: boolean;
  fit?: "portrait" | "landscape";
}) {
  return (
    <div
      className={cn(
        stepGraphicShell,
        fit === "portrait" ? "items-end justify-center" : "items-center justify-center",
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          fit === "portrait"
            ? "object-contain object-bottom pt-4 md:pt-8"
            : "object-cover object-center",
          imageClassName,
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
        imageClassName=" -translate-y-3"
      />
    );
  }

  if (type === "passport") {
    return (
      <StepImage
        src="/how-it-works/3.webp"
        alt="Pharmacogenomic passport with lifelong medication-relevant genetic profile"
        fit="landscape"
        priority
      />
    );
  }

  if (type === "esveikata") {
    return <PlatformIntegrationGraphic />;
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
  const { t } = useI18n();
  return (
    <div className="w-full">
      <p className="section-eyebrow mx-auto w-fit">{t("The solution")}</p>

      <h2 className="section-title section-title-lg mx-auto max-w-3xl text-center">
        <span className="text-gradient-headline">{t("One Profile.")}</span>{" "}
        <span className="block text-white/85 md:inline">
          {t("A Lifetime of Smarter Prescribing.")}
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-white/60 md:text-lg">
        {t(
          "Once a pharmacogenomic profile is generated, it can guide medication selection, dosing, and safety decisions whenever a relevant drug is prescribed.",
        )}
      </p>

      <div className="mx-auto mt-16 max-w-5xl md:mt-20">
        <ol className="flex flex-col">
          {STEPS.map((step, index) => (
            <li
              key={step.number}
              className={[
                "relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 gap-y-5 md:grid-cols-2 md:items-stretch md:gap-x-12 md:gap-y-0",
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

              <div className="col-start-1 row-start-1 flex items-start gap-3 max-md:contents md:gap-4">
                <div className="col-start-1 row-start-1 flex w-9 shrink-0 justify-center md:w-10">
                  <span className="relative z-10 text-3xl font-medium tracking-tight text-white/15 md:text-4xl">
                    {step.number}
                  </span>
                </div>

                <div className="col-start-2 row-start-1 min-w-0 md:flex-1">
                  <h3 className="section-heading text-3xl md:text-4xl">
                    {t(step.title)}
                  </h3>
                  <p className="mt-2 text-lg leading-relaxed text-white/50">
                    {t(step.description)}
                  </p>
                </div>
              </div>

              <div className="col-start-2 row-start-2 min-w-0 md:col-start-2 md:row-start-1">
                <StepGraphic type={step.graphic} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
