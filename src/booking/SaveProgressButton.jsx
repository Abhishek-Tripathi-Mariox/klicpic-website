import React, { useEffect, useState } from "react";
import { Bookmark, Check } from "lucide-react";
import { useBooking } from "./BookingContext";

/**
 * The "Save Progress" pill that sits in the step header (Figma 1550:11461).
 * The frame only shows the resting state, so the confirmation is ours: it
 * parks the wizard in localStorage and flips the label for two seconds.
 */
export default function SaveProgressButton() {
  const { save } = useBooking();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return undefined;
    const timer = window.setTimeout(() => setSaved(false), 2000);
    return () => window.clearTimeout(timer);
  }, [saved]);

  return (
    <button
      type="button"
      onClick={() => setSaved(save())}
      className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border-[0.701px] border-solid border-[#e5e7eb] bg-white px-[13px] py-[9px] transition-colors hover:border-[#f9a825]"
    >
      {saved ? (
        <Check className="size-[13.996px] shrink-0 text-[#f9a825]" strokeWidth={2} />
      ) : (
        <Bookmark className="size-[13.996px] shrink-0 text-[#f9a825]" strokeWidth={1.666} />
      )}
      <span className="text-[12px] leading-4 font-semibold whitespace-nowrap text-[#1f2937]">
        {saved ? "Saved" : "Save Progress"}
      </span>
    </button>
  );
}
