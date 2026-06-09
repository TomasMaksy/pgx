"use client";

import { motion } from "motion/react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Product", href: "#" },
  { label: "Platform", href: "#" },
  { label: "About", href: "#" },
];

const enter = {
  duration: 1.4,
  ease: [0.16, 1, 0.3, 1] as const,
  delay: 0.2,
};

export function Navbar() {
  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={enter}
      className="fixed inset-x-0 top-0 z-50 px-0 pt-2 md:pt-6"
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 border border-transparent bg-transparent px-8 md:px-16 lg:px-24">
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
      </nav>
    </motion.header>
  );
}
