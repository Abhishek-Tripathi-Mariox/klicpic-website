import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../../components/SiteLayout";
import PolicyHero from "../../components/PolicyHero";

/**
 * NOTE: there is no Figma frame for /blog — the More menu (1616:18859) and the
 * footer both link to it, so this page exists to stop those links dead-ending.
 * Replace it when a Blog design lands.
 */
export default function Blog() {
  return (
    <SiteLayout>
      <PolicyHero
        variant="legal"
        badge="Blog"
        title="Stories from the studio"
        meta="Shoot guides, styling tips and behind-the-scenes — coming soon"
      />

      <section className="flex w-full flex-col items-center bg-white px-6 py-20">
        <div className="flex w-full max-w-[560px] flex-col items-center text-center">
          <span className="text-[40px] leading-none">✍️</span>
          <h2 className="pt-5 text-[24px] leading-8 font-bold text-[#1f2937]">
            We're writing our first posts
          </h2>
          <p className="pt-3 text-[14px] leading-[22px] text-[#6a7282]">
            In the meantime, browse our themes for inspiration or see real
            shoots in the studio gallery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-7">
            <Link
              to="/themes"
              className="rounded-2xl bg-[#f9a825] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
            >
              Browse Themes
            </Link>
            <Link
              to="/gallery"
              className="rounded-2xl border-[0.57px] border-solid border-[#e5e7eb] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:border-[#f9a825]"
            >
              Studio Gallery
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
