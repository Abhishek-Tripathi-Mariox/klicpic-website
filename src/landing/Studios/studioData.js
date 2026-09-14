import mgRoad from "./assets/mg-road.jpg";
import indiranagar from "./assets/indiranagar.jpg";
import whitefield from "./assets/whitefield.jpg";
import bandra from "./assets/bandra.jpg";
import powai from "./assets/powai.jpg";
import saket from "./assets/saket.jpg";
import jubileeHills from "./assets/jubilee-hills.jpg";
import koregaonPark from "./assets/koregaon-park.jpg";

/**
 * Bundled sample branches, used only if the CRM's studio list cannot be
 * reached. Their star ratings, review counts and "only N slots left" lines
 * were invented, so they are gone: a record carries a name, area and photo,
 * which is all the cards render.
 */
export const STUDIOS = [
  { name: "Klicpic MG Road", area: "MG Road, Bangalore", image: mgRoad, flagship: true, open: true },
  { name: "Klicpic Indiranagar", area: "Indiranagar, Bangalore", image: indiranagar, flagship: false, open: true },
  { name: "Klicpic Whitefield", area: "Whitefield, Bangalore", image: whitefield, flagship: false, open: false },
  { name: "Klicpic Bandra", area: "Bandra West, Mumbai", image: bandra, flagship: true, open: true },
  { name: "Klicpic Powai", area: "Powai, Mumbai", image: powai, flagship: false, open: true },
  { name: "Klicpic Saket", area: "Saket, Delhi", image: saket, flagship: true, open: true },
  { name: "Klicpic Jubilee Hills", area: "Jubilee Hills, Hyderabad", image: jubileeHills, flagship: false, open: true },
  { name: "Klicpic Anna Nagar", area: "Anna Nagar, Chennai", image: mgRoad, flagship: false, open: false },
  { name: "Klicpic Koregaon Park", area: "Koregaon Park, Pune", image: koregaonPark, flagship: false, open: true },
];

export const STUDIO_CITIES = [
  "All",
  ...Array.from(new Set(STUDIOS.map((studio) => studio.area.split(", ")[1]))),
];
