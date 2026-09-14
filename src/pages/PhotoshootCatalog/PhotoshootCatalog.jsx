import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import FitImage from "../../components/FitImage";
import PageHeading from "../../components/PageHeading";
import Pagination from "../../components/Pagination";
import { CATALOG as LOCAL_CATALOG } from "./catalogData";
import { useContent } from "../../api/useContent";
import { useShootTypes } from "../../api/useCatalog";

/**
 * Figma: Klicpic mithu / Photoshoots — Photoshoot Catalog (1616:18859)
 * 3x3 grid of category cards: photo, copy, the CRM's theme count, two CTAs.
 *
 * The frame also put a "From ₹…" pill on each card. Those figures were design
 * copy, not the studio's: the CRM's cheapest Maternity package is ₹6,999, not
 * the ₹4,999 the card promised, and six of the nine categories have no package
 * at all. Quoting a price nobody can honour is worse than quoting none.
 *
 * The frame's rating star and "N+ Booked" tally are gone for the same reason:
 * neither exists anywhere in the CRM and the site has no published reviews. The
 * CMS block still carries the seeded strings, so they are dropped here at the
 * render rather than only in the bundled copy. The photo scrim went with them —
 * it was there to keep that white badge legible and had nothing left to cover.
 */
/** Cards per page — twelve fills the three-column grid four rows deep. */
const PAGE_SIZE = 12;

export default function PhotoshootCatalog() {
  // Live copy from the backend, falling back to what this build shipped.
  const { content } = useContent("photoshoot-catalog", { CATALOG: LOCAL_CATALOG });
  const { CATALOG } = content;

  /**
   * Theme counts come from the CRM, matched to a card by name. The frame's
   * numbers were invented — it credited Maternity with 48 themes where the CRM
   * holds 2. A category the CRM has never heard of gets no count at all rather
   * than a made-up one.
   */
  /**
   * These cards live in the CMS block, not a collection, so there is nothing
   * for the backend to slice — the page holds them all and pages through them
   * here. With nine cards the control does not render at all; add a tenth and
   * it appears.
   */
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(CATALOG.length / PAGE_SIZE));
  const shown = CATALOG.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const liveTypes = useShootTypes([]);
  const themeCounts = useMemo(
    () => new Map(liveTypes.map((type) => [type.label.toLowerCase(), type.themeCount])),
    [liveTypes]
  );

  return (
    <SiteLayout active="Photoshoots">
      <section className="flex w-full flex-col items-center bg-white px-6 pb-24">
        <div className="flex w-full max-w-[1440px] flex-col items-start">
          <PageHeading
            eyebrow="Explore Our"
            title="Photoshoot Catalog"
            /* The category count is whatever is on the page; the "500+ themes"
               claim is gone — the CRM holds 187. */
            subtitle={`${CATALOG.length} categories · crafted for every milestone`}
          />

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((item) => (
              <article
                key={item.name}
                className="group flex flex-col items-start overflow-hidden rounded-3xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
              >
                {/* Shown whole — a cover crop cut heads and bumps off the
                    portrait shots — over a blurred copy that fills the box. */}
                <FitImage
                  src={item.image}
                  alt={`${item.name} photoshoot`}
                  className="h-[320px] w-full shrink-0"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />

                <div className="flex w-full flex-1 flex-col items-start p-5 sm:p-6">
                  <h3 className="text-[24px] leading-8 font-bold text-[#1f2937]">
                    {item.name}
                  </h3>
                  <p className="pt-2 text-[14px] leading-[22.75px] text-[#6a7282]">
                    {item.description}
                  </p>

                  {themeCounts.get(item.name.toLowerCase()) > 0 && (
                    <div className="flex items-center gap-4 pt-4">
                      <span className="flex items-center gap-1 text-[14px] leading-[20px] text-[#6a7282]">
                        🎨
                        <strong className="font-bold text-[#1f2937]">
                          {themeCounts.get(item.name.toLowerCase())}
                        </strong>
                        Themes
                      </span>
                    </div>
                  )}

                  <div className="mt-auto flex w-full items-stretch gap-3 pt-5">
                    <Link
                      to="/themes"
                      className="flex flex-1 items-center justify-center rounded-[20px] border-[1.71px] border-solid border-[#f9a825] py-[10px] text-center text-[14px] leading-[20px] font-semibold whitespace-nowrap text-[#f9a825] transition-colors hover:bg-[#f9a825]/10"
                    >
                      View Inspirations
                    </Link>
                    <Link
          to="/book"
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-[20px] bg-[#f9a825] py-[10px] text-center text-[14px] leading-[20px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#e69a1f]"
                    >
                      Start Journey
                      <ArrowRight className="size-[15.998px] shrink-0" strokeWidth={1.333} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            page={page}
            pages={pages}
            total={CATALOG.length}
            noun="categories"
            onChange={changePage}
          />
        </div>
      </section>
    </SiteLayout>
  );
}
