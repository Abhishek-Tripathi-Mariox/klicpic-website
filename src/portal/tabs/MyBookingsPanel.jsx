import React, { useState } from "react";
import { Bookmark, ChevronRight, Clock } from "lucide-react";
import CancelBookingModal from "./CancelBookingModal";

/**
 * Figma: My Bookings — 1615:14441 (collapsed), 1615:16285 (expanded) and
 * 1615:18251 → panel 1615:18532 (expanded after a cancel request).
 *
 * One outer card with its own header, then a bordered row per booking.
 * Expanding reveals a grey drawer holding a 2×2 detail grid and the action.
 */
const SHOOT_EMOJI = [
  [/matern/i, "🤰"],
  [/birthday/i, "🎂"],
  [/famil/i, "👨‍👩‍👧‍👦"],
  [/wedding|couple/i, "💍"],
  [/baby|newborn|toddler/i, "👶"],
];

const emojiFor = (text) =>
  (SHOOT_EMOJI.find(([pattern]) => pattern.test(String(text || ""))) || [null, "📸"])[1];

/**
 * Each state carries its own tint, used by both the badge and the emoji chip
 * behind it (1615:18548 / 18617 / 18643).
 */
const STATE_TONE = {
  requested: { tint: "bg-[#f5f3ff]", text: "text-[#7c3aed]", label: "Cancel Requested" },
  cancelled: { tint: "bg-[#fef2f2]", text: "text-[#dc2626]", label: "Cancelled" },
  completed: { tint: "bg-[#ecfdf5]", text: "text-[#059669]", label: "Completed" },
  active: { tint: "bg-[#fffbeb]", text: "text-[#f9a825]", label: "Active" },
};

const money = (value) => `₹${Math.round(Number(value) || 0).toLocaleString("en-IN")}`;

export default function MyBookingsPanel({ bookings = [], cancelRequests = [], onChanged }) {
  // `bookings` arrives after the first render, so an initial-state default would
  // capture undefined. Track what the customer opened or closed instead, and
  // leave the newest booking open until they touch it (1615:16285).
  const [openedId, setOpenedId] = useState(null);
  const [closedId, setClosedId] = useState(null);
  const [cancelling, setCancelling] = useState(null);

  const requested = new Set(cancelRequests.map((request) => request.bookingId));

  return (
    <div className="w-full overflow-hidden rounded-[24px] border-[0.57px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex w-full items-center gap-3 border-b-[0.57px] border-solid border-[#f3f4f6] px-6 py-5">
        <Bookmark className="size-5 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
        <span className="flex flex-col items-start">
          <span className="text-[20px] leading-[30px] font-black text-[#1f2937]">
            My Bookings
          </span>
          <span className="pt-[2px] text-[12px] leading-4 text-[#99a1af]">
            {bookings.length} booking{bookings.length === 1 ? "" : "s"} · tap to expand
          </span>
        </span>
      </div>

      <div className="flex w-full flex-col p-5">
        {bookings.length === 0 && (
          <p className="py-8 text-center text-[13px] leading-[20px] text-[#99a1af]">
            No bookings yet — your shoots will appear here.
          </p>
        )}

        {bookings.map((entry, index) => {
          const booking = entry.raw || entry;
          const isNewest = index === 0;
          const open = openedId ? openedId === entry.id : isNewest && closedId !== entry.id;

          const state = booking.cancelled
            ? "cancelled"
            : requested.has(entry.id)
              ? "requested"
              : /deliver|complete/i.test(booking.status || "")
                ? "completed"
                : "active";
          const tone = STATE_TONE[state];
          const balance = Math.max((booking.amount || 0) - (booking.paid || 0), 0);

          return (
            <article
              key={entry.id}
              className={`overflow-hidden rounded-2xl border-[0.57px] border-solid border-[#e5e7eb] ${index > 0 ? "mt-3" : ""}`}
            >
              <button
                type="button"
                onClick={() => {
                  setOpenedId(open ? null : entry.id);
                  setClosedId(open ? entry.id : null);
                }}
                aria-expanded={open}
                className="flex w-full cursor-pointer items-center gap-3 p-4 text-left"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-[20px] text-[20px] leading-7 ${tone.tint}`}
                >
                  {emojiFor(booking.theme || entry.title)}
                </span>

                <span className="flex min-w-0 flex-1 flex-col items-start">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-[14px] leading-[20px] font-black text-[#1f2937]">
                      {entry.title}
                    </span>
                    <span
                      className={`rounded-full px-2 py-[2px] text-[10px] leading-[15px] font-bold whitespace-nowrap ${tone.tint} ${tone.text}`}
                    >
                      {state === "active" ? booking.status || tone.label : tone.label}
                    </span>
                  </span>
                  <span className="pt-[2px] text-[12px] leading-4 font-medium text-[#99a1af]">
                    {entry.meta}
                  </span>
                </span>

                <span className="flex shrink-0 flex-col items-end">
                  <span className="text-[14px] leading-[20px] font-black text-right text-[#1f2937]">
                    {booking.amountLabel || money(booking.amount)}
                  </span>
                  <span className="text-[10px] leading-[15px] font-medium text-right text-[#99a1af]">
                    {booking.package || "—"}
                  </span>
                </span>

                <ChevronRight
                  className={`size-4 shrink-0 text-[#99a1af] transition-transform ${open ? "rotate-90" : ""}`}
                  strokeWidth={1.666}
                />
              </button>

              {open && (
                <div className="w-full border-t-[0.57px] border-solid border-[#f3f4f6] bg-[#f9fafb] p-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { label: "Package", value: booking.package || "—" },
                      { label: "Studio", value: booking.studio || "—" },
                      { label: "Amount Paid", value: money(booking.paid) },
                      { label: "Balance Due", value: money(balance) },
                    ].map((row) => (
                      <span
                        key={row.label}
                        className="flex flex-col items-start rounded-[20px] border-[0.57px] border-solid border-[#f3f4f6] bg-white px-3 py-[10px]"
                      >
                        <span className="text-[10px] leading-[15px] font-semibold tracking-[0.5px] text-[#99a1af] uppercase">
                          {row.label}
                        </span>
                        <span className="pt-[2px] text-[14px] leading-[20px] font-bold text-[#1f2937]">
                          {row.value}
                        </span>
                      </span>
                    ))}
                  </div>

                  {!booking.cancelled &&
                    (state === "requested" ? (
                      <p className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-[20px] bg-[#f3e8ff]">
                        <Clock className="size-[14px] shrink-0 text-[#8200db]" strokeWidth={1.666} />
                        <span className="text-[12px] leading-4 font-bold text-[#8200db]">
                          Cancel in Review
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCancelling({ ...booking, id: entry.id })}
                        className="mt-4 h-9 w-full cursor-pointer rounded-[20px] bg-[#fef2f2] text-center text-[12px] leading-4 font-bold text-[#dc2626] transition-colors hover:bg-[#fee2e2]"
                      >
                        Cancel Booking
                      </button>
                    ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {cancelling && (
        <CancelBookingModal
          booking={cancelling}
          onClose={() => setCancelling(null)}
          onRequested={onChanged}
        />
      )}
    </div>
  );
}
