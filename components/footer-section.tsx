import Image from "next/image";
import { ContactSection } from "@/components/contact-section";

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative z-10 w-full scroll-mt-24 pt-8 md:pt-12"
    >
      <div
        aria-hidden
        className="pointer-events-none relative z-0 flex justify-center overflow-hidden pb-2"
      >
        <span className="relative block h-14 w-[196px] opacity-15 brightness-200 md:h-20 md:w-[281px] lg:h-48 lg:w-[674px]">
          <Image
            src="/grey-matte-logo-main.webp"
            alt="GenoLink Biotechnologies"
            fill
            unoptimized
            className="object-contain"
          />
        </span>
      </div>

      <div className="relative z-10 mx-auto -mt-24 w-full max-w-7xl px-8 md:-mt-32 md:px-16 lg:px-24">
        <div className="glass-inset w-full overflow-hidden rounded-t-3xl border border-b-0 border-neutral-500/30 bg-neutral-900/70 backdrop-blur-xs">
          <div className="p-8 md:p-16 lg:p-24">
            <ContactSection />
          </div>
          <div className="mt-10 mb-8 flex justify-center md:mt-12">
            <p className="text-center text-xs text-white/40 md:text-sm">
              Copyright © {new Date().getFullYear()} GenoLink Biotechnologies.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
