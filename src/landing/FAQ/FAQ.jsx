import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useApi } from "../../api/useApi";
import { fetchFaqs } from "../../api/endpoints";

/**
 * Figma: Klicpic mithu / Home — Everything You Need to Know (1550:3254)
 *
 * Every row is collapsed in the frame, so it specifies no answer copy, and the
 * five answers written to fill it invented the facts they quoted — "500+ themes
 * and 1,500+ props" against the CRM's 178 and 551, "30 photos delivered within
 * 48 hours" against the Terms' 5–10 business days. The questions are records
 * now: these are the CRM's own, the same ones /faq serves.
 */
const HOME_FAQ_COUNT = 5;

export default function FAQ() {
  const { data } = useApi(fetchFaqs, null, []);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = (Array.isArray(data?.faqs) ? data.faqs : []).slice(0, HOME_FAQ_COUNT);

  // No published questions — no section rather than invented answers.
  if (faqs.length === 0) return null;

  return (
    <section className="flex w-full flex-col items-center bg-[#fff7ed] px-4 py-16 sm:px-6 md:py-24">
      <div className="flex w-full max-w-[768px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[26px] leading-8 font-normal whitespace-nowrap text-[#f9a825] sm:text-[30px] sm:leading-9">
            Got Questions?
          </p>
          <h2 className="pt-1 text-center text-[28px] leading-[34px] font-bold text-[#1f2937] sm:text-[36px] sm:leading-10">
            Everything You Need to Know
          </h2>
        </div>

        <div className="flex w-full flex-col items-start gap-3 pt-8 md:pt-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || faq.question}
                className="w-full overflow-hidden rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between px-4 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-[15px] leading-6 font-semibold text-[#1f2937] sm:text-[16px]">
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
                  <p className="px-4 pb-4 text-[14px] leading-[22px] text-[#6a7282] sm:px-6 sm:pb-5">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* The home page shows the first few; the rest live on /faq. */}
        <div className="flex w-full justify-center pt-8">
          <Link
            to="/faq"
            className="rounded-full border-[1.4px] border-solid border-[#f9a825] px-6 py-2.5 text-[14px] font-bold text-[#f9a825] transition-colors hover:bg-[#f9a825]/10"
          >
            See all questions →
          </Link>
        </div>
      </div>
    </section>
  );
}
