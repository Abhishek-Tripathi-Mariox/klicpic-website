import React from "react";
import { Check } from "lucide-react";

/**
 * Figma: BookingLayout stepper (1550:11710).
 * Current step is gold, completed steps show a green check, the rest are grey.
 */
export const STEPS = [
  "Type",
  "Vibe",
  "Details",
  "Extras",
  "Package",
  "Book",
];

export default function Stepper({ current = 1 }) {
  return (
    <div className="w-full border-b-[0.701px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]">
      <div className="klicpic-rail mx-auto flex h-16 w-full max-w-[1024px] items-center overflow-x-auto px-6 py-4">
        {STEPS.map((label, index) => {
          const number = index + 1;
          const isDone = number < current;
          const isCurrent = number === current;
          const isLast = number === STEPS.length;

          return (
            <div key={label} className="flex shrink-0 items-center">
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[14px] leading-[20px] font-bold ${
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
                  className={`text-[14px] leading-[20px] font-semibold whitespace-nowrap ${
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
                <span className="flex shrink-0 items-start px-2">
                  <span
                    className={`h-[1.993px] w-[80px] rounded-full ${
                      isDone ? "bg-[#00c950]" : "bg-[#e5e7eb]"
                    }`}
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
