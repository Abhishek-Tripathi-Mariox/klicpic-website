import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useBooking } from "../BookingContext";
import DetailsShell from "../DetailsShell";
import { THEMES as LOCAL_THEMES, THEME_FILTERS as LOCAL_THEME_FILTERS } from "../themeData";
import { useThemes } from "../../api/useCatalog";
import ThemeCard from "../ThemeCard";

/**
 * Figma: Step3Details — Theme sub-step (1550:14898 empty, 1550:15939 selected).
 * Search + category pills and the theme grid, inside the shared Details chrome
 * (heading, sub-stepper, sticky action bar).
 */
/** What this build shipped — the fallback when the API is unreachable. */
const LOCAL_CATALOG = { items: LOCAL_THEMES, filters: LOCAL_THEME_FILTERS };

export default function StepThemes({ onNext, onBack, onOpenTheme }) {
  // The wizard must offer what the studio actually has on the shelf.
  const { items: THEMES, filters: THEME_FILTERS } = useThemes(LOCAL_CATALOG);

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
  }, [query, filter, THEMES]);

  const vibeLabel = booking.vibe ?? "your";

  return (
    <DetailsShell
      index={0}
      hint="Select options below to continue"
      onSkipStep={onNext}
      backLabel="Vibe"
      nextLabel="Next: Props"
      canContinue={Boolean(booking.theme)}
      onBack={onBack}
      onNext={onNext}
      onSkipAll={onNext}
      footNote={
        booking.theme
          ? "All required selections made ✓"
          : "Complete required selections to continue"
      }
    >
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
    </DetailsShell>
  );
}
