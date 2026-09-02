import React, { useMemo, useState } from "react";
import SiteLayout from "../../components/SiteLayout";
import PageHeading from "../../components/PageHeading";
import CatalogFilters from "../../components/CatalogFilters";
import { GOWNS, GOWN_FILTERS } from "./gownData";

/**
 * Figma: Gown Collection (1550:7268) — 4-column grid, "By Theme" filter row.
 */
function GownCard({ gown }) {
  const isBooked = gown.status === "Booked";
  return (
    <article className="flex flex-col items-start overflow-hidden rounded-2xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <div className="relative h-[359.989px] w-full shrink-0 overflow-hidden bg-gradient-to-b from-[#f0f1f2] to-[#c9cccd]">
        {gown.image && (
          <img
            src={gown.image}
            alt={gown.name}
            className="pointer-events-none absolute inset-0 size-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-[5px] rounded-full bg-[rgba(0,0,0,0.65)] px-2 py-1">
          <span className="relative size-[7.994px] shrink-0">
            <span className="absolute -inset-[3.18px] rounded-full bg-[#4ade80] opacity-[0.16]" />
            <span className="absolute inset-0 rounded-full bg-[#4ade80]" />
          </span>
          <span className="text-[10px] leading-[10px] font-bold whitespace-nowrap text-white">
            {gown.viewing}
          </span>
        </div>
        <span
          className={`absolute top-3 right-3 rounded-full px-[10px] py-1 text-[11px] leading-[16.5px] font-bold whitespace-nowrap text-white ${
            isBooked ? "bg-[#99a1af]" : "bg-[#00c950]"
          }`}
        >
          {gown.status}
        </span>
        <span className="absolute top-11 left-3 rounded-full bg-[rgba(0,0,0,0.4)] px-2 py-[2px] text-[10px] leading-[15px] whitespace-nowrap text-white">
          Front View · Hover to flip
        </span>
      </div>

      <div className="flex w-full flex-col items-start p-4">
        <div className="flex w-full items-center gap-2">
          <span className="text-[11px] leading-[16.5px] font-semibold tracking-[0.275px] uppercase text-[#f9a825]">
            {gown.category}
          </span>
          <span className="text-[16px] leading-6 text-[#d1d5dc]">·</span>
          <span className="text-[11px] leading-[16.5px] whitespace-nowrap text-[#6a7282]">
            {gown.colour}
          </span>
        </div>

        <h3 className="pt-1 text-[18px] leading-[27px] font-bold text-[#1f2937]">
          {gown.name}
        </h3>

        <div className="flex w-full items-center justify-between pt-1 pb-2">
          <p className="text-[14px] leading-[20px] text-[#6a7282]">
            Size: <span className="font-bold text-[#1f2937]">{gown.size}</span>
          </p>
          <span className="rounded-full bg-[#fff7ed] px-2 py-[2px] text-[12px] leading-4 font-medium whitespace-nowrap text-[#f9a825]">
            {gown.theme}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function GownCollection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visible = useMemo(
    () =>
      activeFilter === "All"
        ? GOWNS
        : GOWNS.filter((gown) => gown.category === activeFilter),
    [activeFilter]
  );

  return (
    <SiteLayout active="Gowns">
      <section className="flex w-full flex-col items-center bg-[#fafafa] pb-24">
        <div className="flex w-full max-w-[1440px] flex-col items-start px-6">
          <PageHeading
            eyebrow="Wear Your"
            title="Gown Collection"
            subtitle="300+ designer gowns, available exclusively at Klicpic Studio"
          />

          <p className="w-full text-center text-[12px] leading-4 text-[#99a1af]">
            By Theme
          </p>
          <div className="w-full pt-2">
            <CatalogFilters
              filters={GOWN_FILTERS}
              active={activeFilter}
              onChange={setActiveFilter}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-6 pt-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((gown) => (
              <GownCard key={gown.name} gown={gown} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
