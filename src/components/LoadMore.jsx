import React from "react";

/**
 * The CRM holds hundreds of themes and props — far more than the frames were
 * drawn against. Rendering them all at once makes the page crawl, so the
 * catalogues show a pageful at a time and grow on demand.
 */
export default function LoadMore({ shown, total, onMore, noun = "items" }) {
  if (shown >= total) return null;

  return (
    <div className="flex w-full flex-col items-center pt-10">
      <p className="text-[13px] leading-[20px] text-[#99a1af]">
        Showing {shown} of {total} {noun}
      </p>
      <button
        type="button"
        onClick={onMore}
        className="mt-3 flex h-[47.977px] cursor-pointer items-center justify-center rounded-full border-[1.402px] border-solid border-[#f9a825] px-8 text-center text-[14px] leading-[20px] font-bold text-[#f9a825] transition-colors hover:bg-[#f9a825]/10"
      >
        Load more
      </button>
    </div>
  );
}
