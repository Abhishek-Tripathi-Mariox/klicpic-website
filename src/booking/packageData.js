/**
 * Figma: booking wizard — Step 5 Package.
 * Choose a Plan 1615:7929 · Build Your Own 1615:8477 / 8828.
 */
export const PLANS = [
  {
    name: "Essential",
    price: "₹7,999",
    delivery: "Delivery 10 Business Days",
    features: [
      { label: "30 Edited Photos", included: true },
      { label: "1 Theme / Location", included: true },
      { label: "2 Hour Session", included: true },
      { label: "Online Gallery", included: true },
      { label: "Album", included: false },
      { label: "Frames", included: false },
      { label: "Reel", included: false },
      { label: "Video", included: false },
      { label: "Canvas", included: false },
      { label: "USB", included: false },
    ],
  },
  {
    name: "Signature",
    price: "₹14,999",
    delivery: "Delivery 7 Business Days",
    badge: "Most Popular",
    features: [
      { label: "60 Edited Photos", included: true },
      { label: "2 Themes / Locations", included: true },
      { label: "3 Hour Session", included: true },
      { label: "Online Gallery", included: true },
      { label: "Premium Album", included: true },
      { label: "3 Framed Prints", included: true },
      { label: "Instagram Reel", included: true },
      { label: "Cinematic Video", included: false },
      { label: "Canvas Art", included: false },
      { label: "USB", included: false },
    ],
  },
  {
    name: "Premium",
    price: "₹24,999",
    delivery: "Delivery 5 Business Days",
    features: [
      { label: "Unlimited Photos", included: true },
      { label: "3 Themes", included: true },
      { label: "5 Hour Session", included: true },
      { label: "Gallery", included: true },
      { label: "Hardbound Album", included: true },
      { label: "5 Framed Prints", included: true },
      { label: "Reel", included: true },
      { label: "5min Video", included: true },
      { label: "Canvas Art", included: true },
      { label: "Branded USB", included: true },
    ],
  },
];

export const BASE_SESSION = { label: "Base Session", price: 7999 };

/** Bundle savings kick in at 15% once add-ons are chosen (Figma 1615:9027). */
export const BUNDLE_SAVINGS_RATE = 0.15;

export const CUSTOM_ADDONS = [
  { name: "30 Edited Photos (High-Res)", price: 0, included: true },
  { name: "Premium Photo Album (30 pages)", price: 3500 },
  { name: "3 Framed Prints (10×12 inch)", price: 2500 },
  { name: "Canvas Wall Art (24×36 inch)", price: 4000 },
  { name: "Instagram Reel (60 sec)", price: 2000 },
  { name: "Cinematic Video (3 min)", price: 6000 },
  { name: "Branded USB with RAW Files", price: 1500 },
];
