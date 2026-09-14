import React from "react";
import { imageUrl } from "../../api/imageUrl";
import { useOffers, useOfferCountdown } from "../../api/useOffers";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import FitImage from "../../components/FitImage";
import { HOW_IT_WORKS as LOCAL_HOW_IT_WORKS } from "./offersData";
import { useContent } from "../../api/useContent";

/**
 * Figma: Klicpic mithu / Offers (1550:9145)
 * Hero with countdown, four offer cards, "How It Works", and the ink CTA band.
 */
const SCRIM = "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)";
export default function Offers() {
  // Live copy from the backend, falling back to what this build shipped.
  const { content } = useContent("offers", { HOW_IT_WORKS: LOCAL_HOW_IT_WORKS });
  const { HOW_IT_WORKS } = content;
  // Offers are records now, not page copy — and only real ones are shown.
  const { offers: OFFERS, endsAt } = useOffers();

  // Counts to the soonest expiry among the live offers; null when none is set.
  const countdown = useOfferCountdown(endsAt);

  return (
    <SiteLayout active="Offers">
      {/* hero */}
      <section className="flex w-full flex-col items-center bg-white px-6 pt-24 pb-16">
        <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
          Limited Time
        </p>
        <h1 className="pt-1 text-center text-[40px] leading-[44px] font-bold text-[#0f1117] md:text-[60px] md:leading-[60px]">
          Exclusive Offers
        </h1>
        <p className="w-[576px] max-w-full pt-4 pb-8 text-center text-[18px] leading-7 text-[rgba(15,17,23,0.5)]">
          Don't miss out — grab these deals before they expire. Real value, zero
          compromise on quality.
        </p>
        {countdown && (
          <div className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-3xl border-[0.701px] border-solid border-[rgba(249,168,37,0.3)] bg-[rgba(249,168,37,0.12)] px-5 py-3 sm:rounded-full sm:px-6">
            <Clock className="size-[19.997px] shrink-0 text-[#f9a825]" strokeWidth={1.666} />
            <span className="text-center text-[14px] leading-[20px] whitespace-nowrap text-[rgba(15,17,23,0.6)]">
              Offers end in:
            </span>
            <span className="font-mono text-center text-[24px] leading-8 font-bold whitespace-nowrap text-[#f9a825]">
              {countdown}
            </span>
          </div>
        )}
      </section>

      {/* offer cards */}
      <section className="flex w-full flex-col items-center bg-white px-6 pb-20">
        <div className="w-full max-w-[1200px]">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {OFFERS.map((offer) => (
              <article
                key={offer.title}
                className="flex flex-col items-start overflow-hidden rounded-3xl border-[0.701px] border-solid border-[rgba(249,168,37,0.18)] bg-[rgba(15,17,23,0.04)]"
              >
                {/* Shown whole over a blurred copy of itself, never cropped. */}
                <FitImage
                  src={offer.image ? imageUrl(offer.image, 640) : ""}
                  alt={offer.title}
                  loading="eager"
                  className="h-[176px] w-full shrink-0"
                >
                  <div className="absolute inset-0" style={{ background: SCRIM }} />
                  {offer.ribbon && (
                    <span
                      className="absolute top-3 right-3 rounded-full px-[10px] py-1 text-[10px] leading-[15px] font-bold whitespace-nowrap text-[#0f1117]"
                      // CRM offers carry no ribbon colour; without one the dark
                      // label sat straight on the photo and vanished into it.
                      style={{ backgroundColor: offer.ribbonBg || "#f9a825" }}
                    >
                      {offer.ribbon}
                    </span>
                  )}
                </FitImage>

                <div className="flex w-full flex-1 flex-col items-start p-5">
                  <h3 className="text-[18px] leading-7 font-bold text-[#0f1117]">
                    {offer.title}
                  </h3>
                  <p className="pt-1 pb-3 text-[14px] leading-[20px] text-[rgba(15,17,23,0.45)]">
                    {offer.description}
                  </p>
                  {offer.worth && (
                    <span
                      className="rounded-full px-3 py-1 text-[12px] leading-4 font-bold whitespace-nowrap"
                      style={{ backgroundColor: offer.worthBg, color: offer.worthColor }}
                    >
                      {offer.worth}
                    </span>
                  )}

                  <div className="h-4 w-full shrink-0" />
                  <Link
          to={`/book?offer=${encodeURIComponent(offer.code || offer.id || "")}`}
                    className="mt-auto flex h-[41.385px] w-full cursor-pointer items-center justify-center rounded-[20px] border-[0.701px] border-solid border-[rgba(249,168,37,0.2)] bg-[rgba(249,168,37,0.12)] text-center text-[14px] leading-[20px] font-bold text-[#f9a825] transition-colors hover:bg-[rgba(249,168,37,0.22)]"
                  >
                    Claim Offer →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {OFFERS.length === 0 && (
            <p className="w-full py-10 text-center text-[15px] leading-6 text-[rgba(15,17,23,0.5)]">
              No offers are running right now. New ones are announced here — and on WhatsApp when you book.
            </p>
          )}

          {OFFERS.length > 0 && (
            <p className="w-full pt-10 text-center text-[14px] leading-[20px] text-[rgba(15,17,23,0.5)]">
              Claim an offer and our team applies it to your booking
            </p>
          )}
        </div>
      </section>

      {/* how it works */}
      <section className="flex w-full flex-col items-center border-t-[0.701px] border-solid border-[rgba(249,168,37,0.12)] bg-[rgba(249,168,37,0.05)] px-6 py-20">
        <div className="flex w-full max-w-[900px] flex-col items-center">
          <h2 className="text-center text-[30px] leading-9 font-bold text-[#0f1117]">
            How It Works
          </h2>
          <div className="grid w-full grid-cols-1 gap-8 pt-12 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <span className="flex size-[47.999px] items-center justify-center rounded-full bg-[#f9a825] text-center text-[14px] leading-[20px] font-bold text-[#0f1117]">
                  {item.step}
                </span>
                <h3 className="pt-4 pb-2 text-center text-[18px] leading-7 font-bold text-[#0f1117]">
                  {item.title}
                </h3>
                <p className="text-center text-[14px] leading-[20px] text-[rgba(15,17,23,0.5)]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* closing CTA */}
      <section className="flex w-full flex-col items-center bg-[#0f1117] px-6 py-20">
        <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
          Ready to Create Memories?
        </p>
        <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-white">
          Book Your Session Today
        </h2>
        <p className="w-[448px] max-w-full pt-4 pb-8 text-center text-[16px] leading-6 text-[rgba(255,255,255,0.5)]">
          Combine any offer with your dream package for an unbeatable experience.
        </p>
        <Link
          to="/book"
          className="flex h-[60px] items-center gap-2 rounded-2xl bg-[#f9a825] px-8 text-center text-[18px] leading-7 font-bold text-[#0f1117] transition-colors hover:bg-[#e69a1f]"
        >
          Start Booking
          <ArrowRight className="size-[19.997px] shrink-0" strokeWidth={1.666} />
        </Link>
      </section>
    </SiteLayout>
  );
}
