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
  objectPosition: "center" | "right",
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
    offsetX =
      objectPosition === "right" ? width - drawWidth : (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = width / imgRatio;
    offsetX = 0;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function ScrollSequence({ children }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const objectPositionRef = useRef<"center" | "right">("center");
  const metricsRef = useRef({ scrollableDistance: 0, containerTop: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const tickingRef = useRef(false);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[index];
    if (!canvas || !image?.complete || image.naturalWidth === 0) return;

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

    drawCoverFrame(ctx, image, width, height, objectPositionRef.current);
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
      scrollableDistance <= 0
        ? 0
        : Math.min(1, scrolled / scrollableDistance);
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
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateObjectPosition = () => {
      objectPositionRef.current = mediaQuery.matches ? "right" : "center";
      drawFrame(frameIndexRef.current);
    };

    updateObjectPosition();
    mediaQuery.addEventListener("change", updateObjectPosition);
    return () => mediaQuery.removeEventListener("change", updateObjectPosition);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadFrames = async () => {
      const images = await Promise.all(
        SEQUENCE_FRAMES.map(
          (src) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const image = new Image();
              image.decoding = "async";
              image.src = src;
              image.onload = async () => {
                try {
                  await image.decode();
                } catch {
                  // decode() can fail on older browsers; loaded image still works
                }
                resolve(image);
              };
              image.onerror = () => reject(new Error(`Failed to load ${src}`));
            }),
        ),
      );

      if (cancelled) return;

      imagesRef.current = images;
      updateMetrics();
      drawFrame(frameIndexRef.current);
    };

    loadFrames();

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
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 z-0 bg-black">
        <canvas
          ref={canvasRef}
          className="block h-[100dvh] w-full md:h-full"
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
