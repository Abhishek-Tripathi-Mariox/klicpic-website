import React from "react";
import { imageUrl } from "../../api/imageUrl";
import FitImage from "../../components/FitImage";
import { Link } from "react-router-dom";
import { Building2, Clock, MapPin, Navigation, Users } from "lucide-react";

/**
 * Figma: the studio card in the home rail (1550:2241), reused on /studios.
 *
 * The frame's card carried a star rating, a review count, a theme count and a
 * "slots left" line. The CRM's Studio record has none of those, so they
 * rendered as a lone star over an empty row. What the record does hold —
 * opening hours, capacity, the street address, a maps link and the facilities
 * list — is what the card shows now.
 */

/** The CRM stores facilities as slugs; the card wants words. */
const FACILITY_LABELS = {
  wifi: "Wi-Fi",
  parking: "Parking",
  ac: "AC",
  lighting: "Studio lighting",
  photography_equipment: "Pro equipment",
  changing_room: "Changing room",
  makeup_room: "Makeup room",
  washroom: "Washroom",
};

const facilityLabel = (slug) =>
  FACILITY_LABELS[slug] ||
  String(slug || "")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

export default function StudioCard({ studio }) {
  const facilities = (studio.facilities || []).filter(Boolean).slice(0, 3);
  const extra = Math.max(0, (studio.facilities || []).length - facilities.length);

  return (
    <article className="flex w-full min-w-0 flex-col items-start overflow-hidden rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <FitImage
        src={studio.image ? imageUrl(studio.image, 640) : null}
        alt={studio.name}
        tone="dark"
        className="h-[175.997px] w-full shrink-0 bg-gradient-to-br from-[#3f4550] to-[#1f2937]"
      >
        {!studio.image && (
          // No photo on the record yet. A plain dark box read as a broken
          // image, so the empty state says what it is.
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="size-14 text-white/10" strokeWidth={1.25} />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
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

        <div className="absolute right-3 bottom-3 left-3 flex min-w-0 flex-col items-start">
          <p className="w-full truncate text-[16px] leading-[22px] font-bold text-white">
            {studio.name}
          </p>
          {studio.area && (
            <div className="flex min-w-0 items-center gap-1 pt-[2px]">
              <MapPin className="size-[11.992px] shrink-0 text-white/70" strokeWidth={1.5} />
              <span className="truncate text-[12px] leading-4 text-[rgba(255,255,255,0.75)]">
                {studio.area}
              </span>
            </div>
          )}
        </div>
      </FitImage>

      <div className="flex w-full flex-1 flex-col items-start p-4">
        {(studio.timing || studio.capacity) && (
          <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-1">
            {studio.timing && (
              <span className="flex items-center gap-1 text-[12px] leading-4 text-[#4a5565]">
                <Clock className="size-[13px] shrink-0 text-[#f9a825]" strokeWidth={1.666} />
                {String(studio.timing).replace(/\s*hours?$/i, "")}
              </span>
            )}
            {studio.capacity && (
              <span className="flex items-center gap-1 text-[12px] leading-4 text-[#4a5565]">
                <Users className="size-[13px] shrink-0 text-[#f9a825]" strokeWidth={1.666} />
                {/* The admin form asks for people ("e.g., 20-30 people"), but
                    most records hold a bare number — add the unit when missing. */}
                {/[a-z]/i.test(String(studio.capacity))
                  ? studio.capacity
                  : `Up to ${studio.capacity} people`}
              </span>
            )}
          </div>
        )}

        {studio.address && (
          <p className="line-clamp-2 pt-2 text-[12px] leading-[17px] text-[#6a7282]">
            {studio.address}
          </p>
        )}

        {facilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3">
            {facilities.map((slug) => (
              <span
                key={slug}
                className="rounded-full bg-[#fff7ed] px-2 py-[2px] text-[10px] leading-[15px] font-semibold text-[#c2410c]"
              >
                {facilityLabel(slug)}
              </span>
            ))}
            {extra > 0 && (
              <span className="rounded-full bg-[#f3f4f6] px-2 py-[2px] text-[10px] leading-[15px] font-semibold text-[#6a7282]">
                +{extra} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex w-full items-center gap-2 pt-4">
          {studio.open ? (
            <Link
              to="/book"
              className="flex h-[34px] flex-1 items-center justify-center rounded-[20px] bg-[#f9a825] text-[12px] leading-4 font-bold text-white transition-colors hover:bg-[#e69a1f]"
            >
              Book This Studio
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="h-[34px] flex-1 cursor-not-allowed rounded-[20px] bg-[#9ca3af] text-[12px] leading-4 font-bold text-white opacity-40"
            >
              Currently Closed
            </button>
          )}
          {studio.mapsUrl && (
            <a
              href={studio.mapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Directions to ${studio.name}`}
              className="flex h-[34px] shrink-0 items-center justify-center gap-1 rounded-[20px] border-[1.2px] border-solid border-[#f9a825] px-3 text-[12px] leading-4 font-bold text-[#f9a825] transition-colors hover:bg-[#f9a825]/10"
            >
              <Navigation className="size-[13px] shrink-0" strokeWidth={1.8} />
              Directions
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
