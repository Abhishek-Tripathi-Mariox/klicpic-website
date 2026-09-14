import React, { useMemo, useState } from "react";
import { ArrowLeft, Images } from "lucide-react";
import FitImage from "../components/FitImage";
import { imageUrl } from "../api/imageUrl";
import { useBooking } from "./BookingContext";
import { THEMES as LOCAL_THEMES, THEME_FILTERS as LOCAL_THEME_FILTERS } from "./themeData";
import { useThemes } from "../api/useCatalog";
import ThemeCard from "./ThemeCard";

/**
 * Figma: theme detail inside the Details step (1561:1996).
 * The theme's own photos, the select CTA, and a "Perfect for Similar
 * Occasions" grid.
 *
 * Two things the frame did are gone. It tabbed Gallery against BTS with the
 * counts baked in at 9 and 3, and padded the thumbnail strip with pictures
 * borrowed from other themes so it always looked nine deep — a theme the CRM
 * holds one photo for now shows one photo, and there is no BTS tab because the
 * CRM holds no behind-the-scenes footage for any theme. And the "similar"
 * grid was six hardcoded themes that do not exist ("Royal Boho", "Floral
 * Dream" …), each wearing an invented "#18 booked in Bangalore this week"; it
 * is now other themes of the same category from the live list, and hides
 * itself when the category has none.
 */
/** What this build shipped — the same fallback the Theme step uses. */
const LOCAL_CATALOG = { items: LOCAL_THEMES, filters: LOCAL_THEME_FILTERS };

export default function ThemeDetail({ theme, onBack, onSelect }) {
  const { booking } = useBooking();
  const { items: THEMES } = useThemes(LOCAL_CATALOG);
  const [active, setActive] = useState(0);

  // This theme's real photos: the cover first, then the gallery the CRM holds.
  // The cover is sometimes one of the gallery images and sometimes not, so the
  // two lists are merged rather than concatenated.
  const photos = useMemo(() => {
    const all = [theme.image, ...(Array.isArray(theme.images) ? theme.images : [])];
    return [...new Set(all.filter(Boolean))];
  }, [theme]);

  const similar = useMemo(
    () =>
      THEMES.filter(
        (item) => item.category === theme.category && item.name !== theme.name
      ).slice(0, 6),
    [THEMES, theme]
  );

  // A stale index would blank the hero when the list is shorter than it was.
  const hero = photos[Math.min(active, photos.length - 1)];

  return (
    <div className="flex w-full flex-col items-start">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-[14px] leading-[20px] text-[#6a7282] transition-colors hover:text-[#f9a825]"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
        Back
      </button>

      {photos.length > 0 && (
        <>
          {/* Where the Gallery/BTS tabs were — the same rule under the same
              divider, now carrying the count this theme actually has. */}
          <div className="flex w-full items-center justify-center gap-2 border-b-[0.701px] border-solid border-[#e5e7eb] pt-4 pb-3">
            <Images className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
            <span className="text-[14px] leading-[20px] font-semibold text-[#f9a825]">
              Gallery
            </span>
            <span className="rounded-full bg-[#f3f4f6] px-[6px] text-[11px] text-[#6a7282]">
              {photos.length}
            </span>
          </div>

          <div className="w-full pt-6">
            <FitImage
              src={imageUrl(hero, 960)}
              alt={theme.name}
              loading="eager"
              className="aspect-[4/3] w-full rounded-2xl"
            />

            {/* One thumbnail under its own hero is the same picture twice. */}
            {photos.length > 1 && (
              <div className="klicpic-rail flex w-full items-center gap-2 overflow-x-auto pt-3">
                {photos.map((photo, index) => (
                  <button
                    key={photo}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`size-[52px] shrink-0 overflow-hidden rounded-xl transition-all ${
                      photo === hero
                        ? "ring-2 ring-[#f9a825]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <FitImage src={imageUrl(photo, 160)} className="size-full" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => onSelect?.(theme)}
        className="mt-6 w-full cursor-pointer rounded-2xl bg-[#f9a825] py-4 text-center text-[16px] leading-6 font-bold text-white transition-colors hover:bg-[#e69a1f] lg:hidden"
      >
        Select {theme.name}
      </button>

      {/* similar — nothing to say when this is the only theme of its kind */}
      {similar.length > 0 && (
        <div className="w-full border-t-[0.701px] border-solid border-[#e5e7eb] pt-10 mt-10">
          <h3 className="text-[20px] leading-7 font-bold text-[#1f2937]">
            Perfect for Similar Occasions
          </h3>
          <div className="grid w-full grid-cols-1 gap-4 pt-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((item) => (
              <ThemeCard
                key={item.id ?? item.name}
                theme={item}
                selected={booking.theme === item.name}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
