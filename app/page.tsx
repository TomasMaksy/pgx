import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { ImpactSection } from "@/components/impact-section";
import { PlatformSection } from "@/components/platform-section";
import { ResearchSection } from "@/components/research-section";
import { SolutionSection } from "@/components/solution-section";
import { ScrollSequence } from "@/components/scroll-sequence";

export default function Home() {
  return (
    <>
      <ScrollSequence>
        <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-8 pt-44 md:justify-center md:px-16 md:pt-0 lg:px-24">
          <HeroSection />
        </section>

        <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-8 pb-24 md:justify-center md:px-16 md:pb-32 lg:px-24">
          <ProblemSection />
        </section>
      </ScrollSequence>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <SolutionSection />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <ImpactSection />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <PlatformSection />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <ResearchSection />
      </section>
    </>
  );
}
