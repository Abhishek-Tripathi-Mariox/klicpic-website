import React, { useState } from "react";
import { ArrowLeft, ChevronRight, Images, Video } from "lucide-react";
import FitImage from "../components/FitImage";
import { imageUrl } from "../api/imageUrl";
import { useBooking } from "./BookingContext";
import { THEMES } from "./themeData";
import ThemeCard from "./ThemeCard";

/**
 * Figma: theme detail inside the Details step (1561:1996).
 * Gallery / BTS tabs, hero image with a thumbnail strip, the select CTA in the
 * summary column, and a "Perfect for Similar Occasions" grid.
 */
export default function ThemeDetail({ theme, onBack, onSelect }) {
  const { booking } = useBooking();
  const [tab, setTab] = useState("Gallery");
  const [active, setActive] = useState(0);

  const similar = THEMES.filter(
    (item) => item.category === theme.category && item.name !== theme.name
  );
  const strip = [theme, ...similar, ...THEMES.slice(0, 6)].slice(0, 9);

  return (
    <div className="flex w-full flex-col items-start">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-[14px] leading-[20px] text-[#6a7282] transition-colors hover:text-[#f9a825]"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
        Back
      </button>

      {/* tabs */}
      <div className="flex w-full items-center border-b-[0.701px] border-solid border-[#e5e7eb] pt-4">
        {[
          { label: "Gallery", count: 9, Icon: Images },
          { label: "BTS", count: 3, Icon: Video },
        ].map(({ label, count, Icon }) => {
          const isActive = tab === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setTab(label)}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border-b-2 pb-3 text-[14px] leading-[20px] font-semibold transition-colors ${
                isActive
                  ? "border-[#f9a825] text-[#f9a825]"
                  : "border-transparent text-[#99a1af] hover:text-[#6a7282]"
              }`}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.666} />
              {label}
              <span className="rounded-full bg-[#f3f4f6] px-[6px] text-[11px] text-[#6a7282]">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* hero + strip */}
      <div className="w-full pt-6">
        <FitImage
          src={imageUrl(strip[active].image, 960)}
          alt={strip[active].name}
          loading="eager"
          className="aspect-[4/3] w-full rounded-2xl"
        />

        <div className="klicpic-rail flex w-full items-center gap-2 overflow-x-auto pt-3">
          {strip.map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`size-[52px] shrink-0 overflow-hidden rounded-xl transition-all ${
                index === active
                  ? "ring-2 ring-[#f9a825]"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <FitImage src={imageUrl(item.image, 160)} className="size-full" />
            </button>
          ))}
          <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full border-[0.701px] border-solid border-[#e5e7eb] text-[#6a7282]">
            <ChevronRight className="size-4" strokeWidth={1.666} />
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect?.(theme)}
        className="mt-6 w-full cursor-pointer rounded-2xl bg-[#f9a825] py-4 text-center text-[16px] leading-6 font-bold text-white transition-colors hover:bg-[#e69a1f] lg:hidden"
      >
        Select {theme.name}
      </button>

      {/* similar */}
      <div className="w-full border-t-[0.701px] border-solid border-[#e5e7eb] pt-10 mt-10">
        <h3 className="text-[20px] leading-7 font-bold text-[#1f2937]">
          Perfect for Similar Occasions
        </h3>
        <div className="grid w-full grid-cols-1 gap-4 pt-6 sm:grid-cols-2 xl:grid-cols-3">
          {[...similar, ...THEMES.filter((t) => t.category !== theme.category)]
            .slice(0, 6)
            .map((item) => (
              <ThemeCard
                key={item.name}
                theme={item}
                selected={booking.theme === item.name}
                onSelect={onSelect}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
