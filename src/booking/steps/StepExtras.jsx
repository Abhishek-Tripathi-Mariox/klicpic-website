import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Info, Maximize2 } from "lucide-react";
import { useBooking } from "../BookingContext";
import { EXTRAS, SLOT_TONES } from "../extrasData";
import ExtraModal from "../ExtraModal";

/**
 * Figma: Step 4 Extras (1615:5393 empty, 1615:5956 with selections).
 * Deliverable cards with slot strips; tapping the expand icon opens the
 * add-on detail modal (1615:6539 / 7254).
 */
export default function StepExtras({ onBack, onNext, onSkip }) {
  const { booking, set } = useBooking();
  const [preview, setPreview] = useState(null);
  const chosen = booking.extrasList ?? [];

  const toggle = (name) =>
    set({
      extrasList: chosen.includes(name)
        ? chosen.filter((item) => item !== name)
        : [...chosen, name],
    });

  return (
    <div className="flex w-full flex-col items-start pb-24">
      <h2 className="text-[30px] leading-9 font-bold text-[#1f2937]">
        Add your deliverables
      </h2>
      <p className="pt-2 text-[14px] leading-[20px] text-[#6a7282]">
        <span className="font-bold text-[#1f2937]">Tap</span> on any card to see
        samples, videos &amp; sizes
      </p>

      <div className="mt-4 flex w-full items-start gap-2 rounded-2xl border-[0.701px] border-solid border-[#fee685] bg-[#fffbeb] px-3 py-[10px]">
        <Info className="mt-[2px] size-4 shrink-0 text-[#f59e0b]" strokeWidth={1.666} />
        <p className="text-[12px] leading-4 text-[#973c00]">
          <span className="font-bold">
            Planned week: {booking.date ?? "your selected week"}
          </span>{" "}
          — add-on slot availability shown below for your selected week
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
        {EXTRAS.map((extra) => {
          const selected = chosen.includes(extra.name);
          return (
            <div
              key={extra.name}
              className={`relative overflow-hidden rounded-2xl border-[1.71px] border-solid bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] transition-colors ${
                selected ? "border-[#f9a825]" : "border-transparent"
              }`}
            >
              {/* media */}
              <div className="relative h-[139.997px] w-full overflow-hidden bg-[#e5e7eb]">
                {extra.image && (
                  <img
                    src={extra.image}
                    alt={extra.name}
                    className="pointer-events-none absolute inset-0 size-full object-cover"
                  />
                )}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
                  }}
                />
                {extra.ribbon && (
                  <span className="absolute top-3 left-3 rounded-full bg-[rgba(239,68,68,0.87)] px-2 py-[3px] text-[9px] leading-[13.5px] font-extrabold whitespace-nowrap text-white">
                    🔥 {extra.ribbon}
                  </span>
                )}
                {extra.detail && (
                  <button
                    type="button"
                    onClick={() => setPreview(extra)}
                    aria-label={`Preview ${extra.name}`}
                    className="absolute right-3 bottom-3 flex size-7 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
                  >
                    <Maximize2 className="size-[14px]" strokeWidth={2} />
                  </button>
                )}
              </div>

              {/* body */}
              <div className="flex w-full flex-col items-start p-4">
                <div className="flex w-full items-center justify-between gap-3">
                  <h3 className="text-[18px] leading-7 font-bold text-[#1f2937]">
                    {extra.name}
                  </h3>
                  <span className="shrink-0 text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#f9a825]">
                    {extra.priceLabel}
                  </span>
                </div>
                <p className="pt-1 text-[12px] leading-4 text-[#6a7282]">
                  {extra.blurb}
                </p>

                <div
                  className={`mt-2 w-full rounded-lg border-[0.57px] border-solid px-2 py-[3px] text-[10px] leading-[15px] font-bold ${SLOT_TONES[extra.tone]}`}
                >
                  {extra.slots}
                </div>

                <button
                  type="button"
                  onClick={() => toggle(extra.name)}
                  aria-pressed={selected}
                  className="mt-2 flex w-full cursor-pointer items-center justify-between"
                >
                  <span className="text-[12px] leading-4 font-semibold text-[#6a7282]">
                    {selected ? "Added" : "Add to booking"}
                  </span>
                  <span
                    className={`flex size-5 items-center justify-center rounded-full border-[1.71px] border-solid ${
                      selected
                        ? "border-[#f9a825] bg-[#f9a825]"
                        : "border-[#d1d5dc]"
                    }`}
                  >
                    {selected && <Check className="size-3 text-white" strokeWidth={3} />}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* actions */}
      <div className="sticky bottom-4 z-10 mt-6 flex w-full items-center gap-3 rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white/95 p-3 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)] backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl border-[0.701px] border-solid border-[#e5e7eb] px-4 py-3 text-[14px] leading-[20px] font-semibold text-[#1f2937] transition-colors hover:bg-[#f9fafb]"
        >
          <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#f9a825] py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
        >
          Choose Package
          <ArrowRight className="size-4 shrink-0" strokeWidth={1.666} />
        </button>
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="w-full cursor-pointer pt-3 text-center text-[12px] leading-4 text-[#99a1af] transition-colors hover:text-[#f9a825]"
      >
        Skip — I'll add deliverables later
      </button>

      {preview && (
        <ExtraModal
          extra={preview}
          onClose={() => setPreview(null)}
          onAdd={(extra) => {
            if (!chosen.includes(extra.name)) toggle(extra.name);
            setPreview(null);
          }}
        />
      )}
    </div>
  );
}
