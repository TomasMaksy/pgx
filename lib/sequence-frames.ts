const FRAME_COUNT = 48;

export const SEQUENCE_FRAMES = Array.from({ length: FRAME_COUNT }, (_, index) =>
  encodeURI(
    `/sequence-3/Timeline 1_000864${String(index).padStart(2, "0")}.webp`,
  ),
);

/** Extra scroll distance (in vh) used to scrub through the full sequence. */
export const SEQUENCE_SCROLL_HEIGHT_VH = 0;
