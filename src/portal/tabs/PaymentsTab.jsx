import React, { useState } from "react";
import { CARD, PANEL } from "../portalStyles";
import { fetchOffer } from "../../api/endpoints";

/**
 * Figma: Payments tab (1615:11685).
 * Payment summary, a promo-code field, then the payment methods the studio
 * accepts. Amounts come from the customer's selected booking; before a
 * quotation exists the frame shows "Pending Quote" rather than a number.
 */
const METHODS = ["UPI / GPay", "Net Banking", "Credit / Debit Card", "EMI (0% Interest)"];

/** Advance is 30% of the quoted total (1615:11786). */
const ADVANCE_SHARE = 0.3;

export default function PaymentsTab({ booking }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [checking, setChecking] = useState(false);

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
          Have a discount code?
        </h3>
        <p className="pt-1 text-[14px] leading-[20px] text-[#99a1af]">
          Apply your promo code here before making payment.
        </p>

        <form
          className="flex w-full items-stretch gap-3 pt-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setChecking(true);
            setCodeError("");
            setApplied(null);

            try {
              // Checked against the live offers, so an expired code is refused
              // here rather than at the counter.
              setApplied(await fetchOffer(code.trim()));
            } catch (cause) {
              setCodeError(cause.message);
            } finally {
              setChecking(false);
            }
          }}
        >
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Enter code (e.g. REEL2026)"
            className="min-w-0 flex-1 rounded-[20px] border-[0.57px] border-solid border-[#e5e7eb] px-4 py-3 text-[14px] leading-normal font-medium text-[#1f2937] uppercase placeholder:text-[rgba(31,41,55,0.5)]"
          />
          <button
            type="submit"
            disabled={!code.trim() || checking}
            className="rounded-[20px] bg-[#f9a825] px-5 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors enabled:cursor-pointer enabled:hover:bg-[#e69a1f] disabled:opacity-50"
          >
            {checking ? "Checking…" : "Apply"}
          </button>
        </form>

        {codeError && (
          <p className="pt-3 text-[12px] leading-4 font-semibold text-[#e7000b]">{codeError}</p>
        )}

        {applied && (
          <div className="mt-3 flex items-start gap-3 rounded-[20px] border-[0.57px] border-solid border-[#dcfce7] bg-[#f0fdf4] px-4 py-3">
            <span className="text-[16px] leading-6">✓</span>
            <span className="flex flex-col items-start">
              <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                {applied.title}
              </span>
              <span className="text-[12px] leading-4 text-[#6a7282]">
                {applied.worth || applied.description}
              </span>
              {/* The discount lands on the quotation, not on this screen — the
                  team raises it. Saying otherwise would promise a number the
                  customer cannot yet be charged. */}
              <span className="pt-1 text-[11px] leading-4 text-[#99a1af]">
                Our team will apply this to your quotation.
              </span>
            </span>
          </div>
        )}
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
