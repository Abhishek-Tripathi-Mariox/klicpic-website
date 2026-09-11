import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useReviews } from "../../api/useReviews";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

/**
 * Figma: Klicpic mithu / Home — What Our Customers Say (1550:3158)
 *
 * The carousel shows published customer reviews only. The frame's sample quote
 * ("Priya Sharma", with a stock portrait) is gone — until the team publishes a
 * real review the section stays off the page.
 */
/** The frame draws four dots; with fewer reviews there are fewer dots. */
const MAX_DOTS = 4;

const PLATFORMS = [
  { name: "Google", rating: "4.9", reviews: "3,842 reviews" },
  { name: "Facebook", rating: "4.8", reviews: "1,291 reviews" },
  { name: "Justdial", rating: "4.9", reviews: "987 reviews" },
];

export default function Testimonials() {
  // Real customer reviews, left through the portal.
  const { testimonials: TESTIMONIALS, total } = useReviews();

  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index % Math.max(TESTIMONIALS.length, 1)];

  // Nothing published yet — no section rather than an invented quote.
  if (!testimonial) return null;

  const go = (step) =>
    setIndex((current) =>
      (current + step + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  return (
    <section className="flex w-full flex-col items-center bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[26px] leading-8 font-normal whitespace-nowrap text-[#f9a825] sm:text-[30px] sm:leading-9">
            Voices of Love
          </p>
          <h2 className="pt-1 text-center text-[28px] leading-[34px] font-bold text-[#1f2937] sm:text-[36px] sm:leading-10">
            What Our Customers Say
          </h2>
        </div>

        <div className="flex w-full flex-col items-center pt-8 md:pt-12">
          <div className="flex w-full max-w-[768px] flex-col items-start">
            <div className="flex w-full flex-col items-center rounded-3xl border-[0.701px] border-solid border-[rgba(249,168,37,0.15)] bg-[#fff7ed] px-5 py-8 sm:p-14">
              <div className="flex items-start justify-center gap-1">
                {Array.from({ length: testimonial.stars }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="size-[19.997px] shrink-0 fill-[#f9a825] text-[#f9a825]"
                    strokeWidth={1.666}
                  />
                ))}
              </div>

              <blockquote className="w-full max-w-[655px] pt-6 text-center text-[17px] leading-[28px] text-[#1f2937] italic sm:text-[20px] sm:leading-[32.5px]">
                {testimonial.quote || `Rated ${testimonial.stars} out of 5.`}
              </blockquote>

              <div className="flex max-w-full items-center justify-center gap-4 pt-8">
                <span className="flex size-[55.994px] shrink-0 items-center justify-center rounded-full bg-[#f9a825] text-[22px] font-bold text-white">
                  {testimonial.initial}
                </span>
                <div className="flex min-w-0 flex-col items-start">
                  <p className="text-[16px] leading-6 font-semibold text-[#1f2937]">
                    {testimonial.name}
                  </p>
                  <p className="text-[14px] leading-[20px] text-[#6a7282]">
                    {testimonial.meta}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-center gap-4 pt-8">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border-[0.701px] border-solid border-[#e5e7eb] transition-colors hover:bg-[#f9fafb]"
              >
                <ChevronLeft className="size-4 text-[#1f2937]" strokeWidth={1.333} />
              </button>

              <div className="flex items-start gap-2">
                {Array.from({ length: Math.min(TESTIMONIALS.length, MAX_DOTS) }, (_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={
                      dotIndex === index % MAX_DOTS
                        ? "h-[7.994px] w-[27.991px] rounded-full bg-[#f9a825]"
                        : "size-[7.994px] rounded-full bg-[#d1d5dc]"
                    }
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border-[0.701px] border-solid border-[#e5e7eb] transition-colors hover:bg-[#f9fafb]"
              >
                <ChevronRight className="size-4 text-[#1f2937]" strokeWidth={1.333} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center pt-8">
          <Link
            to="/reviews"
            className="rounded-full border-[1.4px] border-solid border-[#f9a825] px-6 py-2.5 text-[14px] font-bold text-[#f9a825] transition-colors hover:bg-[#f9a825]/10"
          >
            Read all {total} review{total === 1 ? "" : "s"} →
          </Link>
        </div>

        <div className="flex w-full flex-wrap items-stretch justify-center gap-3 pt-10 sm:gap-5 md:pt-14">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-3 rounded-[20px] border-[0.701px] border-solid border-[#f3f4f6] bg-white px-5 py-3 shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] sm:px-6"
            >
              <span className="text-[16px] leading-6 font-bold whitespace-nowrap text-[#1f2937]">
                {platform.name}
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-4 shrink-0 fill-[#f9a825] text-[#f9a825]" strokeWidth={1.333} />
                <span className="text-[16px] leading-6 font-bold whitespace-nowrap text-[#1f2937]">
                  {platform.rating}
                </span>
              </span>
              <span className="text-[14px] leading-[20px] whitespace-nowrap text-[#99a1af]">
                {platform.reviews}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
