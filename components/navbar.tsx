"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Product", href: "#" },
  { label: "Platform", href: "#" },
  { label: "About", href: "#" },
];

const SCROLL_THRESHOLD = 5;

const spring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 38,
  mass: 0.85,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const isCompact = isDesktop && isScrolled;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateDesktop = () => setIsDesktop(mediaQuery.matches);
    updateDesktop();
    mediaQuery.addEventListener("change", updateDesktop);
    return () => mediaQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setIsScrolled(false);
      return;
    }

    let rafId: number | undefined;
    let scrolled = window.scrollY > SCROLL_THRESHOLD;

    const apply = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      if (next !== scrolled) {
        scrolled = next;
        setIsScrolled(next);
      }
    };

    const onScroll = () => {
      if (rafId !== undefined) return;
      rafId = requestAnimationFrame(() => {
        rafId = undefined;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 pt-2 md:pt-6">
      <motion.nav
        initial={false}
        transition={spring}
        animate={
          isCompact
            ? {
                width: "min(70rem, 100%)",
                borderRadius: 100,
              }
            : {
                width: "100%",
                borderRadius: 0,
              }
        }
        className={`mx-auto border ${
          isCompact
            ? "glass-inset border-white/15 bg-white/10 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 pr-4 pl-8">
          <Link
            href="/"
            className="justify-self-start font-serif text-lg font-semibold text-white italic"
          >
            pgx.bio
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#"
            className="glass-inset justify-self-end rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15"
          >
            Get Started
          </Link>
        </div>
      </motion.nav>
    </header>
  );
}
