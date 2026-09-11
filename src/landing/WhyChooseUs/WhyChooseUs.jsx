import React, { useMemo } from "react";
import { Camera, Package, Palette, Shirt, Star, Zap } from "lucide-react";
import { useThemes } from "../../api/useCatalog";
import { usePagedProps } from "../../api/useCatalog";

/**
 * Figma: Klicpic mithu / Home — Why Families Choose Klicpic (1550:2719)
 * Six stat tiles on the dark ink band.
 *
 * The frame's catalogue figures were roughly triple what the studio holds —
 * 500+ themes against 178, 1,500+ props against 551, 300+ gowns against 182.
 * Those three now count the CRM. Sessions, rating and turnaround stay as the
 * frame had them: no record here can back them either way.
 */
const STATIC_STATS = [
  { Icon: Camera, value: "12,500+", label: "Sessions" },
  { Icon: Star, value: "4.9", label: "Rating" },
  { Icon: Zap, value: "48hr", label: "Delivery" },
];

const count = (n, fallback) => (n > 0 ? n.toLocaleString("en-IN") : fallback);

export default function WhyChooseUs() {
  const { items: themes } = useThemes({ items: [], filters: [] });
  // limit 1 — the page needs the count, not the records.
  const { total: props } = usePagedProps({ limit: 1 });
  const { total: gowns } = usePagedProps({ category: "gown", limit: 1 });

  const STATS = useMemo(
    () => [
      { Icon: Palette, value: count(themes.length, "—"), label: "Themes" },
      { Icon: Package, value: count(props, "—"), label: "Props" },
      { Icon: Shirt, value: count(gowns, "—"), label: "Gowns" },
      ...STATIC_STATS,
    ],
    [themes.length, props, gowns]
  );

  return (
    <section className="flex w-full flex-col items-center bg-[#1f2937] px-4 py-16 sm:px-6 md:py-20">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <h2 className="text-center text-[28px] leading-[34px] font-bold text-white sm:text-[36px] sm:leading-10">
            Why Families Choose Klicpic
          </h2>
          <p className="pt-3 text-center text-[14px] leading-[20px] text-[rgba(255,255,255,0.5)] sm:text-[16px] sm:leading-6">
            More than a studio — a complete photography experience
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 pt-8 sm:gap-4 md:grid-cols-3 md:pt-12 xl:grid-cols-6">
          {STATS.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="flex min-w-0 flex-col items-center rounded-2xl border-[0.701px] border-solid border-[rgba(249,168,37,0.2)] bg-[rgba(249,168,37,0.1)] px-3 py-5 sm:p-6"
            >
              <Icon className="size-8 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
              <p className="pt-3 text-center text-[22px] leading-8 font-bold whitespace-nowrap text-white sm:text-[24px]">
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
