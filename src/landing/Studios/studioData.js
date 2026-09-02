import mgRoad from "./assets/mg-road.jpg";
import indiranagar from "./assets/indiranagar.jpg";
import whitefield from "./assets/whitefield.jpg";
import bandra from "./assets/bandra.jpg";
import powai from "./assets/powai.jpg";
import saket from "./assets/saket.jpg";
import jubileeHills from "./assets/jubilee-hills.jpg";
import koregaonPark from "./assets/koregaon-park.jpg";

/**
 * The nine Klicpic locations. Shared by the home rail (1550:2241) and the
 * /studios listing the rail's "View All" opens.
 */
export const STUDIOS = [
  { name: "Klicpic MG Road", area: "MG Road, Bangalore", image: mgRoad, flagship: true, open: true, rating: "4.9", reviews: "(1,240)", themes: "120 themes", slots: "Only 4 slots left this week" },
  { name: "Klicpic Indiranagar", area: "Indiranagar, Bangalore", image: indiranagar, flagship: false, open: true, rating: "4.8", reviews: "(870)", themes: "95 themes", slots: "Only 7 slots left this week" },
  { name: "Klicpic Whitefield", area: "Whitefield, Bangalore", image: whitefield, flagship: false, open: false, rating: "4.7", reviews: "(640)", themes: "80 themes", slots: null },
  { name: "Klicpic Bandra", area: "Bandra West, Mumbai", image: bandra, flagship: true, open: true, rating: "4.9", reviews: "(980)", themes: "110 themes", slots: "Only 3 slots left this week" },
  { name: "Klicpic Powai", area: "Powai, Mumbai", image: powai, flagship: false, open: true, rating: "4.7", reviews: "(520)", themes: "72 themes", slots: "Only 9 slots left this week" },
  { name: "Klicpic Saket", area: "Saket, Delhi", image: saket, flagship: true, open: true, rating: "4.8", reviews: "(760)", themes: "90 themes", slots: "Only 5 slots left this week" },
  { name: "Klicpic Jubilee Hills", area: "Jubilee Hills, Hyderabad", image: jubileeHills, flagship: false, open: true, rating: "4.8", reviews: "(430)", themes: "85 themes", slots: "Only 6 slots left this week" },
  { name: "Klicpic Anna Nagar", area: "Anna Nagar, Chennai", image: mgRoad, flagship: false, open: false, rating: "4.7", reviews: "(390)", themes: "75 themes", slots: null },
  { name: "Klicpic Koregaon Park", area: "Koregaon Park, Pune", image: koregaonPark, flagship: false, open: true, rating: "4.9", reviews: "(510)", themes: "88 themes", slots: "Only 2 slots left this week" },
];

export const STUDIO_CITIES = [
  "All",
  ...Array.from(new Set(STUDIOS.map((studio) => studio.area.split(", ")[1]))),
];
