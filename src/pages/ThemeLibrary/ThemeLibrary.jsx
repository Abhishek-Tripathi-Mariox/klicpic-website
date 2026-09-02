import React, { useMemo, useState } from "react";
import SiteLayout from "../../components/SiteLayout";
import ThemeCard from "./ThemeCard";
import { THEMES, THEME_FILTERS, imagesFor } from "./themeData";

/**
 * Figma: Theme Library — 1550:3598 (Themes) and 1550:5078 (Photoshoots).
 * Both frames carry identical copy; `variant` selects the photo set and which
 * nav item is highlighted.
 */
export default function ThemeLibrary({ variant = "themes", activeNav = "Themes" }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const images = useMemo(() => imagesFor(variant), [variant]);

  const visible = useMemo(
    () =>
      activeFilter === "All"
        ? THEMES
        : THEMES.filter((theme) => theme.category === activeFilter),
    [activeFilter]
  );

  return (
    <SiteLayout active={activeNav}>
      <section className="flex w-full flex-col items-center bg-[#fafafa] pb-24">
        <div className="flex w-full max-w-[1440px] flex-col items-start px-6">
          <div className="flex w-full flex-col items-center py-16">
            <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
              Explore Our
            </p>
            <h1 className="pt-1 text-center text-[60px] leading-[60px] font-bold text-[#1f2937]">
              Theme Library
            </h1>
            <p className="pt-4 text-center text-[18px] leading-7 text-[#6a7282]">
              500+ handcrafted themes for every mood and milestone
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-3">
            {THEME_FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`cursor-pointer rounded-full px-5 py-[10px] text-center text-[14px] leading-[20px] font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#f9a825] text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]"
                      : "border-[0.701px] border-solid border-[#f3f4f6] bg-white text-[#4a5565] hover:border-[#f9a825] hover:text-[#f9a825]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="grid w-full grid-cols-1 gap-6 pt-14 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((theme) => (
              <ThemeCard
                key={theme.slug}
                theme={theme}
                image={images[theme.slug]}
              />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
