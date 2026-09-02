import React from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../landing/Hero/Hero";
import Categories from "../landing/Categories/Categories";
import Studios from "../landing/Studios/Studios";
import Gallery from "../landing/Gallery/Gallery";
import Trending from "../landing/Trending/Trending";
import WhyChooseUs from "../landing/WhyChooseUs/WhyChooseUs";
import PackageBuilder from "../landing/PackageBuilder/PackageBuilder";
import AvailabilityCalendar from "../landing/AvailabilityCalendar/AvailabilityCalendar";
import Offers from "../landing/Offers/Offers";
import Testimonials from "../landing/Testimonials/Testimonials";
import SaveShoot from "../landing/SaveShoot/SaveShoot";
import FAQ from "../landing/FAQ/FAQ";
import FinalCTA from "../landing/FinalCTA/FinalCTA";

/**
 * Figma: Klicpic mithu — Home (1550:2022).
 * The header overlays the hero here, unlike the inner pages.
 */
export default function Home() {
  return (
    <div id="top" className="min-h-screen w-full bg-white">
      <div className="relative z-20">
        <AnnouncementBar />
        <div className="absolute inset-x-0 top-full z-20">
          <Header variant="overlay" />
        </div>
      </div>

      <main>
        <Hero />
        <Categories />
        <Studios />
        <Gallery />
        <Trending />
        <WhyChooseUs />
        <PackageBuilder />
        <AvailabilityCalendar />
        <div id="offers">
          <Offers />
        </div>
        <Testimonials />
        <SaveShoot />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
