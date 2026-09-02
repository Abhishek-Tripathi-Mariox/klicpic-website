import React from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Chrome for the inner pages.
 * Figma: AnnouncementBar 1550:5013 (Themes/Props/Gowns/Packages) and
 * 1550:8638 (Gallery) + Header 1550:5034 + Footer 1550:4889.
 */
const DEFAULT_ANNOUNCEMENT = {
  emoji: "🎉",
  message: "Limited Time: Free Instagram Reel with every booking this month!",
  cta: "Book Now →",
  activeDot: 0,
};

export default function SiteLayout({
  active,
  announcement = DEFAULT_ANNOUNCEMENT,
  children,
}) {
  return (
    <div id="top" className="min-h-screen w-full bg-white">
      <AnnouncementBar {...announcement} />
      <Header variant="solid" active={active} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
