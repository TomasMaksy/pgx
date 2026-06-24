"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import GradualBlur from "@/components/gradual-blur";
import { MatterButton } from "@/components/ui/matter-button";
import { useI18n } from "@/lib/i18n";

const NAV_LINKS = [
  { label: "Solution", href: "#product" },
  { label: "Platform", href: "#platform" },
  { label: "Why now", href: "#why-now" },
];

const FLAG_IMAGES = {
  lt: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Cpath fill='%23fdb913' d='M0 0h30v6.667H0z'/%3E%3Cpath fill='%23006a44' d='M0 6.667h30v6.666H0z'/%3E%3Cpath fill='%23c1272d' d='M0 13.333h30V20H0z'/%3E%3C/svg%3E\")",
  gb: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 40'%3E%3Cpath fill='%23012169' d='M0 0h60v40H0z'/%3E%3Cpath stroke='%23fff' stroke-width='8' d='m0 0 60 40M60 0 0 40'/%3E%3Cpath stroke='%23c8102e' stroke-width='4.8' d='m0 0 60 40M60 0 0 40'/%3E%3Cpath stroke='%23fff' stroke-width='13.333' d='M30 0v40M0 20h60'/%3E%3Cpath stroke='%23c8102e' stroke-width='8' d='M30 0v40M0 20h60'/%3E%3C/svg%3E\")",
} as const;

function FlagIcon({ country }: { country: "lt" | "gb" }) {
  return (
    <span
      aria-hidden
      className="block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.28)] transition-transform duration-200 group-hover:scale-110 md:h-4 md:w-6"
      style={{
        backgroundImage: FLAG_IMAGES[country],
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
  );
}

function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === "lt" ? "en" : "lt";
  const code = next === "lt" ? "LT" : "EN";
  const title = next === "lt" ? "Pereiti į lietuvių" : "Switch to English";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={title}
      title={title}
      className="group flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 text-xs font-semibold tracking-wide text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 md:h-11 md:gap-2 md:px-3.5 md:text-sm"
    >
      <FlagIcon country={next === "lt" ? "lt" : "gb"} />
      {code}
    </button>
  );
}

const enter = {
  duration: 1.4,
  ease: [0.16, 1, 0.3, 1] as const,
  delay: 0.8,
};

export function Navbar() {
  const { t } = useI18n();
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden h-32 w-full md:block"
      >
        <GradualBlur
          target="parent"
          position="top"
          height="4rem"
          strength={2}
          divCount={6}
          curve="bezier"
          exponential
          opacity={1}
          zIndex={1}
        />
      </div>

      <motion.header
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={enter}
        className="fixed inset-x-0 top-0 z-50 py-3 backdrop-blur-md md:py-0 md:pt-7 md:backdrop-blur-none"
      >
        <nav className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between gap-3 px-5 md:grid md:h-16 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:px-16 lg:px-24">
          <Link
            href="/"
            className="flex shrink-0 items-center md:col-start-1 md:justify-self-start"
          >
            <span className="relative block h-9 w-[118px] shrink-0 md:h-11 md:w-[154px]">
              <Image
                src="/grey-matte-logo-main.webp"
                alt="GenoLink Biotechnologies"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </span>
          </Link>

          <ul className="col-start-2 hidden items-center gap-8 justify-self-center md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="cursor-pointer text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2 md:col-start-3 md:justify-self-end md:gap-3">
            <MatterButton
              render={<Link href="#contact" />}
              wrapperClassName="shrink-0 p-0.5 md:p-1"
              className="h-9 px-4 text-xs md:h-11 md:px-6 md:text-sm"
            >
              {t("Contact Us")}
            </MatterButton>
            <LanguageToggle />
          </div>
        </nav>
      </motion.header>
    </>
  );
}
