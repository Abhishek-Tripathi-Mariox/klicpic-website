import React, { useMemo, useState } from "react";
import SaveProgressButton from "../SaveProgressButton";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { useBooking } from "../BookingContext";
import { DETAIL_SUBSTEPS } from "../bookingData";
import { THEMES, THEME_FILTERS } from "../themeData";
import ThemeCard from "../ThemeCard";

/**
 * Figma: Step3Details — Theme sub-step (1550:14898 empty, 1550:15939 selected).
 * Sub-stepper, search + category pills, the theme grid, and a sticky action bar.
 */
export default function StepThemes({ onNext, onBack, onOpenTheme }) {
  const { booking, set } = useBooking();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return THEMES.filter(
      (theme) =>
        (filter === "All" || theme.category === filter) &&
        (!needle || theme.name.toLowerCase().includes(needle))
    );
  }, [query, filter]);

  const vibeLabel = booking.vibe ?? "your";

  return (
    <div className="flex w-full flex-col items-start pb-24">
      {/* heading */}
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex flex-col items-start">
          <h2 className="text-[30px] leading-9 font-bold text-[#1f2937]">
            Customise Your Session
          </h2>
          <p className="pt-1 text-[12px] leading-4 text-[#99a1af]">
            Step 1 of 4 — Theme{" "}
            {booking.date && (
              <span className="font-semibold text-[#f9a825]">
                📅 {booking.date}
              </span>
            )}
          </p>
        </div>
        <SaveProgressButton />
      </div>

      {/* sub-stepper */}
      <div className="flex w-full items-center pt-6">
        {DETAIL_SUBSTEPS.map((label, index) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex shrink-0 flex-col items-center gap-1">
              <span
                className={`flex size-8 items-center justify-center rounded-full text-[14px] leading-[20px] font-bold ${
                  index === 0
                    ? "bg-[#f9a825] text-white"
                    : "bg-[#f3f4f6] text-[#99a1af]"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`text-[11px] leading-4 font-semibold ${
                  index === 0 ? "text-[#f9a825]" : "text-[#99a1af]"
                }`}
              >
                {label}
              </span>
            </div>
            {index < DETAIL_SUBSTEPS.length - 1 && (
              <span className="mx-2 mb-5 h-[1.993px] flex-1 rounded-full bg-[#e5e7eb]" />
            )}
          </div>
        ))}
      </div>

      <div className="flex w-full items-center justify-between pt-2">
        <p className="text-[12px] leading-4 text-[#99a1af]">
          Select options below to continue
        </p>
        <button
          type="button"
          onClick={onNext}
          className="cursor-pointer text-[12px] leading-4 font-semibold text-[#6a7282] transition-colors hover:text-[#f9a825]"
        >
          Skip this step →
        </button>
      </div>

      <p className="pt-6 text-[14px] leading-[20px] text-[#1f2937]">
        Choose one or more themes for your{" "}
        <span className="font-bold text-[#f9a825]">{vibeLabel}</span> shoot ·{" "}
        {THEMES.length} themes available
        {booking.theme && (
          <span className="ml-2 rounded-full bg-[#fff7ed] px-2 py-[2px] text-[11px] font-bold text-[#f9a825]">
            1 selected
          </span>
        )}
      </p>

      {/* search */}
      <div className="relative w-full pt-4">
        <Search
          className="pointer-events-none absolute top-[27px] left-4 size-4 text-[#99a1af]"
          strokeWidth={1.666}
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search..."
          className="h-11 w-full rounded-2xl border-[0.701px] border-solid border-[#e5e7eb] bg-white pr-4 pl-11 text-[14px] text-[#1f2937] outline-none transition-colors placeholder:text-[#99a1af] focus:border-[#f9a825]"
        />
      </div>

      {/* category pills */}
      <div className="klicpic-rail flex w-full items-center gap-2 overflow-x-auto pt-4">
        {THEME_FILTERS.map((item) => {
          const isActive = item === filter;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`shrink-0 cursor-pointer rounded-full px-3 py-[6px] text-[12px] leading-4 font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#f9a825] text-white"
                  : "border-[0.701px] border-solid border-[#e5e7eb] bg-white text-[#6a7282] hover:border-[#f9a825] hover:text-[#f9a825]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* theme grid */}
      <div className="grid w-full grid-cols-1 gap-4 pt-5 sm:grid-cols-2">
        {visible.map((theme) => (
          <ThemeCard
            key={theme.name}
            theme={theme}
            selected={booking.theme === theme.name}
            onSelect={(picked) => set({ theme: picked.name })}
            onOpen={onOpenTheme}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="w-full py-12 text-center text-[14px] text-[#6a7282]">
          No themes match your search.
        </p>
      )}

      {/* sticky action bar */}
      <div className="sticky bottom-4 z-10 mt-6 flex w-full items-center gap-3 rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white/95 p-3 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)] backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl border-[0.701px] border-solid border-[#e5e7eb] px-4 py-3 text-[14px] leading-[20px] font-semibold text-[#1f2937] transition-colors hover:bg-[#f9fafb]"
        >
          <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
          Vibe
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!booking.theme}
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-center text-[14px] leading-[20px] font-bold transition-colors ${
            booking.theme
              ? "cursor-pointer bg-[#f9a825] text-white hover:bg-[#e69a1f]"
              : "cursor-not-allowed bg-[#f3f4f6] text-[#99a1af]"
          }`}
        >
          Next: Props
          <ArrowRight className="size-4 shrink-0" strokeWidth={1.666} />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="shrink-0 cursor-pointer px-3 text-[12px] leading-4 font-semibold text-[#6a7282] transition-colors hover:text-[#f9a825]"
        >
          Skip all
        </button>
      </div>
      <p className="w-full pt-2 text-center text-[11px] leading-4 text-[#99a1af]">
        {booking.theme
          ? "All required selections made ✓"
          : "Complete required selections to continue"}
      </p>
    </div>
  );
}
