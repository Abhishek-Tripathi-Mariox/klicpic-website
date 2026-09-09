import React from "react";
import { imageUrl } from "../../api/imageUrl";
import { Link } from "react-router-dom";
import { Flame, MapPin, Star } from "lucide-react";

/** Figma: the studio card in the home rail (1550:2241). */
export default function StudioCard({ studio }) {
  return (
    <article className="flex w-[287.996px] shrink-0 flex-col items-start self-start overflow-hidden rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <div className="relative h-[175.997px] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#3f4550] to-[#1f2937]">
        {studio.image && (
          <img
            loading="lazy"
            src={imageUrl(studio.image, 480)}
            alt={studio.name}
            className="pointer-events-none absolute inset-0 size-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div className="absolute top-3 left-3 flex items-start gap-2">
          {studio.flagship && (
            <span className="rounded-full bg-[#f9a825] px-2 py-[2px] text-[10px] leading-[15px] font-black whitespace-nowrap text-[#1f2937]">
              FLAGSHIP
            </span>
          )}
          <span
            className={`rounded-full px-2 py-[2px] text-[10px] leading-[15px] font-bold whitespace-nowrap text-white ${
              studio.open ? "bg-[#00c950]" : "bg-[#6a7282]"
            }`}
          >
            {studio.open ? "● OPEN" : "● CLOSED"}
          </span>
        </div>

        <div className="absolute right-3 bottom-3 left-3 flex flex-col items-start">
          <p className="text-[14px] leading-[17.5px] font-bold whitespace-nowrap text-white">
            {studio.name}
          </p>
          <div className="flex items-center gap-1 pt-[2px]">
            <MapPin className="size-[11.992px] shrink-0 text-white/70" strokeWidth={1.5} />
            <span className="text-[12px] leading-4 whitespace-nowrap text-[rgba(255,255,255,0.7)]">
              {studio.area}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="size-[13.996px] shrink-0 fill-[#f9a825] text-[#f9a825]" strokeWidth={1.166} />
            <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
              {studio.rating}
            </span>
            <span className="text-[12px] leading-4 text-[#99a1af]">
              {studio.reviews}
            </span>
          </div>
          <span className="text-[12px] leading-4 whitespace-nowrap text-[#99a1af]">
            {studio.themes}
          </span>
        </div>

        {studio.slots ? (
          <div className="flex items-center gap-1 py-3">
            <Flame className="size-[11.992px] shrink-0 text-[#fe9a00]" strokeWidth={1.5} />
            <span className="text-[11px] leading-[16.5px] font-semibold whitespace-nowrap text-[#fe9a00]">
              {studio.slots}
            </span>
          </div>
        ) : (
          <div className="h-3 w-full" />
        )}

        {studio.open ? (
          <Link
            to="/book"
            className="flex h-[31.989px] w-full items-center justify-center rounded-[20px] bg-[#f9a825] text-[12px] leading-4 font-bold text-white transition-colors hover:bg-[#e69a1f]"
          >
            Book This Studio
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="h-[31.989px] w-full cursor-not-allowed rounded-[20px] bg-[#9ca3af] text-[12px] leading-4 font-bold text-white opacity-40"
          >
            Currently Closed
          </button>
        )}
      </div>
    </article>
  );
}