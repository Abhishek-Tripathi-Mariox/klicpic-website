import React, { useState } from "react";
import { Bookmark, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useBooking } from "../BookingContext";
import { TIME_SLOTS as LOCAL_TIME_SLOTS } from "../bookingData";
import { useTimeSlots } from "../../api/useCatalog";

/**
 * Figma: Step3Details — date sub-step (1550:13247 / 13271).
 * August 2026 calendar, weekend days in red, selected day gold, then the
 * optional time-slot grid and the continue button.
 */
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/** The frame opens on August 2026; the arrows page forward from there. */
const FIRST_MONTH = { year: 2026, month: 7 };

/** Real month maths, so paging never drifts out of sync with the weekday grid. */
function monthView(offset) {
  const first = new Date(FIRST_MONTH.year, FIRST_MONTH.month + offset, 1);
  return {
    year: first.getFullYear(),
    month: first.getMonth(),
    label: first.toLocaleDateString("en-GB", { month: "long" }),
    days: new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate(),
    startWeekday: first.getDay(),
  };
}

const LEGEND = [
  { swatch: "bg-[#f9a825]", label: "Selected" },
  { swatch: "bg-[#e5e7eb]", label: "Today" },
  { swatch: "text-[#e7000b]", label: "Sa Su", isText: true },
  { swatch: "bg-[#f3f4f6]", label: "Past" },
];

const isWeekend = (index) => index % 7 === 0 || index % 7 === 6;

