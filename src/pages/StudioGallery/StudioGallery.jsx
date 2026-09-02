import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../../components/SiteLayout";
import priyaArjun from "../../landing/Gallery/assets/priya-arjun.jpg";
import snehaMehta from "../../landing/Gallery/assets/sneha-mehta.jpg";
import sharmaFamily from "../../landing/Gallery/assets/sharma-family.jpg";
import babyAnika from "../../landing/Gallery/assets/baby-anika.jpg";
import kavithaRajan from "../../landing/Gallery/assets/kavitha-rajan.jpg";
import divyaNair from "../../landing/Gallery/assets/divya-nair.jpg";
import kapoorFamily from "../../landing/Gallery/assets/kapoor-family.jpg";
import babyKrish from "../../landing/Gallery/assets/baby-krish.jpg";
import meeraVikram from "../../landing/Gallery/assets/meera-vikram.jpg";
import littleSia from "../../landing/Gallery/assets/little-sia.jpg";
import rahulPooja from "../../landing/Gallery/assets/rahul-pooja.jpg";
import ananyaDev from "../../landing/Gallery/assets/ananya-dev.jpg";

/**
 * Figma: Studio Gallery (1550:8378).
 * Same twelve shoots and column heights as the home Gallery section
 * (1550:2576), so the photography is shared with that section's assets.
 *
 * NOTE: the frame's pills carry counts totalling 20 while it lays out 12 photos,
 * and tags none of them with a category. So both the counts and the pill list
 * are derived from the photos here, and each `category` below was read off the
 * photograph itself. Nothing in the set is a non-wedding couple shoot, so the
 * frame's "Couple" pill does not render.
 */
/** The frame's pill order. FILTERS below drops any category with no photos. */
const FILTER_ORDER = ["Wedding", "Family", "Maternity", "Newborn", "Couple"];

const COLUMNS = [
  {
    offsetTop: 16,
    items: [
      { name: "Priya & Arjun", image: priyaArjun, height: 420, category: "Wedding" },
      { name: "Sneha Mehta", image: snehaMehta, height: 462.34, category: "Maternity" },
      { name: "The Sharma Family", image: sharmaFamily, height: 403.488, category: "Family" },
    ],
  },
  {
    offsetTop: 0,
    items: [
      { name: "Baby Anika", image: babyAnika, height: 437.119, category: "Newborn" },
      { name: "Kavitha & Rajan", image: kavithaRajan, height: 504.371, category: "Wedding" },
      { name: "Divya Nair", image: divyaNair, height: 386.678, category: "Maternity" },
    ],
  },
  {
    offsetTop: 0,
    items: [
      { name: "The Kapoor Family", image: kapoorFamily, height: 453.929, category: "Family" },
      { name: "Baby Krish", image: babyKrish, height: 420.309, category: "Newborn" },
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

const ANNOUNCEMENT = {
  emoji: "🔥",
  message: "Only 7 weekend slots left for July — don't miss out!",
  cta: "Book →",
  activeDot: 0,
};

/** Every photo, flattened row-major so a filtered view can re-flow freely. */
const PHOTOS = COLUMNS[0].items.flatMap((_, row) =>
  COLUMNS.map((column) => column.items[row]).filter(Boolean)
);

const COUNTS = PHOTOS.reduce(
  (acc, photo) => ({ ...acc, [photo.category]: (acc[photo.category] ?? 0) + 1 }),
  { All: PHOTOS.length }
);

// Counts and pills both come from the photos, so a filter can never promise
// more than exists — or show up at all with nothing behind it.
const FILTERS = ["All", ...FILTER_ORDER.filter((label) => COUNTS[label])];

/**
 * The frame gives every photo its own height (386px–504px) plus a 16px offset on
 * the first column. That stagger reads as noise rather than design here, so every
 * card is levelled to one height — object-cover crops, it never distorts.
 */
const UNIFORM_HEIGHT = 440;

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

export default function StudioGallery() {
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
    <SiteLayout active="Gallery" announcement={ANNOUNCEMENT}>
      <section className="flex w-full flex-col items-center bg-white px-6 pt-36 pb-16">
        <div className="flex w-full max-w-[1440px] flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            Our Work
          </p>
          <h1 className="pt-1 text-center text-[40px] leading-[44px] font-bold text-[#1f2937] md:text-[60px] md:leading-[60px]">
            Studio Gallery
          </h1>
          <p className="w-[576px] max-w-full pt-4 text-center text-[18px] leading-7 text-[rgba(31,41,55,0.5)]">
            Every frame tells a story. Browse our curated collection of real
            shoots from Klicpic Studio.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
            {FILTERS.map((label) => {
              const isActive = label === active;
              const count = COUNTS[label] ?? 0;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActive(label)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 transition-colors ${
                    isActive
                      ? "bg-[#f9a825]"
                      : "border-[0.701px] border-solid border-[rgba(31,41,55,0.1)] hover:border-[#f9a825]"
                  }`}
                >
                  <span
                    className={`text-center text-[14px] leading-[20px] font-semibold whitespace-nowrap ${
                      isActive ? "text-[#0f1117]" : "text-[rgba(31,41,55,0.6)]"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`text-center text-[12px] leading-4 font-semibold opacity-60 ${
                      isActive ? "text-[#0f1117]" : "text-[rgba(31,41,55,0.6)]"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center bg-white px-6 pb-16">
        <div className="flex w-full max-w-[1440px] items-start justify-center gap-[17px]">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex w-[336px] max-w-full flex-col items-start gap-4"
              style={{ marginTop: `${column.offsetTop}px` }}
            >
              {column.items.map((item) => (
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
      </section>

      <section className="flex w-full flex-col items-center border-t-[0.701px] border-solid border-[rgba(249,168,37,0.15)] bg-[rgba(249,168,37,0.08)] px-6 py-20">
        <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
          Love What You See?
        </p>
        <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-[#403f3f]">
          Book Your Own Session
        </h2>
        <p className="w-[448px] max-w-full pt-4 pb-8 text-center text-[16px] leading-6 text-[rgba(64,63,63,0.5)]">
          Join thousands of families who have created timeless memories with
          Klicpic.
        </p>
        <Link
          to="/book"
          className="flex h-[60px] w-[209.355px] max-w-full items-center justify-center rounded-2xl bg-[#f9a825] text-center text-[18px] leading-7 font-bold text-[#0f1117] transition-colors hover:bg-[#e69a1f]"
        >
          Start Booking →
        </Link>
      </section>
    </SiteLayout>
  );
}
