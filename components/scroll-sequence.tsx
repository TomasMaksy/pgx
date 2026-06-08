"use client";

import { useEffect, useRef, useState } from "react";
import {
  SEQUENCE_FRAMES,
  SEQUENCE_SCROLL_HEIGHT_VH,
} from "@/lib/sequence-frames";

type ScrollSequenceProps = {
  children: React.ReactNode;
};

export function ScrollSequence({ children }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    SEQUENCE_FRAMES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const updateFrame = () => {
      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.offsetHeight - window.innerHeight;
      const progress =
        maxScroll <= 0
          ? 0
          : Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const nextIndex = Math.min(
        SEQUENCE_FRAMES.length - 1,
        Math.round(progress * (SEQUENCE_FRAMES.length - 1)),
      );

      if (nextIndex !== frameIndexRef.current) {
        frameIndexRef.current = nextIndex;
        setFrameIndex(nextIndex);
      }
    };

    const onScroll = () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateFrame);
    };

    updateFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-black">
        {/* Native img avoids Next/Image reprocessing on every frame change. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SEQUENCE_FRAMES[frameIndex]}
          alt=""
          className="h-full w-full object-cover object-right"
          draggable={false}
        />
      </div>

      <div ref={containerRef} className="relative">
        {children}
        <div
          aria-hidden
          className="pointer-events-none"
          style={{ height: `${SEQUENCE_SCROLL_HEIGHT_VH}vh` }}
        />
      </div>
    </>
  );
}
