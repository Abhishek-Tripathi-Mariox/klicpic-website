import React from "react";
import { CARD, PANEL } from "../portalStyles";

/**
 * Figma: Payments tab (1615:11685).
 * Payment summary, then the payment methods the studio accepts. Amounts come
 * from the customer's selected booking; before a quotation exists the frame
 * shows "Pending Quote" rather than a number.
 *
 * The frame's promo-code field is gone: it checked the code and said "our team
 * will apply this to your quotation", but nothing was recorded and no one was
 * told — the customer's code died on that screen. Offers are claimed from the
 * website, and this customer already has a team to ask.
 */
const METHODS = ["UPI / GPay", "Net Banking", "Credit / Debit Card", "EMI (0% Interest)"];

/** Advance is 30% of the quoted total (1615:11786). */
const ADVANCE_SHARE = 0.3;

export default function PaymentsTab({ booking }) {
  const total = Number(booking?.amount) || 0;
  const paid = Number(booking?.paid) || 0;
  const quoted = total > 0;

  const money = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

  const rows = [
    { label: "Package", value: booking?.package || "—", tone: "text-[#1f2937]" },
    {
      label: "Total Amount",
      value: quoted ? money(total) : "Pending Quote",
      tone: "text-[#1f2937]",
    },
    {
      label: "Advance (30%)",
      value: quoted ? money(total * ADVANCE_SHARE) : "To be shared",
      tone: "text-[#f9a825]",
    },
  ];

  if (paid > 0) {
    rows.push({ label: "Paid so far", value: money(paid), tone: "text-[#00a63e]" });
  }

  const status = booking?.cancelled
    ? { label: "Cancelled", tone: "bg-[#fef2f2] text-[#e7000b]" }
    : quoted
      ? paid >= total
        ? { label: "Paid", tone: "bg-[#dcfce7] text-[#00a63e]" }
        : { label: "Payment Pending", tone: "bg-[#fefce8] text-[#d08700]" }
      : { label: "Awaiting Invoice", tone: "bg-[#fefce8] text-[#d08700]" };

  return (
    <div className={PANEL}>
      <div className={`${CARD} p-6`}>
        <h3 className="text-[18px] leading-[27px] font-bold text-[#1f2937]">
          Payment Summary
        </h3>

        <div className="flex w-full flex-col pt-5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between border-b-[0.57px] border-solid border-[#f9fafb] py-3"
            >
              <span className="text-[14px] leading-[20px] text-[#6a7282]">{row.label}</span>
              <span className={`text-[14px] leading-[20px] font-semibold ${row.tone}`}>
                {row.value}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between pt-6 pb-3">
            <span className="text-[14px] leading-[20px] text-[#6a7282]">Payment Status</span>
            <span
              className={`rounded-full px-3 py-1 text-[12px] leading-4 font-semibold ${status.tone}`}
            >
              {status.label}
            </span>
          </div>
        </div>
      </div>

      <div className={`${CARD} mt-5 p-6`}>
        <h3 className="text-[18px] leading-[27px] font-bold text-[#1f2937]">
          Payment Methods
        </h3>
        <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
          {METHODS.map((method) => (
            <div
              key={method}
              className="flex items-center justify-center rounded-[20px] border-[1.71px] border-solid border-[#f3f4f6] p-4 text-center text-[14px] leading-[20px] font-medium text-[#4a5565]"
            >
              {method}
            </div>
          ))}
        </div>
        <p className="w-full pt-4 text-center text-[12px] leading-4 text-[#99a1af]">
          Payment link will be sent via WhatsApp after quotation approval.
        </p>
      </div>
    </div>
  );
}
