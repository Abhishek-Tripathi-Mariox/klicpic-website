import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../../components/SiteLayout";
import CatalogFilters from "../../components/CatalogFilters";
import PageHeading from "../../components/PageHeading";
import StudioCard from "../../landing/Studios/StudioCard";
import { STUDIOS, STUDIO_CITIES } from "../../landing/Studios/studioData";

/**
 * The listing behind the home rail's "View All" (1550:2241). The frame set has
 * no design for it, so it reuses the catalog page furniture — PageHeading,
 * CatalogFilters and the rail's own StudioCard — and adds the availability
 * filter the rail's dashed card promises.
 */
const AVAILABILITY = ["All", "Open now", "Flagship"];

export default function StudioLocations() {
  const [city, setCity] = useState("All");
  const [availability, setAvailability] = useState("All");

  const studios = useMemo(
    () =>
      STUDIOS.filter((studio) => {
        const inCity = city === "All" || studio.area.endsWith(city);
        const matches =
          availability === "All" ||
          (availability === "Open now" && studio.open) ||
          (availability === "Flagship" && studio.flagship);
        return inCity && matches;
      }),
    [city, availability]
  );

  const openCount = studios.filter((studio) => studio.open).length;

  return (
    <SiteLayout>
      <section className="flex w-full flex-col items-center bg-[#fff7ed] px-6 pb-20">
        <div className="flex w-full max-w-[1200px] flex-col items-center">
          <PageHeading
            eyebrow="Find Your Studio"
            title="Klicpic Studios Near You"
            subtitle={`${STUDIOS.length} studios across ${STUDIO_CITIES.length - 1} cities — pick the one closest to you.`}
          />

          <CatalogFilters filters={STUDIO_CITIES} active={city} onChange={setCity} />

          <div className="flex w-full flex-wrap items-center justify-center gap-2 pt-3">
            {AVAILABILITY.map((option) => {
              const isActive = option === availability;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAvailability(option)}
                  className={`cursor-pointer rounded-full px-4 py-[6px] text-center text-[12px] leading-4 font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#1f2937] text-white"
                      : "border-[0.701px] border-solid border-[rgba(31,41,55,0.12)] bg-white text-[#6a7282] hover:border-[#f9a825] hover:text-[#f9a825]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <p className="pt-6 text-center text-[14px] leading-[20px] text-[#99a1af]">
            {studios.length === 0
              ? "No studios match that combination yet."
              : `Showing ${studios.length} studio${studios.length === 1 ? "" : "s"} · ${openCount} open now`}
          </p>

          {studios.length > 0 && (
            <div className="grid w-full grid-cols-1 justify-items-center gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {studios.map((studio) => (
                <StudioCard key={studio.name} studio={studio} />
              ))}
            </div>
          )}

          <div className="flex w-full flex-col items-center pt-16">
            <p className="font-script text-center text-[30px] leading-9 text-[#f9a825]">
              Not on the list?
            </p>
            <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-[#1f2937]">
              We Come to You
            </h2>
            <p className="max-w-[520px] pt-3 text-center text-[16px] leading-6 text-[#6a7282]">
              Outdoor and on-location shoots are available in every city we
              operate in. Tell us where, and we will bring the studio.
            </p>
            <Link
              to="/contact"
              className="mt-6 flex h-[60px] w-[240px] max-w-full items-center justify-center rounded-full bg-[#f9a825] text-center text-[18px] leading-7 font-bold text-white transition-colors hover:bg-[#e69a1f]"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
