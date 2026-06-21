"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface MatterButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  wrapperClassName?: string;
}

const glowTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
};

function MatterButton({
  children,
  className,
  wrapperClassName,
  ...props
}: MatterButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative inline-flex size-fit shrink-0 overflow-hidden rounded-full bg-transparent p-1",
        wrapperClassName,
      )}
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      whileTap={reduceMotion ? undefined : "tap"}
    >
      <Button
        className={cn(
          "relative h-13 overflow-hidden rounded-full border-0 bg-black px-6 text-base text-white hover:bg-black active:translate-y-0 [a]:hover:bg-black",

          "before:absolute before:inset-0 before:block before:size-full before:rounded-full before:shadow-[inset_0_2px_4.5px_0px_rgba(255,255,255,0.6)]",

          className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_8px_-1px_rgba(45,212,191,0.6)] dark:shadow-[inset_0_-3px_2px_-1px_rgba(45,212,191,0.6)]"
          variants={{
            rest: { opacity: 1, filter: "blur(0px)" },
            hover: { opacity: 0, filter: "blur(6px)" },
            tap: { opacity: 0.35, filter: "blur(3px)" },
          }}
          transition={glowTransition}
        />
        <span className="relative z-20 inline-flex items-center gap-2">
          {children}
        </span>
      </Button>
    </motion.div>
  );
}

export { MatterButton, type MatterButtonProps };
