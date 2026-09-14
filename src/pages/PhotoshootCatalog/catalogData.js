/**
 * Figma: Klicpic mithu / Photoshoots — Photoshoot Catalog (1616:18859).
 *
 * Names, pictures and blurbs only. The frame's "From ₹…" prices are gone (they
 * were below what the studio actually charges) and so are its per-card ratings
 * and "N+ Booked" tallies: the CRM has no column for either, the site has no
 * published reviews behind a 4.9, and nobody could say where the tallies came
 * from. The one number a card still shows — its theme count — comes from the
 * CRM at render time.
 */
import maternity from "./assets/maternity.jpg";
import newborn from "./assets/newborn.jpg";
import baby from "./assets/baby.jpg";
import birthday from "./assets/birthday.jpg";
import family from "./assets/family.jpg";
import wedding from "./assets/wedding.jpg";
import preWedding from "./assets/pre-wedding.jpg";
import couple from "./assets/couple.jpg";
import corporate from "./assets/corporate.jpg";

export const CATALOG = [
  { name: "Maternity", image: maternity, description: "Celebrate the beautiful journey of motherhood with ethereal, glowing portraits." },
  { name: "Newborn", image: newborn, description: "Capture those fleeting first days with the softest, most precious newborn portraits." },
  { name: "Baby", image: baby, description: "Milestone moments — first smile, sitting, crawling — preserved forever." },
  { name: "Birthday", image: birthday, description: "Royally styled birthday shoots that make every little one feel like a star." },
  { name: "Family", image: family, description: "Timeless family portraits that capture love, laughter, and togetherness." },
  { name: "Wedding", image: wedding, description: "Cinematic, editorial wedding photography that tells your love story beautifully." },
  { name: "Pre-Wedding", image: preWedding, description: "Romantic pre-wedding shoots in stunning locations across India and abroad." },
  { name: "Couple", image: couple, description: "Intimate couple portraits that celebrate your unique chemistry and bond." },
  { name: "Corporate", image: corporate, description: "Professional headshots and team photos that elevate your brand image." },
];
