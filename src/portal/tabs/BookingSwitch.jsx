import React from "react";

/**
 * Which booking a tab is showing. Hidden when there is only one — most
 * customers have a single booking and need no choice.
 */
const DATE = { day: "numeric", month: "short", year: "numeric" };

export const bookingLabel = (raw) =>
  [
    raw?.bookingCode || "Booking",
    raw?.date ? new Date(raw.date).toLocaleDateString("en-IN", DATE) : "",
  ]
    .filter(Boolean)
    .join(" · ");

export default function BookingSwitch({ bookings, value, onChange }) {
  const options = (bookings || []).map((item) => item.raw).filter((raw) => raw?.id);
  if (options.length < 2) return null;

  return (
    <label className="flex max-w-full min-w-0 items-center gap-2 text-[13px] text-[#6a7282]">
      Booking
      <select
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 min-w-0 cursor-pointer rounded-full border-[0.57px] border-solid border-[#e5e7eb] bg-white px-3 text-[13px] lg:h-auto lg:py-1.5 font-semibold text-[#1f2937] outline-none focus:border-[#f9a825]"
      >
        {options.map((raw) => (
          <option key={raw.id} value={raw.id}>
            {bookingLabel(raw)}
            {raw.cancelled ? " (cancelled)" : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
