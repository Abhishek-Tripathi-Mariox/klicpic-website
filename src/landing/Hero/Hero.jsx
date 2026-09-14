import React from "react";
import { Link } from "react-router-dom";
import FitImage from "../../components/FitImage";
import heroFamilyShoot from "./assets/hero-family-shoot.jpg";

/**
 * Figma: Klicpic mithu / Home — Hero (1550:2026)
 * Full-bleed family-shoot photo, dark scrim, centred headline stack.
 */
export default function Hero() {
  return (
    <section className="relative min-h-[680px] w-full bg-[#101828] md:min-h-[852.27px]">
      {/* The whole photo, never cropped; its blurred copy fills the rest, so
          on a tall phone screen the band of photo sits in a wash of itself. */}
      <FitImage
        src={heroFamilyShoot}
        alt="Family photoshoot at sunset"
        tone="dark"
        loading="eager"
        className="absolute! inset-0 size-full"
      />

      {/* scrim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Top padding clears the overlaid header; bottom clears the dots. */}
      <div className="relative flex min-h-[680px] w-full flex-col items-center justify-center px-4 pt-28 pb-20 sm:px-6 md:min-h-[852.27px]">
        {/* category pill */}
        <div className="flex flex-col items-start pb-5">
          <div className="flex shrink-0 items-center gap-2 rounded-full border-[0.701px] border-solid border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.1)] px-4 py-[6px]">
            <span className="size-[5.99px] shrink-0 rounded-full bg-[#f9a825] opacity-80" />
            <span className="text-center text-[14px] leading-[20px] font-medium whitespace-nowrap text-[rgba(255,255,255,0.85)]">
              Family Shoot
            </span>
          </div>
        </div>

        <h1 className="max-w-[1060.858px] pb-5 text-center text-[32px] leading-[40px] font-bold text-balance text-white sm:text-[40px] sm:leading-[48px] md:text-[48px] md:leading-[56px] xl:text-[56px] xl:leading-[64.4px] xl:whitespace-nowrap">
          Capture Moments. Create Memories.
          <br />
          Cherish Forever.
        </h1>

        <p className="w-[576px] max-w-full pb-8 text-center text-[16px] leading-[26px] text-[rgba(255,255,255,0.75)] sm:pb-10 sm:text-[20px] sm:leading-[32.5px]">
          Premium Photography Experiences Crafted Around Your Story
        </p>

        <div className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          <Link
            to="/book"
            className="flex items-center justify-center rounded-full bg-[#f9a825] px-8 py-4 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#e69a1f]"
          >
            <span className="text-center text-[16px] leading-6 font-semibold whitespace-nowrap text-white">
              Start My Journey
            </span>
          </Link>
          <Link
            to="/gallery"
            className="flex items-center justify-center rounded-full border-[0.701px] border-solid border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.1)] px-8 py-4 transition-colors hover:bg-[rgba(255,255,255,0.2)]"
          >
            <span className="text-center text-[16px] leading-6 font-semibold whitespace-nowrap text-white">
              Explore Portfolio
            </span>
          </Link>
        </div>
      </div>

      {/* slide indicators */}
      <div className="absolute bottom-[32px] left-1/2 flex -translate-x-1/2 items-start gap-2">
        <span className="size-[6px] rounded-full bg-[rgba(255,255,255,0.4)]" />
        <span className="size-[6px] rounded-full bg-[rgba(255,255,255,0.4)]" />
        <span className="h-[6px] w-[28px] rounded-full bg-[#f9a825]" />
        <span className="size-[6px] rounded-full bg-[rgba(255,255,255,0.4)]" />
        <span className="size-[6px] rounded-full bg-[rgba(255,255,255,0.4)]" />
      </div>
    </section>
  );
}
