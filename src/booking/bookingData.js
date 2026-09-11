/**
 * Figma: booking wizard data.
 * Step 1 Type (1550:11454 / 11817), Step 2 Vibe (1550:12236),
 * Step 3 Details (1550:13236 date, 1550:14898 / 15939 themes).
 */
import maternityImage from "./assets/types/maternity.jpg";
import newbornImage from "./assets/types/newborn.jpg";
import toddlerImage from "./assets/types/toddler.jpg";
import birthdayImage from "./assets/types/birthday.jpg";
import familyImage from "./assets/types/family.jpg";
import preWeddingImage from "./assets/types/pre-wedding.jpg";
import productImage from "./assets/types/product.jpg";
import corporateImage from "./assets/types/corporate.jpg";

/**
 * Step 1 Type — the admin's "Type of Photoshoot" list (Add New Lead form), so a
 * website lead carries a value the CRM's filters know. `value` is what the Lead
 * stores; `name` is what the card says. Price comes from the CRM
 * (/website/shoot-types), and so does the photo when the studio has one — a
 * theme cover, or a Media Library photo filed under the type. `image` here is
 * the related picture the card shows until then: Birthday is the studio's own
 * "Cake smash" set; Product and Corporate are Unsplash photos (free licence);
 * the rest are the photoshoot-catalog pictures, re-cropped to keep faces in.
 */
export const SHOOT_TYPES = [
  { value: "Maternity Photoshoot", name: "Maternity", emoji: "🤰", tagline: "Celebrate your glow", image: maternityImage },
  { value: "Newborn Photoshoot", name: "Newborn", emoji: "👶", tagline: "Precious first days", image: newbornImage },
  { value: "Toddler Photoshoot", name: "Toddler", emoji: "🧸", tagline: "Little personalities, big smiles", image: toddlerImage },
  { value: "Birthday Photoshoot", name: "Birthday", emoji: "🎂", tagline: "Royally styled celebrations", image: birthdayImage },
  { value: "Family Photoshoot", name: "Family", emoji: "👨‍👩‍👧‍👦", tagline: "Timeless togetherness", image: familyImage },
  { value: "Pre-Wedding Photoshoot", name: "Pre-Wedding", emoji: "💑", tagline: "Your story, before the big day", image: preWeddingImage },
  { value: "Product Photoshoot", name: "Product", emoji: "📦", tagline: "Clean shots that sell", image: productImage },
  { value: "Corporate Photoshoot", name: "Corporate", emoji: "💼", tagline: "Headshots and team portraits", image: corporateImage },
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
/**
 * The Details sub-steps.
 *
 * The frames had a fourth, "Gowns", between Props and Location. The CRM files
 * gowns as props under the "gown" category, so the Props step already lists
 * every one of them — the extra step only asked the same question twice.
 */
export const DETAIL_SUBSTEPS = ["Theme", "Props", "Location"];
