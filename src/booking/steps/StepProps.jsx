import React, { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { useBooking } from "../BookingContext";
import DetailsShell from "../DetailsShell";
import { PROPS, PROP_FILTERS } from "../propsData";

/**
 * Figma: booking wizard — Props sub-step (1552:16994).
 * Multi-select grid of 20 props with search and category pills.
 */
const SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 100%)";

export default function StepProps({ onBack, onNext, onSkipAll }) {
  const { booking, set } = useBooking();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const chosen = booking.props ?? [];

  const toggle = (name) =>
    set({
      props: chosen.includes(name)
        ? chosen.filter((p) => p !== name)
        : [...chosen, name],
    });

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PROPS.filter(
      (item) =>
        (filter === "All" || item.category === filter) &&
        (!needle || item.name.toLowerCase().includes(needle))
    );
  }, [query, filter]);

  return (
    <DetailsShell
      index={1}
      hint="Props are optional"
      onSkipStep={onNext}
      backLabel="Theme"
      nextLabel="Next: Gowns"
      canContinue
      onBack={onBack}
      onNext={onNext}
      onSkipAll={onSkipAll}
      footNote="All required selections made ✓"
    >
      <p className="pt-6 text-[14px] leading-[20px] text-[#1f2937]">
        Select props for your shoot ·{" "}
        <span className="font-bold text-[#f9a825]">Multiple allowed</span> ·{" "}
        {PROPS.length}
        {chosen.length > 0 && (
          <span className="ml-2 rounded-full bg-[#fff7ed] px-2 py-[2px] text-[11px] font-bold text-[#f9a825]">
            {chosen.length} selected
          </span>
        )}
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

      <div className="klicpic-rail flex w-full items-center gap-2 overflow-x-auto pt-4">
        {PROP_FILTERS.map((item) => {
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

      <div className="grid w-full grid-cols-2 gap-4 pt-5 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item) => {
          const selected = chosen.includes(item.name);
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => toggle(item.name)}
              aria-pressed={selected}
              className={`group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl text-left ${
                selected ? "ring-2 ring-[#f9a825] ring-offset-2" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="pointer-events-none absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0" style={{ background: SCRIM }} />

              {item.viewing && (
                <span className="absolute top-2 left-2 flex items-center gap-[5px] rounded-full bg-[rgba(0,0,0,0.65)] px-2 py-1">
                  <span className="relative flex size-[7px] shrink-0">
                    <span className="absolute inline-flex size-full rounded-full bg-[#4ade80] opacity-25" />
                    <span className="relative inline-flex size-[7px] rounded-full bg-[#4ade80]" />
                  </span>
                  <span className="text-[9px] leading-[10px] font-bold whitespace-nowrap text-white">
                    {item.viewing}
                  </span>
                </span>
              )}

              {selected && (
                <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-[#f9a825]">
                  <Check className="size-[14px] text-white" strokeWidth={3} />
                </span>
              )}

              <span className="absolute inset-x-0 bottom-0 flex flex-col items-start p-2">
                {item.slots && (
                  <span className="mb-1 rounded-full bg-[rgba(249,168,37,0.92)] px-[6px] py-[2px] text-[8px] leading-[12px] font-extrabold whitespace-nowrap text-white">
                    {item.slots}
                  </span>
                )}
                <span className="text-[13px] leading-[17px] font-bold text-white">
                  {item.name}
                </span>
                <span className="text-[10px] leading-[14px] text-[rgba(255,255,255,0.6)]">
                  {item.category}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="w-full py-12 text-center text-[14px] text-[#6a7282]">
          No props match your search.
        </p>
      )}
    </DetailsShell>
  );
}
