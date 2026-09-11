import React, { useEffect, useState } from "react";
import { imageUrl } from "../../api/imageUrl";
import SiteLayout from "../../components/SiteLayout";
import FitImage from "../../components/FitImage";
import Pagination from "../../components/Pagination";
import CatalogFilters from "../../components/CatalogFilters";
import PageHeading from "../../components/PageHeading";
import { usePagedProps } from "../../api/useCatalog";

/**
 * Figma: Props Catalog (1550:6558) — 4-column grid of prop cards.
 */
function PropCard({ prop }) {
  const isBooked = prop.status === "Booked Out";
  return (
    <article className="flex flex-col items-start overflow-hidden rounded-2xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      {/* Most props are gowns — tall, with trains — and a cover crop cut them
          at the knee. Shown whole over a blurred copy, in a box tall enough
          that a full-length gown still reads. */}
      <FitImage
        src={prop.image ? imageUrl(prop.image, 480) : ""}
        alt={prop.name}
        className="h-[260px] w-full shrink-0 bg-gradient-to-b from-[#eceef0] to-[#dfe2e4] sm:h-[320px]"
      >
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
      </FitImage>

      <div className="flex w-full flex-col items-start p-4">
        <p className="text-[11px] leading-[16.5px] font-semibold tracking-[0.275px] uppercase text-[#f9a825]">
          {prop.category}
        </p>
        <h3 className="pt-1 text-[18px] leading-[27px] font-bold text-[#1f2937]">
          {prop.name}
        </h3>
        {/* CRM descriptions run to full spec paragraphs; the card was drawn for
            a sentence, so clamp rather than let rows go ragged. */}
        <p className="line-clamp-3 pt-2 text-[14px] leading-[22.75px] text-[#6a7282]">
          {prop.description}
        </p>

        <div className="flex w-full flex-col items-start py-3">
          <p className="text-[12px] leading-4 text-[#99a1af]">Works with</p>
          <div className="flex flex-wrap items-start gap-1 pt-1">
            {(prop.worksWith ?? []).map((theme) => (
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

/**
 * Cards per page. Twelve fills the four-column grid exactly three rows deep,
 * so no page ends on a half-empty row. The backend counts and slices; the
 * browser only ever holds one page.
 */
const PAGE_SIZE = 12;

export default function PropsCatalog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  // A new filter is a new list — page 3 of the old one means nothing in it.
  useEffect(() => setPage(1), [activeFilter]);

  const { items, filters, total, pages, loading } = usePagedProps({
    category: activeFilter,
    page,
    limit: PAGE_SIZE,
  });

  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteLayout active="Props">
      <section className="flex w-full flex-col items-center bg-[#fafafa] pb-24">
        <div className="flex w-full max-w-[1440px] flex-col items-start px-6">
          <PageHeading
            eyebrow="Our Stunning"
            title="Props Catalog"
            subtitle={
              total
                ? `${total.toLocaleString("en-IN")} premium props curated for every theme`
                : "Premium props curated for every theme"
            }
          />
          <CatalogFilters
            filters={filters}
            active={activeFilter}
            onChange={setActiveFilter}
          />

          {!loading && items.length === 0 ? (
            <p className="w-full pt-14 text-center text-[14px] leading-[20px] text-[#6a7282]">
              Nothing in this category yet.
            </p>
          ) : (
            <div className="grid w-full grid-cols-1 gap-5 pt-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((prop) => (
                <PropCard key={prop.id || prop.name} prop={prop} />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            pages={pages}
            total={total}
            noun="props"
            onChange={changePage}
          />
        </div>
      </section>
    </SiteLayout>
  );
}
