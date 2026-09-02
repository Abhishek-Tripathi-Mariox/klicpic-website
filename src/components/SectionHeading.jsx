import React from "react";

/**
 * Shared section heading used across the Klicpic marketing sections.
 * Figma pattern: Dancing Script eyebrow + Poppins Bold 48px title + muted subtitle.
 * e.g. Categories (1550:2079), Studios (1550:2243), Gallery (1550:2578).
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  eyebrowClassName = "text-[#f9a825]",
  titleClassName = "text-[#1f2937]",
  subtitleClassName = "text-[#6a7282]",
  className = "",
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex w-full flex-col ${isCenter ? "items-center" : "items-start"} ${className}`}
    >
      {eyebrow && (
        <p
          className={`font-script text-[30px] leading-[36px] font-normal ${isCenter ? "text-center" : ""} ${eyebrowClassName}`}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={`pt-1 text-[48px] leading-[48px] font-bold ${isCenter ? "text-center" : ""} ${titleClassName}`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`pt-4 text-[18px] leading-[28px] ${isCenter ? "text-center" : ""} ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
