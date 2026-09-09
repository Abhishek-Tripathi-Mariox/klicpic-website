import React from "react";
import { imageUrl } from "../../api/imageUrl";
import { useThemes } from "../../api/useCatalog";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import royalBirthday from "./assets/royal-birthday.jpg";
import bohoMaternity from "./assets/boho-maternity.jpg";
import luxuryNewborn from "./assets/luxury-newborn.jpg";
import familyGarden from "./assets/family-garden.jpg";
import beachPreWedding from "./assets/beach-pre-wedding.jpg";

/**
 * Figma: Klicpic mithu / Home — Trending This Month (1550:2604)
 * Five theme cards with bookings / scarcity badges.
 */
const LOCAL_THEMES = [
  { name: "Royal Birthday", image: royalBirthday, bookings: "🔥 87 Bookings", left: "⚡ 3 Left", rating: "⭐ 4.9", price: "₹8,999" },
  { name: "Boho Maternity", image: bohoMaternity, bookings: "🔥 62 Bookings", left: "⚡ 5 Left", rating: "⭐ 4.8", price: "₹6,499" },
  { name: "Luxury Newborn", image: luxuryNewborn, bookings: "🔥 74 Bookings", left: "⚡ 2 Left", rating: "⭐ 4.9", price: "₹7,999" },
  { name: "Family Garden", image: familyGarden, bookings: "🔥 91 Bookings", left: "⚡ 4 Left", rating: "⭐ 5", price: "₹9,999" },
  { name: "Beach Pre-Wedding", image: beachPreWedding, bookings: "🔥 55 Bookings", left: "⚡ 6 Left", rating: "⭐ 4.8", price: "₹16,999" },
];

/** What this build shipped — the fallback when the API is unreachable. */
const LOCAL_CATALOG = { items: LOCAL_THEMES, filters: [] };

export default function Trending() {
  // The rail is a "what's hot" strip, so take the CRM's most-booked
  // themes and show as many as the frame has room for.
  const { items } = useThemes(LOCAL_CATALOG);
  const THEMES = items.slice(0, LOCAL_THEMES.length);

  return (
    <section className="flex w-full flex-col items-center bg-white px-6 py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            Most Popular
          </p>
          <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-[#1f2937]">
            Trending This Month
          </h2>
          <Link to="/themes" className="mt-4 flex items-center gap-[6px]">
            <span className="text-center text-[14px] leading-[20px] font-medium whitespace-nowrap text-[#f9a825]">
              View All
            </span>
            <ArrowRight className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.333} />
          </Link>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {THEMES.map((theme) => (
            <article
              key={theme.name}
              className="flex flex-col items-start overflow-hidden rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
            >
              <div className="relative h-[279.991px] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#3f4550] to-[#1f2937]">
                {theme.image && (
                  <img
                    src={imageUrl(theme.image, 480)}
                    loading="lazy"
                    alt={theme.name}
                    className="pointer-events-none absolute inset-0 size-full object-cover"
                  />
                )}
                <span className="absolute top-3 left-3 rounded-full bg-[#f9a825] px-[10px] py-[3px] text-[11px] leading-[16.5px] font-bold whitespace-nowrap text-white">
                  {theme.bookings}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-[#fb2c36] px-[10px] py-[3px] text-[11px] leading-[16.5px] font-bold whitespace-nowrap text-white">
                  {theme.left}
                </span>
              </div>

              <div className="flex w-full flex-col items-start p-4">
                <h3 className="text-[14px] leading-[20px] font-semibold whitespace-nowrap text-[#1f2937]">
                  {theme.name}
                </h3>
                <div className="flex w-full items-center justify-between pt-1 pb-3">
                  <span className="text-[12px] leading-4 whitespace-nowrap text-[#6a7282]">
                    {theme.rating}
                  </span>
                  <span className="text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#f9a825]">
                    {theme.price}
                  </span>
                </div>
                <Link
                  to="/book"
                  className="flex h-[35.975px] w-full items-center justify-center rounded-[20px] bg-[#f9a825] text-center text-[14px] leading-[20px] font-semibold text-white transition-colors hover:bg-[#e69a1f]"
                >
                  Book This Theme
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
