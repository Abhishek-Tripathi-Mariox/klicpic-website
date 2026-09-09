import React, { useMemo } from "react";
import { useShootTypes } from "../../api/useCatalog";
import SectionHeading from "../../components/SectionHeading";
import maternity from "./assets/maternity.jpg";
import newborn from "./assets/newborn.jpg";
import baby from "./assets/baby.jpg";
import birthday from "./assets/birthday.jpg";
import family from "./assets/family.jpg";
import wedding from "./assets/wedding.jpg";
import preWedding from "./assets/pre-wedding.jpg";
import couple from "./assets/couple.jpg";
import corporate from "./assets/corporate.jpg";

/**
 * Figma: Klicpic mithu / Home — Choose Your Perfect Photoshoot (1550:2077)
 * 3x3 grid of category cards, image + bottom-up scrim + title/meta.
 *
 * The frame's "From ₹…" price, theme count and "Booked" tally are gone: all
 * The frame's "From ₹…" price is gone — those figures undercut what the CRM's
 * packages actually cost — and the theme count now comes from the CRM, which
 * holds 2 Maternity themes where the frame claimed 48.
 */
const CATEGORIES = [
  { name: "Maternity", image: maternity, booked: "1,240+ Booked" },
  { name: "Newborn", image: newborn, booked: "890+ Booked" },
  { name: "Baby", image: baby, booked: "1,580+ Booked" },
  { name: "Birthday", image: birthday, booked: "2,100+ Booked" },
  { name: "Family", image: family, booked: "1,340+ Booked" },
  { name: "Wedding", image: wedding, booked: "760+ Booked" },
  { name: "Pre-Wedding", image: preWedding, booked: "540+ Booked" },
  { name: "Couple", image: couple, booked: "870+ Booked" },
  { name: "Corporate", image: corporate, booked: "320+ Booked" },
];

const CARD_SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)";

export default function Categories() {
  const liveTypes = useShootTypes([]);
  const themeCounts = useMemo(
    () => new Map(liveTypes.map((type) => [type.label.toLowerCase(), type.themeCount])),
    [liveTypes]
  );

  return (
    <section className="flex w-full flex-col items-center bg-[#fafafa] px-6 py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <SectionHeading
          eyebrow="Choose Your"
          title="Perfect Photoshoot"
          subtitle={`${CATEGORIES.length} categories · infinite memories`}
        />

        <div className="grid w-full grid-cols-1 gap-5 pt-16 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <article
              key={category.name}
              className="group relative h-[419.991px] overflow-hidden rounded-2xl bg-[#e5e7eb]"
            >
              <img
                src={category.image}
                alt={`${category.name} photoshoot`}
                className="pointer-events-none absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: CARD_SCRIM }}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6">
                <h3 className="text-[24px] leading-8 font-bold text-white">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  {/* Only a category the CRM actually holds themes for gets a
                      count; the rest simply do not show one. */}
                  {themeCounts.get(category.name.toLowerCase()) > 0 && (
                    <>
                      <span className="text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.65)]">
                        {themeCounts.get(category.name.toLowerCase())} Themes
                      </span>
                      <span className="text-[14px] leading-[20px] text-[rgba(255,255,255,0.65)]">·</span>
                    </>
                  )}
                  <span className="text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.65)]">
                    {category.booked}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
