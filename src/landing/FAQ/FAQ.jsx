import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Figma: Klicpic mithu / Home — Everything You Need to Know (1550:3254)
 *
 * NOTE: every row is collapsed in the Figma frame, so it specifies no answer
 * copy. The answers below are drawn from facts stated elsewhere on the page
 * (48hr delivery, customizable packages, props/themes chosen later) and should
 * be replaced with the final approved copy.
 */
const FAQS = [
  {
    question: "How does the booking process work?",
    answer:
      "Pick your shoot category and studio, choose a date from the availability calendar, and confirm your package. Our team calls you within 24 hours to lock the details.",
  },
  {
    question: "Can I customize my package?",
    answer:
      "Yes. Start from the base session and add only the extras you want — albums, framed prints, canvas wall art, reels or cinematic video. Your total updates as you build.",
  },
  {
    question: "Can I select props and themes later?",
    answer:
      "Absolutely. You can lock your date first and pick from 500+ themes and 1,500+ props any time before the shoot day.",
  },
  {
    question: "What is the rescheduling policy?",
    answer:
      "Reschedule free of charge up to 72 hours before your slot, subject to availability at your chosen studio.",
  },
  {
    question: "How many edited photos will I receive?",
    answer:
      "Every base session includes 30 high-resolution edited photos, delivered within 48 hours. Additional edits can be added to your package.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="flex w-full flex-col items-center bg-[#fff7ed] px-6 py-24">
      <div className="flex w-full max-w-[768px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            Got Questions?
          </p>
          <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-[#1f2937]">
            Everything You Need to Know
          </h2>
        </div>

        <div className="flex w-full flex-col items-start gap-3 pt-12">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="w-full overflow-hidden rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[16px] leading-6 font-semibold text-[#1f2937]">
                    {faq.question}
                  </span>
                  <span className="flex shrink-0 items-start pl-4">
                    <ChevronDown
                      className={`size-[19.997px] text-[#6a7282] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.666}
                    />
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-[14px] leading-[22px] text-[#6a7282]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
