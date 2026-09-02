import React, { useEffect, useRef, useState } from "react";
import { Camera, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortal } from "./PortalContext";

/**
 * Figma: Customer Portal — phone step 1615:9755, OTP step 1615:10008.
 * Two-tab card; the demo OTP is 1234 exactly as the frame states.
 */
const DEMO_OTP = "1234";
const RESEND_SECONDS = 29;

export default function PortalLogin({ onSuccess }) {
  const { phone, setPhone, login } = usePortal();
  const [step, setStep] = useState("phone");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [error, setError] = useState("");
  const boxes = useRef([]);

  useEffect(() => {
    if (step !== "otp") return undefined;
    setCountdown(RESEND_SECONDS);
    const timer = setInterval(
      () => setCountdown((current) => (current > 0 ? current - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, [step]);

  const otp = digits.join("");
  const phoneValid = phone.replace(/\D/g, "").length === 10;

  const setDigit = (index, value) => {
    const clean = value.replace(/\D/g, "").slice(-1);
    setDigits((current) => {
      const next = [...current];
      next[index] = clean;
      return next;
    });
    if (clean && index < 3) boxes.current[index + 1]?.focus();
  };

  const verify = () => {
    if (otp !== DEMO_OTP) {
      setError("That code doesn't match. Try 1234.");
      return;
    }
    login("mithu");
    onSuccess?.();
  };

  return (
    <div
      className="flex w-full flex-col items-center px-6 py-20"
      style={{
        backgroundImage:
          "linear-gradient(148.56deg, rgb(255,251,242) 0%, rgb(255,250,240) 33.3%, rgb(255,248,239) 66.7%, rgb(255,247,237) 100%)",
      }}
    >
      <div className="flex w-full max-w-[448px] flex-col items-stretch">
        <span className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-[#f9a825] shadow-[0px_20px_12.5px_rgba(249,168,37,0.3),0px_8px_5px_rgba(249,168,37,0.3)]">
          <Camera className="size-10 text-white" strokeWidth={1.666} />
        </span>
        <h1 className="pt-5 text-center text-[30px] leading-9 font-bold text-[#1f2937]">
          Customer Portal
        </h1>
        <p className="pt-2 text-center text-[14px] leading-[20px] text-[#6a7282]">
          Track bookings, photos, and deliverables
        </p>

        <div className="mt-10 w-full overflow-hidden rounded-3xl border-[0.57px] border-solid border-[#f3f4f6] bg-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.08),0px_8px_10px_-6px_rgba(0,0,0,0.08)]">
          {/* step tabs */}
          <div className="flex w-full border-b-[0.57px] border-solid border-[#f3f4f6]">
            {[
              { id: "phone", label: "1. Phone Number" },
              { id: "otp", label: "2. Verify OTP" },
            ].map((item) => {
              const active = step === item.id;
              return (
                <div
                  key={item.id}
                  className={`flex-1 border-b-[1.71px] border-solid py-3 text-center text-[12px] leading-4 font-semibold ${
                    active
                      ? "border-[#f9a825] text-[#f9a825]"
                      : "border-transparent text-[#9ca3af]"
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-start p-8">
            {step === "phone" ? (
              <>
                <h2 className="text-[18px] leading-7 font-bold text-[#1f2937]">
                  Enter your number
                </h2>
                <p className="pt-1 text-[14px] leading-[20px] text-[#99a1af]">
                  We'll send a 4-digit OTP to verify your identity.
                </p>

                <div className="mt-6 flex h-[55.413px] w-full overflow-hidden rounded-2xl border-[1.71px] border-solid border-[#e5e7eb]">
                  <span className="flex items-center gap-[6px] border-r-[0.57px] border-solid border-[#e5e7eb] bg-[#f9fafb] px-4">
                    <Phone className="size-4 shrink-0 text-[#6a7282]" strokeWidth={1.666} />
                    <span className="text-[14px] leading-[20px] font-semibold text-[#4a5565]">
                      +91
                    </span>
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="98765 43210"
                    className="min-w-0 flex-1 bg-white px-4 text-[14px] font-medium text-[#1f2937] outline-none placeholder:text-[#d1d5dc]"
                  />
                </div>

                <button
                  type="button"
                  disabled={!phoneValid}
                  onClick={() => setStep("otp")}
                  className={`mt-4 h-[51.992px] w-full rounded-2xl text-center text-[14px] leading-[20px] font-bold text-white transition-opacity ${
                    phoneValid ? "cursor-pointer hover:opacity-95" : "cursor-not-allowed opacity-50"
                  }`}
                  style={{
                    backgroundImage:
                      "linear-gradient(172.27deg, rgb(249,168,37) 0%, rgb(245,124,0) 100%)",
                  }}
                >
                  Send OTP →
                </button>

                <div className="mt-5 w-full rounded-[20px] border-[0.57px] border-solid border-[#dbeafe] bg-[#eff6ff] p-3 text-center text-[12px] leading-4 text-[#155dfc]">
                  Demo: enter any 10-digit number · OTP will be{" "}
                  <strong className="font-bold">{DEMO_OTP}</strong>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="cursor-pointer text-[12px] leading-4 text-[#99a1af] transition-colors hover:text-[#f9a825]"
                >
                  ← Change number
                </button>
                <h2 className="pt-3 text-[18px] leading-7 font-bold text-[#1f2937]">
                  Enter OTP
                </h2>
                <p className="pt-1 text-[14px] leading-[20px] text-[#99a1af]">
                  Sent to{" "}
                  <strong className="font-bold text-[#1f2937]">
                    +91 {phone || "1234567890"}
                  </strong>
                </p>

                <div className="flex w-full items-center justify-center gap-3 pt-6">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(node) => {
                        boxes.current[index] = node;
                      }}
                      value={digit}
                      onChange={(event) => setDigit(index, event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Backspace" && !digit && index > 0) {
                          boxes.current[index - 1]?.focus();
                        }
                      }}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`OTP digit ${index + 1}`}
                      className="size-14 rounded-2xl border-[1.71px] border-solid border-[#e5e7eb] bg-[#f9fafb] text-center text-[20px] font-bold text-[#1f2937] outline-none transition-colors focus:border-[#f9a825] focus:bg-white"
                    />
                  ))}
                </div>

                {error && (
                  <p className="w-full pt-3 text-center text-[12px] leading-4 text-[#dc2626]">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  disabled={otp.length < 4}
                  onClick={verify}
                  className={`mt-6 h-[51.992px] w-full rounded-2xl text-center text-[14px] leading-[20px] font-bold text-white transition-opacity ${
                    otp.length === 4
                      ? "cursor-pointer hover:opacity-95"
                      : "cursor-not-allowed opacity-50"
                  }`}
                  style={{
                    backgroundImage:
                      "linear-gradient(172.27deg, rgb(249,168,37) 0%, rgb(245,124,0) 100%)",
                  }}
                >
                  Verify &amp; Login →
                </button>

                <p className="w-full pt-4 text-center text-[12px] leading-4 text-[#99a1af]">
                  {countdown > 0 ? (
                    `Resend OTP in ${countdown}s`
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCountdown(RESEND_SECONDS)}
                      className="cursor-pointer font-semibold text-[#f9a825]"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        <p className="pt-6 text-center text-[14px] leading-[20px] text-[#99a1af]">
          Don't have a booking?{" "}
          <Link
            to="/book"
            className="text-[16px] leading-6 font-semibold text-[#f9a825]"
          >
            Book Now →
          </Link>
        </p>
      </div>
    </div>
  );
}