export default function StepDate({ onNext, onRestart }) {
  // Only offer slots the studio actually runs.
  const TIME_SLOTS = useTimeSlots(LOCAL_TIME_SLOTS);

  const { booking, set } = useBooking();
  const [monthOffset, setMonthOffset] = useState(0);
  const [day, setDay] = useState(5);
  const [slot, setSlot] = useState("11:00 AM");

  const view = monthView(monthOffset);
  const selected = day ? new Date(view.year, view.month, day) : null;
  const dateLabel = selected?.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const longDate = selected?.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Day 31 has no meaning in a 30-day month, so paging starts the pick over.
  const goToMonth = (offset) => {
    setMonthOffset(offset);
    setDay(null);
  };

  const confirm = () => {
    if (!selected) return;
    set({ date: dateLabel, timeSlot: slot });
    onNext?.();
  };

  return (
    <div className="flex w-full flex-col items-start">
      <h2 className="text-[30px] leading-9 font-bold text-[#1f2937]">
        Customise Your Session
      </h2>
      <p className="pt-2 text-[16px] leading-6 text-[#6a7282]">
        First, let us know when you're planning your shoot
      </p>

      <div className="mt-6 flex w-full items-center justify-between gap-3 rounded-2xl bg-[#eff6ff] px-4 py-3">
        <span className="flex items-center gap-2">
          <Bookmark className="size-4 shrink-0 text-[#155dfc]" strokeWidth={1.666} />
          <span className="text-[14px] leading-[20px] text-[#155dfc]">
            <strong className="font-bold">Welcome back!</strong> Your previous
            selections are saved.
          </span>
        </span>
        <button
          type="button"
          onClick={onRestart}
          className="shrink-0 cursor-pointer text-[12px] leading-4 font-semibold text-[#155dfc] underline"
        >
          Start fresh
        </button>
      </div>

      {/* date card */}
      <div className="mt-8 w-full max-w-[512px] self-center overflow-hidden rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
        <div className="flex w-full flex-col items-center border-b-[0.701px] border-solid border-[#f9fafb] px-6 pt-7 pb-5">
          <span className="flex size-[55.994px] items-center justify-center rounded-2xl bg-[rgba(249,168,37,0.1)] text-[24px] leading-8">
            📅
          </span>
          <h3 className="pt-3 text-center text-[20px] leading-7 font-bold text-[#1f2937]">
            When are you planning your shoot?
          </h3>
          <p className="pt-1 text-center text-[14px] leading-[20px] text-[#99a1af]">
            Pick a date — we'll check slot availability
          </p>
        </div>

        <div className="flex w-full flex-col items-start p-6">
          {/* month nav */}
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              disabled={monthOffset === 0}
              onClick={() => goToMonth(monthOffset - 1)}
              className="flex size-8 items-center justify-center rounded-full border-[0.701px] border-solid border-[#e5e7eb] text-[#6a7282] transition-colors enabled:cursor-pointer enabled:hover:bg-[#f9fafb] disabled:opacity-30"
            >
              <ChevronLeft className="size-4" strokeWidth={1.666} />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[16px] leading-6 font-bold text-[#1f2937]">
                {view.label}
              </span>
              <span className="text-[12px] leading-4 text-[#99a1af]">
                {view.year}
              </span>
            </div>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => goToMonth(monthOffset + 1)}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full border-[0.701px] border-solid border-[#e5e7eb] text-[#6a7282] transition-colors hover:bg-[#f9fafb]"
            >
              <ChevronRight className="size-4" strokeWidth={1.666} />
            </button>
          </div>

          {/* weekday header */}
          <div className="grid w-full grid-cols-7 gap-1 pt-4">
            {WEEKDAYS.map((weekday, index) => (
              <span
                key={weekday}
                className={`text-center text-[12px] leading-4 font-semibold ${
                  index === 0 || index === 6 ? "text-[#e7000b]" : "text-[#99a1af]"
                }`}
              >
                {weekday}
              </span>
            ))}
          </div>

          {/* day grid */}
          <div className="grid w-full grid-cols-7 gap-1 pt-2">
            {Array.from({ length: view.startWeekday }, (_, i) => (
              <span key={`blank-${i}`} />
            ))}
            {Array.from({ length: view.days }, (_, i) => {
              const date = i + 1;
              const cellIndex = view.startWeekday + i;
              const isSelected = date === day;
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => setDay(date)}
                  className={`flex h-9 cursor-pointer items-center justify-center rounded-full text-[14px] leading-[20px] transition-colors ${
                    isSelected
                      ? "bg-[#f9a825] font-bold text-white"
                      : isWeekend(cellIndex)
                        ? "text-[#e7000b] hover:bg-[#fef2f2]"
                        : "text-[#1f2937] hover:bg-[#f3f4f6]"
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>

          {/* legend */}
          <div className="flex w-full flex-wrap items-center gap-3 pt-4">
            {LEGEND.map((item) => (
              <span key={item.label} className="flex items-center gap-[6px]">
                {item.isText ? (
                  <span className={`text-[10px] font-bold ${item.swatch}`}>Sa</span>
                ) : (
                  <span className={`size-[10px] rounded-[3px] ${item.swatch}`} />
                )}
                <span className="text-[10px] leading-4 text-[#99a1af]">
                  {item.label}
                </span>
              </span>
            ))}
          </div>

          {/* chosen date — hidden once cleared, there is nothing to show */}
          {selected && (
          <div className="mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border-[0.701px] border-solid border-[#f9a825] bg-[#fffbeb] px-4 py-3">
            <span className="flex items-center gap-3">
              <span className="text-[20px] leading-7">📅</span>
              <span className="flex flex-col items-start">
                <span className="text-[10px] leading-4 font-bold tracking-[0.6px] text-[#99a1af] uppercase">
                  Your shoot date
                </span>
                <span className="text-[14px] leading-[20px] font-bold text-[#f9a825]">
                  {longDate}
                </span>
              </span>
            </span>
            <button
              type="button"
              aria-label="Clear date"
              onClick={() => setDay(null)}
              className="shrink-0 cursor-pointer text-[#99a1af] transition-colors hover:text-[#1f2937]"
            >
              <X className="size-4" strokeWidth={1.666} />
            </button>
          </div>
          )}

          {/* time slots */}
          <p className="pt-5 text-[12px] leading-4 font-bold text-[#1f2937]">
            🕐 Preferred Time Slot{" "}
            <span className="font-normal text-[#99a1af]">(optional)</span>
          </p>
          <div className="grid w-full grid-cols-2 gap-2 pt-3 sm:grid-cols-3">
            {TIME_SLOTS.map((item) => {
              const isActive = item.time === slot;
              return (
                <button
                  key={item.time}
                  type="button"
                  onClick={() => setSlot(item.time)}
                  className={`flex cursor-pointer flex-col items-center rounded-2xl border-[0.701px] border-solid py-2 transition-colors ${
                    isActive
                      ? "border-[#f9a825] bg-[#fffbeb]"
                      : "border-[#e5e7eb] bg-white hover:border-[#f9a825]"
                  }`}
                >
                  <span
                    className={`text-[14px] leading-[20px] font-bold ${
                      isActive ? "text-[#f9a825]" : "text-[#1f2937]"
                    }`}
                  >
                    {item.time}
                  </span>
                  <span className="text-[11px] leading-4 text-[#99a1af]">
                    {item.period}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="pt-3 text-[11px] leading-4 font-semibold text-[#00a63e]">
            ✓ Preferred slot: {slot} — our team will confirm availability
          </p>
          <p className="pt-1 text-[11px] leading-4 text-[#99a1af]">
            Exact slot confirmed by our team after booking request.
          </p>

          <button
            type="button"
            onClick={confirm}
            className="mt-5 w-full cursor-pointer rounded-2xl bg-[#f9a825] py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
          >
            Continue with {view.label} {day} →
          </button>
        </div>
      </div>
    </div>
  );
}
