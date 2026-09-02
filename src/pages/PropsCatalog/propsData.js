/**
 * Figma: Props Catalog (1550:6558) — 12 prop cards.
 *
 * NOTE: the frame ships no photo for "Floral Crown Set" and "Fairy Light
 * Canopy" — both render as an empty placeholder — so `image` is null for them.
 * "Wooden Letter Blocks" reuses the same photo as "Wicker Basket Set" in the
 * design, so it points at that asset.
 */
import bohoFloralArch from "./assets/boho-floral-arch.jpg";
import wickerBasketSet from "./assets/wicker-basket-set.jpg";
import goldThroneChair from "./assets/gold-throne-chair.jpg";
import luxuryBalloonArc from "./assets/luxury-balloon-arc.jpg";
import crystalChandelier from "./assets/crystal-chandelier.jpg";
import macrameBackdrop from "./assets/macrame-backdrop.jpg";
import furWrapCollection from "./assets/fur-wrap-collection.jpg";
import neonSignLove from "./assets/neon-sign-love.jpg";
import miniSuitcaseProps from "./assets/mini-suitcase-props.jpg";

export const PROP_FILTERS = [
  "All",
  "Baby Props",
  "Birthday Props",
  "Luxury Props",
  "Maternity Props",
];

export const PROPS = [
  {
    name: "Boho Floral Arch",
    category: "Maternity Props",
    image: bohoFloralArch,
    viewing: "3 viewing",
    status: "Available",
    description: "Handcrafted dried flower arch, warm earthy tones.",
    worksWith: ["Boho Bliss", "Sunlit Meadow"],
  },
  {
    name: "Wicker Basket Set",
    category: "Baby Props",
    image: wickerBasketSet,
    viewing: "4 viewing",
    status: "Available",
    description: "Soft-lined wicker basket in 3 sizes for newborns.",
    worksWith: ["Newborn Classic", "Floral Dream"],
  },
  {
    name: "Gold Throne Chair",
    category: "Birthday Props",
    image: goldThroneChair,
    viewing: "4 viewing",
    status: "Booked Out",
    description: "Ornate gold throne, ideal for birthday royalty shoots.",
    worksWith: ["Princess Pink", "Royal Birthday"],
  },
  {
    name: "Luxury Balloon Arc",
    category: "Birthday Props",
    image: luxuryBalloonArc,
    viewing: "2 viewing",
    status: "Available",
    description: "Custom colour balloon arch, 6ft premium setup.",
    worksWith: ["Princess Pink", "Fun Birthday"],
  },
  {
    name: "Crystal Chandelier",
    category: "Luxury Props",
    image: crystalChandelier,
    viewing: "2 viewing",
    status: "Available",
    description: "Hanging crystal accent for luxury and wedding themes.",
    worksWith: ["Luxury Newborn", "Classic White"],
  },
  {
    name: "Macramé Backdrop",
    category: "Maternity Props",
    image: macrameBackdrop,
    viewing: "3 viewing",
    status: "Available",
    description: "Handwoven macramé wall, 8ft x 6ft coverage.",
    worksWith: ["Royal Boho", "Boho Bliss"],
  },
  {
    name: "Fur Wrap Collection",
    category: "Baby Props",
    image: furWrapCollection,
    viewing: "3 viewing",
    status: "Available",
    description: "Premium faux fur wraps in 8 colours for newborns.",
    worksWith: ["Luxury Newborn", "Winter Cozy"],
  },
  {
    name: "Floral Crown Set",
    category: "Maternity Props",
    image: null,
    viewing: "3 viewing",
    status: "Available",
    description: "Fresh & dried flower crowns in custom colours.",
    worksWith: ["Garden Fresh", "Sunlit Meadow"],
  },
  {
    name: "Neon Sign — Love",
    category: "Luxury Props",
    image: neonSignLove,
    viewing: "3 viewing",
    status: "Booked Out",
    description: "Custom neon sign in warm gold, 36 inch wide.",
    worksWith: ["Studio Minimal", "Couple Edit"],
  },
  {
    name: "Wooden Letter Blocks",
    category: "Baby Props",
    image: wickerBasketSet,
    viewing: "4 viewing",
    status: "Available",
    description: "Handpainted wooden number & letter props.",
    worksWith: ["Baby Garden", "Milestone"],
  },
  {
    name: "Fairy Light Canopy",
    category: "Luxury Props",
    image: null,
    viewing: "2 viewing",
    status: "Available",
    description: "Warm white fairy light canopy, 10ft x 10ft.",
    worksWith: ["Beach Pre-Wedding", "Romance"],
  },
  {
    name: "Mini Suitcase Props",
    category: "Birthday Props",
    image: miniSuitcaseProps,
    viewing: "3 viewing",
    status: "Available",
    description: "Vintage suitcase stack set for travel themed shoots.",
    worksWith: ["Adventure Birthday", "Travel"],
  },
];
