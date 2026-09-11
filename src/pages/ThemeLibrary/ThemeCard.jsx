import React from "react";
import { imageUrl } from "../../api/imageUrl";
import FitImage from "../../components/FitImage";
import { Link } from "react-router-dom";
import { CalendarCheck, Clock, Flame, Images, MapPin, Star } from "lucide-react";

/**
 * Figma: Theme card (1550:3645) — photo with live-viewing / trending / price
 * badges, then props + gowns chips and the FOMO bar.
 *
 * A theme coming from the CRM carries the facts but none of the marketing
 * dressing — `gowns`, and often `props`, have no column there. Both lists are
 * read defensively so a live record still renders, just without those chips.
 * The same goes for every badge and FOMO line: each shows only when the
 * record has something to say, rather than as an empty pill over the photo.
 */
export default function ThemeCard({ theme, image }) {
  const props = theme.props ?? [];
  const gowns = theme.gowns ?? [];
  const fomoTop = [theme.viewingNow, theme.bookingThisWeek].some(Boolean);
  const fomoMid = [theme.bookedThisWeek, theme.hotIn].some(Boolean);
  const hasFomo = fomoTop || fomoMid || Boolean(theme.lastBooked);

  return (
    <article className="flex flex-col items-start overflow-hidden rounded-3xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      {/* photo — shown whole over a blurred copy of itself, never cropped:
          theme covers are mostly portraits and a cover crop cut the subject */}
      <FitImage src={imageUrl(image, 640)} alt={theme.name} className="h-[340px] w-full shrink-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div className="absolute top-3 left-3 flex flex-col items-start gap-[6px]">
          {theme.viewing && (
            <div className="flex items-center gap-[5px] rounded-full bg-[rgba(0,0,0,0.65)] px-2 py-1">
              <span className="relative size-[7.994px] shrink-0">
                <span className="absolute -inset-[2.74px] rounded-full bg-[#4ade80] opacity-25" />
                <span className="absolute inset-0 rounded-full bg-[#4ade80]" />
              </span>
              <span className="text-[10px] leading-[10px] font-bold whitespace-nowrap text-white">
                {theme.viewing}
              </span>
            </div>
          )}

          {theme.trending && (
            <div
              className="flex items-center gap-1 rounded-full px-2 py-[3px]"
              style={{
                backgroundImage:
                  "linear-gradient(168.88deg, rgb(249,115,22) 0%, rgb(249,168,37) 100%)",
              }}
            >
              <Flame className="size-[9.998px] shrink-0 text-white" strokeWidth={1.666} />
              <span className="text-[9px] leading-[9px] font-extrabold whitespace-nowrap text-white">
                TRENDING
              </span>
            </div>
          )}
        </div>

        {theme.price && (
          <span className="absolute top-3 right-3 rounded-full bg-[#f9a825] px-3 py-1 text-[12px] leading-4 font-bold whitespace-nowrap text-white">
            {theme.price}
          </span>
        )}

        <div className="absolute bottom-3 left-3 flex flex-col items-start gap-1">
          {(theme.rating || theme.popularity) && (
            <div className="flex items-center gap-1">
              {theme.rating && (
                <>
                  <Star
                    className="size-[13.996px] shrink-0 fill-[#f9a825] text-[#f9a825]"
                    strokeWidth={1.166}
                  />
                  <span className="text-[12px] leading-4 font-semibold text-white">
                    {theme.rating}
                  </span>
                </>
              )}
              {theme.popularity && (
                <span className="pl-1 text-[10px] leading-[15px] whitespace-nowrap text-[rgba(255,255,255,0.6)]">
                  {theme.popularity}
                </span>
              )}
            </div>
          )}
          {theme.hotCity && (
            <div className="flex items-center gap-1 rounded-full bg-[rgba(249,168,37,0.92)] px-2 py-[3px]">
              <Flame className="size-[9.998px] shrink-0 text-white" strokeWidth={1.666} />
              <span className="text-[9px] leading-[9px] font-extrabold whitespace-nowrap text-white">
                {theme.hotCity}
              </span>
            </div>
          )}
        </div>

        {theme.photos && (
          <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-[rgba(0,0,0,0.4)] px-2 py-1">
            <Images
              className="size-[11.992px] shrink-0 text-[rgba(255,255,255,0.7)]"
              strokeWidth={1.5}
            />
            <span className="text-[10px] leading-[15px] whitespace-nowrap text-[rgba(255,255,255,0.7)]">
              {theme.photos}
            </span>
          </div>
        )}
      </FitImage>

      {/* body */}
      <div className="flex w-full flex-col items-start p-5">
        {/* A long CRM name takes its own line and pushes the chip below it,
            rather than squeezing into a narrow column beside it. */}
        <div className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <h3 className="min-w-0 text-[20px] leading-7 font-bold text-[#1f2937]">{theme.name}</h3>
          <span className="shrink-0 rounded-full bg-[#fff7ed] px-[10px] py-1 text-[12px] leading-4 font-semibold whitespace-nowrap text-[#f9a825]">
            {theme.category}
          </span>
        </div>

        {props.length > 0 && (
          <div className="flex w-full flex-col items-start pt-2">
            <p className="text-[12px] leading-4 font-medium text-[#6a7282]">Props Used</p>
            <div className="flex flex-wrap items-start gap-1 pt-1">
              {props.map((prop) => (
                <span
                  key={prop}
                  className="rounded-full bg-[#f3f4f6] px-2 py-[2px] text-[11px] leading-[16.5px] whitespace-nowrap text-[#4a5565]"
                >
                  {prop}
                </span>
              ))}
            </div>
          </div>
        )}

        {gowns.length > 0 && (
          <div className="flex w-full flex-col items-start pt-3">
            <p className="text-[12px] leading-4 font-medium text-[#6a7282]">Gowns Used</p>
            <div className="flex flex-wrap items-start gap-1 pt-1">
              {gowns.map((gown) => (
                <span
                  key={gown}
                  className="rounded-full bg-[#faf5ff] px-2 py-[2px] text-[11px] leading-[16.5px] whitespace-nowrap text-[#9810fa]"
                >
                  {gown}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FOMO bar */}
        {hasFomo && (
          <div className="mt-4 flex w-full flex-col items-start gap-1 border-t-[0.701px] border-solid border-[#f3f4f6] pt-2">
            {fomoTop && (
              <div className="flex w-full flex-wrap items-center gap-x-[6px]">
                <div className="flex items-center gap-1">
                  <span className="relative size-[6.998px] shrink-0">
                    <span className="absolute -inset-[2.4px] rounded-full bg-[#4ade80] opacity-25" />
                    <span className="absolute inset-0 rounded-full bg-[#4ade80]" />
                  </span>
                  <span className="text-[11px] leading-[16.5px] font-semibold whitespace-nowrap text-[#374151]">
                    {theme.viewingNow}
                  </span>
                </div>
                <span className="text-[10px] leading-[15px] text-[#d1d5db]">·</span>
                <div className="flex items-center gap-1">
                  <CalendarCheck
                    className="size-[9.998px] shrink-0 text-[#374151]"
                    strokeWidth={1.666}
                  />
                  <span className="text-[11px] leading-[16.5px] font-semibold whitespace-nowrap text-[#374151]">
                    {theme.bookingThisWeek}
                  </span>
                </div>
              </div>
            )}

            {fomoMid && (
              <div className="flex w-full flex-wrap items-center gap-x-[6px]">
                <div className="flex items-center gap-1">
                  <Flame className="size-[9.998px] shrink-0 text-[#6b7280]" strokeWidth={1.666} />
                  <span className="text-[11px] leading-[16.5px] whitespace-nowrap text-[#6b7280]">
                    {theme.bookedThisWeek}
                  </span>
                </div>
                <span className="text-[10px] leading-[15px] text-[#d1d5db]">·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="size-[9.998px] shrink-0 text-[#6b7280]" strokeWidth={1.666} />
                  <span className="text-[11px] leading-[16.5px] whitespace-nowrap text-[#6b7280]">
                    {theme.hotIn}
                  </span>
                </div>
              </div>
            )}

            {theme.lastBooked && (
              <div className="flex w-full items-center gap-1">
                <Clock className="size-[8.991px] shrink-0 text-[#9ca3af]" strokeWidth={1.666} />
                <span className="text-[10px] leading-[15px] whitespace-nowrap text-[#9ca3af]">
                  {theme.lastBooked}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex w-full items-stretch gap-2 pt-3">
          <Link
            to="/gallery"
            className="flex flex-1 cursor-pointer items-center justify-center gap-[6px] rounded-[20px] border-[1.402px] border-solid border-[#f9a825] py-[10px] transition-colors hover:bg-[#f9a825]/10"
          >
            <Images className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.333} />
            <span className="text-center text-[14px] leading-[20px] font-semibold whitespace-nowrap text-[#f9a825]">
              View Gallery
            </span>
          </Link>
          <Link
            to="/book"
            className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-[20px] bg-[#f9a825] py-[10px] transition-colors hover:bg-[#e69a1f]"
          >
            <span className="text-center text-[14px] leading-[20px] font-semibold whitespace-nowrap text-white">
              Use This Theme
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
