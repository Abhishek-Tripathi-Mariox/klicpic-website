import React from "react";
import { ArrowLeft, Flame } from "lucide-react";
import { useBooking } from "../BookingContext";
import { VIBES } from "../bookingData";

/**
 * Figma: Step2Vibe (1550:12247) — back link, heading with the chosen shoot type
 * highlighted, five vibe cards with a "% Love It" badge, and a skip link.
 */
const CARD_SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)";

export default function StepVibe({ onNext, onBack }) {
  const { booking, set } = useBooking();

  const choose = (vibe) => {
    set({ vibe: vibe.name });
    onNext?.();
  };

  return (
    <div className="flex w-full flex-col items-start">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-[14px] leading-[20px] text-[#6a7282] transition-colors hover:text-[#f9a825]"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
        Back to Type
      </button>

      <h2 className="pt-4 text-[30px] leading-9 font-bold text-[#1f2937]">
        Choose your vibe
      </h2>
      <p className="pt-2 text-[16px] leading-6 text-[#6a7282]">
        Select the mood that best matches your vision for the{" "}
        <span className="font-semibold text-[#f9a825]">
          {booking.shootType ?? "your"}
        </span>{" "}
        shoot
      </p>

      <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2">
        {VIBES.map((vibe) => {
          const isSelected = booking.vibe === vibe.name;
          return (
            <button
              key={vibe.name}
              type="button"
              onClick={() => choose(vibe)}
              className={`group relative h-[239.997px] w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-shadow ${
                isSelected
                  ? "ring-2 ring-[#f9a825] ring-offset-2"
                  : "hover:shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)]"
              }`}
            >
              <img
                src={vibe.image}
                alt={`${vibe.name} vibe`}
                className="pointer-events-none absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0" style={{ background: CARD_SCRIM }} />

              <span className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-[rgba(0,0,0,0.5)] px-[10px] py-1">
                <Flame className="size-[11.992px] shrink-0 text-[#f9a825]" strokeWidth={1.666} />
                <span className="text-[12px] leading-4 font-medium whitespace-nowrap text-white">
                  {vibe.love}
                </span>
              </span>

              <span className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5">
                <span className="text-[20px] leading-7 font-bold text-white">
                  {vibe.name}
                </span>
                <span className="pt-[2px] text-[14px] leading-[20px] text-[rgba(255,255,255,0.7)]">
                  {vibe.tagline}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="cursor-pointer pt-6 text-[14px] leading-[20px] text-[#99a1af] transition-colors hover:text-[#f9a825]"
      >
        Skip — I'll decide later
      </button>
    </div>
  );
}
