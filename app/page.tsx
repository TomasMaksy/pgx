import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { ImpactSection } from "@/components/impact-section";
import { MetricsSection } from "@/components/metrics-section";
import { PlatformSection } from "@/components/platform-section";
import { ResearchSection } from "@/components/research-section";
import { SolutionSection } from "@/components/solution-section";
import { VisionSection } from "@/components/vision-section";
import { WhyNowSection } from "@/components/why-now-section";
import { MoreFeaturesSection } from "@/components/more-features-section";
import { ScrollSequence } from "@/components/scroll-sequence";

export default function Home() {
  return (
    <div className="relative">
      <ScrollSequence>
        <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-8 pt-44 md:justify-center md:px-16 md:pt-0 lg:px-24">
          <HeroSection />
        </section>

        <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-8 pb-24 md:justify-center md:px-16 md:pb-32 lg:px-24">
          <ProblemSection />
        </section>
      </ScrollSequence>

      <section
        id="product"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-8 py-16 md:px-16 md:py-20 lg:px-24"
      >
        <SolutionSection />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-16 md:px-16 md:py-20 lg:px-24">
        <ImpactSection />
      </section>

      <section
        id="platform"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-8 py-16 md:px-16 md:py-20 lg:px-24"
      >
        <PlatformSection />
      </section>

      <section
        id="impact"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-8 py-16 md:px-16 md:py-20 lg:px-24"
      >
        <MetricsSection />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-16 md:px-16 md:py-20 lg:px-24">
        <ResearchSection />
      </section>

      <section
        id="why-now"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-8 py-16 md:px-16 md:py-20 lg:px-24"
      >
        <WhyNowSection />
      </section>

      <section
        id="goals"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-8 py-16 md:px-16 md:py-20 lg:px-24"
      >
        <VisionSection />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-16 md:px-16 md:py-20 lg:px-24">
        <MoreFeaturesSection />
      </section>
    </div>
  );
}
