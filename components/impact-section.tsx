import { Check, X } from "lucide-react";

const COMPARISONS = [
  {
    traditional: "23.6% actionable gene–drug interactions go unidentified",
    precision: "95% have actionable genetic insights",
  },
  {
    traditional: "Medication risks discovered after treatment begins",
    precision: "Risks identified before the first dose",
  },
  {
    traditional: "Higher rates of adverse drug reactions",
    precision: "↓30% clinically relevant ADRs",
  },
  {
    traditional: "Longer hospital stays",
    precision: "↓36% hospitalization duration",
  },
  {
    traditional: "Higher downstream healthcare costs",
    precision: "€276 lower costs per actionable patient",
  },
  {
    traditional: "One prescription at a time",
    precision: "One profile, lifelong guidance",
  },
] as const;

export function ImpactSection() {
  return (
    <div className="w-full">
      <p className="section-eyebrow mx-auto w-fit">
        The impact
      </p>

      <h2 className="section-title mx-auto max-w-4xl text-center">
        What Happens When Prescribing Becomes Genetics-Aware?
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-white/55 md:text-lg">
        When medication decisions are informed by pharmacogenomics, clinicians
        can identify inherited medication risks before treatment begins—reducing
        avoidable adverse drug reactions, improving treatment effectiveness, and
        lowering healthcare utilization.
      </p>

      <div className="glass-inset mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-md md:mt-16">
        <div className="grid grid-cols-1 border-b border-white/10 md:grid-cols-2">
          <div className="border-b border-white/10 px-6 py-5 text-center md:border-r md:border-b-0 md:px-8 md:py-6">
            <h3 className="section-heading text-lg text-white/50 md:text-xl">
              Traditional Care
            </h3>
          </div>
          <div className="border-mint/20 bg-linear-to-b from-mint/10 to-transparent px-6 py-5 text-center md:px-8 md:py-6">
            <h3 className="section-heading text-lg md:text-xl">
              Precision Prescribing
            </h3>
          </div>
        </div>

        <ul className="divide-y divide-white/10">
          {COMPARISONS.map((row) => (
            <li
              key={row.traditional}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              <div className="flex items-start gap-3 border-b border-white/8 px-6 py-4 md:gap-4 md:border-r md:border-b-0 md:px-8 md:py-5">
                <X
                  className="mt-0.5 size-4 shrink-0 text-white/25"
                  strokeWidth={2}
                />
                <p className="text-sm leading-relaxed text-white/40 md:text-base">
                  {row.traditional}
                </p>
              </div>
              <div className="flex items-start gap-3 bg-mint/5 px-6 py-4 md:gap-4 md:px-8 md:py-5">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mint"
                  strokeWidth={2}
                />
                <p className="text-sm leading-relaxed text-white/75 md:text-base">
                  {row.precision}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
