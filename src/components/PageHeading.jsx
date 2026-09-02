import React from "react";

/**
 * Inner-page hero heading. Figma: Theme Library 1550:3607, Props 1550:6567,
 * Gowns, Packages and Gallery use the same block.
 */
export default function PageHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="flex w-full flex-col items-center py-16">
      <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
        {eyebrow}
      </p>
      <h1 className="pt-1 text-center text-[40px] leading-[44px] font-bold text-[#1f2937] md:text-[60px] md:leading-[60px]">
        {title}
      </h1>
      {subtitle && (
        <p className="pt-4 text-center text-[18px] leading-7 text-[#6a7282]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
