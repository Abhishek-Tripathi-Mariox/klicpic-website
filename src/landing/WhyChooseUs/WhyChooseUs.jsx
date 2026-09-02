import React from "react";
import { Camera, Package, Palette, Shirt, Star, Zap } from "lucide-react";

/**
 * Figma: Klicpic mithu / Home — Why Families Choose Klicpic (1550:2719)
 * Six stat tiles on the dark ink band.
 */
const STATS = [
  { Icon: Palette, value: "500+", label: "Themes" },
  { Icon: Package, value: "1,500+", label: "Props" },
  { Icon: Shirt, value: "300+", label: "Gowns" },
  { Icon: Camera, value: "12,500+", label: "Sessions" },
  { Icon: Star, value: "4.9", label: "Rating" },
  { Icon: Zap, value: "48hr", label: "Delivery" },
];

export default function WhyChooseUs() {
  return (
    <section className="flex w-full flex-col items-center bg-[#1f2937] px-6 py-20">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <h2 className="text-center text-[36px] leading-10 font-bold text-white">
            Why Families Choose Klicpic
          </h2>
          <p className="pt-3 text-center text-[16px] leading-6 text-[rgba(255,255,255,0.5)]">
            More than a studio — a complete photography experience
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 pt-12 md:grid-cols-3 xl:grid-cols-6">
          {STATS.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border-[0.701px] border-solid border-[rgba(249,168,37,0.2)] bg-[rgba(249,168,37,0.1)] p-6"
            >
              <Icon className="size-8 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
              <p className="pt-3 text-center text-[24px] leading-8 font-bold whitespace-nowrap text-white">
                {value}
              </p>
              <p className="pt-1 text-center text-[12px] leading-4 font-medium whitespace-nowrap text-[rgba(255,255,255,0.5)]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
