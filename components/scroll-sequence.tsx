"use client";

import { useEffect, useRef } from "react";
import {
  SEQUENCE_FRAMES,
  SEQUENCE_SCROLL_HEIGHT_VH,
} from "@/lib/sequence-frames";

type ScrollSequenceProps = {
  children: React.ReactNode;
};

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

export function ScrollSequence({ children }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  const setFrame = (index: number) => {
    if (index === frameIndexRef.current) return;
    frameIndexRef.current = index;
    const image = imageRef.current;
    if (!image) return;
    const nextSrc = SEQUENCE_FRAMES[index];
    if (image.getAttribute("src") !== nextSrc) {
      image.src = nextSrc;
    }
  };

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

      const viewportHeight = getViewportHeight();
      const scrollableDistance = container.offsetHeight - viewportHeight;
      const scrolled = Math.max(0, -container.getBoundingClientRect().top);
      const progress =
        scrollableDistance <= 0
          ? 0
          : Math.min(1, scrolled / scrollableDistance);
      const nextIndex = Math.min(
        SEQUENCE_FRAMES.length - 1,
        Math.round(progress * (SEQUENCE_FRAMES.length - 1)),
      );

      setFrame(nextIndex);
    };

    const onScroll = () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateFrame);
    };

    updateFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("touchend", onScroll, { passive: true });
    window.visualViewport?.addEventListener("scroll", onScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("touchend", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 z-0 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={SEQUENCE_FRAMES[0]}
          alt=""
          className="block h-[100dvh] w-full object-cover object-center md:h-full md:object-right"
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
    </div>
  );
}
