"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface MatterButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  wrapperClassName?: string;
}

function MatterButton({
  children,
  className,
  wrapperClassName,
  ...props
}: MatterButtonProps) {
  return (
    <div
      className={cn(
        "relative inline-flex size-fit shrink-0 overflow-hidden rounded-full bg-transparent p-1",
        wrapperClassName,
      )}
    >
      <Button
        className={cn(
          "relative h-13 overflow-hidden rounded-full border-0 bg-black px-6 text-base text-white duration-500 hover:bg-black active:translate-y-0 [a]:hover:bg-black",

          "before:absolute before:inset-0 before:block before:size-full before:rounded-full before:shadow-[inset_0_2px_4.5px_0px_rgba(255,255,255,0.6)] before:duration-300",

          "hover:shadow-[inset_0_-6px_8px_-1px_rgba(45,212,191,0.6)] dark:hover:shadow-[inset_0_-3px_2px_-1px_rgba(45,212,191,0.6)]",
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}

export { MatterButton, type MatterButtonProps };
