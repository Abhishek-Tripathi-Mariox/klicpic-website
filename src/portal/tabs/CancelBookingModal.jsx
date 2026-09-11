import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchCancellationQuote, requestCancellation } from "../../api/endpoints";

/**
 * Figma: Cancel Booking modal — 1615:16890 (no reason picked) and
 * 1615:17572 (reason picked, so Confirm becomes live). One component, two
 * states.
 *
 * The refund figures are quoted by the backend against the published policy,
 * not calculated here — the customer must be shown the same number the request
 * is recorded with.
 */
const REASONS = [
  "Change of plans",
  "Date no longer works",
  "Personal emergency",
  "Found another studio",
  "Budget reasons",
  "Other",
];

export default function CancelBookingModal({ booking, onClose, onRequested }) {
  const [quote, setQuote] = useState(null);
  const [reason, setReason] = useState("");
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchCancellationQuote(booking.id)
      .then((data) => {
        if (!active) return;
        setQuote(data);
        setState("idle");
      })
      .catch((cause) => {
        if (!active) return;
        setError(cause.message);
        setState("idle");
      });

    return () => {
      active = false;
    };
  }, [booking.id]);

  // Escape closes, as a dialog should.
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async () => {
    setState("saving");
    setError("");

    try {
      await requestCancellation(booking.id, { reason });
      onRequested?.();
      onClose();
    } catch (cause) {
      setError(cause.message);
      setState("idle");
    }
  };

  const money = (value) => `₹${Math.round(Number(value) || 0).toLocaleString("en-IN")}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cancel booking"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="max-h-full w-full max-w-[440px] overflow-y-auto rounded-2xl bg-white p-5 shadow sm:p-6-[0px_20px_25px_-5px_rgba(0,0,0,0.2)]">
        <div className="flex items-start justify-between gap-3">
          <span className="flex flex-col items-start">
            <span className="text-[18px] leading-[27px] font-bold text-[#1f2937]">
              Cancel Booking
            </span>
            <span className="pt-[2px] text-[12px] leading-4 text-[#99a1af]">
              {booking.bookingCode}
              {booking.theme ? ` · ${booking.theme}` : ""}
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mt-2 -mr-2 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#99a1af] transition-colors hover:bg-[#f3f4f6] hover:text-[#1f2937]"
          >
            <X className="size-4" strokeWidth={1.666} />
          </button>
        </div>

        {state === "loading" ? (
          <p className="py-8 text-center text-[13px] leading-[20px] text-[#99a1af]">
            Working out your refund…
          </p>
        ) : (
          <>
            {quote && (
              <div className="mt-5 rounded-[20px] border-[0.57px] border-solid border-[#e9d4ff] bg-[#faf5ff] p-4">
                <p className="text-[13px] leading-[18px] font-bold text-[#8200db]">
                  Estimated Refund
                </p>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-[13px] leading-[18px] text-[#6a7282]">Amount Paid</span>
                  <span className="text-[13px] leading-[18px] font-semibold text-[#1f2937]">
                    {money(quote.amountPaid)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[13px] leading-[18px] text-[#6a7282]">
                    Cancellation Fee ({quote.feePercent}%)
                  </span>
                  <span className="text-[13px] leading-[18px] font-semibold text-[#fb2c36]">
                    − {money(quote.feeAmount)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t-[0.57px] border-solid border-[#e9d4ff] pt-3">
                  <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                    Refund Amount
                  </span>
                  <span className="text-[16px] leading-6 font-bold text-[#7c3aed]">
                    {money(quote.refundAmount)}
                  </span>
                </div>

                <p className="pt-3 text-[11px] leading-4 text-[#99a1af]">
                  Based on {quote.policyTier.toLowerCase()}. See{" "}
                  <Link to="/refund" className="font-semibold text-[#ad46ff] hover:underline">
                    Refund Policy
                  </Link>
                </p>
              </div>
            )}

            <label className="mt-5 block">
              <span className="text-[13px] leading-[18px] font-bold text-[#1f2937]">
                Reason for Cancellation
              </span>
              <select
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="mt-2 w-full cursor-pointer rounded-[20px] border-[0.57px] border-solid border-[#e5e7eb] bg-white px-4 py-3 text-[14px] leading-[20px] text-[#1f2937]"
              >
                <option value="">Select a reason…</option>
                {REASONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            {error && (
              <p className="pt-3 text-[12px] leading-4 font-semibold text-[#e7000b]">{error}</p>
            )}

            <div className="mt-5 flex items-stretch gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer rounded-[20px] border-[0.57px] border-solid border-[#e5e7eb] py-3 text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:bg-[#f9fafb]"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!reason || state === "saving"}
                className="flex-1 rounded-[20px] bg-[#dc2626] py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors enabled:cursor-pointer enabled:hover:bg-[#b91c1c] disabled:opacity-40"
              >
                {state === "saving" ? "Sending…" : "Confirm Cancel"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
