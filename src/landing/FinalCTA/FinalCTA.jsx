import React from "react";
import { Link } from "react-router-dom";
import FitImage from "../../components/FitImage";
import klicpicStudio from "./assets/klicpic-studio.jpg";

/**
 * Figma: Klicpic mithu / Home — Your Perfect Photoshoot Starts Here (1550:3302)
 * Full-bleed studio photo under an ink→gold diagonal wash.
 */
export default function FinalCTA() {
  return (
    <section className="relative min-h-[560px] w-full bg-[#101828] md:min-h-[737.95px]">
      {/* The whole photo, never cropped; its blurred copy fills the rest. */}
      <FitImage
        src={klicpicStudio}
        alt="Couple at a Klicpic studio"
        tone="dark"
        className="absolute! inset-0 size-full"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(152.88deg, rgba(31,41,55,0.93) 0%, rgba(72,65,52,0.86) 25%, rgba(121,93,48,0.79) 50%, rgba(179,127,43,0.72) 75%, rgba(249,168,37,0.65) 100%)",
        }}
      />

      <div className="relative flex min-h-[560px] w-full flex-col items-center justify-center px-4 py-20 sm:px-6 md:min-h-[737.95px] md:py-36">
        <div className="flex w-full max-w-[768px] flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[rgba(255,255,255,0.75)] sm:text-[36px] sm:leading-10">
            Your Story Awaits
          </p>

          <h2 className="pt-3 text-center text-[34px] leading-[42px] font-bold text-balance text-white sm:text-[48px] sm:leading-[60px] lg:text-[60px] lg:leading-[75px]">
            Your Perfect Photoshoot
            <br />
            Starts Here
          </h2>

          {/* The headline used to be followed by a family count and two trust
              badges; nothing counted them, so the button now carries the
              spacing they held. */}
          <Link
            to="/book"
            className="mt-8 flex h-[67.996px] w-[301.115px] max-w-full items-center justify-center rounded-full sm:mt-10 bg-white text-center text-[18px] leading-7 font-bold text-[#1f2937] shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#f3f4f6]"
          >
            Start Booking Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
