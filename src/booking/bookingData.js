/**
 * Figma: booking wizard data.
 * Step 1 Type (1550:11454 / 11817), Step 2 Vibe (1550:12236),
 * Step 3 Details (1550:13236 date, 1550:14898 / 15939 themes).
 */
import maternity from "./assets/types/maternity.jpg";
import baby from "./assets/types/baby.jpg";
import birthday from "./assets/types/birthday.jpg";
import family from "./assets/types/family.jpg";
import wedding from "./assets/types/wedding.jpg";
import couple from "./assets/types/couple.jpg";

export const SHOOT_TYPES = [
  { name: "Maternity", emoji: "🤰", tagline: "Celebrate your glow", price: "From ₹4,999", image: maternity },
  { name: "Baby", emoji: "👶", tagline: "Precious early milestones", price: "From ₹3,999", image: baby },
  { name: "Birthday", emoji: "🎂", tagline: "Royally styled celebrations", price: "From ₹6,999", image: birthday },
  { name: "Family", emoji: "👨‍👩‍👧‍👦", tagline: "Timeless togetherness", price: "From ₹7,999", image: family },
  { name: "Wedding", emoji: "💍", tagline: "Cinematic love stories", price: "From ₹24,999", image: wedding },
  { name: "Couple", emoji: "💑", tagline: "Celebrate your chemistry", price: "From ₹8,999", image: couple },
];

import boho from "./assets/vibes/boho.jpg";
import luxury from "./assets/vibes/luxury.jpg";
import minimal from "./assets/vibes/minimal.jpg";
import outdoor from "./assets/vibes/outdoor.jpg";
import royal from "./assets/vibes/royal.jpg";

/** Step 2 Vibe (Figma 1550:12247). */
export const VIBES = [
  { name: "Boho", tagline: "Earthy, dreamy, natural", love: "92% Love It", image: boho },
  { name: "Luxury", tagline: "Opulent, dramatic, editorial", love: "85% Love It", image: luxury },
  { name: "Minimal", tagline: "Clean, soft, timeless", love: "78% Love It", image: minimal },
  { name: "Outdoor", tagline: "Natural light, scenic beauty", love: "88% Love It", image: outdoor },
  { name: "Royal", tagline: "Regal, grand, palatial", love: "74% Love It", image: royal },
];

/** Offer applied once a shoot type is picked (Figma 1550:11817 / 12236). */
export const REEL_COUPON = {
  title: "2× Edited Photos",
  subtitle: "Double your final edited photo count",
  code: "WKND2X",
};

/** Time slots on the date sub-step (Figma 1550:13236). */
export const TIME_SLOTS = [
  { time: "9:00 AM", period: "Morning" },
  { time: "11:00 AM", period: "Morning" },
  { time: "1:00 PM", period: "Afternoon" },
  { time: "3:00 PM", period: "Afternoon" },
  { time: "5:00 PM", period: "Evening" },
  { time: "7:00 PM", period: "Evening" },
];

/** Details sub-stepper (Figma 1550:14898). */
export const DETAIL_SUBSTEPS = ["Theme", "Props", "Gowns", "Location"];
