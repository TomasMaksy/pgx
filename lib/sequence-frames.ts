const FRAME_COUNT = 38;

export const SEQUENCE_FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, index) =>
    encodeURI(
      `/sequence-2/Timeline 1_000864${String(index).padStart(2, "0")}.png`,
    ),
);

/** Extra scroll distance (in vh) used to scrub through the full sequence. */
export const SEQUENCE_SCROLL_HEIGHT_VH = 120;
