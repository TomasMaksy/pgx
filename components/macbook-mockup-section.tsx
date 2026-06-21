"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { PgxReportModal } from "@/components/pgx-report-modal";

const PLAY_THRESHOLD = 0.25;
const TOAST_EXPAND_DELAY_MS = 2000;
const TOAST_EXPAND_DURATION = 5;

const EXPANDED_TOAST = {
  opacity: 1,
  y: 0,
  top: "-8%",
  right: "0%",
  x: "20%",
  scale: 2,
} as const;

const COMPACT_TOAST = {
  opacity: 1,
  y: 0,
  top: "6%",
  right: "4%",
  x: "0%",
  scale: 1,
} as const;

/** Seconds into the video when the toast appears. `null` = wait for natural end. */
const TOAST_AT_SECONDS: number | null = null;

export function MacbookMockupSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedRef = useRef(false);
  const hasShownToastRef = useRef(false);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastExpanded, setToastExpanded] = useState(false);
  const [instantReveal, setInstantReveal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const scheduleExpand = useCallback(() => {
    if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
    expandTimerRef.current = setTimeout(() => {
      setToastExpanded(true);
      expandTimerRef.current = null;
    }, TOAST_EXPAND_DELAY_MS);
  }, []);

  const revealToast = useCallback(
    (expandImmediately = false) => {
      if (hasShownToastRef.current && !expandImmediately) return;

      hasShownToastRef.current = true;
      setShowToast(true);

      if (expandImmediately) {
        if (expandTimerRef.current) {
          clearTimeout(expandTimerRef.current);
          expandTimerRef.current = null;
        }
        setToastExpanded(true);
        return;
      }

      scheduleExpand();
    },
    [scheduleExpand],
  );

  const skipToGoodPart = useCallback(() => {
    const video = videoRef.current;

    const finish = () => {
      if (video) {
        if (Number.isFinite(video.duration)) {
          video.currentTime = Math.max(0, video.duration - 0.001);
        }
        video.pause();
      }

      setInstantReveal(true);
      revealToast(true);
    };

    if (!video) {
      setInstantReveal(true);
      revealToast(true);
      return;
    }

    if (Number.isFinite(video.duration)) {
      finish();
      return;
    }

    const onMetadata = () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      finish();
    };

    video.addEventListener("loadedmetadata", onMetadata);
  }, [revealToast]);

  useEffect(() => {
    return () => {
      if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting ||
          entry.intersectionRatio < PLAY_THRESHOLD ||
          hasPlayedRef.current
        ) {
          return;
        }

        hasPlayedRef.current = true;
        void video.play().catch(() => {});
      },
      { threshold: PLAY_THRESHOLD },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (TOAST_AT_SECONDS == null) return;

    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.currentTime < TOAST_AT_SECONDS) return;
      video.pause();
      revealToast();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [revealToast]);

  const toastMotionState = toastExpanded ? EXPANDED_TOAST : COMPACT_TOAST;

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-8 py-16 md:px-16 md:py-20 lg:px-24"
    >
      <h2 className="section-title mx-auto mb-6 max-w-4xl text-center md:mb-4">
        How could this look in practice?
      </h2>

      <div className="mb-8 flex justify-center md:mb-10">
        <motion.button
          type="button"
          onClick={skipToGoodPart}
          initial={{ opacity: 0 }}
          animate={{ opacity: toastExpanded ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="text-sm font-medium text-white/75 underline-offset-4 transition-colors hover:text-white/90 hover:underline disabled:pointer-events-none"
          disabled={toastExpanded}
          aria-hidden={toastExpanded}
          tabIndex={toastExpanded ? -1 : 0}
        >
          Skip to the good part
        </motion.button>
      </div>

      <div className="relative mx-auto -mt-8 w-full max-w-5xl">
        <div className="absolute top-[5.5%] right-[12.8%] left-[12.8%] z-5 aspect-1546/1002">
          <div className="h-full w-full overflow-hidden rounded-lg">
            <video
              ref={videoRef}
              src="/esve-vid.webm"
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              onEnded={
                TOAST_AT_SECONDS == null ? () => revealToast() : undefined
              }
            />
          </div>
        </div>

        <AnimatePresence>
          {showToast && (
            <motion.div className="pointer-events-none absolute top-[5.5%] right-[12.8%] left-[12.8%] z-20 aspect-1546/1002 overflow-visible">
              <motion.div
                initial={
                  instantReveal
                    ? EXPANDED_TOAST
                    : {
                        opacity: 0,
                        y: -12,
                        scale: 0.94,
                        top: "6%",
                        right: "4%",
                      }
                }
                animate={toastMotionState}
                transition={
                  instantReveal
                    ? { duration: 0 }
                    : {
                        opacity: {
                          type: "spring",
                          stiffness: 380,
                          damping: 28,
                        },
                        y: { type: "spring", stiffness: 380, damping: 28 },
                        top: {
                          duration: TOAST_EXPAND_DURATION,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        right: {
                          duration: TOAST_EXPAND_DURATION,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        x: {
                          duration: TOAST_EXPAND_DURATION,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        scale: {
                          duration: TOAST_EXPAND_DURATION,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }
                }
                style={{ transformOrigin: "top right" }}
                className="pointer-events-auto absolute w-[52%] min-w-0 md:w-[42%]"
              >
                <div className="flex flex-col gap-1.5 rounded-xl border border-white/20 bg-white/95 p-2 shadow-lg shadow-black/25 backdrop-blur-md md:flex-row md:items-start md:gap-2">
                  <div className="flex items-center gap-2 md:shrink-0 md:items-start">
                    <div className="relative size-7 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src="/esvlogo.webp"
                        alt=""
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <p className="min-w-0 flex-1 text-[10px] leading-tight font-semibold text-neutral-900 md:hidden">
                      Pharmacogenomic Alert
                    </p>
                  </div>
                  <div className="min-w-0 flex-1 md:pt-0.5">
                    <p className="hidden text-[10px] leading-tight font-semibold text-neutral-900 md:block">
                      Pharmacogenomic Alert: CYP2D6 Poor Metabolizer
                    </p>
                    <p className="line-clamp-2 text-[8px] leading-snug text-neutral-600 md:mt-0.5 md:line-clamp-none">
                      <span className="md:hidden">
                        Reduced CYP2D6 activity may increase nebivolol exposure.
                      </span>
                      <span className="hidden md:inline">
                        Nebivolol is primarily metabolized by CYP2D6. This
                        patient has significantly reduced CYP2D6 activity and
                        may experience substantially increased nebivolol
                        exposure.
                      </span>
                    </p>
                    <motion.button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      animate={{
                        borderColor: [
                          "rgba(32, 184, 165, 0.35)",
                          "rgba(32, 184, 165, 1)",
                          "rgba(32, 184, 165, 0.35)",
                        ],
                        boxShadow: [
                          "0 0 0 0 rgba(32, 184, 165, 0)",
                          "0 0 0 3px rgba(32, 184, 165, 0.2)",
                          "0 0 0 0 rgba(32, 184, 165, 0)",
                        ],
                      }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-mint-dark hover:text-mint-darker mt-2 rounded-md border bg-white/90 px-2 py-0.5 text-[8px] font-semibold transition-colors"
                    >
                      Read more
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Image
          src="/macbook-mockup.webp"
          alt=""
          width={1920}
          height={1571}
          unoptimized
          className="relative z-10 h-auto w-full"
        />
      </div>

      <PgxReportModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}
