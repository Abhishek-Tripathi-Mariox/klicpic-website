import React, { useEffect, useState } from "react";
import { imageUrl } from "../../api/imageUrl";
import { Link } from "react-router-dom";
import { CircleCheck, X } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import PageHeading from "../../components/PageHeading";
import Pagination from "../../components/Pagination";
import { usePagedPackages } from "../../api/useCatalog";

/**
 * Figma: Packages (1550:7831).
 */
function PackageCard({ pkg }) {
  return (
    <article
      className={`relative flex flex-col items-start overflow-hidden rounded-3xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] ${
        pkg.highlighted ? "border-[1.402px] border-solid border-[#f9a825]" : ""
      }`}
    >
      {pkg.ribbon && (
        <span className="absolute top-0 left-1/2 z-10 -translate-x-1/2 rounded-b-[12px] bg-[#f9a825] px-5 py-[6px] text-[12px] leading-4 font-bold whitespace-nowrap text-white">
          {pkg.ribbon}
        </span>
      )}

      {/* The CRM has no image column for packages, so a live record arrives
          without one. Render the gradient alone rather than a broken image. */}
      <div className="relative h-[175.997px] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#3f4550] to-[#1f2937]">
        {pkg.image && (
          <img
            src={imageUrl(pkg.image, 480)}
            alt={pkg.name}
            loading="lazy"
            className="pointer-events-none absolute inset-0 size-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="absolute right-5 bottom-3 left-5 flex items-end justify-between gap-3">
          {/* The CRM's descriptions run far longer than the frame's taglines,
              so this column has to give way rather than run under the price. */}
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <p className="w-full truncate text-[20px] leading-7 font-bold text-white">
              {pkg.name}
            </p>
            <p className="w-full truncate text-[12px] leading-4 text-[rgba(255,255,255,0.6)]">
              {pkg.tagline || pkg.description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end">
            <p className="text-[30px] leading-9 font-bold whitespace-nowrap text-white">
              {pkg.priceLabel || pkg.price}
            </p>
            <p className="text-right text-[10px] leading-[15px] whitespace-nowrap text-[rgba(255,255,255,0.5)]">
              {pkg.delivery || pkg.duration}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start p-6">
        <ul className="flex w-full flex-col items-start gap-[10px] pb-7">
          {(pkg.features ?? []).map((feature) => (
            <li key={feature.label} className="flex items-center gap-3">
              {feature.included ? (
                <CircleCheck className="size-4 shrink-0 text-[#00c950]" strokeWidth={1.666} />
              ) : (
                <X className="size-4 shrink-0 text-[#d1d5dc]" strokeWidth={1.666} />
              )}
              <span
                className={`text-[14px] leading-[20px] whitespace-nowrap ${
                  feature.included
                    ? "font-medium text-[#1f2937]"
                    : "text-[#99a1af]"
                }`}
              >
                {feature.label}
              </span>
            </li>
          ))}
        </ul>

        {/* The CRM has no column for the CTA's label or styling, so a live
            package gets the design's default rather than a blank button. */}
        <Link
          to="/book"
          className={`flex h-[47.977px] w-full cursor-pointer items-center justify-center rounded-[20px] text-center text-[14px] leading-[20px] font-bold text-white transition-colors ${
            pkg.ctaClass || "bg-[#f9a825] hover:bg-[#e69a1f]"
          }`}
        >
          {pkg.cta || "Book This Package"}
        </Link>
      </div>
    </article>
  );
}

/** Cards per page — twelve fills the three-column grid four rows deep. */
const PAGE_SIZE = 12;

export default function Packages() {
  // The pills were decorative: they defaulted to "All Packages", which no API
  // filter is called, and nothing filtered the list either way. They now drive
  // the query the backend answers.
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [activeFilter]);

  const {
    items: PACKAGES,
    filters: PACKAGE_FILTERS,
    total,
    pages,
    loading,
  } = usePagedPackages({ category: activeFilter, page, limit: PAGE_SIZE });

  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteLayout active="Packages">
      <section className="flex w-full flex-col items-center bg-[#fafafa] pb-24">
        <div className="flex w-full max-w-[1440px] flex-col items-start px-6">
          <PageHeading
            eyebrow="Choose Your"
            title="Package"
            subtitle="Transparent pricing · No hidden charges · 100% satisfaction guaranteed"
          />

          <div className="flex w-full flex-wrap items-center justify-center gap-3">
            {PACKAGE_FILTERS.map((filter) => {
              // The bundle ships { label, emoji }; the API sends plain strings.
              const { label, emoji } =
                typeof filter === "string" ? { label: filter, emoji: "" } : filter;
              const isActive = label === activeFilter;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveFilter(label)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-[10px] text-center text-[14px] leading-[20px] font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#f9a825] text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]"
                      : "border-[0.701px] border-solid border-[#f3f4f6] bg-white text-[#4a5565] hover:border-[#f9a825] hover:text-[#f9a825]"
                  }`}
                >
                  <span>{emoji}</span>
                  {label}
                </button>
              );
            })}
          </div>

          {!loading && PACKAGES.length === 0 ? (
            <p className="w-full pt-14 text-center text-[14px] leading-[20px] text-[#6a7282]">
              Nothing in this category yet.
            </p>
          ) : (
            <div className="grid w-full grid-cols-1 gap-6 pt-14 lg:grid-cols-3">
              {PACKAGES.map((pkg) => (
                <PackageCard key={pkg.id || pkg.name} pkg={pkg} />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            pages={pages}
            total={total}
            noun="packages"
            onChange={changePage}
          />

          {/* Build Your Own Package */}
          <div className="w-full pt-20">
            <div
              className="flex w-full flex-col items-center rounded-3xl p-12"
              style={{
                backgroundImage:
                  "linear-gradient(165.65deg, rgb(31,41,55) 0%, rgb(55,65,81) 100%)",
              }}
            >
              <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
                Want something unique?
              </p>
              <h2 className="pt-2 text-center text-[30px] leading-9 font-bold text-white">
                Build Your Own Package
              </h2>
              <p className="w-[512px] max-w-full pt-4 pb-8 text-center text-[16px] leading-6 text-[rgba(255,255,255,0.6)]">
                Mix and match exactly what you need. Our package builder lets you
                add photos, albums, frames, reels, video, and more — with live
                pricing.
              </p>
              <Link
          to="/book"
                className="h-[60px] w-[272.577px] max-w-full cursor-pointer rounded-full bg-[#f9a825] text-center text-[18px] leading-7 font-bold text-white shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#e69a1f]"
              >
                Start Custom Builder
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
