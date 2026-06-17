"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ChevronRight,
  Cpu,
  Dna,
  Droplet,
  FlaskConical,
  Pill,
  RefreshCw,
  Stethoscope,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// One-time — создаёт пожизненный профиль.
const ONCE = [
  { icon: Droplet, label: "One test" },
  { icon: FlaskConical, label: "Lab" },
] as const;

// Repeats for every prescription (reuses the profile).
const REPEAT = [
  { icon: Activity, label: "Patient's condition", active: false },
  { icon: Cpu, label: "AI analysis", active: true },
  { icon: Stethoscope, label: "Doctor's decision", active: false },
  { icon: Pill, label: "Prescription", active: false },
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

function StepIcon({
  Icon,
  active,
  reduce,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
  reduce: boolean | null;
}) {
  return (
    <div className="relative z-10">
      {active && !reduce && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-mint/45 blur-md"
          animate={{ opacity: [0.4, 0.95, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div
        className={[
          "relative flex size-12 items-center justify-center overflow-hidden rounded-xl border bg-black/40",
          active ? "border-mint/60 bg-mint/25" : "border-white/12",
        ].join(" ")}
      >
        <Icon
          className={active ? "size-5 text-mint-lighter" : "size-5 text-mint"}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

export function LifetimeFlow() {
  const reduce = useReducedMotion();

  // Единый источник: точка циркулирует по повторяющемуся циклу.
  const progress = useMotionValue(0);
  useEffect(() => {
    if (reduce) return;
    const controls = animate(progress, 1, {
      duration: 5.5,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [reduce, progress]);

  // путь точки (grid-cols-4: центры 12.5% / 37.5% / 62.5% / 87.5%)
  const LK = [0, 0.1, 0.22, 0.45, 0.55, 0.85, 1];
  const dotLeft = useTransform(progress, LK, [
    "12.5%",
    "37.5%",
    "37.5%",
    "87.5%",
    "87.5%",
    "12.5%",
    "12.5%",
  ]);
  const dotTop = useTransform(progress, LK, [24, 24, 24, 24, 120, 120, 24]);

  const AK = [0, 0.08, 0.13, 0.22, 0.28, 1];
  const aiFill = useTransform(progress, AK, [0, 0, 0.65, 0.65, 0, 0]);
  const aiGlow = useTransform(progress, AK, [0, 0, 1, 1, 0, 0]);
  const aiBorder = useTransform(progress, AK, [
    "rgba(255,255,255,0.12)",
    "rgba(255,255,255,0.12)",
    "rgba(45,212,191,0.9)",
    "rgba(45,212,191,0.9)",
    "rgba(255,255,255,0.12)",
    "rgba(255,255,255,0.12)",
  ]);
  const aiIconColor = useTransform(progress, AK, [
    "#5eead4",
    "#5eead4",
    "#06120f",
    "#06120f",
    "#5eead4",
    "#5eead4",
  ]);

  return (
    <div className="mt-16 md:mt-24">
      <Reveal>
        <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          From one test — to every future prescription
        </h3>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-6 md:p-8">
          {/* DESKTOP: две связанные сферы */}
          <div className="hidden items-stretch gap-4 md:grid md:grid-cols-[minmax(0,0.72fr)_auto_minmax(0,1.75fr)]">
            {/* Панель A — однократно → пожизненный профиль */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex justify-center">
                <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white/75 uppercase">
                  One-time
                </span>
              </div>
              <div className="mt-6 flex items-start justify-center gap-3">
                <div className="flex flex-col items-center gap-2.5 text-center">
                  <StepIcon Icon={ONCE[0].icon} active={false} reduce={reduce} />
                  <span className="text-sm font-medium text-white/60">
                    {ONCE[0].label}
                  </span>
                </div>
                <ChevronRight
                  className="mt-3.5 size-4 shrink-0 text-white/25"
                  strokeWidth={2}
                />
                <div className="flex flex-col items-center gap-2.5 text-center">
                  <StepIcon Icon={ONCE[1].icon} active={false} reduce={reduce} />
                  <span className="text-sm font-medium text-white/60">
                    {ONCE[1].label}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-2 text-xs font-medium text-mint-lighter">
                  <Dna className="size-3.5 shrink-0" strokeWidth={2} />
                  Lifetime profile
                </span>
              </div>
            </div>

            {/* связь */}
            <div className="flex flex-col items-center justify-center gap-2 px-1 text-mint/70">
              <motion.span
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="inline-flex"
                aria-hidden
              >
                <RefreshCw className="size-4" strokeWidth={2} />
              </motion.span>
              <ArrowRight className="size-6" strokeWidth={1.5} />
              <span className="max-w-[7ch] text-center text-[10px] font-medium tracking-wide text-mint/60">
                every time
              </span>
            </div>

            {/* Панель B — повторяется (цикл) */}
            <div className="rounded-2xl border border-mint/25 bg-mint/[0.04] p-6">
              <div className="flex justify-center">
                <span className="inline-flex rounded-full border border-mint/40 bg-mint/15 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-mint-lighter uppercase">
                  Every prescription
                </span>
              </div>
              <div className="relative mt-6">
                {!reduce && (
                  <motion.div
                    className="absolute z-20 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_10px_2px_rgba(45,212,191,0.85)]"
                    style={{ left: dotLeft, top: dotTop }}
                  />
                )}
                <div className="grid grid-cols-4">
                  {REPEAT.map(({ icon: Icon, label, active }, i) => (
                    <div
                      key={label}
                      className="relative flex flex-col items-center gap-2.5 text-center"
                    >
                      {i < REPEAT.length - 1 && (
                        <div
                          aria-hidden
                          className="absolute top-6 left-1/2 w-full border-t border-dashed border-mint/30"
                        />
                      )}
                      {active && !reduce ? (
                        <div className="relative z-10">
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-mint/55 blur-md"
                            style={{ opacity: aiGlow }}
                          />
                          <motion.div
                            className="relative flex size-12 items-center justify-center overflow-hidden rounded-xl border bg-black/40"
                            style={{ borderColor: aiBorder }}
                          >
                            <motion.span
                              className="absolute inset-0 bg-mint"
                              style={{ opacity: aiFill }}
                              aria-hidden
                            />
                            <motion.span
                              className="relative inline-flex"
                              style={{ color: aiIconColor }}
                            >
                              <Icon className="size-5" strokeWidth={2} />
                            </motion.span>
                          </motion.div>
                        </div>
                      ) : (
                        <StepIcon Icon={Icon} active={active} reduce={reduce} />
                      )}
                      <span
                        className={[
                          "text-sm font-medium",
                          active ? "text-white" : "text-white/55",
                        ].join(" ")}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  aria-hidden
                  className="absolute top-6 right-[12.5%] left-[12.5%] h-[94px] rounded-b-2xl border border-t-0 border-dashed border-mint/30"
                />
              </div>
            </div>
          </div>

          {/* MOBILE: две связанные сферы (стопкой) */}
          <div className="space-y-4 md:hidden">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white/75 uppercase">
                One-time
              </span>
              <ol className="mt-4 space-y-3">
                {ONCE.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-4">
                    <div className="shrink-0">
                      <StepIcon Icon={Icon} active={false} reduce={reduce} />
                    </div>
                    <span className="text-base font-medium text-white/65">
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-2 text-xs font-medium text-mint-lighter">
                  <Dna className="size-3.5 shrink-0" strokeWidth={2} />
                  Lifetime profile
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-mint/70">
              <motion.span
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="inline-flex"
                aria-hidden
              >
                <RefreshCw className="size-4" strokeWidth={2} />
              </motion.span>
              <span className="text-[10px] font-medium tracking-[0.15em] text-mint/60 uppercase">
                every time
              </span>
              <ArrowDown className="size-4" strokeWidth={2} />
            </div>

            <div className="rounded-2xl border border-mint/25 bg-mint/[0.04] p-5">
              <span className="inline-flex rounded-full border border-mint/40 bg-mint/15 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-mint-lighter uppercase">
                Every prescription
              </span>
              <ol className="mt-4 space-y-3">
                {REPEAT.map(({ icon: Icon, label, active }) => (
                  <li key={label} className="flex items-center gap-4">
                    <div className="shrink-0">
                      <StepIcon Icon={Icon} active={active} reduce={reduce} />
                    </div>
                    <span
                      className={[
                        "text-base font-medium",
                        active ? "text-white" : "text-white/65",
                      ].join(" ")}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
