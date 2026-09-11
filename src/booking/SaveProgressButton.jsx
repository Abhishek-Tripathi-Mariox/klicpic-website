import React, { useEffect, useState } from "react";
import { Bookmark, Check, MessageCircle, X } from "lucide-react";
import { getPortalToken } from "../api/client";
import { useBooking } from "./BookingContext";
import { useJourney } from "./JourneyContext";

/**
 * The "Save Progress" pill that sits in the step header (Figma 1550:11461).
 *
 * Every tap asks for the WhatsApp number — prefilled once given, so saving
 * again is one more tap and the number can be corrected. The plan is kept on
 * our side against it (the team sees them in Website Requests), and if the
 * customer steps away we send one message with a link back to this exact
 * step. The wizard is still parked in localStorage too, so a reload on this
 * device keeps working even if the network does not.
 */

/** A signed-in portal customer's own number, so they need not type it. */
function portalMobile() {
  try {
    const token = getPortalToken();
    if (!token) return "";
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return String(payload?.mobile || "").replace(/\D/g, "").slice(-10);
  } catch {
    return "";
  }
}

const masked = (mobile) => (mobile ? `+91 ${mobile.slice(0, 2)}••• ••${mobile.slice(-3)}` : "");

function SaveProgressModal({ onClose, onSaved }) {
  const journeyApi = useJourney();
  const [name, setName] = useState(journeyApi?.journey?.name || "");
  const [mobile, setMobile] = useState(journeyApi?.journey?.mobile || portalMobile());
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const valid = /^[6-9]\d{9}$/.test(mobile);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (event) => {
    event.preventDefault();
    if (!valid || state === "saving") return;
    setState("saving");
    setError("");
    try {
      await journeyApi.saveContact({ name: name.trim(), mobile });
      setState("done");
      onSaved();
    } catch (cause) {
      setError(cause.message || "We couldn't save that just now. Please try again.");
      setState("idle");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Save your progress"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="max-h-full w-full max-w-[420px] overflow-y-auto rounded-2xl bg-white p-6 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.2)]">
        <div className="flex items-start justify-between gap-3">
          <span className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fff7ed]">
              {state === "done" ? (
                <Check className="size-5 text-[#00a63e]" strokeWidth={2.2} />
              ) : (
                <Bookmark className="size-5 text-[#f9a825]" strokeWidth={1.8} />
              )}
            </span>
            <span className="flex flex-col items-start">
              <span className="text-[18px] leading-[27px] font-bold text-[#1f2937]">
                {state === "done" ? "Progress saved" : "Save your progress"}
              </span>
              <span className="text-[12px] leading-4 text-[#99a1af]">
                {state === "done" ? masked(mobile) : "Pick up right here, any time"}
              </span>
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 cursor-pointer rounded-full p-1 text-[#99a1af] transition-colors hover:bg-[#f3f4f6] hover:text-[#1f2937]"
          >
            <X className="size-4" strokeWidth={1.666} />
          </button>
        </div>

        {state === "done" ? (
          <>
            <p className="pt-5 text-[14px] leading-[22px] text-[#4a5565]">
              Your choices are saved. If you step away, we'll WhatsApp you a link that brings you
              straight back to this step — nothing to fill in again.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full cursor-pointer rounded-[20px] bg-[#f9a825] py-3 text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#f59e0b]"
            >
              Continue booking
            </button>
          </>
        ) : (
          <form onSubmit={submit} noValidate>
            <label className="mt-5 block">
              <span className="text-[13px] leading-[18px] font-bold text-[#1f2937]">
                Your name <span className="font-normal text-[#99a1af]">(optional)</span>
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={80}
                autoComplete="name"
                placeholder="e.g. Priya Sharma"
                className="mt-2 w-full rounded-[20px] border-[0.57px] border-solid border-[#e5e7eb] bg-white px-4 py-3 text-[14px] leading-[20px] text-[#1f2937] outline-none placeholder:text-[#c4c9d2] focus:border-[#f9a825]"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-[13px] leading-[18px] font-bold text-[#1f2937]">WhatsApp number</span>
              <span className="mt-2 flex items-center rounded-[20px] border-[0.57px] border-solid border-[#e5e7eb] bg-white focus-within:border-[#f9a825]">
                <span className="border-r-[0.57px] border-solid border-[#e5e7eb] py-3 pr-3 pl-4 text-[14px] leading-[20px] font-semibold text-[#6a7282]">
                  +91
                </span>
                <input
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(-10))}
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  autoFocus
                  className="w-full rounded-r-[20px] bg-transparent px-3 py-3 text-[14px] leading-[20px] tracking-wide text-[#1f2937] outline-none placeholder:tracking-normal placeholder:text-[#c4c9d2]"
                />
              </span>
            </label>

            <p className="flex items-start gap-2 pt-3 text-[12px] leading-[18px] text-[#6a7282]">
              <MessageCircle className="mt-[2px] size-[14px] shrink-0 text-[#00a63e]" strokeWidth={1.8} />
              We'll send one WhatsApp message with a link to continue, only if you don't finish. No
              spam.
            </p>

            {error && <p className="pt-3 text-[12px] leading-4 font-semibold text-[#e7000b]">{error}</p>}

            <div className="mt-5 flex items-stretch gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer rounded-[20px] border-[0.57px] border-solid border-[#e5e7eb] py-3 text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:bg-[#f9fafb]"
              >
                Not now
              </button>
              <button
                type="submit"
                disabled={!valid || state === "saving"}
                className="flex-1 cursor-pointer rounded-[20px] bg-[#f9a825] py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#f59e0b] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {state === "saving" ? "Saving…" : "Save progress"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function SaveProgressButton() {
  const { save } = useBooking();
  const journeyApi = useJourney();
  const [saved, setSaved] = useState(false);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    if (!saved) return undefined;
    const timer = window.setTimeout(() => setSaved(false), 2000);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const onClick = () => {
    const local = save();
    // Outside the wizard's provider there is no server journey to attach to.
    if (!journeyApi) return setSaved(local);
    return setAsking(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        title={journeyApi?.journey?.mobile ? `Saved for ${masked(journeyApi.journey.mobile)}` : undefined}
        className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border-[0.701px] border-solid border-[#e5e7eb] bg-white px-[13px] py-[9px] transition-colors hover:border-[#f9a825]"
      >
        {saved ? (
          <Check className="size-[13.996px] shrink-0 text-[#f9a825]" strokeWidth={2} />
        ) : (
          <Bookmark className="size-[13.996px] shrink-0 text-[#f9a825]" strokeWidth={1.666} />
        )}
        <span className="text-[12px] leading-4 font-semibold whitespace-nowrap text-[#1f2937]">
          {saved ? "Saved" : "Save Progress"}
        </span>
      </button>

      {asking && <SaveProgressModal onClose={() => setAsking(false)} onSaved={() => setSaved(true)} />}
    </>
  );
}
