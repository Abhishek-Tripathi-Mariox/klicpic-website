import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import priyaSharma from "./assets/priya-sharma.jpg";

/**
 * Figma: Klicpic mithu / Home — What Our Customers Say (1550:3158)
 *
 * NOTE: the frame draws four carousel indicators but only ships copy for the
 * first slide, so TESTIMONIALS holds that one; SLIDE_COUNT keeps the designed
 * four dots until the remaining quotes are supplied.
 */
const TESTIMONIALS = [
  {
    quote:
      "“Absolutely magical experience! The team at Klicpic captured our maternity shoot so beautifully. Every photo tells a story. We will treasure these memories forever.”",
    name: "Priya Sharma",
    meta: "Mumbai · Maternity Shoot",
    avatar: priyaSharma,
    stars: 5,
  },
];

const SLIDE_COUNT = 4;

const PLATFORMS = [
  { name: "Google", rating: "4.9", reviews: "3,842 reviews" },
  { name: "Facebook", rating: "4.8", reviews: "1,291 reviews" },
  { name: "Justdial", rating: "4.9", reviews: "987 reviews" },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  const go = (step) =>
    setIndex((current) =>
      (current + step + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  return (
    <section className="flex w-full flex-col items-center bg-white px-6 py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <div className="flex w-full flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            Voices of Love
          </p>
          <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-[#1f2937]">
            What Our Customers Say
          </h2>
        </div>

        <div className="flex w-full flex-col items-center pt-12">
          <div className="flex w-full max-w-[768px] flex-col items-start">
            <div className="flex w-full flex-col items-center rounded-3xl border-[0.701px] border-solid border-[rgba(249,168,37,0.15)] bg-[#fff7ed] p-14">
              <div className="flex items-start justify-center gap-1">
                {Array.from({ length: testimonial.stars }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="size-[19.997px] shrink-0 fill-[#f9a825] text-[#f9a825]"
                    strokeWidth={1.666}
                  />
                ))}
              </div>

              <blockquote className="w-full max-w-[655px] pt-6 text-center text-[20px] leading-[32.5px] text-[#1f2937] italic">
                {testimonial.quote}
              </blockquote>

              <div className="flex items-center justify-center gap-4 pt-8">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="size-[55.994px] shrink-0 rounded-full bg-[#f3f4f6] object-cover"
                />
                <div className="flex flex-col items-start">
                  <p className="text-[16px] leading-6 font-semibold whitespace-nowrap text-[#1f2937]">
                    {testimonial.name}
                  </p>
                  <p className="text-[14px] leading-[20px] whitespace-nowrap text-[#6a7282]">
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
                className="cursor-pointer rounded-full border-[0.701px] border-solid border-[#e5e7eb] p-2 transition-colors hover:bg-[#f9fafb]"
              >
                <ChevronLeft className="size-4 text-[#1f2937]" strokeWidth={1.333} />
              </button>

              <div className="flex items-start gap-2">
                {Array.from({ length: SLIDE_COUNT }, (_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={
                      dotIndex === index
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
                className="cursor-pointer rounded-full border-[0.701px] border-solid border-[#e5e7eb] p-2 transition-colors hover:bg-[#f9fafb]"
              >
                <ChevronRight className="size-4 text-[#1f2937]" strokeWidth={1.333} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-stretch justify-center gap-5 pt-14">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-3 rounded-[20px] border-[0.701px] border-solid border-[#f3f4f6] bg-white px-6 py-3 shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]"
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
