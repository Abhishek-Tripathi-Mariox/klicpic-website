import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";
import StudioCard from "./StudioCard";
import { STUDIOS as LOCAL_STUDIOS, STUDIO_CITIES as LOCAL_STUDIO_CITIES } from "./studioData";
import { useStudios } from "../../api/useCatalog";

/**
 * Figma: Klicpic mithu / Home — Klicpic Studios Near You (1550:2241)
 * Horizontal rail of StudioCards ending in a dashed "see all" card.
 */

/** What this build shipped — the fallback when the API is unreachable. */
const LOCAL_CATALOG = { items: LOCAL_STUDIOS, filters: LOCAL_STUDIO_CITIES };

export default function Studios() {
  // The real branches, live from the CRM.
  const { items: STUDIOS } = useStudios(LOCAL_CATALOG);
  // The frame hardcodes "7 studios · 6 cities" and "See All 9". Those numbers
  // have to follow the live list, or the rail promises branches we don't have.
  const openCount = STUDIOS.filter((studio) => studio.open).length;
  const cityCount = new Set(
    STUDIOS.map((studio) => String(studio.area || "").split(", ").pop()).filter(Boolean)
  ).size;

  return (
    <section className="flex w-full flex-col items-start bg-white py-16">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-[1440px] items-end justify-between px-6">
          <div className="flex flex-col items-start">
            <p className="font-script text-[24px] leading-8 font-normal whitespace-nowrap text-[#f9a825]">
              Find Your Studio
            </p>
            <h2 className="pt-[2px] text-[36px] leading-10 font-bold text-[#1f2937]">
              Klicpic Studios Near You
            </h2>
            <p className="pt-2 text-[14px] leading-[20px] text-[#99a1af]">
              {openCount} studios open now · Across {cityCount}{" "}
              {cityCount === 1 ? "city" : "cities"}
            </p>
          </div>
          <Link
            to="/studios"
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border-[1.402px] border-solid border-[#f9a825] px-5 py-[10px] transition-colors hover:bg-[#f9a825]/10"
          >
            <span className="text-center text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#f9a825]">
              View All
            </span>
            <ChevronRight className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.333} />
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col items-start pt-6 pl-6">
        <div className="klicpic-rail flex w-full items-start gap-4 overflow-x-auto pr-6 pb-4">
          {STUDIOS.map((studio) => (
            <StudioCard key={studio.name} studio={studio} />
          ))}

          <div className="flex w-[223.997px] shrink-0 flex-col items-center justify-center gap-3 self-stretch rounded-2xl border-[1.402px] border-dashed border-[#e5e7eb] p-6">
            <div className="flex size-[47.999px] shrink-0 items-center justify-center rounded-full bg-[rgba(249,168,37,0.1)]">
              <MapPin className="size-[23.994px] text-[#f9a825]" strokeWidth={1.666} />
            </div>
            <p className="text-center text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#1f2937]">
              See All {STUDIOS.length} Studios
            </p>
            <p className="w-[174px] text-center text-[12px] leading-4 text-[#99a1af]">
              Filter by city, availability &amp; more
            </p>
            <Link to="/studios" className="flex cursor-pointer items-center gap-1">
              <span className="text-[12px] leading-4 font-bold whitespace-nowrap text-[#f9a825]">
                View All
              </span>
              <ChevronRight className="size-[11.992px] text-[#f9a825]" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
