import React, { useMemo } from "react";
import { useShootTypes } from "../../api/useCatalog";
import SectionHeading from "../../components/SectionHeading";
import FitImage from "../../components/FitImage";
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
 * The frame's "From ₹…", rating and "Booked" tally are all gone — the prices
 * undercut what the CRM's packages actually cost and nothing counts bookings
 * per category. The theme count is the one figure that survives, because the
 * CRM holds it: 2 Maternity themes where the frame claimed 48.
 */
const CATEGORIES = [
  { name: "Maternity", image: maternity },
  { name: "Newborn", image: newborn },
  { name: "Baby", image: baby },
  { name: "Birthday", image: birthday },
  { name: "Family", image: family },
  { name: "Wedding", image: wedding },
  { name: "Pre-Wedding", image: preWedding },
  { name: "Couple", image: couple },
  { name: "Corporate", image: corporate },
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
    <section className="flex w-full flex-col items-center bg-[#fafafa] px-4 py-16 sm:px-6 md:py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <SectionHeading
          eyebrow="Choose Your"
          title="Perfect Photoshoot"
          subtitle={`${CATEGORIES.length} categories · infinite memories`}
        />

        <div className="grid w-full grid-cols-1 gap-5 pt-10 sm:grid-cols-2 md:pt-16 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            // The hover lift scales the card, not the photo: zooming the photo
            // inside its frame would trim its edges.
            <article
              key={category.name}
              className="group relative aspect-[3/4] overflow-hidden sm:aspect-auto sm:h-[419.991px] rounded-2xl bg-[#e5e7eb] transition-transform duration-500 hover:scale-[1.02]"
            >
              <FitImage
                src={category.image}
                alt={`${category.name} photoshoot`}
                tone="dark"
                className="absolute! inset-0 size-full"
              />
              <div
                className="absolute inset-0"
                style={{ background: CARD_SCRIM }}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6">
                <h3 className="text-[24px] leading-8 font-bold text-white">
                  {category.name}
                </h3>
                {/* Only a category the CRM actually holds themes for gets a
                    line of meta; the rest show the title alone. */}
                {themeCounts.get(category.name.toLowerCase()) > 0 && (
                  <p className="pt-1 text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.65)]">
                    {themeCounts.get(category.name.toLowerCase())} Themes
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
