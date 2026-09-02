import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Home, MessageCircle } from "lucide-react";
import { useBooking } from "../BookingContext";

/**
 * Figma: Booking Request Submitted (1615:9520).
 * Full-width success screen — no stepper or summary sidebar.
 */
const HIGHLIGHTS = [
  { emoji: "📸", label: "Shoot Booked" },
  { emoji: "⏱", label: "2hr Response" },
  { emoji: "💛", label: "Memories Made" },
];

const NEXT_STEPS = [
  "Our team reviews your request within 2 hours",
  "You'll receive a detailed quotation via WhatsApp",
  "Approve the quote and pay 30% advance",
  "Booking confirmed — your slot is reserved!",
];

const BURST = ["🎊", "💛", "📸", "🌟", "🎈", "💫"];

export default function StepSuccess({ requestId, name, onHome }) {
  const { booking } = useBooking();

  const rows = [
    { label: "Request ID", value: requestId, accent: true },
    { label: "Shoot Type", value: booking.shootType },
    { label: "Vibe", value: booking.vibe },
    { label: "Theme", value: booking.theme },
    { label: "Package", value: booking.package },
    { label: "Preferred Date", value: booking.date },
    { label: "Name", value: name },
  ].filter((row) => row.value);

  return (
    <div className="relative flex w-full flex-col items-center px-6 py-16">
      {/* emoji burst — trails off to the upper right, as in Figma 1615:9530 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        {BURST.map((emoji, index) => (
          <span
            key={emoji}
            className="absolute opacity-70"
            style={{
              fontSize: `${46 - index * 2.5}px`,
              left: `${52 + index * 8}%`,
              top: `${20 + index * 34}px`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative flex w-full max-w-[512px] flex-col items-center">
        <span className="flex size-28 items-center justify-center rounded-full bg-[#dcfce7]">
          <CheckCircle2 className="size-14 text-[#00c950]" strokeWidth={1.666} />
        </span>

        <p className="pt-8 text-center text-[28px] leading-10 font-bold text-[#1f2937]">
          Yay! You're all set 🎉
        </p>
        <h1 className="pt-2 text-center text-[26px] leading-9 font-bold text-[#f9a825]">
          Booking Request Submitted
        </h1>
        <p className="pt-3 text-center text-[16px] leading-6 text-[#6a7282]">
          Our team will contact you within 2 hours to confirm your slot and share
          the quotation.
        </p>

        <div className="flex w-full items-start justify-center gap-6 pt-8">
          {HIGHLIGHTS.map((item) => (
            <span key={item.label} className="flex flex-col items-center">
              <span className="text-[24px] leading-8">{item.emoji}</span>
              <span className="pt-2 text-[11px] leading-4 font-semibold text-[#6a7282]">
                {item.label}
              </span>
            </span>
          ))}
        </div>

        {/* summary */}
        <div className="mt-8 w-full rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white p-7 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
          <h3 className="text-[16px] leading-6 font-bold text-[#1f2937]">
            📋 Booking Summary
          </h3>
          <div className="flex flex-col gap-[10px] pt-4">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3">
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
        </div>

        {/* next steps */}
        <div className="mt-6 w-full rounded-2xl bg-[#fff7ed] p-5">
          <h4 className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
            🚀 What happens next?
          </h4>
          <ol className="flex flex-col gap-2 pt-3">
            {NEXT_STEPS.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-[2px] flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f9a825] text-[11px] leading-4 font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-[14px] leading-[20px] text-[#6a7282]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* actions */}
        <Link
          to="/portal"
          className="mt-7 w-full cursor-pointer rounded-2xl bg-[#f9a825] py-[15px] text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
        >
          📊 Track My Request
        </Link>
        <a
          href="https://wa.me/919876543210"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-[0.701px] border-solid border-[#e5e7eb] py-[15px] text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:bg-[#f9fafb]"
        >
          <MessageCircle className="size-4 shrink-0" strokeWidth={1.666} />
          WhatsApp Support
        </a>
        <button
          type="button"
          onClick={onHome}
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-[15px] text-center text-[14px] leading-[20px] font-bold text-[#6a7282] transition-colors hover:text-[#f9a825]"
        >
          <Home className="size-4 shrink-0" strokeWidth={1.666} />
          Back to Home
        </button>
      </div>
    </div>
  );
}
