"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ContactSection } from "@/components/contact-section";

const GLASS_PANEL_CLASS =
  "w-full overflow-hidden rounded-t-3xl border border-b-0 border-neutral-500/30 bg-neutral-900/70 backdrop-blur-xs shadow-[inset_0_0_18px_rgba(255,255,255,0.06),inset_0_8px_12px_rgba(255,255,255,0.07),0_-32px_80px_-24px_rgba(0,0,0,0.92)]";

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start 0.55"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [72, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);

  return (
    <footer
      ref={footerRef}
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
        <motion.div
          style={{
            y,
            scale,
            transformOrigin: "bottom center",
          }}
          className={GLASS_PANEL_CLASS}
        >
          <div className="p-8 md:p-16 lg:p-24">
            <ContactSection />
          </div>
          <div className="mt-10 mb-8 flex justify-center md:mt-12">
            <p className="text-center text-xs text-white/40 md:text-sm">
              Copyright © {new Date().getFullYear()} GenoLink Biotechnologies.
              All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
