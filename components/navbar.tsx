"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import GradualBlur from "@/components/gradual-blur";
import { MatterButton } from "@/components/ui/matter-button";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Platform", href: "#platform" },
  { label: "About", href: "#why-now" },
  { label: "Contact Us", href: "#contact" },
];

const enter = {
  duration: 1.4,
  ease: [0.16, 1, 0.3, 1] as const,
  delay: 0.8,
};

export function Navbar() {
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
        className="fixed inset-x-0 top-0 z-50 px-0 pt-4 backdrop-blur-md md:pt-7 md:backdrop-blur-none"
      >
        <nav className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 border border-transparent bg-transparent px-8 md:px-16 lg:px-24">
          <Link
            href="/"
            className="col-start-1 justify-self-start text-lg font-semibold text-white"
          >
            <span className="relative block h-9 w-[126px] shrink-0 md:h-11 md:w-[154px]">
              <Image
                src="/grey-matte-logo-main.webp"
                alt="GenoLink Biotechnologies"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </span>
          </Link>

          <ul className="col-start-2 hidden items-center justify-self-center gap-8 md:flex">
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

          <MatterButton
            render={<Link href="#contact" />}
            wrapperClassName="col-start-3 justify-self-end shrink-0"
            className="h-11 px-6 text-sm"
          >
            Contact Us
          </MatterButton>
        </nav>
      </motion.header>
    </>
  );
}
