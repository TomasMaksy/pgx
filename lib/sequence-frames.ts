const UNIQUE_FRAME_COUNT = 48;

/** Extra scroll distance (as frame-equivalents) to hold the last frame before scroll ends. */
export const SEQUENCE_HOLD_SLOTS = 2;

export const SEQUENCE_FRAMES = Array.from(
  { length: UNIQUE_FRAME_COUNT },
  (_, index) =>
    encodeURI(
      `/sequence-3/Timeline 1_000864${String(index).padStart(2, "0")}.webp`,
    ),
);

/** Extra scroll distance (in vh) used to scrub through the full sequence. */
export const SEQUENCE_SCROLL_HEIGHT_VH = 0;
