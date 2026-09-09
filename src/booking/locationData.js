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
    name: "Klicpic Studios",
    tagline: "Professional AC studio with 20+ backdrop sets",
    image: studios,
    link: "Visit Studio Page",
    linkNote: "View full studio details & virtual tour",
  },
  {
    id: "venue",
    name: "Your Venue / Home",
    tagline: "We come to your home, venue, or any location",
    image: venue,
    note: "Tell us where to come. Our team calls ahead for a free pre-shoot location scouting call.",
    charges: "Travel charges included up to 20 km · Extra ₹10/km beyond",
  },
];

/** Thumbnails by option id — the editable content block carries only names. */
export const OPTION_IMAGES = { studio: studios, venue };
