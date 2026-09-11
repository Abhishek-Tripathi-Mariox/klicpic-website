import React, { useEffect, useMemo, useState } from "react";
import SiteLayout from "../../components/SiteLayout";
import Pagination from "../../components/Pagination";
import CatalogFilters from "../../components/CatalogFilters";
import ThemeCard from "./ThemeCard";
import { imagesFor } from "./themeData";
import { usePagedThemes } from "../../api/useCatalog";

/**
 * Figma: Theme Library — 1550:3598 (Themes) and 1550:5078 (Photoshoots).
 * Both frames carry identical copy; `variant` selects the photo set and which
 * nav item is highlighted.
 */
/** Cards per page — twelve fills the three-column grid four rows deep. */
const PAGE_SIZE = 12;

export default function ThemeLibrary({ variant = "themes", activeNav = "Themes" }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  // A new filter is a new list; page 7 of the old one means nothing in it.
  useEffect(() => setPage(1), [activeFilter]);

  // Counted and sliced by the backend — the library holds 178 themes and the
  // browser has no reason to hold more than the twelve on screen.
  const {
    items: shown,
    filters: THEME_FILTERS,
    total,
    pages,
    loading,
  } = usePagedThemes({ category: activeFilter, page, limit: PAGE_SIZE });

  const images = useMemo(() => imagesFor(variant), [variant]);

  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteLayout active={activeNav}>
      <section className="flex w-full flex-col items-center bg-[#fafafa] pb-24">
        <div className="flex w-full max-w-[1440px] flex-col items-start px-6">
          <div className="flex w-full flex-col items-center py-16">
            <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
              Explore Our
            </p>
            <h1 className="pt-1 text-center text-[40px] leading-[44px] font-bold text-[#1f2937] md:text-[60px] md:leading-[60px]">
              Theme Library
            </h1>
            <p className="pt-4 text-center text-[18px] leading-7 text-[#6a7282]">
              {/* The real count, not the frame's "500+". */}
              {total
                ? `${total} handcrafted themes for every mood and milestone`
                : "Handcrafted themes for every mood and milestone"}
            </p>
          </div>

          <CatalogFilters
            filters={THEME_FILTERS}
            active={activeFilter}
            onChange={setActiveFilter}
          />

          {!loading && shown.length === 0 ? (
            <p className="w-full pt-14 text-center text-[14px] leading-[20px] text-[#6a7282]">
              Nothing in this category yet.
            </p>
          ) : (
          <div className="grid w-full grid-cols-1 gap-6 pt-14 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((theme) => (
              <ThemeCard
                key={theme.slug}
                theme={theme}
                /* A live theme carries the studio's own cover photo. The
                   bundled set is keyed by the slugs this build shipped with,
                   so it only stands in for those — a CRM theme would find
                   nothing there and render an empty frame. */
                image={theme.image || images[theme.slug]}
              />
            ))}
          </div>
          )}

          <Pagination
            page={page}
            pages={pages}
            total={total}
            noun="themes"
            onChange={changePage}
          />
        </div>
      </section>
    </SiteLayout>
  );
}
