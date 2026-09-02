import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import freeInstagramReel from "./assets/free-instagram-reel.jpg";
import freePremiumFrame from "./assets/free-premium-frame.jpg";
import flat3000Off from "./assets/flat-3000-off.jpg";
import weekendSpecial from "./assets/weekend-special.jpg";

/**
 * Figma: Klicpic mithu / Home — Exclusive Offers (1550:3078)
 * Four offer cards on the dark band with a countdown to the offer deadline.
 */
const OFFERS = [
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
const INITIAL_SECONDS = 2 * 3600 + 13 * 60 + 44;

const pad = (value) => String(value).padStart(2, "0");

function useCountdown(initialSeconds) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(
      () => setRemaining((current) => (current > 0 ? current - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  return `${pad(Math.floor(remaining / 3600))}:${pad(
    Math.floor((remaining % 3600) / 60)
  )}:${pad(remaining % 60)}`;
}

export default function Offers() {
  const countdown = useCountdown(INITIAL_SECONDS);

  return (
    <section className="flex w-full flex-col items-center bg-[#1f2937] px-6 py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            Limited Time
          </p>
          <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-white">
            Exclusive Offers
          </h2>
          <div className="mt-6 flex items-center gap-3 rounded-full border-[0.701px] border-solid border-[rgba(249,168,37,0.25)] bg-[rgba(249,168,37,0.12)] px-6 py-3">
            <Clock className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.333} />
            <span className="text-center text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.6)]">
              Offer ends in:
            </span>
            <span className="font-mono text-center text-[20px] leading-7 font-bold whitespace-nowrap text-[#f9a825]">
              {countdown}
            </span>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 pt-12 sm:grid-cols-2 xl:grid-cols-4">
          {OFFERS.map((offer) => (
            <article
              key={offer.title}
              className="relative flex flex-col items-start rounded-2xl border-[0.701px] border-solid border-[rgba(249,168,37,0.18)] bg-[rgba(255,255,255,0.04)] p-6"
            >
              <span className="absolute top-4 right-4 rounded-full bg-[#f9a825] px-[10px] py-1 text-[10px] leading-[15px] font-bold whitespace-nowrap text-white">
                {offer.ribbon}
              </span>

              <div className="h-[143.998px] w-full overflow-hidden rounded-[20px]">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="pointer-events-none size-full object-cover"
                />
              </div>

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
          to="/book"
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
