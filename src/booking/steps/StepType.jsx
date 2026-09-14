import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Tag } from "lucide-react";
import { useBooking } from "../BookingContext";
import { SHOOT_TYPES as LOCAL_SHOOT_TYPES } from "../bookingData";
import { useShootTypes } from "../../api/useCatalog";
import { imageUrl } from "../../api/imageUrl";
import FitImage from "../../components/FitImage";

/**
 * Figma: Step1Type (1550:11465) — offer banner, heading, shoot-type grid.
 * Picking a type applies the reel coupon, matching frame 1550:11817.
 */
const CARD_SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)";

export default function StepType({ onNext }) {
  // The same list as the admin's Add New Lead form. The CRM adds what it knows
  // about each — the cheapest package, a photo of the studio's own work — and
  // a type it has no photo for shows a related bundled picture instead.
  const liveTypes = useShootTypes([]);
  const SHOOT_TYPES = useMemo(() => {
    const dressing = new Map(LOCAL_SHOOT_TYPES.map((type) => [type.value.toLowerCase(), type]));
    const source = liveTypes.length
      ? liveTypes
      : LOCAL_SHOOT_TYPES.map((type) => ({ name: type.value, label: type.name }));

    return source.map((type) => {
      const bundled = dressing.get(String(type.name).toLowerCase()) || {};
      return {
        emoji: bundled.emoji || "📸",
        tagline: bundled.tagline || "",
        name: type.label,
        value: type.name,
        // The studio's own photo first; the related bundled picture otherwise.
        image: type.image ? imageUrl(type.image, 640) : bundled.image || "",
      };
    });
  }, [liveTypes]);

  const { booking, set } = useBooking();

  const choose = (type) => {
    // The card's short name for the summary; the admin's exact value for the Lead.
    set({ shootType: type.name, shootTypeValue: type.value });
    onNext?.();
  };

  return (
    <div className="flex w-full flex-col items-start">
      {/* today's offer */}
      <div
        className="w-full rounded-2xl border-[0.701px] border-dashed border-[rgba(249,168,37,0.4)] p-4"
        style={{
          backgroundImage:
            "linear-gradient(172.31deg, rgb(255,251,235) 0%, rgb(255,255,255) 100%)",
        }}
      >
        <div className="flex w-full items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <Tag className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
            <span className="text-[12px] leading-4 font-black tracking-[0.6px] text-[#1f2937] uppercase">
              Today's Offer
            </span>
          </span>
          {/* "Refreshes daily · 1 per user" described a rotation and a limit
              that nothing implements — offers run until the team ends them. */}
          {booking.coupon && (
            <span className="text-[10px] leading-[15px] font-medium whitespace-nowrap text-[#99a1af]">
              Applied to this booking
            </span>
          )}
        </div>
        {/* Once an offer is claimed the banner states it rather than sending
            the customer back out to pick another. */}
        {booking.coupon ? (
          <div className="mt-3 flex w-full flex-col items-center gap-1 rounded-[20px] bg-[rgba(249,168,37,0.12)] py-3">
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
              <span className="text-[14px] leading-[20px] font-black text-[#1f2937]">
                {booking.coupon.title}
              </span>
            </span>
            {booking.coupon.subtitle && (
              <span className="text-[11px] leading-4 text-[#6a7282]">
                {booking.coupon.subtitle}
              </span>
            )}
            {booking.coupon.code && (
              <span className="rounded-full bg-white px-3 py-[2px] text-[11px] leading-4 font-bold tracking-[0.5px] text-[#f9a825]">
                {booking.coupon.code}
              </span>
            )}
          </div>
        ) : (
        <Link
          to="/offers"
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-[10px] rounded-[20px] py-[14px] transition-opacity hover:opacity-95"
          style={{
            backgroundImage:
              "linear-gradient(176.47deg, rgb(249,168,37) 0%, rgb(255,215,64) 50%, rgb(249,168,37) 100%)",
          }}
        >
          <Sparkles className="size-4 shrink-0 text-white" strokeWidth={1.666} />
          <span className="text-center text-[14px] leading-[20px] font-black text-white">
            Check Your Offer Today
          </span>
        </Link>
        )}
      </div>

      {/* heading */}
      <div className="flex w-full items-start justify-between gap-4 pt-8">
        <div className="flex flex-col items-start">
          <h2 className="text-[24px] leading-8 font-bold text-[#1f2937]">
            What are we shooting today?
          </h2>
          <p className="pt-[2px] text-[14px] leading-[20px] text-[#6a7282]">
            Choose your shoot type to get started →
          </p>
        </div>
        <Link
          to="/gallery"
          className="flex shrink-0 items-center gap-2 rounded-full border-[0.701px] border-solid border-[#e5e7eb] bg-white px-[13px] py-[9px] transition-colors hover:border-[#f9a825]"
        >
          <Play className="size-[13.996px] shrink-0 text-[#f9a825]" strokeWidth={1.666} />
          <span className="text-[12px] leading-4 font-semibold whitespace-nowrap text-[#1f2937]">
            View Studio
          </span>
        </Link>
      </div>

      {/* shoot types */}
      <div className="grid w-full grid-cols-1 gap-4 pt-6 md:grid-cols-2">
        {SHOOT_TYPES.map((type) => {
          const isSelected = booking.shootType === type.name;
          return (
            <button
              key={type.name}
              type="button"
              onClick={() => choose(type)}
              className={`group block w-full cursor-pointer rounded-2xl text-left transition-shadow ${
                isSelected
                  ? "ring-2 ring-[#f9a825] ring-offset-2"
                  : "hover:shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)]"
              }`}
            >
              {/* A shoot type the CRM added has no bundled photo, so the card
                  falls back to its own gradient rather than a broken image. */}
              <FitImage
                src={type.image}
                alt={`${type.name} shoot`}
                tone="dark"
                className="h-[199.992px] w-full rounded-2xl bg-gradient-to-br from-[#3f4550] to-[#1f2937]"
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
              >
                <span
                  className="absolute inset-0"
                  style={{ background: CARD_SCRIM }}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                  <span className="flex flex-col items-start">
                    <span className="flex items-baseline gap-2">
                      <span className="text-[20px] leading-7">{type.emoji}</span>
                      <span className="text-[18px] leading-7 font-bold text-white">
                        {type.name}
                      </span>
                    </span>
                    <span className="pt-[2px] text-[12px] leading-4 text-[rgba(255,255,255,0.7)]">
                      {type.tagline}
                    </span>
                  </span>

                  {/* No price here — what a shoot costs is settled on the Package
                      step, against the packages that actually fit it. */}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(249,168,37,0.2)]">
                    <ArrowRight className="size-4 text-[#f9a825]" strokeWidth={1.666} />
                  </span>
                </span>
              </FitImage>
            </button>
          );
        })}
      </div>
    </div>
  );
}
