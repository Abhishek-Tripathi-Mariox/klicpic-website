import React, { useMemo, useState } from "react";
import SiteLayout from "../../components/SiteLayout";
import CatalogFilters from "../../components/CatalogFilters";
import PageHeading from "../../components/PageHeading";
import { PROPS, PROP_FILTERS } from "./propsData";

/**
 * Figma: Props Catalog (1550:6558) — 4-column grid of prop cards.
 */
function PropCard({ prop }) {
  const isBooked = prop.status === "Booked Out";
  return (
    <article className="flex flex-col items-start overflow-hidden rounded-2xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <div className="relative h-[239.997px] w-full shrink-0 overflow-hidden bg-gradient-to-b from-[#eceef0] to-[#dfe2e4]">
        {prop.image && (
          <img
            src={prop.image}
            alt={prop.name}
            className="pointer-events-none absolute inset-0 size-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-[5px] rounded-full bg-[rgba(0,0,0,0.65)] px-2 py-1">
          <span className="relative size-[7.994px] shrink-0">
            <span className="absolute -inset-[2.74px] rounded-full bg-[#4ade80] opacity-25" />
            <span className="absolute inset-0 rounded-full bg-[#4ade80]" />
          </span>
          <span className="text-[10px] leading-[10px] font-bold whitespace-nowrap text-white">
            {prop.viewing}
          </span>
        </div>
        <span
          className={`absolute top-3 right-3 rounded-full px-[10px] py-1 text-[11px] leading-[16.5px] font-bold whitespace-nowrap text-white ${
            isBooked ? "bg-[#99a1af]" : "bg-[#00c950]"
          }`}
        >
          {prop.status}
        </span>
      </div>

      <div className="flex w-full flex-col items-start p-4">
        <p className="text-[11px] leading-[16.5px] font-semibold tracking-[0.275px] uppercase text-[#f9a825]">
          {prop.category}
        </p>
        <h3 className="pt-1 text-[18px] leading-[27px] font-bold text-[#1f2937]">
          {prop.name}
        </h3>
        <p className="pt-2 text-[14px] leading-[22.75px] text-[#6a7282]">
          {prop.description}
        </p>

        <div className="flex w-full flex-col items-start py-3">
          <p className="text-[12px] leading-4 text-[#99a1af]">Works with</p>
          <div className="flex flex-wrap items-start gap-1 pt-1">
            {prop.worksWith.map((theme) => (
              <span
                key={theme}
                className="rounded-full bg-[#fff7ed] px-2 py-[2px] text-[11px] leading-[16.5px] font-medium whitespace-nowrap text-[#f9a825]"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PropsCatalog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visible = useMemo(
    () =>
      activeFilter === "All"
        ? PROPS
        : PROPS.filter((prop) => prop.category === activeFilter),
    [activeFilter]
  );

  return (
    <SiteLayout active="Props">
      <section className="flex w-full flex-col items-center bg-[#fafafa] pb-24">
        <div className="flex w-full max-w-[1440px] flex-col items-start px-6">
          <PageHeading
            eyebrow="Our Stunning"
            title="Props Catalog"
            subtitle="1,500+ premium props curated for every theme"
          />
          <CatalogFilters
            filters={PROP_FILTERS}
            active={activeFilter}
            onChange={setActiveFilter}
          />
          <div className="grid w-full grid-cols-1 gap-5 pt-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((prop) => (
              <PropCard key={prop.name} prop={prop} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
