import React from "react";
import Header from "../components/Header";
import Stepper from "./Stepper";
import BookingSummary, { BookingSummaryBar } from "./BookingSummary";

/**
 * Figma: BookingLayout (1550:11461) — solid header, stepper, then a two-column
 * body with the sticky Booking Summary on the right.
 */
export default function BookingLayout({
  step,
  children,
  showSummary = true,
  showStepper = true,
}) {
  return (
    <div id="top" className="min-h-screen w-full bg-[#f9fafb]">
      <Header variant="solid" />
      {showStepper && <Stepper current={step} />}

      <main className="mx-auto flex w-full max-w-[1280px] items-start gap-6 px-4 py-6 sm:px-6 sm:py-10">
        <div className="min-w-0 flex-1">
          {showSummary && (
            <div className="lg:hidden">
              <BookingSummaryBar />
            </div>
          )}
          {children}
        </div>
        {/* Stretched to the full height of the step, so the card has room to
            stay in view while the step scrolls. */}
        {showSummary && (
          <div className="hidden w-[389px] shrink-0 self-stretch lg:block">
            <div className="sticky top-6">
              <BookingSummary />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
