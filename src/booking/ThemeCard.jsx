import React from "react";
import FitImage from "../components/FitImage";
import { imageUrl } from "../api/imageUrl";
import { Check, Flame } from "lucide-react";

/**
 * Figma: theme card on the Theme sub-step (1550:16054 and siblings).
 * Photo with a viewing pill, optional TRENDING flag, a gold "booked in <city>"
 * strip, and the name + category. Selected cards gain a gold ring and check.
 */
const SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 100%)";

export default function ThemeCard({ theme, selected, onSelect, onOpen }) {
  return (
    // The card is the photo, shown whole over a blurred copy of itself (see
    // FitImage); the gradient shows only for a theme with no photo.
    <FitImage
      src={theme.image ? imageUrl(theme.image, 480) : ""}
      alt={theme.name}
      tone="dark"
      className={`group h-[199.99px] w-full rounded-2xl bg-gradient-to-br from-[#3f4550] to-[#1f2937] ${
        selected ? "ring-2 ring-[#f9a825] ring-offset-2" : ""
      }`}
      imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
    >
      <span className="absolute inset-0" style={{ background: SCRIM }} />
      <button
        type="button"
        onClick={() => onSelect?.(theme)}
        onDoubleClick={() => onOpen?.(theme)}
        className="absolute inset-0 cursor-pointer text-left"
        aria-pressed={selected}
      >
        <span className="absolute top-2 left-2 flex flex-col items-start gap-1">
          {theme.viewing && (
            <span className="flex items-center gap-[5px] rounded-full bg-[rgba(0,0,0,0.65)] px-2 py-1">
              <span className="relative flex size-[7px] shrink-0">
                <span className="absolute inline-flex size-full rounded-full bg-[#4ade80] opacity-25" />
                <span className="relative inline-flex size-[7px] rounded-full bg-[#4ade80]" />
              </span>
              <span className="text-[10px] leading-[10px] font-bold whitespace-nowrap text-white">
                {theme.viewing}
              </span>
            </span>
          )}
          {theme.trending && (
            <span
              className="flex items-center gap-1 rounded-full px-2 py-[3px]"
              style={{
                backgroundImage:
                  "linear-gradient(168.88deg, rgb(249,115,22) 0%, rgb(249,168,37) 100%)",
              }}
            >
              <Flame className="size-[10px] shrink-0 text-white" strokeWidth={2} />
              <span className="text-[9px] leading-[9px] font-extrabold whitespace-nowrap text-white">
                TRENDING
              </span>
            </span>
          )}
        </span>

        {theme.booked && (
          <span className="absolute bottom-[52px] left-2 flex items-center gap-1 rounded-full bg-[rgba(249,168,37,0.92)] px-2 py-[3px]">
            <Flame className="size-[10px] shrink-0 text-white" strokeWidth={2} />
            <span className="text-[9px] leading-[9px] font-extrabold whitespace-nowrap text-white">
              {theme.booked}
            </span>
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 flex flex-col items-start p-3">
          <span className="text-[14px] leading-5 font-bold text-white">
            {theme.name}
          </span>
          <span className="text-[11px] leading-4 text-[rgba(255,255,255,0.6)]">
            {theme.category}
          </span>
        </span>
      </button>

      {selected && (
        <span className="pointer-events-none absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-[#f9a825]">
          <Check className="size-[14px] text-white" strokeWidth={3} />
        </span>
      )}
    </FitImage>
  );
}
