import React from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";
import { useOffers } from "../api/useOffers";

/**
 * Chrome for the inner pages.
 * Figma: AnnouncementBar 1550:5013 (Themes/Props/Gowns/Packages) and
 * 1550:8638 (Gallery) + Header 1550:5034 + Footer 1550:4889.
 *
 * The strip used to read "Limited Time: … this month!" on every page. The
 * studio does run a free-reel offer, but the record carries no end date, so
 * the deadline was ours, not theirs. It now says what the live offer says —
 * and with no offer running, there is no strip.
 */
const offerAnnouncement = (offer) => {
  // The CRM writes `worth` with its own leading flourish ("✦ Worth ₹2,000");
  // inline in a sentence it only reads as a stray glyph.
  const worth = String(offer.worth || "").replace(/^[^\w₹]+/, "").trim();
  return {
    emoji: "🎉",
    message: worth ? `${offer.title} — ${worth}` : offer.title,
    cta: "Book Now →",
    activeDot: 0,
  };
};

/** The strip on its own, for pages that lay out their own chrome (Home). */
export function OfferAnnouncement({ announcement = null }) {
  const { offers, live } = useOffers();
  const bar = announcement || (live ? offerAnnouncement(offers[0]) : null);
  return bar ? <AnnouncementBar {...bar} /> : null;
}

export default function SiteLayout({ active, announcement = null, children }) {
  return (
    <div id="top" className="min-h-screen w-full bg-white">
      <OfferAnnouncement announcement={announcement} />
      <Header variant="solid" active={active} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
