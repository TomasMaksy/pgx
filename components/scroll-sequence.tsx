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

function drawCoverFrame(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  objectPositionX: number,
) {
  const imgRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (imgRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imgRatio;
    offsetY = 0;
    offsetX = (width - drawWidth) * objectPositionX;
  } else {
    drawWidth = width;
    drawHeight = width / imgRatio;
    offsetX = 0;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

/** 0 = left, 0.5 = center, 0.75 = right-1/4, 1 = right */
const OBJECT_POSITION_X = 0.75;

export function ScrollSequence({ children }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const metricsRef = useRef({ scrollableDistance: 0, containerTop: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const tickingRef = useRef(false);

  const isReady = (image: HTMLImageElement | undefined) =>
    !!image && image.complete && image.naturalWidth > 0;

  const findLoadedImage = (index: number) => {
    const images = imagesRef.current;
    const exact = images[index];
    if (isReady(exact)) return exact;

    // Fall back to the nearest already-loaded frame in either direction.
    for (let offset = 1; offset < images.length; offset += 1) {
      const before = images[index - offset];
      if (isReady(before)) return before;
      const after = images[index + offset];
      if (isReady(after)) return after;
    }

    // Last resort: the first frame is always loaded with priority and acts as
    // the placeholder until the requested frame (or a neighbour) is ready.
    return isReady(images[0]) ? images[0] : undefined;
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const image = findLoadedImage(index);
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const bufferWidth = Math.round(width * dpr);
    const bufferHeight = Math.round(height * dpr);
    if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
      canvas.width = bufferWidth;
      canvas.height = bufferHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    drawCoverFrame(ctx, image, width, height, OBJECT_POSITION_X);
  };

  const setFrame = (index: number) => {
    if (index === frameIndexRef.current) return;
    frameIndexRef.current = index;
    drawFrame(index);
  };

  const updateMetrics = () => {
    const container = containerRef.current;
    if (!container) return;

    metricsRef.current = {
      scrollableDistance: container.offsetHeight - getViewportHeight(),
      containerTop: container.offsetTop,
    };
  };

  const updateFrame = () => {
    tickingRef.current = false;

    const container = containerRef.current;
    if (!container) return;

    const { scrollableDistance } = metricsRef.current;
    const scrolled = Math.max(0, -container.getBoundingClientRect().top);
    const progress =
      scrollableDistance <= 0 ? 0 : Math.min(1, scrolled / scrollableDistance);
    const nextIndex = Math.min(
      SEQUENCE_FRAMES.length - 1,
      Math.round(progress * (SEQUENCE_FRAMES.length - 1)),
    );

    setFrame(nextIndex);
  };

  const requestTick = () => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    rafRef.current = requestAnimationFrame(updateFrame);
  };

  useEffect(() => {
    let cancelled = false;

    // Pre-size the array so frames land at the correct index even if some
    // load out of order or fail (a single failure must not blank the canvas).
    const images: HTMLImageElement[] = new Array(SEQUENCE_FRAMES.length);
    imagesRef.current = images;

    updateMetrics();

    const loadFrame = (index: number, priority: "high" | "low") => {
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = priority;

      const onReady = () => {
        if (cancelled) return;
        images[index] = image;
        // Draw as soon as the currently-needed frame is available, and let the
        // first frame paint immediately as the placeholder.
        if (index === frameIndexRef.current || index === 0) {
          drawFrame(frameIndexRef.current);
        }
      };

      image.onload = onReady;
      image.onerror = () => {
        // Skip failed frames; neighbouring frames still render.
      };
      // Hits the <link rel="preload"> cache for frame 0, so it resolves instantly.
      image.src = SEQUENCE_FRAMES[index];
    };

    // Load (and paint) the first frame first so the placeholder is guaranteed,
    // then aggressively preload the rest of the sequence in the background.
    loadFrame(0, "high");
    for (let index = 1; index < SEQUENCE_FRAMES.length; index += 1) {
      loadFrame(index, "low");
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    updateMetrics();

    const onScroll = () => requestTick();
    const onResize = () => {
      updateMetrics();
      drawFrame(frameIndexRef.current);
      requestTick();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    updateFrame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky (not fixed) keeps the canvas repainting during scroll on iOS Safari. */}
      <div className="pointer-events-none sticky top-0 z-0 h-svh w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute bottom-0 left-0 z-[1] block h-[75vh] w-full md:inset-0 md:h-full md:z-auto"
        />
        {/* Overlaps top of canvas to fade the hard edge into black */}
        <div
          aria-hidden
          className="absolute left-0 z-[2] h-[32vh] w-full md:hidden"
          style={{
            bottom: "calc(75vh - 22vh)",
            background:
              "linear-gradient(to bottom, #000 0%, #000 30%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.35) 75%, transparent 100%)",
          }}
        />
      </div>

      {/* Pulled up over the sticky stage; scrolls away while the canvas stays pinned. */}
      <div className="relative z-10 mt-[-100svh]">
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
