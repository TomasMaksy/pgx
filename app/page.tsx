import { ChevronRight } from "lucide-react";
import { Logos8 } from "@/components/logos8";
import { ScrollSequence } from "@/components/scroll-sequence";

export default function Home() {
  return (
    <>
      <ScrollSequence>
        <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-8 pt-24 md:justify-center md:px-16 md:pt-0 lg:px-24">
          <h1 className="max-w-5xl text-4xl leading-none font-semibold tracking-tight text-white md:text-5xl lg:text-7xl">
            Your DNA <br /> Doesn&apos;t Change.
            <br />
            <span className="font-serif font-semibold tracking-tighter italic">
              Prescribing
            </span>{" "}
            Should.
          </h1>
          <p className="mt-6 max-w-md text-base text-white md:text-2xl">
            Clinical decision support powered by pharmacogenomics and AI
          </p>
          <button
            type="button"
            className="glass-inset mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 md:text-base"
          >
            Get Started
            <ChevronRight className="size-4" strokeWidth={2} />
          </button>
        </section>
      </ScrollSequence>

      <div className="relative z-10 bg-black">
        <div aria-hidden className="h-32 md:h-48" />
        <Logos8
          heading="Backed by research from"
          className="py-16 text-neutral-300 md:py-24 [&_img]:invert"
        />
        <div aria-hidden className="h-32 md:h-48" />
      </div>
    </>
  );
}
