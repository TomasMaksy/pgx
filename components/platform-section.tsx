function ClinicalModulesGraphic() {
  const specialties = [
    { label: "Cardiology", x: 12, y: 12 },
    { label: "Oncology", x: 112, y: 12 },
    { label: "Pain", x: 12, y: 72 },
    { label: "Psychiatry", x: 112, y: 72 },
  ];

  return (
    <div className="relative mt-auto w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-sm">
      <svg viewBox="0 0 220 130" className="h-auto w-full" aria-hidden>
        <rect
          x="4"
          y="4"
          width="212"
          height="122"
          rx="14"
          fill="rgba(0,0,0,0.25)"
          stroke="rgba(255,255,255,0.12)"
        />
        {specialties.map(({ label, x, y }) => (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width="96"
              height="46"
              rx="10"
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.14)"
            />
            <circle
              cx={x + 14}
              cy={y + 23}
              r="5"
              fill="rgba(255,255,255,0.35)"
            />
            <rect
              x={x + 26}
              y={y + 18}
              width="52"
              height="4"
              rx="2"
              fill="rgba(255,255,255,0.25)"
            />
            <rect
              x={x + 26}
              y={y + 27}
              width="36"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.12)"
            />
            <text
              x={x + 26}
              y={y + 14}
              fill="rgba(255,255,255,0.45)"
              fontSize="7"
              fontFamily="system-ui, sans-serif"
            >
              {label}
            </text>
          </g>
        ))}
        <path
          d="M 108 35 L 112 35 M 108 93 L 112 93 M 60 58 L 60 62 M 160 58 L 160 62"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function PolypharmacyGraphic() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden">
      <svg viewBox="0 0 280 200" className="h-full max-h-48 w-full" aria-hidden>
        <defs>
          <linearGradient id="poly-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.45)" />
          </linearGradient>
        </defs>
        {[
          { cx: 70, cy: 50, r: 22 },
          { cx: 210, cy: 55, r: 18 },
          { cx: 140, cy: 120, r: 26 },
          { cx: 55, cy: 155, r: 16 },
          { cx: 225, cy: 160, r: 20 },
        ].map(({ cx, cy, r }, i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.18)"
            />
            <rect
              x={cx - 8}
              y={cy - 3}
              width="16"
              height="6"
              rx="3"
              fill="rgba(255,255,255,0.2)"
            />
          </g>
        ))}
        <path
          d="M 88 58 C 110 70, 120 95, 125 108 M 192 68 C 170 85, 155 100, 148 112 M 78 148 C 95 138, 115 128, 128 122 M 205 152 C 185 140, 165 130, 155 125"
          fill="none"
          stroke="url(#poly-line)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx="140" cy="120" r="4" fill="rgba(45,212,191,0.9)" />
      </svg>
    </div>
  );
}

function LearningGraphic() {
  return (
    <div className="relative flex shrink-0 items-center justify-end">
      <svg viewBox="0 0 120 100" className="h-24 w-28" aria-hidden>
        <circle
          cx="60"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
        />
        <circle
          cx="60"
          cy="50"
          r="28"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
        <path
          d="M 60 12 A 38 38 0 0 1 92 68"
          fill="none"
          stroke="rgba(45,212,191,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="92" cy="68" r="4" fill="rgba(45,212,191,0.9)" />
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 60 + Math.cos(rad) * 20;
          const y = 50 + Math.sin(rad) * 20;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={3 - i * 0.3}
              fill={`rgba(255,255,255,${0.15 + i * 0.08})`}
            />
          );
        })}
      </svg>
    </div>
  );
}

function BalticDatabaseGraphic() {
  return (
    <div className="relative flex shrink-0 items-center">
      <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden>
        <ellipse
          cx="50"
          cy="28"
          rx="32"
          ry="10"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.2)"
        />
        <path
          d="M 18 28 L 18 62 C 18 68 32 72 50 72 C 68 72 82 68 82 62 L 82 28"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.2)"
        />
        <ellipse
          cx="50"
          cy="44"
          rx="32"
          ry="10"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
        />
        <ellipse
          cx="50"
          cy="58"
          rx="32"
          ry="10"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
        />
        <circle cx="50" cy="28" r="5" fill="rgba(45,212,191,0.85)" />
      </svg>
    </div>
  );
}

type BentoCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  variant?: "hero" | "default";
  layout?: "stacked" | "split";
  graphicPosition?: "left" | "right";
};

function BentoCard({
  title,
  description,
  children,
  className = "",
  variant = "default",
  layout = "stacked",
  graphicPosition = "left",
}: BentoCardProps) {
  const isHero = variant === "hero";
  const isSplit = layout === "split";

  const copy = (
    <div className="relative z-10 min-w-0 flex-1">
      <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">
        {title}
      </h3>
      <p
        className={[
          "mt-2 text-sm leading-relaxed",
          isHero ? "text-white/75" : "text-white/45",
        ].join(" ")}
      >
        {description}
      </p>
    </div>
  );

  const graphic = <div className="relative z-10 shrink-0">{children}</div>;

  return (
    <article
      className={[
        "group relative flex overflow-hidden rounded-3xl border p-6 md:p-8",
        isHero
          ? "border-mint/20 bg-linear-to-b from-mint via-mint-dark to-mint-darkest"
          : "glass-inset border-white/10 bg-white/4 backdrop-blur-md",
        isSplit ? "flex-row items-center justify-between gap-6" : "flex-col",
        className,
      ].join(" ")}
    >
      {!isHero && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      )}

      {isSplit ? (
        graphicPosition === "right" ? (
          <>
            {copy}
            {graphic}
          </>
        ) : (
          <>
            {graphic}
            {copy}
          </>
        )
      ) : (
        <>
          <div className="relative z-10 flex flex-1 flex-col">{children}</div>
          <div className="relative z-10 mt-auto pt-6">{copy}</div>
        </>
      )}
    </article>
  );
}

export function PlatformSection() {
  return (
    <div className="w-full">
      <p className="text-xs font-medium tracking-[0.25em] text-white/50 uppercase">
        The platform
      </p>

      <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
        Built for every stage of the prescribing journey.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] md:gap-5">
        <BentoCard
          variant="hero"
          title="Clinical Modules"
          description="PGx guidance across cardiology, oncology, pain medicine, and psychiatry — safer prescribing, fewer adverse reactions, and dosing tailored to each patient."
          className="min-h-[420px] md:row-span-2 md:min-h-[560px]"
        >
          <ClinicalModulesGraphic />
        </BentoCard>

        <BentoCard
          title="Polypharmacy Engine"
          description="Detects high-risk polypharmacy patterns before complications occur."
          className="min-h-[420px] md:row-span-2 md:min-h-[560px]"
        >
          <PolypharmacyGraphic />
        </BentoCard>

        <BentoCard
          title="Continuous Learning Platform"
          description="Treatment decisions and clinical outcomes continuously strengthen the platform’s prescribing intelligence."
          layout="split"
          graphicPosition="right"
          className="min-h-[200px] md:col-start-3 md:row-start-1"
        >
          <LearningGraphic />
        </BentoCard>

        <BentoCard
          title="Baltic PGx Database"
          description="Building the largest pharmacogenomics database in the Baltic region."
          layout="split"
          graphicPosition="left"
          className="min-h-[200px] md:col-start-3 md:row-start-2"
        >
          <BalticDatabaseGraphic />
        </BentoCard>
      </div>
    </div>
  );
}
