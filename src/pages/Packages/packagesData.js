/**
 * Figma: Packages (1550:7831) — three tiers plus the "Build Your Own" band.
 * `features` lists all eight rows in order; `included` marks the green check
 * rows, the rest render as a muted cross exactly as in the frame.
 */
import essential from "./assets/essential.jpg";
import signature from "./assets/signature.jpg";
import premium from "./assets/premium.jpg";

export const PACKAGE_FILTERS = [
  { label: "All Packages", emoji: "📦" },
  { label: "Family", emoji: "👨‍👩‍👧" },
  { label: "Maternity", emoji: "🤱" },
  { label: "Wedding", emoji: "💍" },
  { label: "Pre-Wedding", emoji: "💑" },
  { label: "Couple", emoji: "❤️" },
  { label: "Birthday", emoji: "🎂" },
  { label: "Newborn", emoji: "👶" },
];

export const PACKAGES = [
  {
    name: "Essential",
    tagline: "Perfect for intimate shoots",
    price: "₹7,999",
    delivery: "Delivery: 10 Business Days",
    image: essential,
    highlighted: false,
    ribbon: null,
    cta: "Choose Essential",
    ctaClass: "bg-[#6b7280] hover:bg-[#5b6270]",
    features: [
      { label: "30 Edited Photos (High-Res)", included: true },
      { label: "1 Location / Theme", included: true },
      { label: "2 Hour Session", included: true },
      { label: "Online Gallery", included: true },
      { label: "Premium Photo Album", included: false },
      { label: "Framed Prints", included: false },
      { label: "Instagram Reel", included: false },
      { label: "Cinematic Video", included: false },
    ],
  },
  {
    name: "Signature",
    tagline: "Our most popular choice",
    price: "₹14,999",
    delivery: "Delivery: 7 Business Days",
    image: signature,
    highlighted: true,
    ribbon: "Most Popular",
    cta: "Choose Signature",
    ctaClass: "bg-[#f9a825] hover:bg-[#e69a1f]",
    features: [
      { label: "60 Edited Photos (High-Res)", included: true },
      { label: "2 Locations / Themes", included: true },
      { label: "3 Hour Session", included: true },
      { label: "Online Gallery", included: true },
      { label: "Premium Photo Album", included: true },
      { label: "3 Framed Prints (10×12)", included: true },
      { label: "Instagram Reel (60 sec)", included: true },
      { label: "Cinematic Video", included: false },
    ],
  },
  {
    name: "Premium",
    tagline: "The complete luxury experience",
    price: "₹24,999",
    delivery: "Delivery: 5 Business Days",
    image: premium,
    highlighted: false,
    ribbon: null,
    cta: "Choose Premium",
    ctaClass: "bg-[#1f2937] hover:bg-[#111827]",
    features: [
      { label: "Unlimited Edited Photos", included: true },
      { label: "3 Locations / Themes", included: true },
      { label: "5 Hour Session", included: true },
      { label: "Online Gallery", included: true },
      { label: "Luxury Hardbound Album", included: true },
      { label: "5 Framed Prints (12×16)", included: true },
      { label: "Instagram Reel (60 sec)", included: true },
      { label: "Cinematic Video (5 min)", included: true },
    ],
  },
];
