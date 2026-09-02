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
      className="flex w-full items-center gap-2 border-b-[0.701px] border-solid border-[rgba(249,168,37,0.2)] px-4"
      style={{
        background:
          "linear-gradient(to right, #1f2937 0%, #1a1a2e 40%, #1f2937 100%)",
      }}
    >
      <div className="flex min-w-px flex-1 items-center justify-center gap-2 overflow-hidden py-[11px]">
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

        <div className="flex shrink-0 items-center gap-2">
          <p className="text-[14px] leading-[20px] whitespace-nowrap">{emoji}</p>
          <p className="text-[13px] leading-[17.333px] font-medium whitespace-nowrap text-[rgba(255,255,255,0.9)]">
            {message}
          </p>
          {cta && (
            <Link
              to={ctaTo}
              className="rounded-full bg-[#f9a825] px-[10px] py-[2px] text-center text-[11px] leading-[16.5px] font-black whitespace-nowrap text-[#1f2937] transition-colors hover:bg-[#e69a1f]"
            >
              {cta}
            </Link>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-start pl-2">
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
          className="flex cursor-pointer items-center justify-center rounded-full p-1 transition-colors hover:bg-white/10"
        >
          <X className="size-[13.996px] text-white/50" strokeWidth={1.16631} />
        </button>
      </div>
    </div>
  );
}
