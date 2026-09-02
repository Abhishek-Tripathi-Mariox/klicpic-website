/**
 * Figma: Klicpic mithu / Offers (1550:9145).
 * Copy, badge colours and worth-pill tints are taken from the frame.
 */
import freeInstagramReel from "./assets/free-instagram-reel.jpg";
import freePremiumFrame from "./assets/free-premium-frame.jpg";
import flat3000Off from "./assets/flat-3000-off.jpg";
import weekendSpecial from "./assets/weekend-special.jpg";

export const OFFERS = [
  {
    title: "Free Instagram Reel",
    image: freeInstagramReel,
    ribbon: "Limited",
    ribbonBg: "#7c3aed",
    description:
      "Get a professionally edited 60-second Instagram reel absolutely FREE with your booking. Includes trending music, colour grading, and branded outro.",
    worth: "✦ Worth ₹2,000",
    worthBg: "rgba(124,58,237,0.14)",
    worthColor: "#a78bfa",
  },
  {
    title: "Free Premium Frame",
    image: freePremiumFrame,
    ribbon: "Hot",
    ribbonBg: "#dc2626",
    description:
      "Receive a stunning 10×12 inch premium frame with your favourite shot, ready to hang and delivered to your doorstep — completely FREE.",
    worth: "✦ Worth ₹1,200",
    worthBg: "rgba(5,150,105,0.14)",
    worthColor: "#34d399",
  },
  {
    title: "₹3,000 OFF",
    image: flat3000Off,
    ribbon: "Weekend",
    ribbonBg: "#d97706",
    description:
      "Flat ₹3,000 off on any package valued above ₹15,000. Perfect for Pre-Wedding, Wedding, and Premium Family shoots booked this weekend.",
    worth: "✦ ₹3,000 Savings",
    worthBg: "rgba(220,38,38,0.14)",
    worthColor: "#fca5a5",
  },
  {
    title: "Weekend Special",
    image: weekendSpecial,
    ribbon: "New",
    ribbonBg: "#059669",
    description:
      "Book any weekend slot and receive double the edited photos — 60 instead of 30, or 120 instead of 60. Same price, twice the memories.",
    worth: "✦ 2× Photos",
    worthBg: "rgba(217,119,6,0.14)",
    worthColor: "#fcd34d",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick an Offer",
    text: "Browse and select the offer that fits your shoot best.",
  },
  {
    step: "02",
    title: "Claim Your Code",
    text: "Enter your details and generate a unique discount code instantly.",
  },
  {
    step: "03",
    title: "Apply at Booking",
    text: "Enter the code during booking checkout to redeem your benefit.",
  },
];

/** Design shows 13:49:02 remaining; it ticks down from there. */
export const COUNTDOWN_SECONDS = 13 * 3600 + 49 * 60 + 2;
