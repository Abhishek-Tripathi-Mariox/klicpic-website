import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImageIcon } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import PhotoWall from "../../components/PhotoWall";
import Pagination from "../../components/Pagination";
import { useGallery } from "../../api/useGallery";

/**
 * Figma: Studio Gallery (1550:8378).
 *
 * The full portfolio from the admin's Media Library, twelve to a page. The
 * pills are the types that actually hold live photos, each with its real count;
 * the backend pages and filters. The frame's twelve stock shoots are gone.
 */
const PAGE_SIZE = 12;

const ANNOUNCEMENT = {
  emoji: "🔥",
  message: "Only 7 weekend slots left for July — don't miss out!",
  cta: "Book →",
  activeDot: 0,
};

export default function StudioGallery() {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  const { photos, categories, total, matching, pages, loading } = useGallery({
    category: active,
    page,
    limit: PAGE_SIZE,
  });

  const FILTERS = [{ name: "All", count: total }, ...categories];

  const pick = (name) => {
    setActive(name);
    setPage(1);
  };

  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteLayout active="Gallery" announcement={ANNOUNCEMENT}>
      <section className="flex w-full flex-col items-center bg-white px-6 pt-16 pb-16 md:pt-36">
        <div className="flex w-full max-w-[1440px] flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            Our Work
          </p>
          <h1 className="pt-1 text-center text-[40px] leading-[44px] font-bold text-[#1f2937] md:text-[60px] md:leading-[60px]">
            Studio Gallery
          </h1>
          <p className="w-[576px] max-w-full pt-4 text-center text-[18px] leading-7 text-[rgba(31,41,55,0.5)]">
            Every frame tells a story. Browse our curated collection of real
            shoots from Klicpic Studio.
          </p>

          {total > 0 && FILTERS.length > 2 && (
            // One sideways-scrolling row on a phone, as CatalogFilters does.
            <div className="klicpic-rail mt-8 flex w-full items-center gap-3 overflow-x-auto py-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
              {FILTERS.map(({ name, count }) => {
                const isActive = name === active;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => pick(name)}
                    className={`flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-2 transition-colors first:ml-auto last:mr-auto sm:first:ml-0 sm:last:mr-0 ${
                      isActive
                        ? "bg-[#f9a825]"
                        : "border-[0.701px] border-solid border-[rgba(31,41,55,0.1)] hover:border-[#f9a825]"
                    }`}
                  >
                    <span
                      className={`text-center text-[14px] leading-[20px] font-semibold whitespace-nowrap ${
                        isActive ? "text-[#0f1117]" : "text-[rgba(31,41,55,0.6)]"
                      }`}
                    >
                      {name}
                    </span>
                    <span
                      className={`text-center text-[12px] leading-4 font-semibold opacity-60 ${
                        isActive ? "text-[#0f1117]" : "text-[rgba(31,41,55,0.6)]"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="flex w-full flex-col items-center bg-white px-6 pb-16">
        <div className="flex w-full max-w-[1440px] flex-col items-center">
          {!loading && total === 0 ? (
            <div className="flex w-full max-w-[640px] flex-col items-center rounded-3xl border-[1.4px] border-dashed border-[#e5e7eb] px-6 py-16 text-center">
              <ImageIcon className="size-10 text-[#f9a825]" strokeWidth={1.4} />
              <p className="pt-4 text-[18px] leading-7 font-bold text-[#1f2937]">
                Our portfolio is on its way
              </p>
              <p className="max-w-[420px] pt-2 text-[14px] leading-[22px] text-[#6a7282]">
                We're adding photos from recent shoots. Meanwhile, browse our
                themes to see the sets families book.
              </p>
              <Link
                to="/themes"
                className="mt-6 rounded-full border-[1.4px] border-solid border-[#f9a825] px-6 py-2.5 text-[14px] font-bold text-[#f9a825] hover:bg-[#f9a825]/10"
              >
                Browse Themes →
              </Link>
            </div>
          ) : (
            <>
              <PhotoWall photos={photos} />
              <Pagination
                page={page}
                pages={pages}
                total={matching}
                noun="photos"
                onChange={changePage}
              />
            </>
          )}
        </div>
      </section>

      <section className="flex w-full flex-col items-center border-t-[0.701px] border-solid border-[rgba(249,168,37,0.15)] bg-[rgba(249,168,37,0.08)] px-6 py-20">
        <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
          Love What You See?
        </p>
        <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-[#403f3f]">
          Book Your Own Session
        </h2>
        <p className="w-[448px] max-w-full pt-4 pb-8 text-center text-[16px] leading-6 text-[rgba(64,63,63,0.5)]">
          Join thousands of families who have created timeless memories with
          Klicpic.
        </p>
        <Link
          to="/book"
          className="flex h-[60px] w-[209.355px] max-w-full items-center justify-center rounded-2xl bg-[#f9a825] text-center text-[18px] leading-7 font-bold text-[#0f1117] transition-colors hover:bg-[#e69a1f]"
        >
          Start Booking →
        </Link>
      </section>
    </SiteLayout>
  );
}
