/**
 * Figma: booking wizard — Location sub-step.
 * Collapsed 1615:3632 · Klicpic Studios expanded 1615:4011 ·
 * Your Venue selected 1615:5001.
 *
 * The frame's third option, "Outdoor Location", is gone: the studio does not
 * sell it and the CRM has no record of those parks, so it could only ever be a
 * promise nobody could keep. Branch cards live in the CRM's Studios list now —
 * what stays here is the shell each option renders in.
 */
import studios from "./assets/locations/studios.jpg";
import venue from "./assets/locations/venue.jpg";

export const LOCATION_OPTIONS = [
  {
    id: "studio",
    // "Professional AC studio with 20+ backdrop sets" is gone — nothing counts
    // backdrop sets and nobody could confirm the number or the air-con.
    name: "Klicpic Studios",
    tagline: "Shoot at one of our studios",
    image: studios,
    link: "Visit Studio Page",
    linkNote: "View full studio details & virtual tour",
  },
  {
    id: "venue",
    name: "Your Venue / Home",
    tagline: "We come to your home, venue, or any location",
    image: venue,
    // The "free pre-shoot location scouting call" was a service the studio
    // does not run, and the travel line ("included up to 20 km · Extra ₹10/km
    // beyond") quoted a rate card nobody approved — travel is settled with the
    // customer when the booking is confirmed, so the step no longer prices it.
    note: "Tell us where to come and we will bring the setup to you.",
  },
];

/** Thumbnails by option id — the editable content block carries only names. */
export const OPTION_IMAGES = { studio: studios, venue };
