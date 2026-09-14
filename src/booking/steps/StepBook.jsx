import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

/**
 * Figma: Step 6 Book — Confirm your booking (1615:9205).
 */
const FIELDS = [
  { name: "fullName", label: "Full Name *", type: "text", required: true },
  { name: "phone", label: "Phone Number *", type: "tel", required: true },
  { name: "email", label: "Email Address *", type: "email", required: true },
  { name: "whatsapp", label: "WhatsApp Number", type: "tel" },
  { name: "city", label: "City *", type: "text", required: true },
];

const EMPTY = { fullName: "", phone: "", email: "", whatsapp: "", city: "", notes: "" };

export default function StepBook({ onBack, onSubmit, submitting = false, error = "" }) {
  const [values, setValues] = useState(EMPTY);

  const change = (event) =>
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    onSubmit?.(values);
  };

  return (
    <div className="flex w-full flex-col items-start pb-16">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-[14px] leading-[20px] font-medium text-[#6a7282] transition-colors hover:text-[#f9a825]"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
        Back to Package
      </button>

      <h2 className="pt-4 text-[26px] leading-8 font-bold text-[#1f2937] sm:text-[30px] sm:leading-9">
        Confirm your booking
      </h2>
      <p className="pt-2 text-[16px] leading-6 text-[#6a7282]">
        Share your details and we'll get back to you within 2 hours
      </p>

      <form
        onSubmit={submit}
        className="mt-8 flex w-full max-w-[576px] flex-col items-start rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white p-5 shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] sm:p-6"
      >
        <h3 className="text-[18px] leading-7 font-bold text-[#1f2937]">
          Your Details
        </h3>

        {FIELDS.map((field, index) => (
          <label key={field.name} className={`w-full ${index === 0 ? "pt-1" : "pt-4"}`}>
            <span className="block pb-1 text-[12px] leading-4 font-semibold tracking-[0.3px] text-[#6a7282] uppercase">
              {field.label}
            </span>
            <input
              name={field.name}
              type={field.type}
              required={field.required}
              value={values[field.name]}
              onChange={change}
              className="h-[45.134px] w-full rounded-[20px] border-[0.701px] border-solid border-[#e5e7eb] bg-white px-4 text-[14px] text-[#1f2937] outline-none transition-colors focus:border-[#f9a825]"
            />
          </label>
        ))}

        <label className="w-full pt-4">
          <span className="block pb-1 text-[12px] leading-4 font-semibold tracking-[0.3px] text-[#6a7282] uppercase">
            Special Notes
          </span>
          <textarea
            name="notes"
            rows={3}
            value={values.notes}
            onChange={change}
            placeholder="Any special requirements, themes, or requests..."
            className="h-[85.128px] w-full resize-none rounded-[20px] border-[0.701px] border-solid border-[#e5e7eb] bg-white px-4 py-3 text-[14px] leading-[20px] text-[#1f2937] outline-none transition-colors placeholder:text-[#99a1af] focus:border-[#f9a825]"
          />
        </label>

        {error && (
          <p className="mt-4 w-full rounded-2xl bg-[#fef2f2] px-4 py-3 text-center text-[13px] leading-5 font-semibold text-[#e7000b]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 flex h-[55.992px] w-full items-center justify-center gap-2 rounded-[20px] bg-[#f9a825] text-center text-[16px] leading-6 font-bold text-white transition-colors enabled:cursor-pointer enabled:hover:bg-[#e69a1f] disabled:cursor-not-allowed disabled:bg-[#d1d5dc]"
        >
          <Send className="size-5 shrink-0" strokeWidth={1.666} />
          {submitting ? "Sending your request…" : "Request Booking"}
        </button>

        {/* "Easy EMI" is not an arrangement anyone offers, and "free
            cancellation within 24hrs" is the opposite of the Refund policy,
            where the 30% advance is non-refundable as cash. */}
        <p className="w-full pt-4 text-center text-[12px] leading-4 text-[#99a1af]">
          30% advance to confirm · See our{" "}
          <Link to="/refund" className="font-semibold text-[#f9a825] hover:underline">
            refund policy
          </Link>
        </p>
      </form>
    </div>
  );
}
