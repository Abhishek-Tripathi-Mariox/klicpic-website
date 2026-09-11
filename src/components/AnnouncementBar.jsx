import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

/**
 * Figma: AnnouncementBar — home (1550:3412) and inner pages (1550:5013).
 * Same dark gradient strip; the inner-page variant adds a CTA pill and lights
 * a different progress dot.
 */
export default function AnnouncementBar({
  emoji = "🎁",
  message = "Refer a friend and get ₹500 off your next shoot. Ask us how!",
  cta = null,
  ctaTo = "/book",
  activeDot = 1,
  dotCount = 3,
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="flex w-full items-center gap-1 border-b-[0.701px] border-solid border-[rgba(249,168,37,0.2)] px-4 md:gap-2"
      style={{
        background:
          "linear-gradient(to right, #1f2937 0%, #1a1a2e 40%, #1f2937 100%)",
      }}
    >
      {/* One line from md up. On a phone the message wraps to two lines
          instead — clipped mid-sentence it read as a glitch — and the pill
          flows after it like a word. */}
      <div className="flex min-w-px flex-1 items-center justify-center gap-2 py-1.5 md:overflow-hidden md:py-[11px]">
        <div className="flex shrink-0 items-center gap-[6px]">
          {Array.from({ length: dotCount }, (_, index) => (
            <span
              key={index}
              className={`size-[5.99px] shrink-0 rounded-full ${
                index === activeDot ? "bg-[#f9a825]" : "bg-[rgba(249,168,37,0.25)]"
              }`}
            />
          ))}
        </div>

        <p className="min-w-0 text-center text-[12px] leading-[18px] font-medium text-[rgba(255,255,255,0.9)] md:shrink-0 md:text-[13px] md:leading-[17.333px] md:whitespace-nowrap">
          <span className="mr-1.5 text-[14px] leading-none md:mr-2">{emoji}</span>
          {message}
          {cta && (
            <Link
              to={ctaTo}
              className="ml-1.5 inline-block rounded-full md:ml-2 bg-[#f9a825] px-[10px] py-[2px] text-center align-middle text-[11px] leading-[16.5px] font-black whitespace-nowrap text-[#1f2937] transition-colors hover:bg-[#e69a1f]"
            >
              {cta}
            </Link>
          )}
        </p>
      </div>

      <div className="flex shrink-0 items-center md:pl-2">
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
          className="-mr-1 flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10 md:mr-0 md:size-auto md:p-1"
        >
          <X className="size-[13.996px] text-white/50" strokeWidth={1.16631} />
        </button>
      </div>
    </div>
  );
}
