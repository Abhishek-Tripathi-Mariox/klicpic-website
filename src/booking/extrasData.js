/**
 * Figma: booking wizard — Step 4 Extras (1615:5393 / 5956) and the add-on
 * detail modals (Premium Album 1615:6539, Instagram Reel 1615:7254).
 *
 * NOTE: the Cinematic Video and Branded USB cards render as empty image
 * placeholders in the frame itself, so their `image` is null.
 */
import premiumAlbum from "./assets/extras/premium-album.jpg";
import framedPrints from "./assets/extras/framed-prints.jpg";
import canvasWallArt from "./assets/extras/canvas-wall-art.jpg";
import instagramReel from "./assets/extras/instagram-reel.jpg";
import sameDayEdits from "./assets/extras/same-day-edits.jpg";
import albumSample from "./assets/extras/album-sample.jpg";
import reelSample from "./assets/extras/reel-sample.jpg";

/** slot strip tones straight from the frame */
export const SLOT_TONES = {
  amber: "border-[#fcd34d] bg-[#fffbeb] text-[#f59e0b]",
  green: "border-[#86efac] bg-[#f0fdf4] text-[#22c55e]",
  red: "border-[#fca5a5] bg-[#fef2f2] text-[#ef4444]",
};

export const EXTRAS = [
  {
    name: "Premium Album",
    price: 3500,
    priceLabel: "+₹3,500",
    blurb: "30-page hardbound luxury album",
    slots: "⚡ 2 slots — 28 August 2026",
    tone: "amber",
    image: premiumAlbum,
    detail: {
      tagline: "Your story, bound forever",
      points: [
        "30 pages of thick 300gsm lay-flat spreads",
        "UV laminated hardcover with foil title",
        "Fully custom layout designed by our team",
        "Available in 3 sizes: 8×8 · 10×10 · 12×12 inches",
      ],
      sample: albumSample,
      sizes: [
        { size: '8 × 8"', note: "Compact · Fits on a shelf", price: "₹3,500" },
        { size: '10 × 10"', note: "Standard · Coffee table", price: "₹4,200" },
        { size: '12 × 12"', note: "Grand · Display piece", price: "₹5,500" },
      ],
    },
  },
  {
    name: "3 Framed Prints",
    price: 2500,
    priceLabel: "+₹2,500",
    blurb: "10×12 inch ready-to-hang frames",
    slots: "✓ 3 slots in 28 August 2026",
    tone: "green",
    image: framedPrints,
  },
  {
    name: "Canvas Wall Art",
    price: 4000,
    priceLabel: "+₹4,000",
    blurb: "24×36 inch premium canvas print",
    slots: "⚡ 2 slots — 28 August 2026",
    tone: "amber",
    image: canvasWallArt,
  },
  {
    name: "Instagram Reel",
    price: 2000,
    priceLabel: "+₹2,000",
    blurb: "60 sec cinematic reel, edited",
    slots: "✓ 3 slots in 28 August 2026",
    tone: "green",
    image: instagramReel,
    detail: {
      tagline: "Share your story, one reel at a time",
      points: [
        "60-second vertical reel (9:16) optimised for Instagram",
        "Trending audio + colour-graded cinematic look",
        "BTS + posed shots blended together",
        "Delivered within 48 hours of shoot",
      ],
      sample: reelSample,
    },
  },
  {
    name: "Cinematic Video",
    price: 6000,
    priceLabel: "+₹6,000",
    blurb: "3 min highlight video with music",
    slots: "⚡ 2 slots — 28 August 2026",
    tone: "amber",
    image: null,
  },
  {
    name: "Branded USB",
    price: 1500,
    priceLabel: "+₹1,500",
    blurb: "USB box with RAW + edited files",
    slots: "🔥 1 slot left in 28 August 2026!",
    tone: "red",
    ribbon: "1 slot left!",
    image: null,
  },
  {
    name: "Same-Day Edits",
    price: 2500,
    priceLabel: "+₹2,500",
    blurb: "10 quick-edit photos within 24 hrs",
    slots: "⚡ 2 slots — 28 August 2026",
    tone: "amber",
    image: sameDayEdits,
  },
];
