import React from "react";

/**
 * Pill filter row shared by the catalog pages.
 * Figma: Themes 1550:3619, Props 1550:6579, Gowns, Gallery.
 */
export default function CatalogFilters({ filters, active, onChange }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
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
  );
}
