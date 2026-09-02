import React, { useEffect } from "react";
import { Play, X } from "lucide-react";

/**
 * Figma: add-on detail modal — Premium Album 1615:6539, Instagram Reel 1615:7254.
 * Sample media on top, feature list, optional size table, then the add CTA.
 */
export default function ExtraModal({ extra, onClose, onAdd }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!extra?.detail) return null;
  const { detail } = extra;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={extra.name}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-3xl bg-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.3)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* hero */}
        <div className="relative h-[190px] w-full overflow-hidden rounded-t-3xl bg-[#1f2937]">
          {extra.image && (
            <img
              src={extra.image}
              alt=""
              className="pointer-events-none absolute inset-0 size-full object-cover opacity-90"
            />
          )}
          <span className="absolute inset-0 bg-black/25" />
          <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90">
            <Play className="size-5 translate-x-[1px] text-[#1f2937]" strokeWidth={2} />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col items-start p-6">
          <span className="text-[11px] leading-4 font-bold tracking-[0.6px] text-[#99a1af] uppercase">
            Add-on
          </span>
          <h3 className="pt-1 text-[20px] leading-7 font-bold text-[#1f2937]">
            {extra.name}
          </h3>

          <p className="pt-4 text-[14px] leading-[20px] font-bold text-[#1f2937]">
            {detail.tagline}
          </p>
          <ul className="flex w-full flex-col gap-2 pt-3">
            {detail.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span aria-hidden className="shrink-0 text-[14px] text-[#f9a825]">
                  ✦
                </span>
                <span className="text-[13px] leading-[20px] text-[#6a7282]">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {detail.sample && (
            <>
              <p className="pt-5 text-[11px] leading-4 font-bold tracking-[0.6px] text-[#99a1af] uppercase">
                Sample Work
              </p>
              <img
                src={detail.sample}
                alt={`${extra.name} sample`}
                className="mt-2 w-full rounded-2xl object-cover"
              />
            </>
          )}

          {detail.sizes && (
            <>
              <p className="pt-5 text-[11px] leading-4 font-bold tracking-[0.6px] text-[#99a1af] uppercase">
                Available Sizes
              </p>
              <div className="grid w-full grid-cols-3 gap-2 pt-2">
                {detail.sizes.map((item) => (
                  <div
                    key={item.size}
                    className="flex flex-col items-start rounded-xl border-[0.701px] border-solid border-[#e5e7eb] p-3"
                  >
                    <span className="text-[13px] leading-[18px] font-bold text-[#1f2937]">
                      {item.size}
                    </span>
                    <span className="pt-1 text-[10px] leading-[14px] text-[#99a1af]">
                      {item.note}
                    </span>
                    <span className="pt-2 text-[13px] leading-[18px] font-bold text-[#f9a825]">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex w-full items-center justify-between gap-4 pt-6">
            <span className="flex flex-col items-start">
              <span className="text-[11px] leading-4 text-[#99a1af]">
                Starting from
              </span>
              <span className="text-[20px] leading-7 font-bold text-[#f9a825]">
                {extra.priceLabel}
              </span>
            </span>
            <button
              type="button"
              onClick={() => onAdd?.(extra)}
              className="shrink-0 cursor-pointer rounded-[20px] bg-[#f9a825] px-5 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
            >
              Got it — Add to Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
