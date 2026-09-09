import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, CalendarClock, CheckCircle2, Clock } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import PolicyHero from "../../components/PolicyHero";
import {
  BALANCE_POINTS as LOCAL_BALANCE_POINTS,
  CANCELLATION_TIERS as LOCAL_CANCELLATION_TIERS,
  HOW_TO_STEPS as LOCAL_HOW_TO_STEPS,
  REFUND_CALLOUT as LOCAL_REFUND_CALLOUT,
  REFUND_LINKS as LOCAL_REFUND_LINKS,
  REFUND_META as LOCAL_REFUND_META,
  RESCHEDULE_FOOTNOTE as LOCAL_RESCHEDULE_FOOTNOTE,
  RESCHEDULE_ROWS as LOCAL_RESCHEDULE_ROWS,
  SPECIAL_CIRCUMSTANCES as LOCAL_SPECIAL_CIRCUMSTANCES,
} from "./refundData";
import { useContent } from "../../api/useContent";

/**
 * Figma: Klicpic mithu / Refund (1616:22448)
 * Cancellation tiers, reschedule table, balance rules, special circumstances
 * and the ink "How to Cancel or Reschedule" card.
 */
const TONES = {
  green: { bubble: "bg-[#ecfdf5]", icon: "text-[#059669]", badge: "bg-[#ecfdf5] text-[#059669]", Icon: CheckCircle2 },
  amber: { bubble: "bg-[#fffbeb]", icon: "text-[#d97706]", badge: "bg-[#fffbeb] text-[#d97706]", Icon: Clock },
  red: { bubble: "bg-[#fef2f2]", icon: "text-[#dc2626]", badge: "bg-[#fef2f2] text-[#dc2626]", Icon: AlertCircle },
};

const LINK_TARGETS = {
  "Privacy Policy": "/privacy",
  "Terms of Service": "/terms",
  "Refund Policy": "/refund",
  FAQ: "/faq",
  "Contact Us": "/contact",
};

const CARD =
  "rounded-2xl border-[0.57px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]";

function SectionHeading({ title, note }) {
  return (
    <>
      <h2 className="text-[20px] leading-7 font-black text-[#1f2937]">{title}</h2>
      {note && (
        <p className="pt-2 text-[14px] leading-[20px] text-[#99a1af]">{note}</p>
      )}
    </>
  );
}

