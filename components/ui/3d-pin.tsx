"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type PinContainerProps = {
  children: React.ReactNode;
  title?: string;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  containerClassName?: string;
};

export const PinContainer = ({
  children,
  title,
  href,
  target,
  rel,
  className,
  containerClassName,
}: PinContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={cn(
        "group/pin relative block h-full w-full cursor-pointer",
        containerClassName,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={href || "/"}
      target={target}
      rel={rel}
    >
      <div className="relative h-full w-full [perspective:1000px]">
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-700 ease-out will-change-transform [transform-style:preserve-3d]",
            className,
          )}
          style={{
            transformOrigin: "center center",
            transform: isHovered ? "rotateX(8deg)" : "rotateX(0deg)",
          }}
        >
          {children}
        </div>
        <PinPerspective title={title} />
      </div>
    </a>
  );
};

export const PinPerspective = ({ title }: { title?: string }) => {
  return (
    <motion.div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center pt-3 opacity-0 transition duration-500 group-hover/pin:opacity-100">
      <div className="relative flex flex-col items-center">
        <span className="relative z-10 flex items-center rounded-full bg-zinc-950 px-4 py-1 ring-1 ring-white/10">
          <span className="relative z-20 text-xs font-bold text-white">
            {title}
          </span>
          <span className="from-mint/0 via-mint/90 to-mint/0 absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-linear-to-r" />
        </span>

        <div className="relative mt-1 flex h-10 flex-col items-center">
          <div className="from-mint via-mint/50 h-full w-px bg-linear-to-b to-transparent blur-[2px]" />
          <div className="from-mint via-mint/70 absolute top-0 h-full w-px bg-linear-to-b to-transparent" />
          <div className="bg-mint-light absolute bottom-0 z-40 h-1 w-1 translate-x-[0.5px] rounded-full" />
          <div className="bg-mint-dark absolute bottom-0 z-40 h-1.5 w-1.5 translate-x-[0.5px] rounded-full blur-[3px]" />

          {[0, 2, 4].map((delay) => (
            <motion.div
              key={delay}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 0.45, 0.15, 0],
                scale: [0.6, 1, 1, 0.85],
              }}
              transition={{ duration: 5, repeat: Infinity, delay }}
              className="bg-mint/10 absolute bottom-0 left-1/2 h-12 w-12 -translate-x-1/2 translate-y-1/2 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
