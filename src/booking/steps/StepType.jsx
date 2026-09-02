import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Tag } from "lucide-react";
import { useBooking } from "../BookingContext";
import { REEL_COUPON, SHOOT_TYPES } from "../bookingData";

/**
 * Figma: Step1Type (1550:11465) — offer banner, heading, 2x3 shoot-type grid.
 * Picking a type applies the reel coupon, matching frame 1550:11817.
 */
const CARD_SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)";

export default function StepType({ onNext }) {
  const { booking, set } = useBooking();

  const choose = (type) => {
    set({ shootType: type.name, coupon: REEL_COUPON });
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
          <span className="text-[10px] leading-[15px] font-medium whitespace-nowrap text-[#99a1af]">
            Refreshes daily · 1 per user
          </span>
        </div>
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
              className={`group relative h-[199.992px] w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-shadow ${
                isSelected
                  ? "ring-2 ring-[#f9a825] ring-offset-2"
                  : "hover:shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)]"
              }`}
            >
              <img
                src={type.image}
                alt={`${type.name} shoot`}
                className="pointer-events-none absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
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

                <span className="flex flex-col items-end">
                  <span className="text-right text-[12px] leading-4 font-semibold whitespace-nowrap text-[#f9a825]">
                    {type.price}
                  </span>
                  <span className="mt-1 flex size-8 items-center justify-center rounded-full bg-[rgba(249,168,37,0.2)]">
                    <ArrowRight className="size-4 text-[#f9a825]" strokeWidth={1.666} />
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
