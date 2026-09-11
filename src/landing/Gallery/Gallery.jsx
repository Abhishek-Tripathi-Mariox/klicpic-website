import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PhotoWall from "../../components/PhotoWall";
import { useGallery } from "../../api/useGallery";

/**
 * Figma: Klicpic mithu / Home — Real Stories, Real Memories (1550:2576)
 *
 * The studio's own portfolio from the admin's Media Library: the twelve newest
 * live photos, with a pill for every type that has any. The frame's twelve
 * stock shoots ("Priya & Arjun" and the rest) are gone — until the team
 * uploads real work, the section stays off the page.
 */
const SHOWN = 12;

export default function Gallery() {
  const [active, setActive] = useState("All");
  const { photos, categories, total, loading } = useGallery({
    category: active,
    limit: SHOWN,
  });

  // Nothing uploaded yet — no section rather than borrowed photography.
  if (!loading && total === 0) return null;

  const FILTERS = ["All", ...categories.map((category) => category.name)];

  return (
    <section className="flex w-full flex-col items-center bg-[#fff7ed] px-4 py-16 sm:px-6 md:py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[26px] leading-8 font-normal whitespace-nowrap text-[#f9a825] sm:text-[30px] sm:leading-9">
            Real Stories,
          </p>
          <h2 className="pt-1 text-center text-[32px] leading-[38px] font-bold text-[#1f2937] sm:text-[40px] sm:leading-[44px] lg:text-[48px] lg:leading-[48px]">
            Real Memories
          </h2>
          <p className="pt-3 text-center text-[14px] leading-[20px] text-[#6a7282] sm:text-[16px] sm:leading-6">
            Click any photo to explore · Filter by category
          </p>
        </div>

        {FILTERS.length > 2 && (
          <div className="flex w-full flex-wrap items-center justify-center gap-2 pt-8 sm:gap-3 md:pt-12">
            {FILTERS.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  className={
                    isActive
                      ? "cursor-pointer rounded-full bg-[#f9a825] px-[21px] py-[8.4px] text-center text-[14.7px] leading-[21px] font-medium whitespace-nowrap text-white shadow-[0px_1.05px_1.575px_rgba(0,0,0,0.1),0px_1.05px_1.05px_rgba(0,0,0,0.1)]"
                      : "cursor-pointer rounded-full border-[0.701px] border-solid border-[#f3f4f6] bg-white px-[20.701px] py-[8.701px] text-center text-[14px] leading-[20px] font-medium whitespace-nowrap text-[#4a5565] transition-colors hover:border-[#f9a825] hover:text-[#f9a825]"
                  }
                >
                  {filter}
                </button>
              );
            })}
          </div>
        )}

        <div className="w-full pt-4">
          <PhotoWall photos={photos} />
        </div>

        <div className="flex w-full justify-center pt-10">
          <Link
            to="/gallery"
            className="flex items-center gap-2 rounded-full border-[1.402px] border-solid border-[#f9a825] px-[33.402px] py-[15.402px] transition-colors hover:bg-[#f9a825]/10"
          >
            <span className="text-center text-[16px] leading-6 font-semibold whitespace-nowrap text-[#f9a825]">
              View Full Portfolio
            </span>
            <ArrowRight className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.333} />
          </Link>
        </div>
      </div>
    </section>
  );
}
