import React, { useEffect, useMemo, useState } from "react";
import FitImage from "../../components/FitImage";
import { imageUrl } from "../../api/imageUrl";
import { Check, Search } from "lucide-react";
import { useBooking } from "../BookingContext";
import DetailsShell from "../DetailsShell";
import { PROPS as LOCAL_PROPS, PROP_FILTERS as LOCAL_PROP_FILTERS } from "../propsData";
import { usePropsCatalog } from "../../api/useCatalog";

/**
 * Figma: booking wizard — Props sub-step (1552:16994).
 * Multi-select grid of 20 props with search and category pills.
 */
/** Cards added per "Show more" — six rows of two. */
const BATCH = 12;

/** What this build shipped — the fallback when the API is unreachable. */
const LOCAL_CATALOG = { items: LOCAL_PROPS, filters: LOCAL_PROP_FILTERS };

export default function StepProps({ onBack, onNext, onSkipAll }) {
  // The wizard must offer what the studio actually has on the shelf.
  const { items: PROPS, filters: PROP_FILTERS } = usePropsCatalog(LOCAL_CATALOG);

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
  }, [query, filter, PROPS]);

  const [limit, setLimit] = useState(BATCH);
  // A new search or category starts from the top of its own list.
  useEffect(() => setLimit(BATCH), [query, filter]);
  const shown = visible.slice(0, limit);

  return (
    <DetailsShell
      index={1}
      hint="Props are optional"
      onSkipStep={onNext}
      backLabel="Theme"
      nextLabel="Next: Location"
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

      {/* Two across, like the Theme step. Prop photos come in every shape —
          tall gowns, wide backdrops — so no crop suits them all: each photo is
          shown whole, over a blurred copy of itself that fills the rest of the
          card, and the name sits below it rather than over the garment. */}
      <div className="grid w-full grid-cols-1 gap-4 pt-5 sm:grid-cols-2">
        {shown.map((item) => {
          const selected = chosen.includes(item.name);
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => toggle(item.name)}
              aria-pressed={selected}
              className={`group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border-[0.57px] border-solid bg-white text-left transition-shadow ${
                selected
                  ? "border-[#f9a825] ring-2 ring-[#f9a825] ring-offset-2"
                  : "border-[#e5e7eb] hover:shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)]"
              }`}
            >
              <FitImage
                src={item.image ? imageUrl(item.image, 640) : ""}
                alt={item.name}
                className="h-[260px] w-full sm:h-[320px]"
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
              >

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

                {item.slots && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-[rgba(249,168,37,0.92)] px-[6px] py-[2px] text-[8px] leading-[12px] font-extrabold whitespace-nowrap text-white">
                    {item.slots}
                  </span>
                )}
              </FitImage>

              <span className="flex flex-col items-start px-4 py-3">
                <span className="text-[14px] leading-5 font-bold text-[#1f2937]">{item.name}</span>
                <span className="text-[11px] leading-4 text-[#99a1af] capitalize">{item.category}</span>
              </span>
            </button>
          );
        })}
      </div>

      {visible.length > shown.length && (
        <button
          type="button"
          onClick={() => setLimit((current) => current + BATCH)}
          className="mt-5 w-full cursor-pointer rounded-2xl border-[1.4px] border-solid border-[#f9a825] py-3 text-[14px] font-bold text-[#f9a825] transition-colors hover:bg-[#f9a825]/10"
        >
          Show more props ({visible.length - shown.length} more)
        </button>
      )}

      {visible.length === 0 && (
        <p className="w-full py-12 text-center text-[14px] text-[#6a7282]">
          No props match your search.
        </p>
      )}
    </DetailsShell>
  );
}
