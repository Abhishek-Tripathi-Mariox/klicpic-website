import React, { useMemo, useState } from "react";
import { useApi } from "../../api/useApi";
import { fetchFaqs } from "../../api/endpoints";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import PolicyHero from "../../components/PolicyHero";
import { FAQS as LOCAL_FAQS, FAQ_CATEGORIES as LOCAL_FAQ_CATEGORIES } from "./faqData";

/**
 * Figma: Klicpic mithu / FAQ (1616:20695)
 * Dark hero with search, category pills, accordion list, and a contact card.
 */
export default function FAQPage() {
  // Live copy from the backend, falling back to what this build shipped.
  // FAQs are records now; the block stays as the offline fallback.
  const { data: live } = useApi(fetchFaqs, null, []);
  const content = {
    FAQS: live?.faqs?.length ? live.faqs : LOCAL_FAQS,
    FAQ_CATEGORIES: live?.categories?.length ? live.categories : LOCAL_FAQ_CATEGORIES,
  };
  const { FAQS, FAQ_CATEGORIES } = content;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [openQuestion, setOpenQuestion] = useState(FAQS[0].question);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return FAQS.filter((faq) => {
      const inCategory = category === "All" || faq.category === category;
      const matches =
        !needle ||
        faq.question.toLowerCase().includes(needle) ||
        faq.answer.toLowerCase().includes(needle);
      return inCategory && matches;
    });
  }, [query, category, FAQS]);

  return (
    <SiteLayout
      announcement={{
        emoji: "🎁",
        message: "Refer a friend and get ₹500 off your next shoot. Ask us how!",
        activeDot: 1,
      }}
    >
      <PolicyHero
        badge="FAQ"
        title="Answers to Your"
        highlight="Common Questions"
        subtitle="Everything you need to know about booking, shoots, deliverables, and more."
        search={query}
        onSearchChange={setQuery}
      />

      <section className="flex w-full flex-col items-center bg-white px-6 pb-24">
        <div className="flex w-full max-w-[896px] flex-col items-start">
          {/* category pills */}
          <div className="flex w-full flex-wrap items-center gap-2 pt-14">
            {FAQ_CATEGORIES.map((item) => {
              const isActive = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-[12px] leading-4 font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#f9a825] text-[#1f2937]"
                      : "border-[0.57px] border-solid border-[#f3f4f6] bg-white text-[#6a7282] hover:border-[#f9a825] hover:text-[#f9a825]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* accordion */}
          <div className="flex w-full flex-col items-start gap-3 pt-8">
            {visible.map((faq) => {
              const isOpen = faq.question === openQuestion;
              return (
                <div
                  key={faq.question}
                  className={`w-full overflow-hidden rounded-2xl border-[0.57px] border-solid bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] ${
                    isOpen ? "border-[rgba(249,168,37,0.3)]" : "border-[#f3f4f6]"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                    className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-[14px] leading-[19.25px] font-semibold text-[#1f2937]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`size-[15.998px] shrink-0 text-[#6a7282] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.333}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="h-px w-full bg-[#f3f4f6]" />
                      <p className="pt-4 text-[14px] leading-[22.75px] text-[#6a7282]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {visible.length === 0 && (
              <p className="w-full py-12 text-center text-[14px] leading-[22.75px] text-[#6a7282]">
                No questions match your search.
              </p>
            )}
          </div>

          {/* still have questions */}
          <div className="w-full pt-16">
            <div
              className="flex w-full flex-col items-center rounded-3xl p-8"
              style={{
                backgroundImage:
                  "linear-gradient(164.88deg, rgb(31, 41, 55) 0%, rgb(55, 65, 81) 100%)",
              }}
            >
              <p className="text-center text-[24px] leading-8">🤔</p>
              <h3 className="pt-2 text-center text-[20px] leading-7 font-black text-white">
                Still have questions?
              </h3>
              <p className="pt-2 text-center text-[14px] leading-[20px] text-[rgba(255,255,255,0.5)]">
                Our team is happy to help — reach out anytime.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
                <a
                  href="https://wa.me/919876543210"
                  className="flex items-center justify-center gap-2 rounded-[20px] bg-[#25d366] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="size-[15.998px] shrink-0" strokeWidth={1.333} />
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 rounded-[20px] border-[0.57px] border-solid border-[rgba(255,255,255,0.2)] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="size-[15.998px] shrink-0" strokeWidth={1.333} />
                  Call Us
                </a>
                <a
                  href="mailto:hello@klicpic.in"
                  className="flex items-center justify-center rounded-[20px] bg-[#f9a825] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:bg-[#e69a1f]"
                >
                  Send a Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
