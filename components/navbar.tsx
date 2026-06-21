"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import GradualBlur from "@/components/gradual-blur";
import { MatterButton } from "@/components/ui/matter-button";
import { useI18n } from "@/lib/i18n";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Platform", href: "#platform" },
  { label: "About", href: "#why-now" },
];

function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === "lt" ? "en" : "lt";
  const flag = next === "lt" ? "🇱🇹" : "🇬🇧";
  const code = next === "lt" ? "LT" : "EN";
  const title = next === "lt" ? "Pereiti į lietuvių" : "Switch to English";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={title}
      title={title}
      className="group flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 text-sm font-semibold tracking-wide text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
    >
      <span className="text-lg leading-none transition-transform duration-200 group-hover:scale-110">
        {flag}
      </span>
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
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
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
