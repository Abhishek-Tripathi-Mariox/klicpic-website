import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clapperboard,
  Frame,
  Gift,
  ImageIcon,
  Sparkles,
  Video,
} from "lucide-react";
import { priceBooking, useBooking } from "../BookingContext";
import { useExtras } from "../../api/useCatalog";

/**
 * Figma: Extras (1615:5393 empty, 1615:5956 with selections) — now step 5, after Package.
 *
 * The cards are the CRM's active Products — the same add-ons, at the same
 * amounts, that the sales team puts on a quotation. The frame's cards (Premium
 * Album, Framed Prints, Canvas Wall Art…) were design copy with prices the
 * studio never set, and their "2 slots — 28 August" strips described no real
 * availability; both are gone. Products carry no photo, so each card shows an
 * icon for what it is instead of a stock picture.
 */

/** A glyph for the card, read from the product's name. */
const iconFor = (name) => {
  const text = String(name || "").toLowerCase();
  if (/album|book/.test(text)) return BookOpen;
  if (/frame|canvas|print|wall/.test(text)) return Frame;
  if (/reel|video|film|cinematic/.test(text)) return Video;
  if (/bts|behind/.test(text)) return Clapperboard;
  if (/effect|special/.test(text)) return Sparkles;
  if (/photo|soft copy|softcopy|edit|image|picture/.test(text)) return ImageIcon;
  return Gift;
};

export default function StepExtras({ onBack, onNext, onSkip }) {
  const { extras: EXTRAS, loading, error } = useExtras();
  const { booking, set } = useBooking();
  const chosen = booking.extrasList ?? [];

  const apply = (names) => {
    // Keep the amounts with the names, so the Package step can re-price
    // without the catalogue in hand.
    const items = EXTRAS.filter((extra) => names.includes(extra.name)).map(
      ({ id, name, price }) => ({ id, name, price })
    );
    set({
      extrasList: items.map((item) => item.name),
      extrasItems: items,
      extras: items[0]?.name || null,
      total: priceBooking({ packagePrice: booking.packagePrice, extras: items }),
    });
  };

  const toggle = (name) =>
    apply(chosen.includes(name) ? chosen.filter((item) => item !== name) : [...chosen, name]);

  // A journey saved before the catalogue changed may hold add-ons the studio
  // no longer offers (or the old bundled ones). Drop them once the live list
  // is in, so neither the summary nor the total carries them.
  useEffect(() => {
    if (loading || error) return;
    const offered = new Set(EXTRAS.map((extra) => extra.name));
    const stale = chosen.some((name) => !offered.has(name));
    const unpriced = chosen.length !== (booking.extrasItems || []).length;
    if (stale || unpriced) apply(chosen.filter((name) => offered.has(name)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, EXTRAS]);

  const addedTotal = (booking.extrasItems || []).reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="flex w-full flex-col items-start pb-24">
      <h2 className="text-[26px] leading-8 font-bold text-[#1f2937] sm:text-[30px] sm:leading-9">
        Add your deliverables
      </h2>
      <p className="pt-2 text-[14px] leading-[20px] text-[#6a7282]">
        Pick anything you'd like added to your shoot — each is added to your total.
      </p>

      {loading && (
        <div className="grid w-full grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
          {[0, 1, 2, 3].map((key) => (
            <div key={key} className="h-[212px] animate-pulse rounded-2xl bg-[#f3f4f6]" />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="mt-6 w-full rounded-2xl border-[0.701px] border-solid border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] leading-5 text-[#b91c1c]">
          We couldn't load the add-ons just now. You can carry on and ask for
          them when our team calls you.
        </p>
      )}

      {!loading && !error && EXTRAS.length === 0 && (
        <p className="mt-6 w-full rounded-2xl border-[0.701px] border-dashed border-[#e5e7eb] bg-white px-4 py-6 text-center text-[13px] leading-5 text-[#6a7282]">
          No add-ons are on offer right now — carry on to review and book.
        </p>
      )}

      {!loading && EXTRAS.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
          {EXTRAS.map((extra) => {
            const selected = chosen.includes(extra.name);
            const Icon = iconFor(extra.name);
            return (
              <button
                key={extra.id}
                type="button"
                onClick={() => toggle(extra.name)}
                aria-pressed={selected}
                className={`relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border-[1.71px] border-solid bg-white text-left shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] transition-colors ${
                  selected ? "border-[#f9a825]" : "border-transparent hover:border-[#fde68a]"
                }`}
              >
                {/* media — the product has no photo, so the card shows what it is */}
                <span className="relative flex h-[112px] w-full items-center justify-center bg-gradient-to-br from-[#fff7ed] to-[#fde68a]/60">
                  <Icon className="size-10 text-[#f9a825]" strokeWidth={1.4} />
                </span>

                <span className="flex w-full flex-1 flex-col items-start p-4">
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="text-[18px] leading-7 font-bold text-[#1f2937] capitalize">
                      {extra.name}
                    </span>
                    <span className="shrink-0 pt-[3px] text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#f9a825]">
                      {extra.priceLabel}
                    </span>
                  </span>
                  {extra.description &&
                    extra.description.trim().toLowerCase() !== extra.name.trim().toLowerCase() && (
                      <span className="pt-1 text-[12px] leading-4 text-[#6a7282] first-letter:uppercase">
                        {extra.description}
                      </span>
                    )}

                  <span className="mt-auto flex w-full items-center justify-between pt-4">
                    <span className="text-[12px] leading-4 font-semibold text-[#6a7282]">
                      {selected ? "Added" : "Add to booking"}
                    </span>
                    <span
                      className={`flex size-5 items-center justify-center rounded-full border-[1.71px] border-solid ${
                        selected ? "border-[#f9a825] bg-[#f9a825]" : "border-[#d1d5dc]"
                      }`}
                    >
                      {selected && <Check className="size-3 text-white" strokeWidth={3} />}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* actions */}
      {/* Same bar as the Details steps: arrow-only back button on a phone. */}
      <div className="sticky bottom-4 z-10 mt-6 flex w-full items-center gap-2 rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white/95 p-2 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)] backdrop-blur sm:gap-3 sm:p-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Package"
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl border-[0.701px] border-solid border-[#e5e7eb] px-3 py-3 text-[14px] leading-[20px] font-semibold text-[#1f2937] transition-colors hover:bg-[#f9fafb] sm:px-4"
        >
          <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
          <span className="hidden sm:inline">Package</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#f9a825] px-3 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
        >
          {chosen.length
            ? `Review & Book · ${chosen.length} add-on${chosen.length > 1 ? "s" : ""} (+₹${addedTotal.toLocaleString("en-IN")})`
            : "Review & Book"}
          <ArrowRight className="size-4 shrink-0" strokeWidth={1.666} />
        </button>
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="w-full cursor-pointer pt-3 text-center text-[12px] leading-4 text-[#99a1af] transition-colors hover:text-[#f9a825]"
      >
        Skip — no add-ons
      </button>
    </div>
  );
}
