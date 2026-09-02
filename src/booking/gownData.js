/**
 * Figma: booking wizard — Gowns sub-step (1552:17865).
 * Gowns are filtered to the shoot type; the frame shows the Maternity set.
 */
import blushWrap from "./assets/gowns/blush-wrap.jpg";
import sageBohoDrape from "./assets/gowns/sage-boho-drape.jpg";
import creamBohemian from "./assets/gowns/cream-bohemian.jpg";
import dustyRoseDrape from "./assets/gowns/dusty-rose-drape.jpg";
import mauveSilk from "./assets/gowns/mauve-silk.jpg";

export const GOWN_FILTERS = ["All", "Maternity"];

export const GOWNS = [
  { name: "Blush Wrap", meta: "Maternity · S–XXL", image: blushWrap, viewing: "8 viewing", trending: true, slots: "⚡ 2 slots left", slotTone: "amber" },
  { name: "Sage Boho Drape", meta: "Maternity · XS–XXL", image: sageBohoDrape, viewing: "5 viewing", slots: "🔥 Only 1 slot left!", slotTone: "red" },
  { name: "Cream Bohemian", meta: "Maternity · XS–XL", image: creamBohemian, viewing: "6 viewing", slots: "🔥 Only 1 slot left!", slotTone: "red" },
  { name: "Dusty Rose Drape", meta: "Maternity · S–XXL", image: dustyRoseDrape, viewing: "7 viewing", slots: "✓ 3 slots", slotTone: "green" },
  { name: "Mauve Silk", meta: "Maternity · XS–XL", image: mauveSilk, viewing: "4 viewing", slots: "🔥 Only 1 slot left!", slotTone: "red" },
];
