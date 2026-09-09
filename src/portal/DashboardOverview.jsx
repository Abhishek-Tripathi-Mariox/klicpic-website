import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Circle, Plus } from "lucide-react";
import {
  BOOKING_DETAILS,
  MY_BOOKINGS as LOCAL_MY_BOOKINGS,
  RECENT_MESSAGES,
  REQUEST_CHIPS,
  TIMELINE,
} from "./portalData";
import { usePortalBookings } from "../api/usePortalBookings";
import { readSavedJourney } from "../booking/BookingContext";
import ReviewCard from "./ReviewCard";

/**
 * Figma: Dashboard — Overview tab (1615:10258 / 10956).
 * Three columns: bookings + saved journey · booking details, requests,
 * messages · the booking timeline.
 */
const CARD =
  "rounded-2xl border-[0.57px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]";

const STATUS_TONE = {
  Active: "bg-[#fff7ed] text-[#f9a825]",
  Completed: "bg-[#f3f4f6] text-[#6a7282]",
  Cancelled: "bg-[#fef2f2] text-[#dc2626]",
};

export default function DashboardOverview({ onOpenTab }) {
  // Whatever "Save Progress" actually parked in the wizard. Null when the
  // customer never saved one, in which case the card does not render — the
  // frame's filled-in 7/7 example is not a journey anybody took.
  const journey = useMemo(() => readSavedJourney(), []);

  // Real bookings for the signed-in customer; the bundled list only shows
  // if the request never lands.
  const { bookings: MY_BOOKINGS, loading: bookingsLoading } =
    usePortalBookings(LOCAL_MY_BOOKINGS);

  const [openBooking, setOpenBooking] = useState(0);

  // Details and timeline follow whichever booking is selected in the list.
  const selected = MY_BOOKINGS[openBooking]?.raw;

  const details = selected
    ? {
        reference: selected.bookingCode || "",
        rows: [
          { label: "Shoot Date", value: selected.date ? new Date(selected.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
          { label: "Time", value: selected.time || "—" },
          { label: "Duration", value: selected.duration || "—" },
          { label: "Theme", value: selected.theme || "—" },
          { label: "Studio", value: selected.studio || "—" },
          { label: "Package", value: selected.package || "—" },
          { label: "Amount", value: selected.amountLabel || "—" },
          { label: "Status", value: selected.status || "—" },
        ],
      }
    : null;

  // The backend maps the CRM's internal statuses onto customer-facing stages.
  const timeline = selected?.timeline?.length
    ? selected.timeline.map((stage) => ({
        label: stage.label,
        state: stage.done ? "done" : stage.current ? "current" : "todo",
      }))
    : null;

  const [request, setRequest] = useState("");
  const [chips, setChips] = useState([]);

  const toggleChip = (chip) =>
    setChips((current) =>
      current.includes(chip) ? current.filter((c) => c !== chip) : [...current, chip]
    );

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
      {/* left: bookings + saved journey */}
      <div className="flex flex-col gap-4">
        <div className={`${CARD} p-4`}>
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
              My Bookings
            </h3>
            <Link
          to="/book"
              className="flex cursor-pointer items-center gap-1 text-[11px] leading-4 font-semibold text-[#f9a825]"
            >
              <Plus className="size-3" strokeWidth={2.5} />
              New Booking
            </Link>
          </div>
          <div className="flex flex-col gap-2 pt-3">
            {bookingsLoading && MY_BOOKINGS.length === 0 && (
              <p className="py-6 text-center text-[12px] leading-4 text-[#99a1af]">
                Loading your bookings…
              </p>
            )}

            {!bookingsLoading && MY_BOOKINGS.length === 0 && (
              <div className="rounded-xl border-[0.57px] border-dashed border-[#e5e7eb] p-6 text-center">
                <p className="text-[13px] leading-[18px] font-semibold text-[#1f2937]">
                  No bookings yet
                </p>
                <p className="pt-1 text-[11px] leading-4 text-[#99a1af]">
                  Your shoots will appear here once you book one.
                </p>
                <Link
                  to="/book"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] leading-4 font-bold text-[#f9a825]"
                >
                  <Plus className="size-3" strokeWidth={2.5} />
                  Book your first shoot
                </Link>
              </div>
            )}

            {MY_BOOKINGS.map((booking, index) => (
              <button
                key={booking.id || booking.meta}
                type="button"
                aria-pressed={index === openBooking}
                onClick={() => setOpenBooking(index)}
                className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border-[0.57px] border-solid p-3 text-left transition-colors ${
                  index === openBooking
                    ? "border-[#f9a825] bg-[#fffbeb]"
                    : "border-[#f3f4f6] bg-white hover:border-[#f9a825]"
                }`}
              >
                <span className="flex min-w-0 flex-col items-start">
                  <span className="text-[13px] leading-[18px] font-semibold text-[#1f2937]">
                    {booking.title}
                  </span>
                  <span className="truncate text-[11px] leading-4 text-[#99a1af]">
                    {booking.meta}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-[2px] text-[10px] leading-4 font-bold whitespace-nowrap ${STATUS_TONE[booking.status] || "bg-[#f3f4f6] text-[#6a7282]"}`}
                >
                  {booking.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {journey && (
          <div className="rounded-2xl border-[0.57px] border-dashed border-[#f9a825] bg-[#fffbeb] p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="flex items-center gap-2">
                <span className="text-[16px]">🔖</span>
                <span className="flex flex-col items-start">
                  <span className="text-[13px] leading-[18px] font-bold text-[#1f2937]">
                    My Saved Journey
                  </span>
                  {journey.savedAt && (
                    <span className="text-[10px] leading-4 text-[#99a1af]">
                      Saved {new Date(journey.savedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </span>
              </span>
              <Link
                to="/book"
                className="shrink-0 cursor-pointer text-[11px] leading-4 font-bold text-[#f9a825]"
              >
                Resume →
              </Link>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-[11px] leading-4 text-[#6a7282]">
                Booking journey
              </span>
              <span className="text-[11px] leading-4 font-bold text-[#00a63e]">
                {journey.done}/{journey.total} steps done
              </span>
            </div>
            <div className="mt-2 h-[6px] w-full overflow-hidden rounded-full bg-[#fde9bd]">
              <div
                className="h-full rounded-full bg-[#00c950] transition-[width]"
                style={{ width: `${(journey.done / journey.total) * 100}%` }}
              />
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-3">
              {journey.steps.map((step) => (
                <span
                  key={step.label}
                  className={`text-[10px] leading-4 font-semibold ${
                    step.done ? "text-[#00a63e]" : "text-[#99a1af]"
                  }`}
                >
                  {step.done ? "✓" : "○"} {step.label}
                </span>
              ))}
            </div>
          </div>
        )}
        <ReviewCard bookings={MY_BOOKINGS} />
      </div>

      {/* middle: details, request, messages */}
      <div className="flex flex-col gap-4">
        <div className={`${CARD} p-5`}>
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] leading-[22px] font-bold text-[#1f2937]">
              Booking Details
            </h3>
            {details && (
              <span className="rounded-full bg-[#f3f4f6] px-2 py-[2px] text-[10px] leading-4 font-semibold text-[#6a7282]">
                {details.reference}
              </span>
            )}
          </div>
          {!details && (
            <p className="pt-4 text-[13px] leading-[20px] text-[#99a1af]">
              Your shoot details will appear here once you have a booking.
            </p>
          )}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4">
            {(details?.rows || []).map((row) => (
              <div key={row.label} className="flex flex-col items-start">
                <span className="text-[11px] leading-4 text-[#99a1af]">
                  {row.label}
                </span>
                <span className="text-[13px] leading-[18px] font-semibold text-[#1f2937]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${CARD} p-5`}>
          <h3 className="flex items-center gap-2 text-[15px] leading-[22px] font-bold text-[#1f2937]">
            <span>✏️</span> Add a Request
          </h3>
          <p className="pt-1 text-[12px] leading-4 text-[#6a7282]">
            Want to add a gown change, extra location, prop, or anything else?
          </p>
          <div className="flex flex-wrap gap-2 pt-3">
            {REQUEST_CHIPS.map((chip) => {
              const on = chips.includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => toggleChip(chip)}
                  className={`cursor-pointer rounded-full border-[0.57px] border-solid px-3 py-[5px] text-[11px] leading-4 font-semibold transition-colors ${
                    on
                      ? "border-[#f9a825] bg-[#fffbeb] text-[#f9a825]"
                      : "border-[#e5e7eb] bg-white text-[#6a7282] hover:border-[#f9a825]"
                  }`}
                >
                  + {chip}
                </button>
              );
            })}
          </div>
          <textarea
            rows={3}
            value={request}
            onChange={(event) => setRequest(event.target.value)}
            placeholder="Describe your request…"
            className="mt-3 w-full resize-none rounded-2xl border-[0.57px] border-solid border-[#e5e7eb] px-4 py-3 text-[13px] leading-[20px] text-[#1f2937] outline-none transition-colors placeholder:text-[#99a1af] focus:border-[#f9a825]"
          />
        </div>

        <div className={`${CARD} p-5`}>
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] leading-[22px] font-bold text-[#1f2937]">
              Recent Messages
            </h3>
            <button
              type="button"
              onClick={() => onOpenTab?.("messages")}
              className="cursor-pointer text-[11px] leading-4 font-semibold text-[#f9a825]"
            >
              View All
            </button>
          </div>
          {RECENT_MESSAGES.map((message) => (
            <div key={message.body} className="flex gap-3 pt-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f9a825] text-[13px] font-bold text-white">
                {message.initial}
              </span>
              <span className="flex min-w-0 flex-col items-start">
                <span className="flex items-center gap-2">
                  <span className="text-[13px] leading-[18px] font-semibold text-[#1f2937]">
                    {message.from}
                  </span>
                  <span className="text-[10px] leading-4 text-[#99a1af]">
                    {message.time}
                  </span>
                </span>
                <span className="pt-1 text-[12px] leading-[18px] text-[#6a7282]">
                  {message.body}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* right: timeline */}
      <div className={`${CARD} p-5`}>
        <h3 className="text-[15px] leading-[22px] font-bold text-[#1f2937]">
          Booking Timeline
        </h3>
        <p className="pt-1 text-[11px] leading-4 text-[#99a1af]">
          Stages marked <span className="font-bold text-[#f9a825]">YOU</span> need
          your action
        </p>

        <ol className="flex flex-col pt-4">
          {!timeline && (
            <li className="text-[13px] leading-[20px] text-[#99a1af]">
              Your shoot progress will show here once you have a booking.
            </li>
          )}
          {(timeline || []).map((stage, index) => {
            const isLast = index === (timeline?.length ?? 0) - 1;
            return (
              <li key={stage.label} className="flex gap-3">
                <span className="flex flex-col items-center">
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                      stage.state === "done"
                        ? "bg-[#00c950]"
                        : stage.state === "current"
                          ? "bg-[#f9a825]"
                          : "border-[1.5px] border-solid border-[#e5e7eb] bg-white"
                    }`}
                  >
                    {stage.state === "done" && (
                      <Check className="size-3 text-white" strokeWidth={3} />
                    )}
                    {stage.state === "current" && (
                      <Circle className="size-2 fill-white text-white" />
                    )}
                  </span>
                  {!isLast && (
                    <span
                      className={`w-[2px] flex-1 ${
                        stage.state === "done" ? "bg-[#00c950]" : "bg-[#e5e7eb]"
                      }`}
                      style={{ minHeight: stage.note ? "34px" : "18px" }}
                    />
                  )}
                </span>

                <span className={`flex flex-col items-start ${isLast ? "" : "pb-3"}`}>
                  <span className="flex flex-wrap items-center gap-[6px]">
                    <span
                      className={`text-[12px] leading-[18px] font-semibold ${
                        stage.state === "pending" ? "text-[#99a1af]" : "text-[#1f2937]"
                      }`}
                    >
                      {stage.label}
                    </span>
                    {stage.action && (
                      <>
                        <span className="rounded-full bg-[#f9a825] px-[6px] py-[1px] text-[9px] leading-[14px] font-black text-white">
                          YOU
                        </span>
                        <span className="rounded-full bg-[#fff7ed] px-[6px] py-[1px] text-[9px] leading-[14px] font-black text-[#f9a825]">
                          ACTION
                        </span>
                      </>
                    )}
                    {stage.state === "current" && stage.note && (
                      <span className="rounded-full bg-[#fffbeb] px-[6px] py-[1px] text-[9px] leading-[14px] font-bold text-[#f59e0b]">
                        {stage.note}
                      </span>
                    )}
                  </span>
                  {stage.action && stage.note && (
                    <span className="pt-[2px] text-[10px] leading-4 text-[#99a1af]">
                      {stage.note}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
