import React from "react";
import { useOffers, useOfferCountdown } from "../../api/useOffers";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import FitImage from "../../components/FitImage";
import freeInstagramReel from "./assets/free-instagram-reel.jpg";
import freePremiumFrame from "./assets/free-premium-frame.jpg";
import flat3000Off from "./assets/flat-3000-off.jpg";
import weekendSpecial from "./assets/weekend-special.jpg";

/**
 * Figma: Klicpic mithu / Home — Exclusive Offers (1550:3078)
 * Four offer cards on the dark band with a countdown to the offer deadline.
 */
const LOCAL_OFFERS = [
  {
    title: "Free Instagram Reel",
    image: freeInstagramReel,
    description: "Get a professionally edited 60-second Instagram reel absolut...",
    ribbon: "Limited",
    worth: "✦ Worth ₹2,000",
    worthBg: "rgba(124,58,237,0.14)",
    worthColor: "#a78bfa",
  },
  {
    title: "Free Premium Frame",
    image: freePremiumFrame,
    description: "Receive a stunning 10×12 inch premium frame with your favour...",
    ribbon: "Hot",
    worth: "✦ Worth ₹1,200",
    worthBg: "rgba(5,150,105,0.14)",
    worthColor: "#34d399",
  },
  {
    title: "₹3,000 OFF",
    image: flat3000Off,
    description: "Flat ₹3,000 off on any package valued above ₹15,000. Perfect...",
    ribbon: "Weekend",
    worth: "✦ ₹3,000 Savings",
    worthBg: "rgba(220,38,38,0.14)",
    worthColor: "#fca5a5",
  },
  {
    title: "Weekend Special",
    image: weekendSpecial,
    description: "Book any weekend slot and receive double the edited photos —...",
    ribbon: "New",
    worth: "✦ 2× Photos",
    worthBg: "rgba(217,119,6,0.14)",
    worthColor: "#fcd34d",
  },
];

/** Design shows 02:13:44 remaining; it ticks down from there. */

export default function Offers() {
  // Offer records, live from the CRM.
  const { offers: OFFERS, endsAt } = useOffers(LOCAL_OFFERS);

  // Counts to the soonest expiry among the live offers; null when none is set.
  const countdown = useOfferCountdown(endsAt);

  return (
    <section className="flex w-full flex-col items-center bg-[#1f2937] px-4 py-16 sm:px-6 md:py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[26px] leading-8 font-normal whitespace-nowrap text-[#f9a825] sm:text-[30px] sm:leading-9">
            Limited Time
          </p>
          <h2 className="pt-1 text-center text-[28px] leading-[34px] font-bold text-white sm:text-[36px] sm:leading-10">
            Exclusive Offers
          </h2>
          {countdown && (
            <div className="mt-6 flex max-w-full items-center gap-2 rounded-full border-[0.701px] border-solid border-[rgba(249,168,37,0.25)] bg-[rgba(249,168,37,0.12)] px-4 py-3 sm:gap-3 sm:px-6">
              <Clock className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.333} />
              <span className="text-center text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.6)]">
                Offer ends in:
              </span>
              <span className="font-mono text-center text-[20px] leading-7 font-bold whitespace-nowrap text-[#f9a825]">
                {countdown}
              </span>
            </div>
          )}
        </div>

        <div className="grid w-full grid-cols-1 gap-5 pt-8 sm:grid-cols-2 md:pt-12 xl:grid-cols-4">
          {OFFERS.map((offer) => (
            <article
              key={offer.title}
              className="relative flex min-w-0 flex-col items-start rounded-2xl border-[0.701px] border-solid border-[rgba(249,168,37,0.18)] bg-[rgba(255,255,255,0.04)] p-5 sm:p-6"
            >
              <span className="absolute top-4 right-4 z-10 rounded-full bg-[#f9a825] px-[10px] py-1 text-[10px] leading-[15px] font-bold whitespace-nowrap text-white">
                {offer.ribbon}
              </span>

              <FitImage
                src={offer.image}
                alt={offer.title}
                tone="dark"
                className="h-[180px] w-full rounded-[20px] xl:h-[143.998px]"
              />

              <h3 className="pt-4 text-[18px] leading-7 font-bold text-white">
                {offer.title}
              </h3>
              <p className="pt-1 pb-2 text-[14px] leading-[20px] text-[rgba(255,255,255,0.45)]">
                {offer.description}
              </p>

              <span
                className="rounded-full px-3 py-1 text-[12px] leading-4 font-bold whitespace-nowrap"
                style={{ backgroundColor: offer.worthBg, color: offer.worthColor }}
              >
                {offer.worth}
              </span>

              <div className="h-4 w-full shrink-0" />

              <Link
          to={`/book?offer=${encodeURIComponent(offer.code || offer.id || "")}`}
                className="mt-auto flex h-[41.385px] w-full cursor-pointer items-center justify-center rounded-[20px] border-[0.701px] border-solid border-[rgba(249,168,37,0.2)] bg-[rgba(249,168,37,0.12)] text-center text-[14px] leading-[20px] font-bold text-[#f9a825] transition-colors hover:bg-[rgba(249,168,37,0.2)]"
              >
                Claim Offer →
              </Link>
            </article>
          ))}
        </div>

        <p className="w-full pt-8 text-center text-[14px] leading-[20px] text-[rgba(255,255,255,0.3)]">
          Click any offer to view details and generate your code
        </p>
      </div>
    </section>
  );
}
