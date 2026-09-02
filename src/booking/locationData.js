/**
 * Figma: booking wizard — Location sub-step.
 * Collapsed 1615:3632 · Klicpic Studios expanded 1615:4011 ·
 * Outdoor expanded 1615:4459 · Your Venue selected 1615:5001.
 */
import studios from "./assets/locations/studios.jpg";
import outdoor from "./assets/locations/outdoor.jpg";
import venue from "./assets/locations/venue.jpg";
import branchMgRoad from "./assets/locations/branch-mg-road.jpg";
import branchKoramangala from "./assets/locations/branch-koramangala.jpg";
import cubbonPark from "./assets/locations/spot-cubbon-park.jpg";
import lalbagh from "./assets/locations/spot-lalbagh.jpg";
import ulsoorLake from "./assets/locations/spot-ulsoor-lake.jpg";
import hesaraghatta from "./assets/locations/spot-hesaraghatta.jpg";
import nandiHills from "./assets/locations/spot-nandi-hills.jpg";
import bannerghatta from "./assets/locations/spot-bannerghatta.jpg";

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
    id: "outdoor",
    name: "Outdoor Location",
    tagline: "Parks, gardens, lakes & scenic spots nearby",
    image: outdoor,
  },
  {
    id: "venue",
    name: "Your Venue / Home",
    tagline: "We come to your home, venue, or any location",
    image: venue,
    note: "Share your address in the booking details step. Our team will visit for a pre-shoot location scouting call (free of charge).",
    charges: "Travel charges included up to 20 km · Extra ₹10/km beyond",
  },
];

export const STUDIO_BRANCHES = [
  {
    name: "Klicpic Studios — MG Road",
    address: "Studio 12, 4th Floor, MG Road, Bangalore — 560001",
    hours: "Mon–Sat · 9 AM – 8 PM",
    sets: "24 sets",
    image: branchMgRoad,
  },
  {
    name: "Klicpic Studios — Koramangala",
    address: "2nd Floor, 80 Feet Road, Koramangala 4th Block, Bangalore",
    hours: "Mon–Sun · 9 AM – 7 PM",
    sets: "18 sets",
    image: branchKoramangala,
  },
];

export const OUTDOOR_CITY = "Bangalore";

export const OUTDOOR_SPOTS = [
  { name: "Cubbon Park", kind: "Botanical Garden", distance: "2.1 km away", note: "Beautiful canopy, great for golden hour", image: cubbonPark },
  { name: "Lalbagh Botanical Garden", kind: "Garden", distance: "3.5 km away", note: "Iconic glasshouse & rose garden", image: lalbagh },
  { name: "Ulsoor Lake", kind: "Lakeside", distance: "1.8 km away", note: "Serene waterfront reflections", image: ulsoorLake },
  { name: "Hesaraghatta Lake", kind: "Scenic Outdoors", distance: "28 km away", note: "Wide open fields, stunning sunrise", image: hesaraghatta },
  { name: "Nandi Hills", kind: "Hill Station", distance: "58 km away", note: "Misty mornings, dramatic backdrops", image: nandiHills },
  { name: "Bannerghatta Forest", kind: "Forest", distance: "22 km away", note: "Lush forest for boho & nature themes", image: bannerghatta },
];

export const OUTDOOR_FOOTNOTE =
  "* Outdoor location charges may vary · Our team will coordinate entry permissions";
