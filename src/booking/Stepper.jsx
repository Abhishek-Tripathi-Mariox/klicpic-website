import React from "react";
import { Check } from "lucide-react";

/**
 * Figma: BookingLayout stepper (1550:11710).
 * Current step is gold, completed steps show a green check, the rest are grey.
 */
/**
 * Package comes before Extras: the package is the bulk of the booking, and the
 * add-ons are chosen on top of it. (The frame had them the other way round.)
 */
export const STEPS = [
  "Type",
  "Vibe",
  "Details",
  "Package",
  "Extras",
  "Book",
];

export default function Stepper({ current = 1 }) {
  return (
    <div className="w-full border-b-[0.701px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]">
      {/* Six labelled steps need ~700px. Below md only the current step keeps
          its label and the connectors take whatever room is left, so the row
          fits a phone and the customer can still see where they are. */}
      <ol
        aria-label={`Step ${current} of ${STEPS.length}: ${STEPS[current - 1] ?? ""}`}
        className="klicpic-rail mx-auto flex h-16 w-full max-w-[1024px] items-center overflow-x-auto px-4 py-4 sm:px-6"
      >
        {STEPS.map((label, index) => {
          const number = index + 1;
          const isDone = number < current;
          const isCurrent = number === current;
          const isLast = number === STEPS.length;

          return (
            <li
              key={label}
              aria-current={isCurrent ? "step" : undefined}
              className={`flex items-center ${isLast ? "shrink-0" : "flex-auto"}`}
            >
              <div className="flex shrink-0 items-center gap-[6px] md:gap-2">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] leading-[20px] font-bold md:size-8 md:text-[14px] ${
                    isDone
                      ? "bg-[#00c950] text-white"
                      : isCurrent
                        ? "bg-[#f9a825] text-white shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]"
                        : "bg-[#f3f4f6] text-[#99a1af]"
                  }`}
                >
                  {isDone ? <Check className="size-4" strokeWidth={3} /> : number}
                </span>
                <span
                  className={`text-[13px] leading-[20px] font-semibold whitespace-nowrap md:inline md:text-[14px] ${
                    isCurrent ? "inline" : "hidden"
                  } ${
                    isDone
                      ? "text-[#00c950]"
                      : isCurrent
                        ? "text-[#f9a825]"
                        : "text-[#99a1af]"
                  }`}
                >
                  {label}
                </span>
              </div>

              {!isLast && (
                <span className="flex min-w-3 flex-1 items-start px-[3px] md:px-2">
                  <span
                    className={`h-[1.993px] w-full rounded-full ${
                      isDone ? "bg-[#00c950]" : "bg-[#e5e7eb]"
                    }`}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
