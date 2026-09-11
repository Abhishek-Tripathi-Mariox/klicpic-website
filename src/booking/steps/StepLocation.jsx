import React, { useMemo, useState } from "react";
import { Check, Clock, ExternalLink, MapPin } from "lucide-react";
import { useBooking } from "../BookingContext";
import DetailsShell from "../DetailsShell";
import { LOCATION_OPTIONS as LOCAL_LOCATION_OPTIONS, OPTION_IMAGES } from "../locationData";
import { useContent } from "../../api/useContent";
import { useStudios } from "../../api/useCatalog";
import { imageUrl } from "../../api/imageUrl";
import FitImage from "../../components/FitImage";

/**
 * Figma: booking wizard — Location sub-step.
 * Collapsed 1615:3632; picking an option expands it —
 * Klicpic Studios 1615:4011, Your Venue 1615:5001.
 *
 * The frame also offered "Outdoor Location" with a list of Bangalore parks.
 * The studio does not run outdoor shoots as a bookable option and the CRM has
 * no record of those spots, so it is not offered here — a customer who picks
 * one would be booking something nobody can fulfil. A shoot away from a branch
 * is "Your Venue / Home", which the CRM does model.
 */
export default function StepLocation({ onBack, onNext, onSkipAll }) {
  // Live copy from the backend, falling back to what this build shipped.
  const { content } = useContent("booking-locations", { LOCATION_OPTIONS: LOCAL_LOCATION_OPTIONS });
  const { LOCATION_OPTIONS: ALL_OPTIONS } = content;

  // Outdoor never survives, whatever the content block still carries.
  const LOCATION_OPTIONS = useMemo(
    () => (ALL_OPTIONS || []).filter((option) => option.id !== "outdoor"),
    [ALL_OPTIONS]
  );

  /**
   * The branches are the CRM's own studios — name, address, opening hours and
   * capacity all come from the record the team maintains. The bundled pair
   * (MG Road / Koramangala) were illustrations from the frame and are not
   * places anyone can be sent to.
   */
  const { items: liveStudios } = useStudios({ items: [], filters: [] });
  const STUDIO_BRANCHES = useMemo(
    () =>
      (liveStudios || []).map((studio) => ({
        id: studio.id,
        name: studio.name,
        address: [studio.address, studio.pinCode].filter(Boolean).join(" — "),
        hours: studio.timing || "",
        capacity: studio.capacity ? `Up to ${studio.capacity} people` : "",
        image: studio.image || studio.images?.[0] || "",
        mapsUrl: studio.mapsUrl || "",
      })),
    [liveStudios]
  );

  const { booking, set } = useBooking();
  const [open, setOpen] = useState(booking.locationType || null);
  const [branch, setBranch] = useState(booking.studioId || null);
  const [address, setAddress] = useState(booking.customStudioAddress || "");
  const [mapLink, setMapLink] = useState(booking.customStudioMapLink || "");

  const chooseBranch = (item) => {
    setBranch(item.id);
    set({
      location: item.name,
      locationType: "studio",
      studioId: item.id,
      studioName: item.name,
      customStudioAddress: "",
      customStudioMapLink: "",
    });
  };

  /** Kept in step with the fields so the summary and submit stay truthful. */
  const setVenue = (nextAddress, nextMapLink) => {
    setAddress(nextAddress);
    setMapLink(nextMapLink);
    set({
      location: nextAddress || "Your Venue / Home",
      locationType: "venue",
      studioId: null,
      studioName: "",
      customStudioAddress: nextAddress,
      customStudioMapLink: nextMapLink,
    });
  };

  const choose = (option) => {
    setOpen(option.id);
    if (option.id === "studio") {
      const chosen = STUDIO_BRANCHES.find((item) => item.id === branch);
      if (chosen) chooseBranch(chosen);
      else set({ location: "", locationType: "studio", studioId: null, customStudioAddress: "", customStudioMapLink: "" });
    } else {
      setVenue(address, mapLink);
    }
  };

  // The team has to be able to reach the shoot: a branch, or an address and a
  // map link — the same two fields the admin panel demands for a custom studio.
  const ready =
    open === "studio"
      ? Boolean(branch)
      : open === "venue"
        ? Boolean(address.trim() && mapLink.trim())
        : false;

  return (
    <DetailsShell
      index={2}
      hint="Location required to continue"
      backLabel="Props"
      nextLabel="Continue to Package"
      canContinue={ready}
      onBack={onBack}
      onNext={onNext}
      onSkipAll={onSkipAll}
      footNote={
        ready
          ? "All required selections made ✓"
          : "Complete required selections to continue"
      }
    >
      <h3 className="pt-6 text-[16px] leading-6 font-bold text-[#1f2937]">
        Where would you like your shoot?
      </h3>

      <div className="flex w-full flex-col items-start gap-3 pt-4">
        {LOCATION_OPTIONS.map((option) => {
          const isOpen = open === option.id;
          return (
            <div
              key={option.id}
              className={`w-full overflow-hidden rounded-2xl border-[0.701px] border-solid transition-colors ${
                isOpen
                  ? "border-[#f9a825] bg-[#fffbeb]"
                  : "border-[#e5e7eb] bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => choose(option)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center gap-4 p-3 text-left"
              >
                {/* The thumbnail ships with this build. The content block
                    stores only a filename, which would resolve to nothing. */}
                <FitImage
                  src={OPTION_IMAGES[option.id] || option.image}
                  alt={option.name}
                  className="size-[56px] shrink-0 rounded-xl"
                />
                <span className="flex min-w-0 flex-1 flex-col items-start">
                  <span className="flex items-center gap-2 text-[14px] leading-[20px] font-bold text-[#1f2937]">
                    {option.id === "studio" && "🏢"}
                    {option.id === "venue" && "🏠"}
                    {option.name}
                  </span>
                  <span className="text-[12px] leading-4 text-[#6a7282]">
                    {option.tagline}
                  </span>
                  {option.link && (
                    <span className="flex items-center gap-1 pt-1 text-[11px] leading-4 font-semibold text-[#f9a825]">
                      <ExternalLink className="size-3 shrink-0" strokeWidth={1.666} />
                      {option.link}
                    </span>
                  )}
                </span>
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border-[1.4px] border-solid ${
                    isOpen ? "border-[#f9a825] bg-[#f9a825]" : "border-[#d1d5dc]"
                  }`}
                >
                  {isOpen && <Check className="size-[14px] text-white" strokeWidth={3} />}
                </span>
              </button>

              {/* Klicpic Studios — branch picker (1615:4011) */}
              {isOpen && option.id === "studio" && (
                <div className="border-t-[0.701px] border-solid border-[#fee685] px-3 pt-3 pb-4">
                  <p className="text-[12px] leading-4 font-bold text-[#1f2937]">
                    Choose a Studio Branch
                  </p>

                  {STUDIO_BRANCHES.length === 0 ? (
                    <p className="pt-3 text-[12px] leading-[18px] text-[#6a7282]">
                      No studio branches are listed right now. Pick “Your Venue /
                      Home”, or call us and we'll arrange one.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2">
                      {STUDIO_BRANCHES.map((item) => {
                        const active = branch === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => chooseBranch(item)}
                            className={`flex flex-col overflow-hidden rounded-xl border-[0.701px] border-solid bg-white text-left transition-colors ${
                              active ? "border-[#f9a825]" : "border-[#e5e7eb] hover:border-[#f9a825]"
                            }`}
                          >
                            {/* A branch with no photo on record keeps the card's
                                own styling rather than a broken frame. */}
                            {item.image && (
                              <FitImage
                                src={imageUrl(item.image, 480)}
                                alt={item.name}
                                className="h-[140px] w-full"
                              />
                            )}
                            <span className="flex flex-col items-start p-3">
                              <span className="text-[13px] leading-[18px] font-bold text-[#1f2937]">
                                {item.name}
                              </span>
                              <span className="pt-1 text-[11px] leading-4 text-[#6a7282]">
                                {item.address}
                              </span>
                              <span className="flex flex-wrap items-center gap-3 pt-2">
                                {item.hours && (
                                  <span className="flex items-center gap-1 text-[11px] leading-4 text-[#99a1af]">
                                    <Clock className="size-3 shrink-0" strokeWidth={1.666} />
                                    {item.hours}
                                  </span>
                                )}
                                {item.capacity && (
                                  <span className="rounded-full bg-[#fff7ed] px-2 py-[1px] text-[10px] leading-4 font-bold text-[#f9a825]">
                                    {item.capacity}
                                  </span>
                                )}
                              </span>
                              {item.mapsUrl && (
                                <span className="flex items-center gap-1 pt-2 text-[11px] leading-4 font-semibold text-[#f9a825]">
                                  <MapPin className="size-3 shrink-0" strokeWidth={1.666} />
                                  View on map
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Your Venue / Home (1615:5001) — the same two fields the admin
                  panel asks for when it books a custom studio, so a website
                  booking reaches the team with an address they can drive to. */}
              {isOpen && option.id === "venue" && (
                <div className="border-t-[0.701px] border-solid border-[#fee685] px-3 pt-3 pb-4">
                  <p className="text-[12px] leading-[18px] text-[#6a7282]">
                    {option.note}
                  </p>

                  <label className="mt-3 block text-[12px] leading-4 font-bold text-[#1f2937]">
                    Full Address
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(event) => setVenue(event.target.value, mapLink)}
                    placeholder="House / flat, street, area, city and pin code"
                    className="mt-2 w-full resize-none rounded-xl border-[0.701px] border-solid border-[#e5e7eb] bg-white px-4 py-3 text-[13px] leading-[20px] text-[#1f2937] outline-none transition-colors placeholder:text-[#99a1af] focus:border-[#f9a825]"
                  />

                  <label className="mt-3 block text-[12px] leading-4 font-bold text-[#1f2937]">
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    value={mapLink}
                    onChange={(event) => setVenue(address, event.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="mt-2 h-[42px] w-full rounded-xl border-[0.701px] border-solid border-[#e5e7eb] bg-white px-4 text-[13px] text-[#1f2937] outline-none transition-colors placeholder:text-[#99a1af] focus:border-[#f9a825]"
                  />

                  {!ready && (
                    <p className="pt-2 text-[11px] leading-4 text-[#99a1af]">
                      Both are needed so the team can reach you on the day.
                    </p>
                  )}

                  {option.charges && (
                    <p className="mt-3 rounded-xl border-[0.701px] border-solid border-[#fee685] bg-white px-3 py-2 text-[11px] leading-4 font-semibold text-[#973c00]">
                      {option.charges}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DetailsShell>
  );
}
