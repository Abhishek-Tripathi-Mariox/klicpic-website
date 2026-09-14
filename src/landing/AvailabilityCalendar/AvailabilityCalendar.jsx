import React, { useState } from "react";
import { useAvailability } from "../../api/useAvailability";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Figma: Klicpic mithu / Home — Live Availability Calendar (1550:2870)
 * Sales display calendar for July 2026 (the 1st falls on a Wednesday).
 */
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SHOOT_FILTERS = ["All", "Maternity", "Family", "Wedding", "Baby", "Birthday", "Couple"];

/**
 * The calendar opens on the current month. The frame was drawn against July
 * 2026, but a live availability grid has to start where the customer is.
 */
const FIRST_MONTH = (() => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
})();

/** Real month maths, so paging never drifts out of sync with the weekday grid. */
function monthView(offset) {
  const first = new Date(FIRST_MONTH.year, FIRST_MONTH.month + offset, 1);
  return {
    year: first.getFullYear(),
    // The API takes a 1-based month.
    month: first.getMonth() + 1,
    label: first.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    days: new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate(),
    leadingBlanks: first.getDay(),
  };
}

/** day → state; days not listed render as the muted default. */
const LOCAL_DAY_STATES = {
  4: { state: "available", note: "4 slots" },
  5: { state: "limited", note: "2 slots" },
  6: { state: "full", note: "Full" },
  11: { state: "available", note: "3 slots" },
  12: { state: "limited", note: "1 slot!" },
  13: { state: "full", note: "Full" },
  15: { state: "available", note: "4 slots" },
  16: { state: "available", note: "2 slots" },
  18: { state: "limited", note: "1 slot!" },
  19: { state: "limited", note: "2 slots" },
  20: { state: "full", note: "Full" },
  22: { state: "available", note: "3 slots" },
  25: { state: "limited", note: "1 slot!" },
  26: { state: "full", note: "Full" },
  27: { state: "available", note: "4 slots" },
};

const STATE_STYLES = {
  available: "bg-[#22c55e] text-white",
  limited: "bg-[#f59e0b] text-white",
  full: "bg-[#9ca3af] text-white opacity-55",
  muted: "bg-[#f9fafb] text-[#d1d5dc]",
};

const LEGEND = [
  { color: "#22c55e", label: "available" },
  { color: "#f59e0b", label: "limited" },
  { color: "#9ca3af", label: "full" },
];

