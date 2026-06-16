"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
  hideAfterMs,
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
  hideAfterMs?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const [highlightVisible, setHighlightVisible] = useState(true);

  useEffect(() => {
    if (!isInView || hideAfterMs == null) return;

    const timer = setTimeout(() => {
      setHighlightVisible(false);
    }, hideAfterMs);

    return () => clearTimeout(timer);
  }, [isInView, hideAfterMs]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.unobserve(container);
    };
  }, []);

  const shouldRenderOverlay =
    dimensions.width > 0 &&
    dimensions.height > 0 &&
    (hideAfterMs == null || isInView);

  return (
    <div
      className={cn("relative w-fit", containerClassName)}
      ref={containerRef}
    >
      {children}
      {shouldRenderOverlay && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          animate={{
            opacity: hideAfterMs != null ? (highlightVisible ? 1 : 0) : 1,
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.5, ease: "easeOut" },
            scale: { duration: 0.5, ease: "easeOut" },
          }}
        >
          <motion.div
            className={cn(
              "absolute inset-0 border border-neutral-800 dark:border-neutral-200",
              rectangleClassName,
            )}
            initial={{
              width: 0,
              height: 0,
            }}
            {...(hideAfterMs != null
              ? {
                  animate: isInView
                    ? { width: dimensions.width, height: dimensions.height }
                    : { width: 0, height: 0 },
                }
              : {
                  whileInView: {
                    width: dimensions.width,
                    height: dimensions.height,
                  },
                })}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0 }}
            {...(hideAfterMs != null
              ? {
                  animate: isInView
                    ? {
                        opacity: 1,
                        x: dimensions.width + 4,
                        y: dimensions.height + 4,
                      }
                    : { opacity: 0 },
                }
              : {
                  whileInView: {
                    opacity: 1,
                    x: dimensions.width + 4,
                    y: dimensions.height + 4,
                  },
                })}
            style={{
              rotate: -90,
            }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <Pointer
              className={cn("h-5 w-5 text-blue-500", pointerClassName)}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

const Pointer = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
    </svg>
  );
};