export default function Refund() {
  // Live copy from the backend, falling back to what this build shipped.
  const { content } = useContent("legal-refund", {
    BALANCE_POINTS: LOCAL_BALANCE_POINTS,
    CANCELLATION_TIERS: LOCAL_CANCELLATION_TIERS,
    HOW_TO_STEPS: LOCAL_HOW_TO_STEPS,
    REFUND_CALLOUT: LOCAL_REFUND_CALLOUT,
    REFUND_LINKS: LOCAL_REFUND_LINKS,
    REFUND_META: LOCAL_REFUND_META,
    RESCHEDULE_FOOTNOTE: LOCAL_RESCHEDULE_FOOTNOTE,
    RESCHEDULE_ROWS: LOCAL_RESCHEDULE_ROWS,
    SPECIAL_CIRCUMSTANCES: LOCAL_SPECIAL_CIRCUMSTANCES,
  });
  const {
    BALANCE_POINTS,
    CANCELLATION_TIERS,
    HOW_TO_STEPS,
    REFUND_CALLOUT,
    REFUND_LINKS,
    REFUND_META,
    RESCHEDULE_FOOTNOTE,
    RESCHEDULE_ROWS,
    SPECIAL_CIRCUMSTANCES,
  } = content;

  return (
    <SiteLayout
      announcement={{
        emoji: "⭐",
        message: "Rated 4.9/5 by 12,500+ happy families across India",
        activeDot: 1,
      }}
    >
      <PolicyHero
        variant="legal"
        badge={REFUND_META.badge}
        title={REFUND_META.title}
        meta={REFUND_META.meta}
      />

      <section className="flex w-full flex-col items-center bg-white px-6 py-14">
        <div className="flex w-full max-w-[720px] flex-col items-start">
          {/* short version */}
          <div className="w-full rounded-2xl border-[0.57px] border-solid border-[#fee685] bg-[#fffbeb] p-5 text-[14px] leading-[22.75px] text-[#973c00]">
            <strong className="font-bold">{REFUND_CALLOUT.label}</strong>
            {REFUND_CALLOUT.text}
          </div>

          {/* cancellation tiers */}
          <div className="w-full pt-12">
            <SectionHeading
              title="Cancellation Policy"
              note="The following applies to the 30% advance paid at booking confirmation."
            />
            <div className="flex w-full flex-col gap-3 pt-6">
              {CANCELLATION_TIERS.map((tier) => {
                const tone = TONES[tier.tone];
                const { Icon } = tone;
                return (
                  <div key={tier.window} className={`w-full ${CARD}`}>
                    <div className="flex items-center gap-4 p-5">
                      <span
                        className={`flex size-[39.994px] shrink-0 items-center justify-center rounded-[20px] ${tone.bubble}`}
                      >
                        <Icon className={`size-[19.997px] ${tone.icon}`} strokeWidth={1.666} />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col items-start">
                        <div className="flex w-full items-start justify-between gap-3">
                          <p className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                            {tier.window}
                          </p>
                          <span
                            className={`shrink-0 rounded-full px-[10px] py-1 text-[12px] leading-4 font-black whitespace-nowrap ${tone.badge}`}
                          >
                            {tier.badge}
                          </span>
                        </div>
                        <p className="pt-1 text-[12px] leading-[19.5px] text-[#99a1af]">
                          {tier.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* rescheduling */}
          <div className="w-full pt-12">
            <SectionHeading
              title="Rescheduling"
              note="Life happens — we understand. Here's how rescheduling works."
            />
            <div className={`mt-6 w-full overflow-hidden ${CARD}`}>
              {RESCHEDULE_ROWS.map((row, index) => (
                <div
                  key={row.title}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    index < RESCHEDULE_ROWS.length - 1
                      ? "border-b-[0.57px] border-solid border-[#f9fafb]"
                      : ""
                  }`}
                >
                  <CalendarClock
                    className="size-[15.998px] shrink-0 text-[#99a1af]"
                    strokeWidth={1.333}
                  />
                  <div className="flex min-w-0 flex-1 flex-col items-start">
                    <p className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                      {row.title}
                    </p>
                    <p className="text-[12px] leading-4 text-[#99a1af]">{row.note}</p>
                  </div>
                  <span className="shrink-0 text-[14px] leading-[20px] font-black whitespace-nowrap text-[#f9a825]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="px-1 pt-3 text-[12px] leading-4 text-[#99a1af]">
              {RESCHEDULE_FOOTNOTE}
            </p>
          </div>

          {/* balance payment */}
          <div className="w-full pt-12">
            <div className={`w-full p-6 ${CARD}`}>
              <h2 className="text-[18px] leading-7 font-black text-[#1f2937]">
                Balance Payment (70%)
              </h2>
              <div className="flex flex-col gap-3 pt-4">
                {BALANCE_POINTS.map((point) => (
                  <div key={point} className="flex gap-3">
                    <span
                      aria-hidden
                      className="shrink-0 pt-[2px] text-[14px] leading-[22.75px] text-[#00c950]"
                    >
                      ✓
                    </span>
                    <p className="text-[14px] leading-[22.75px] text-[#6a7282]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* special circumstances */}
          <div className="w-full pt-12">
            <SectionHeading title="Special Circumstances" />
            <div className="grid w-full grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
              {SPECIAL_CIRCUMSTANCES.map((item) => (
                <div key={item.title} className={`p-5 ${CARD}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] leading-7">{item.emoji}</span>
                    <h3 className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="pt-3 text-[12px] leading-[19.5px] text-[#6a7282]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* how to cancel */}
          <div className="w-full pt-12">
            <div className="w-full rounded-2xl bg-[#1f2937] p-6">
              <h2 className="text-[18px] leading-7 font-black text-white">
                How to Cancel or Reschedule
              </h2>
              <ol className="flex flex-col gap-3 pt-4">
                {HOW_TO_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-[2px] flex size-[19.997px] shrink-0 items-center justify-center rounded-full bg-[#f9a825] text-[10px] leading-[16.25px] font-black text-[#1f2937]">
                      {index + 1}
                    </span>
                    <p className="text-[14px] leading-[22.75px] text-[rgba(255,255,255,0.7)]">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* contact */}
          <div className="w-full pt-12">
            <p className="w-full text-center text-[14px] leading-[20px] text-[#6a7282]">
              Questions about this policy? We're happy to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href="https://wa.me/919876543210"
                className="rounded-[20px] bg-[#25d366] px-5 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-opacity hover:opacity-90"
              >
                WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="rounded-[20px] bg-[#1f2937] px-5 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#374151]"
              >
                Contact Page
              </Link>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-wrap items-start gap-4 border-t-[0.57px] border-solid border-[#e5e7eb] pt-8">
            {REFUND_LINKS.map((label) => (
              <Link
                key={label}
                to={LINK_TARGETS[label] ?? "/"}
                className="text-[14px] leading-[20px] text-[#99a1af] transition-colors hover:text-[#f9a825]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
