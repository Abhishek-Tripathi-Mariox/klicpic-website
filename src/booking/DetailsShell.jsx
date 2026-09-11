import React from "react";
import SaveProgressButton from "./SaveProgressButton";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useBooking } from "./BookingContext";
import { DETAIL_SUBSTEPS } from "./bookingData";

/**
 * Shared chrome for the four Details sub-steps.
 * Figma: Theme 1550:14898 · Props 1552:16994 · Gowns 1552:17865 ·
 * Location 1615:3632 — heading, sub-stepper, and the sticky action bar.
 */
export default function DetailsShell({
  index,
  hint,
  onSkipStep,
  backLabel,
  nextLabel,
  canContinue,
  onBack,
  onNext,
  onSkipAll,
  footNote,
  children,
}) {
  const { booking } = useBooking();

  return (
    <div className="flex w-full flex-col items-start pb-24">
      {/* Wraps rather than squeezes: on a phone the pill drops under the
          heading instead of crushing it into a three-line column. */}
      <div className="flex w-full flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex flex-col items-start">
          <h2 className="text-[26px] leading-8 font-bold text-[#1f2937] sm:text-[30px] sm:leading-9">
            Customise Your Session
          </h2>
          <p className="pt-1 text-[12px] leading-4 text-[#99a1af]">
            Step {index + 1} of {DETAIL_SUBSTEPS.length} — {DETAIL_SUBSTEPS[index]}{" "}
            {booking.date && (
              <span className="font-semibold text-[#f9a825]">📅 {booking.date}</span>
            )}
          </p>
        </div>
        <SaveProgressButton />
      </div>

      {/* sub-stepper */}
      <div className="flex w-full items-center pt-6">
        {DETAIL_SUBSTEPS.map((label, i) => {
          const done = i < index;
          const current = i === index;
          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex shrink-0 flex-col items-center gap-1">
                <span
                  className={`flex size-8 items-center justify-center rounded-full text-[14px] leading-[20px] font-bold ${
                    done
                      ? "bg-[#00c950] text-white"
                      : current
                        ? "bg-[#f9a825] text-white"
                        : "bg-[#f3f4f6] text-[#99a1af]"
                  }`}
                >
                  {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`text-[11px] leading-4 font-semibold ${
                    done
                      ? "text-[#00c950]"
                      : current
                        ? "text-[#f9a825]"
                        : "text-[#99a1af]"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < DETAIL_SUBSTEPS.length - 1 && (
                <span
                  className={`mx-2 mb-5 h-[1.993px] flex-1 rounded-full ${
                    done ? "bg-[#00c950]" : "bg-[#e5e7eb]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex w-full items-center justify-between gap-3 pt-2">
        <p className="text-[12px] leading-4 text-[#99a1af]">{hint}</p>
        {onSkipStep && (
          <button
            type="button"
            onClick={onSkipStep}
            className="shrink-0 cursor-pointer text-[12px] leading-4 font-semibold whitespace-nowrap text-[#6a7282] transition-colors hover:text-[#f9a825]"
          >
            Skip this step →
          </button>
        )}
      </div>

      {children}

      {/* On a phone the back button keeps only its arrow, so the main action
          reads on one line between it and "Skip all". */}
      <div className="sticky bottom-4 z-10 mt-6 flex w-full items-center gap-2 rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white/95 p-2 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)] backdrop-blur sm:gap-3 sm:p-3">
        <button
          type="button"
          onClick={onBack}
          aria-label={`Back to ${backLabel}`}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl border-[0.701px] border-solid border-[#e5e7eb] px-3 py-3 text-[14px] leading-[20px] font-semibold text-[#1f2937] transition-colors hover:bg-[#f9fafb] sm:px-4"
        >
          <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
          <span className="hidden sm:inline">{backLabel}</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl px-2 py-3 text-center text-[14px] leading-[20px] font-bold transition-colors ${
            canContinue
              ? "cursor-pointer bg-[#f9a825] text-white hover:bg-[#e69a1f]"
              : "cursor-not-allowed bg-[#f3f4f6] text-[#99a1af]"
          }`}
        >
          {nextLabel}
          <ArrowRight className="size-4 shrink-0" strokeWidth={1.666} />
        </button>
        <button
          type="button"
          onClick={onSkipAll}
          className="shrink-0 cursor-pointer px-2 text-[12px] leading-4 font-semibold whitespace-nowrap text-[#6a7282] transition-colors hover:text-[#f9a825] sm:px-3"
        >
          Skip all
        </button>
      </div>
      <p className="w-full pt-2 text-center text-[11px] leading-4 text-[#99a1af]">
        {footNote}
      </p>
    </div>
  );
}
