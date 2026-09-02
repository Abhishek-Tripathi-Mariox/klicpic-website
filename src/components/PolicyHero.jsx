import React from "react";
import { Search, ShieldCheck } from "lucide-react";

/**
 * Dark hero shared by the support pages.
 * Figma: FAQ 1616:20703 (centred, with search) and the legal pages —
 * Privacy 1616:21193, Terms 1616:21808, Refund 1616:22457 (left-aligned,
 * shield badge + "Last updated" line). Both sit on ink with a gold glow.
 */
const GLOW =
  "radial-gradient(circle 103px at 70% 50%, rgba(249,168,37,1) 0%, rgba(249,168,37,0) 50%)";

export default function PolicyHero({
  variant = "centered",
  badge,
  title,
  highlight,
  subtitle,
  meta,
  search,
  onSearchChange,
  searchPlaceholder = "Search questions…",
}) {
  const isLegal = variant === "legal";

  return (
    <section className="relative w-full bg-[#1f2937]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: GLOW }}
      />

      <div
        className={`relative mx-auto flex w-full max-w-[768px] flex-col px-6 ${
          isLegal ? "items-start py-14" : "items-center py-16"
        }`}
      >
        {isLegal ? (
          <div className="flex items-center gap-3">
            <span className="flex size-[39.994px] shrink-0 items-center justify-center rounded-[20px] bg-[rgba(249,168,37,0.2)]">
              <ShieldCheck className="size-[19.997px] text-[#f9a825]" strokeWidth={1.666} />
            </span>
            <span className="text-[12px] leading-4 font-bold tracking-[1.2px] text-[#f9a825] uppercase">
              {badge}
            </span>
          </div>
        ) : (
          badge && (
            <span className="rounded-full bg-[rgba(249,168,37,0.15)] px-3 py-1 text-center text-[12px] leading-4 font-bold tracking-[1.2px] text-[#f9a825] uppercase">
              {badge}
            </span>
          )
        )}

        <h1
          className={`font-black text-white ${
            isLegal
              ? "pt-5 text-[28px] leading-[36px] md:text-[36px] md:leading-[40px]"
              : "pt-4 text-center text-[36px] leading-[40px] md:text-[48px] md:leading-[48px]"
          }`}
        >
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-[#f9a825]">{highlight}</span>
            </>
          )}
        </h1>

        {subtitle && (
          <p className="pt-4 text-center text-[16px] leading-6 text-[rgba(255,255,255,0.5)]">
            {subtitle}
          </p>
        )}

        {meta && (
          <p className="pt-3 text-[14px] leading-[20px] text-[rgba(255,255,255,0.4)]">
            {meta}
          </p>
        )}

        {onSearchChange && (
          <div className="relative w-full max-w-[448px] pt-8">
            <Search
              className="pointer-events-none absolute top-[47px] left-4 size-[15.998px] text-[rgba(31,41,55,0.5)]"
              strokeWidth={1.333}
            />
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-[47.984px] w-full rounded-2xl bg-white pr-4 pl-11 text-[14px] text-[#1f2937] outline-none placeholder:text-[rgba(31,41,55,0.5)]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
