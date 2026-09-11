import React from "react";

/**
 * Pill filter row shared by the catalog pages.
 * Figma: Themes 1550:3619, Props 1550:6579, Gowns, Gallery.
 *
 * A filter is a plain label, or `{ label, emoji }` for the Packages pills.
 *
 * The CRM's category lists run long; wrapped on a phone they stacked row
 * after row of pills above the first card. Below `sm` the row scrolls
 * sideways instead, and wraps centred from there up. The auto margins on the
 * end pills centre a short list without clipping the start of a long one,
 * which `justify-center` would do inside a scroller.
 */
export default function CatalogFilters({ filters, active, onChange }) {
  return (
    <div className="klicpic-rail flex w-full items-center gap-3 overflow-x-auto py-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
      {filters.map((filter) => {
        const { label, emoji } = typeof filter === "string" ? { label: filter } : filter;
        const isActive = label === active;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-[10px] text-center text-[14px] leading-[20px] font-medium whitespace-nowrap transition-colors first:ml-auto last:mr-auto sm:first:ml-0 sm:last:mr-0 ${
              isActive
                ? "bg-[#f9a825] text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]"
                : "border-[0.701px] border-solid border-[#f3f4f6] bg-white text-[#4a5565] hover:border-[#f9a825] hover:text-[#f9a825]"
            }`}
          >
            {emoji && <span>{emoji}</span>}
            {label}
          </button>
        );
      })}
    </div>
  );
}
