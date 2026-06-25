import { cn } from "@/lib/utils";

type FlagCountry = "lt" | "gb";

const FLAG_VIEWBOX = {
  lt: "0 0 30 20",
  gb: "0 0 60 40",
} as const;

function FlagSvg({ country }: { country: FlagCountry }) {
  if (country === "lt") {
    return (
      <>
        <rect width="30" height="6.667" fill="#fdb913" />
        <rect y="6.667" width="30" height="6.666" fill="#006a44" />
        <rect y="13.333" width="30" height="6.667" fill="#c1272d" />
      </>
    );
  }

  return (
    <>
      <path fill="#012169" d="M0 0h60v40H0z" />
      <path stroke="#fff" strokeWidth="8" d="m0 0 60 40M60 0 0 40" />
      <path stroke="#c8102e" strokeWidth="4.8" d="m0 0 60 40M60 0 0 40" />
      <path stroke="#fff" strokeWidth="13.333" d="M30 0v40M0 20h60" />
      <path stroke="#c8102e" strokeWidth="8" d="M30 0v40M0 20h60" />
    </>
  );
}

function FlagIcon({
  country,
  className,
}: {
  country: FlagCountry;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.28)] transition-transform duration-200 group-hover:scale-110",
        className,
      )}
    >
      <svg
        viewBox={FLAG_VIEWBOX[country]}
        className="h-3.5 w-5 md:h-4 md:w-6"
        role="img"
        aria-hidden
      >
        <FlagSvg country={country} />
      </svg>
    </span>
  );
}

export { FlagIcon, type FlagCountry };
