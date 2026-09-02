import React from "react";
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
 */
const CATEGORIES = [
  { name: "Maternity", image: maternity, price: "From ₹4,999", themes: "48 Themes", booked: "1,240+ Booked" },
  { name: "Newborn", image: newborn, price: "From ₹5,999", themes: "35 Themes", booked: "890+ Booked" },
  { name: "Baby", image: baby, price: "From ₹3,999", themes: "52 Themes", booked: "1,580+ Booked" },
  { name: "Birthday", image: birthday, price: "From ₹6,999", themes: "67 Themes", booked: "2,100+ Booked" },
  { name: "Family", image: family, price: "From ₹7,999", themes: "44 Themes", booked: "1,340+ Booked" },
  { name: "Wedding", image: wedding, price: "From ₹24,999", themes: "38 Themes", booked: "760+ Booked" },
  { name: "Pre-Wedding", image: preWedding, price: "From ₹14,999", themes: "29 Themes", booked: "540+ Booked" },
  { name: "Couple", image: couple, price: "From ₹8,999", themes: "33 Themes", booked: "870+ Booked" },
  { name: "Corporate", image: corporate, price: "From ₹9,999", themes: "18 Themes", booked: "320+ Booked" },
];

const CARD_SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)";

export default function Categories() {
  return (
    <section className="flex w-full flex-col items-center bg-[#fafafa] px-6 py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <SectionHeading
          eyebrow="Choose Your"
          title="Perfect Photoshoot"
          subtitle="10 categories · 500+ themes · infinite memories"
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
                  <span className="text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.65)]">
                    {category.price}
                  </span>
                  <span className="text-[14px] leading-[20px] text-[rgba(255,255,255,0.65)]">·</span>
                  <span className="text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.65)]">
                    {category.themes}
                  </span>
                  <span className="text-[14px] leading-[20px] text-[rgba(255,255,255,0.65)]">·</span>
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
