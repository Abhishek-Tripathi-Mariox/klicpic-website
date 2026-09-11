import React from "react";
import { ArrowLeft, Flame } from "lucide-react";
import { useBooking } from "../BookingContext";
import { VIBES as LOCAL_VIBES } from "../bookingData";
import { useVibes } from "../../api/useCatalog";
import { imageUrl } from "../../api/imageUrl";
import FitImage from "../../components/FitImage";

/**
 * Figma: Step2Vibe (1550:12247) — back link, heading with the chosen shoot type
 * highlighted, five vibe cards with a "% Love It" badge, and a skip link.
 */
const CARD_SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)";

/** The bundled cards, in the shape the admin records use. */
const FALLBACK = LOCAL_VIBES.map((vibe) => ({
  id: vibe.name,
  title: vibe.name,
  description: vibe.tagline,
  lovedPercent: Number.parseInt(vibe.love, 10) || 0,
  image: vibe.image,
}));

export default function StepVibe({ onNext, onBack }) {
  const { booking, set } = useBooking();

  // Live from Settings → Website CMS → Vibes; the bundle only covers the
  // moment before the request lands. An admin who switches every vibe off gets
  // an empty list, and the step says so rather than inventing some.
  const { vibes: VIBES, loading } = useVibes(FALLBACK);

  const choose = (vibe) => {
    set({ vibe: vibe.title });
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

      <h2 className="pt-4 text-[26px] leading-8 font-bold text-[#1f2937] sm:text-[30px] sm:leading-9">
        Choose your vibe
      </h2>
      <p className="pt-2 text-[16px] leading-6 text-[#6a7282]">
        Select the mood that best matches your vision for the{" "}
        <span className="font-semibold text-[#f9a825]">
          {booking.shootType ?? "your"}
        </span>{" "}
        shoot
      </p>

      {!loading && VIBES.length === 0 && (
        <p className="pt-8 text-[14px] leading-[20px] text-[#6a7282]">
          No vibes to choose from right now — skip ahead and tell us in the
          notes what you have in mind.
        </p>
      )}

      <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2">
        {VIBES.map((vibe) => {
          const isSelected = booking.vibe === vibe.title;
          return (
            <button
              key={vibe.id || vibe.title}
              type="button"
              onClick={() => choose(vibe)}
              className={`group block w-full cursor-pointer rounded-2xl text-left transition-shadow ${
                isSelected
                  ? "ring-2 ring-[#f9a825] ring-offset-2"
                  : "hover:shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)]"
              }`}
            >
              {/* A vibe saved without a photo keeps the card's own dark
                  styling instead of a broken image. */}
              <FitImage
                src={vibe.image ? imageUrl(vibe.image, 640) : ""}
                alt={`${vibe.title} vibe`}
                tone="dark"
                className="h-[239.997px] w-full rounded-2xl bg-gradient-to-br from-[#3f4550] to-[#1f2937]"
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
              >
                <span className="absolute inset-0" style={{ background: CARD_SCRIM }} />

                {vibe.lovedPercent > 0 && (
                  <span className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-[rgba(0,0,0,0.5)] px-[10px] py-1">
                    <Flame className="size-[11.992px] shrink-0 text-[#f9a825]" strokeWidth={1.666} />
                    <span className="text-[12px] leading-4 font-medium whitespace-nowrap text-white">
                      {vibe.lovedPercent}% Love It
                    </span>
                  </span>
                )}

                <span className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5">
                  <span className="text-[20px] leading-7 font-bold text-white">
                    {vibe.title}
                  </span>
                  {vibe.description && (
                    <span className="pt-[2px] text-[14px] leading-[20px] text-[rgba(255,255,255,0.7)]">
                      {vibe.description}
                    </span>
                  )}
                </span>
              </FitImage>
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
