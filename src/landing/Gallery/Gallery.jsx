import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import priyaArjun from "./assets/priya-arjun.jpg";
import snehaMehta from "./assets/sneha-mehta.jpg";
import sharmaFamily from "./assets/sharma-family.jpg";
import babyAnika from "./assets/baby-anika.jpg";
import kavithaRajan from "./assets/kavitha-rajan.jpg";
import divyaNair from "./assets/divya-nair.jpg";
import kapoorFamily from "./assets/kapoor-family.jpg";
import babyKrish from "./assets/baby-krish.jpg";
import meeraVikram from "./assets/meera-vikram.jpg";
import littleSia from "./assets/little-sia.jpg";
import rahulPooja from "./assets/rahul-pooja.jpg";
import ananyaDev from "./assets/ananya-dev.jpg";

/**
 * Figma: Klicpic mithu / Home — Real Stories, Real Memories (1550:2576)
 * Four masonry columns of 12 shoots. Heights are taken straight from the design.
 *
 * NOTE: the Figma frame ships the filter pills but tags no photo with a category,
 * so each `category` below was read off the photograph itself.
 */
/** The frame's pill order. FILTERS below drops any category with no photos. */
const FILTER_ORDER = ["Wedding", "Maternity", "Family", "Baby"];

const COLUMNS = [
  {
    offsetTop: 16,
    items: [
      { name: "Priya & Arjun", image: priyaArjun, height: 420, category: "Wedding" },
      { name: "Sneha Mehta", image: snehaMehta, height: 462, category: "Maternity" },
      { name: "The Sharma Family", image: sharmaFamily, height: 403.488, category: "Family" },
    ],
  },
  {
    offsetTop: 0,
    items: [
      { name: "Baby Anika", image: babyAnika, height: 437.119, category: "Baby" },
      { name: "Kavitha & Rajan", image: kavithaRajan, height: 504.371, category: "Wedding" },
      { name: "Divya Nair", image: divyaNair, height: 386.678, category: "Maternity" },
    ],
  },
  {
    offsetTop: 0,
    items: [
      { name: "The Kapoor Family", image: kapoorFamily, height: 453.929, category: "Family" },
      { name: "Baby Krish", image: babyKrish, height: 420.309, category: "Baby" },
      { name: "Meera & Vikram", image: meeraVikram, height: 403.488, category: "Wedding" },
    ],
  },
  {
    offsetTop: 0,
    items: [
      { name: "Little Sia", image: littleSia, height: 437.119, category: "Maternity" },
      { name: "Rahul & Pooja", image: rahulPooja, height: 487.55, category: "Wedding" },
      { name: "Ananya & Dev", image: ananyaDev, height: 428.708, category: "Wedding" },
    ],
  },
];

/** Every photo, flattened row-major so a filtered view can re-flow freely. */
const PHOTOS = COLUMNS[0].items.flatMap((_, row) =>
  COLUMNS.map((column) => column.items[row]).filter(Boolean)
);

/**
 * The frame gives every photo its own height (386px–504px) plus a 16px offset on
 * the first column. That stagger reads as noise rather than design here, so every
 * card is levelled to one height — object-cover crops, it never distorts.
 */
const UNIFORM_HEIGHT = 440;

// Pills come from the photos, so a filter never shows up with nothing behind it.
const FILTERS = [
  "All",
  ...FILTER_ORDER.filter((label) =>
    PHOTOS.some((photo) => photo.category === label)
  ),
];

/** Greedy shortest-column packing — keeps a filtered grid gap-free. */
function packColumns(photos, columnCount) {
  const columns = Array.from({ length: columnCount }, () => ({
    offsetTop: 0,
    height: 0,
    items: [],
  }));
  photos.forEach((photo) => {
    const target = columns.reduce(
      (shortest, column) => (column.height < shortest.height ? column : shortest),
      columns[0]
    );
    target.items.push({ ...photo, height: UNIFORM_HEIGHT });
    target.height += UNIFORM_HEIGHT + 16;
  });
  return columns.filter((column) => column.items.length > 0);
}

export default function Gallery() {
  const [active, setActive] = useState("All");

  // Every view re-flows through the packer, so a filter never leaves empty
  // columns behind and the grid stays even however many photos match.
  const columns = useMemo(() => {
    const matching =
      active === "All"
        ? PHOTOS
        : PHOTOS.filter((photo) => photo.category === active);
    return packColumns(matching, Math.min(COLUMNS.length, matching.length) || 1);
  }, [active]);

  return (
    <section className="flex w-full flex-col items-center bg-[#fff7ed] px-6 py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            Real Stories,
          </p>
          <h2 className="pt-1 text-center text-[48px] leading-[48px] font-bold text-[#1f2937]">
            Real Memories
          </h2>
          <p className="pt-3 text-center text-[16px] leading-6 text-[#6a7282]">
            Click any photo to explore · Filter by category
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-3 pt-12">
          {FILTERS.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={
                  isActive
                    ? "cursor-pointer rounded-full bg-[#f9a825] px-[21px] py-[8.4px] text-center text-[14.7px] leading-[21px] font-medium whitespace-nowrap text-white shadow-[0px_1.05px_1.575px_rgba(0,0,0,0.1),0px_1.05px_1.05px_rgba(0,0,0,0.1)]"
                    : "cursor-pointer rounded-full border-[0.701px] border-solid border-[#f3f4f6] bg-white px-[20.701px] py-[8.701px] text-center text-[14px] leading-[20px] font-medium whitespace-nowrap text-[#4a5565] transition-colors hover:border-[#f9a825] hover:text-[#f9a825]"
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="flex w-full items-start justify-center gap-[17px] pt-4">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex w-[336px] max-w-full flex-col items-start gap-4"
              style={{ marginTop: `${column.offsetTop}px` }}
            >
              {column.items
                .map((item) => (
                  <figure
                    key={item.name}
                    className="group w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#f3f4f6]"
                    style={{ height: `${item.height}px` }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="pointer-events-none size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </figure>
                ))}
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center pt-10">
          <Link
            to="/gallery"
            className="flex items-center gap-2 rounded-full border-[1.402px] border-solid border-[#f9a825] px-[33.402px] py-[15.402px] transition-colors hover:bg-[#f9a825]/10"
          >
            <span className="text-center text-[16px] leading-6 font-semibold whitespace-nowrap text-[#f9a825]">
              View Full Portfolio
            </span>
            <ArrowRight className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.333} />
          </Link>
        </div>
      </div>
    </section>
  );
}
