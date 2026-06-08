const EXCLUDED_FRAMES = new Set([0, 28, 29, 30]);

const FRAME_NUMBERS = Array.from({ length: 38 }, (_, index) => index).filter(
  (index) => !EXCLUDED_FRAMES.has(index),
);

export const SEQUENCE_FRAMES = FRAME_NUMBERS.map((index) =>
  encodeURI(
    `/sequence-2/Timeline 1_000864${String(index).padStart(2, "0")}.webp`,
  ),
);

/** Extra scroll distance (in vh) used to scrub through the full sequence. */
export const SEQUENCE_SCROLL_HEIGHT_VH = 100;
