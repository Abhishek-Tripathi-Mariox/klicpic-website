import React, { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { useBooking } from "../BookingContext";
import DetailsShell from "../DetailsShell";
import { GOWNS, GOWN_FILTERS } from "../gownData";

/**
 * Figma: booking wizard — Gowns sub-step (1552:17865).
 * Gowns are pre-filtered to the shoot type, shown with a notice banner.
 */
const SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)";

const SLOT_TONES = {
  red: "bg-[rgba(239,68,68,0.87)]",
  amber: "bg-[rgba(249,115,22,0.9)]",
  green: "bg-[rgba(34,197,94,0.87)]",
};

export default function StepGowns({ onBack, onNext, onSkipAll, onOpenBackdrop }) {
  const { booking, set } = useBooking();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const shootType = booking.shootType ?? "Maternity";

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return GOWNS.filter(
      (gown) =>
        (filter === "All" || gown.meta.startsWith(filter)) &&
        (!needle || gown.name.toLowerCase().includes(needle))
    );
  }, [query, filter]);

  return (
    <DetailsShell
      index={2}
      hint="Select options below to continue"
      onSkipStep={onNext}
      backLabel="Props"
      nextLabel="Next: Location"
      canContinue={Boolean(booking.gown)}
      onBack={onBack}
      onNext={onNext}
      onSkipAll={onSkipAll}
      footNote={
        booking.gown
          ? "All required selections made ✓"
          : "Complete required selections to continue"
      }
    >
      <div className="mt-5 flex w-full items-center gap-3 rounded-2xl border-[0.701px] border-solid border-[#fee685] bg-[#fffbeb] px-3 py-[10px]">
        <span className="text-[16px] leading-6">👗</span>
        <p className="text-[12px] leading-4 font-semibold text-[#973c00]">
          Showing {shootType} gowns for your {shootType} shoot
        </p>
      </div>

      <p className="pt-4 text-[14px] leading-[20px] text-[#1f2937]">
        Select a gown — included in your booking · {GOWNS.length} gowns
      </p>

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

      <div className="flex w-full items-center gap-2 pt-4">
        {GOWN_FILTERS.map((item) => {
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

      <div className="grid w-full grid-cols-1 gap-4 pt-5 sm:grid-cols-2">
        {visible.map((gown) => {
          const selected = booking.gown === gown.name;
          return (
            <button
              key={gown.name}
              type="button"
              onClick={() => set({ gown: gown.name })}
              onDoubleClick={() => onOpenBackdrop?.(gown)}
              aria-pressed={selected}
              className={`group relative h-[259.994px] w-full cursor-pointer overflow-hidden rounded-2xl text-left ${
                selected ? "ring-2 ring-[#f9a825] ring-offset-2" : ""
              }`}
            >
              <img
                src={gown.image}
                alt={gown.name}
                className="pointer-events-none absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0" style={{ background: SCRIM }} />

              <span className="absolute top-2 left-2 flex flex-col items-start gap-1">
                {gown.viewing && (
                  <span className="flex items-center gap-1 rounded-full bg-[rgba(0,0,0,0.65)] px-[7px] py-[3px]">
                    <span className="relative flex size-[7px] shrink-0">
                      <span className="absolute inline-flex size-full rounded-full bg-[#4ade80] opacity-28" />
                      <span className="relative inline-flex size-[7px] rounded-full bg-[#4ade80]" />
                    </span>
                    <span className="text-[10px] leading-[10px] font-bold whitespace-nowrap text-white">
                      {gown.viewing}
                    </span>
                  </span>
                )}
                {gown.trending && (
                  <span className="rounded-full bg-[rgba(249,115,22,0.9)] px-[6px] py-[2px] text-[8px] leading-[12px] font-extrabold whitespace-nowrap text-white">
                    🔥 TRENDING
                  </span>
                )}
              </span>

              {selected && (
                <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-[#f9a825]">
                  <Check className="size-[14px] text-white" strokeWidth={3} />
                </span>
              )}

              <span className="absolute inset-x-0 bottom-0 flex flex-col items-start px-2 pb-2">
                {gown.slots && (
                  <span
                    className={`mb-1 rounded-full px-[6px] py-[2px] text-[9px] leading-[13.5px] font-extrabold whitespace-nowrap text-white ${
                      SLOT_TONES[gown.slotTone] ?? SLOT_TONES.amber
                    }`}
                  >
                    {gown.slots}
                  </span>
                )}
                <span className="text-[14px] leading-[17.5px] font-bold text-white">
                  {gown.name}
                </span>
                <span className="text-[10px] leading-[15px] text-[rgba(255,255,255,0.6)]">
                  {gown.meta}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </DetailsShell>
  );
}
