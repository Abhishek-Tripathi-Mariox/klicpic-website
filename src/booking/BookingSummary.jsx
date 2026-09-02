import React from "react";
import { Gift, MessageCircle, Phone } from "lucide-react";
import { useBooking } from "./BookingContext";

/**
 * Figma: Booking Summary sidebar (1550:11659).
 * Rows appear as the wizard fills them in; date and time slot render gold.
 */
const inr = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function BookingSummary() {
  const { booking } = useBooking();

  const rows = [
    { label: "Shoot Type", value: booking.shootType },
    { label: "Vibe", value: booking.vibe },
    { label: "Theme", value: booking.theme },
    { label: "Props", value: booking.props?.length ? booking.props.join(", ") : null },
    { label: "Gown", value: booking.gown },
    { label: "Location", value: booking.location },
    { label: "Date", value: booking.date, accent: true },
    { label: "Time Slot", value: booking.timeSlot, accent: true },
    { label: "Extras", value: booking.extrasList?.length ? booking.extrasList.join(", ") : booking.extras },
    { label: "Package", value: booking.package, accent: true },
  ].filter((row) => row.value);

  return (
    <aside className="w-full rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white p-6 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)]">
      <h3 className="w-full border-b-[0.701px] border-solid border-[#f3f4f6] pb-3 text-[16px] leading-6 font-bold text-[#1f2937]">
        Booking Summary
      </h3>

      <div className="flex w-full flex-col gap-3 pt-5">
        {rows.map((row) => (
          <div key={row.label} className="flex w-full items-start justify-between gap-3">
            <span className="text-[14px] leading-[20px] text-[#6a7282]">
              {row.label}
            </span>
            <span
              className={`text-right text-[14px] leading-[20px] font-semibold ${
                row.accent ? "text-[#f9a825]" : "text-[#1f2937]"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {booking.coupon && (
        <div className="mt-4 flex w-full items-start gap-2 rounded-2xl border-[0.701px] border-dashed border-[#f9a825] p-3">
          <Gift className="mt-[2px] size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
          <div className="flex flex-col items-start">
            <p className="text-[12px] leading-4 font-bold text-[#f9a825]">
              {booking.coupon.title}
            </p>
            <p className="text-[11px] leading-4 text-[#99a1af]">
              {booking.coupon.subtitle}
            </p>
            <p className="pt-1 font-mono text-[11px] leading-4 font-bold tracking-[0.5px] text-[#f9a825]">
              {booking.coupon.code}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 w-full border-t-[0.701px] border-solid border-[#f3f4f6] pt-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
            Estimated Total
          </span>
          <span className="text-[20px] leading-7 font-bold whitespace-nowrap text-[#f9a825]">
            {inr(booking.total)}
          </span>
        </div>
        <p className="pt-1 text-[11px] leading-[16.5px] text-[#99a1af]">
          30% advance to confirm booking
        </p>

        <div className="flex w-full items-stretch gap-2 pt-3">
          <a
            href="tel:+919876543210"
            className="flex flex-1 items-center justify-center gap-[6px] rounded-2xl border-[0.701px] border-solid border-[#e5e7eb] py-2 text-[12px] leading-4 font-semibold text-[#1f2937] transition-colors hover:bg-[#f9fafb]"
          >
            <Phone className="size-[11.992px] shrink-0" strokeWidth={1.666} />
            Call
          </a>
          <a
            href="https://wa.me/919876543210"
            className="flex flex-1 items-center justify-center gap-[6px] rounded-2xl bg-[#25d366] py-2 text-[12px] leading-4 font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-[11.992px] shrink-0" strokeWidth={1.666} />
            Chat
          </a>
        </div>
      </div>

      <div className="mt-4 w-full rounded-[20px] bg-[#fff7ed] p-3">
        <p className="text-[12px] leading-4 font-medium text-[#1f2937]">
          🔥 Free Instagram Reel with every booking this month!
        </p>
      </div>
    </aside>
  );
}
