import React from "react";
import { Check } from "lucide-react";
import { CARD } from "../portalStyles";

/**
 * Figma: Refund Tracking (1615:15006).
 * A card per refund request carrying a five-stage rail, the method and ETA,
 * then the published policy table underneath.
 */
const DATE = { day: "2-digit", month: "short", year: "numeric" };

export default function RefundsPanel({ data }) {
  const refunds = data?.refunds || [];
  const policy = data?.policy || [];

  return (
    <div className="w-full">
      <p className="pb-3 text-[13px] leading-[18px] text-[#99a1af]">
        Live status of your refund requests
      </p>

      {refunds.length === 0 ? (
        <div className={`${CARD} p-10 text-center`}>
          <p className="text-[14px] leading-[20px] text-[#6a7282]">
            No refund requests — nothing to track.
          </p>
        </div>
      ) : (
        refunds.map((refund) => (
          <div key={refund.id} className={`${CARD} mb-4 p-5`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className="flex flex-col items-start">
                <span className="text-[15px] leading-[22px] font-bold text-[#1f2937]">
                  {refund.reference}
                </span>
                <span className="text-[12px] leading-4 text-[#99a1af]">
                  {refund.bookingCode}
                </span>
              </span>
              <span className="flex flex-col items-end">
                <span className="text-[18px] leading-7 font-bold text-[#7c3aed]">
                  {refund.amountLabel}
                </span>
                <span className="text-[11px] leading-4 text-[#99a1af]">
                  Requested{" "}
                  {refund.requestedAt
                    ? new Date(refund.requestedAt).toLocaleDateString("en-GB", DATE)
                    : "—"}
                </span>
              </span>
            </div>

            <ol className="flex flex-col pt-5">
              {refund.stages.map((stage, index) => {
                const isLast = index === refund.stages.length - 1;
                return (
                  <li key={stage.label} className="flex gap-3">
                    <span className="flex flex-col items-center">
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                          stage.done
                            ? "bg-[#00c950]"
                            : stage.current
                              ? "bg-[#f9a825]"
                              : "border-[1.5px] border-solid border-[#e5e7eb] bg-white"
                        }`}
                      >
                        {stage.done && <Check className="size-3 text-white" strokeWidth={3} />}
                        {stage.current && <span className="size-2 rounded-full bg-white" />}
                      </span>
                      {!isLast && (
                        <span
                          className={`w-[1.5px] flex-1 ${stage.done ? "bg-[#00c950]" : "bg-[#e5e7eb]"}`}
                        />
                      )}
                    </span>
                    <span className={`flex flex-col items-start ${isLast ? "" : "pb-4"}`}>
                      <span
                        className={`text-[13px] leading-[18px] font-semibold ${
                          stage.done || stage.current ? "text-[#1f2937]" : "text-[#99a1af]"
                        }`}
                      >
                        {stage.label}
                      </span>
                      {stage.current && (
                        <span className="text-[11px] leading-4 font-semibold text-[#f9a825]">
                          In Progress
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-4 grid grid-cols-1 gap-3 border-t-[0.57px] border-solid border-[#f3f4f6] pt-4 sm:grid-cols-3">
              {[
                { label: "Refund Method", value: refund.method || "Shared by our team" },
                { label: "ETA", value: "2–3 business days" },
                { label: "Reason", value: refund.reason || "—" },
              ].map((row) => (
                <span key={row.label} className="flex flex-col items-start">
                  <span className="text-[11px] leading-4 text-[#99a1af]">{row.label}</span>
                  <span className="text-[13px] leading-[18px] font-semibold text-[#1f2937]">
                    {row.value}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))
      )}

      <div className={`${CARD} p-5`}>
        <p className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
          📋 Refund Policy Summary
        </p>
        <div className="flex flex-col pt-3">
          {policy.map((tier) => (
            <div
              key={tier.label}
              className="flex items-center justify-between border-b-[0.57px] border-solid border-[#f9fafb] py-[10px] last:border-b-0"
            >
              <span className="text-[13px] leading-[18px] text-[#6a7282]">{tier.label}</span>
              <span className="text-[13px] leading-[18px] font-semibold text-[#1f2937]">
                {tier.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