export default function AvailabilityCalendar() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [monthOffset, setMonthOffset] = useState(0);

  const frame = monthView(monthOffset);

  // Real availability, worked out by the backend from bookings already taken.
  // Until it lands, the frame's own month maths and day states keep the
  // calendar drawn rather than blank.
  const { availability, live } = useAvailability(
    { year: frame.year, month: frame.month },
    null
  );

  const view = availability
    ? {
        label: availability.label,
        days: availability.daysInMonth,
        leadingBlanks: availability.leadingBlanks,
      }
    : frame;

  const dayStates = availability?.days || (monthOffset === 0 ? LOCAL_DAY_STATES : {});
  const days = Array.from({ length: view.days }, (_, index) => index + 1);

  return (
    <section className="flex w-full flex-col items-center bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="flex w-full max-w-[896px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[26px] leading-8 font-normal whitespace-nowrap text-[#f9a825] sm:text-[30px] sm:leading-9">
            Secure Your Date
          </p>
          <h2 className="pt-1 pb-3 text-center text-[28px] leading-[34px] font-bold text-[#1f2937] sm:text-[36px] sm:leading-10">
            Live Availability Calendar
          </h2>
          {/* Too long for one line on a phone: there it breaks after the
              title, and the separator dot goes with the line it joined. */}
          <div className="flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-[18px] border-[0.701px] border-solid border-[#dbeafe] bg-[#eff6ff] px-3 py-[6px] sm:rounded-full">
            <CalendarDays className="size-[13.996px] shrink-0 text-[#155dfc]" strokeWidth={1.666} />
            <span className="text-center text-[12px] leading-4 font-bold whitespace-nowrap text-[#155dfc]">
              Sales Display Calendar
            </span>
            <span className="text-center text-[12px] leading-4 whitespace-nowrap text-[#51a2ff]">
              <span className="hidden sm:inline">· </span>Booking calendar is separate
            </span>
          </div>
        </div>

        <div className="w-full pt-8 md:pt-10">
          <div className="flex w-full flex-col items-start overflow-hidden rounded-3xl border-[0.701px] border-solid border-[#f3f4f6] bg-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
            {/* header */}
            <div className="flex w-full flex-col items-start border-b-[0.701px] border-solid border-[#f3f4f6] px-4 pt-5 pb-4 sm:px-6 sm:pt-6">
              <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:justify-between">
                <div className="flex items-center gap-1 sm:gap-3">
                  <button
                    type="button"
                    aria-label="Previous month"
                    disabled={monthOffset === 0}
                    onClick={() => setMonthOffset(monthOffset - 1)}
                    className="flex size-10 items-center justify-center rounded-[20px] transition-colors enabled:cursor-pointer enabled:hover:bg-[#f3f4f6] disabled:opacity-30"
                  >
                    <ChevronLeft className="size-4 text-[#1f2937]" strokeWidth={1.333} />
                  </button>
                  <h3 className="min-w-[160px] text-center text-[18px] leading-7 font-bold whitespace-nowrap text-[#1f2937]">
                    {view.label}
                  </h3>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => setMonthOffset(monthOffset + 1)}
                    className="flex size-10 cursor-pointer items-center justify-center rounded-[20px] transition-colors hover:bg-[#f3f4f6]"
                  >
                    <ChevronRight className="size-4 text-[#1f2937]" strokeWidth={1.333} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-3 sm:pr-2">
                    {LEGEND.map(({ color, label }) => (
                      <div key={label} className="flex items-center gap-[6px]">
                        <span
                          className="size-[7.994px] shrink-0 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[12px] leading-4 whitespace-nowrap text-[#6a7282] capitalize">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="klicpic-rail flex w-full items-start gap-2 overflow-x-auto pt-4 pb-1">
                {SHOOT_FILTERS.map((filter) => {
                  const isActive = filter === activeFilter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`shrink-0 cursor-pointer rounded-full px-[14px] py-[6px] text-center text-[12px] leading-4 font-semibold whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-[#f9a825] text-[#1f2937]"
                          : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* grid */}
            <div className="flex w-full flex-col items-start p-3 sm:p-6">
              <div className="grid w-full grid-cols-7 gap-1 sm:gap-[6px]">
                {WEEKDAYS.map((weekday) => (
                  <div key={weekday} className="flex flex-col items-center py-[6px]">
                    <span className="text-center text-[10px] leading-[15px] font-semibold text-[#99a1af]">
                      {weekday}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid w-full grid-cols-7 gap-1 pt-2 sm:gap-[6px]">
                {Array.from({ length: view.leadingBlanks }, (_, index) => (
                  <div key={`blank-${index}`} />
                ))}
                {days.map((day) => {
                  const entry = dayStates[day];
                  const state = entry?.state ?? "muted";
                  const isBookable = state === "available" || state === "limited";
                  const cell = (
                    <>
                      <span className="text-center text-[14px] leading-[20px] font-bold">
                        {day}
                      </span>
                      {entry && (
                        <span className="pt-[2px] text-center text-[8px] leading-[9px] font-semibold whitespace-nowrap text-white opacity-90 sm:text-[9px]">
                          {entry.note}
                        </span>
                      )}
                    </>
                  );
                  const shape = `flex h-[55.994px] min-w-0 flex-col items-center justify-center rounded-[14px] transition-transform sm:rounded-[20px] ${STATE_STYLES[state]}`;

                  return isBookable ? (
                    <Link
                      key={day}
                      to="/book"
                      aria-label={`Book ${day} ${view.label} — ${entry.note}`}
                      className={`${shape} cursor-pointer hover:scale-[1.03]`}
                    >
                      {cell}
                    </Link>
                  ) : (
                    <div key={day} className={`${shape} cursor-default`}>
                      {cell}
                    </div>
                  );
                })}
              </div>

              {!live && (
                <p className="w-full pt-4 text-center text-[12px] leading-4 text-[#99a1af]">
                  Showing indicative availability — call us to confirm a slot.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
