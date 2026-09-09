/**
 * Figma: Klicpic mithu / Photoshoots — Photoshoot Catalog (1616:18859).
 * All copy, ratings and counts are taken from the frame — the CRM has no
 * column for any of them. The frame's "From ₹…" prices are gone; they were
 * below what the studio actually charges.
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
  { name: "Maternity", image: maternity, rating: "4.9", booked: "1,240+ Booked", description: "Celebrate the beautiful journey of motherhood with ethereal, glowing portraits." },
  { name: "Newborn", image: newborn, rating: "4.9", booked: "890+ Booked", description: "Capture those fleeting first days with the softest, most precious newborn portraits." },
  { name: "Baby", image: baby, rating: "4.8", booked: "1,580+ Booked", description: "Milestone moments — first smile, sitting, crawling — preserved forever." },
  { name: "Birthday", image: birthday, rating: "5", booked: "2,100+ Booked", description: "Royally styled birthday shoots that make every little one feel like a star." },
  { name: "Family", image: family, rating: "4.9", booked: "1,340+ Booked", description: "Timeless family portraits that capture love, laughter, and togetherness." },
  { name: "Wedding", image: wedding, rating: "4.9", booked: "760+ Booked", description: "Cinematic, editorial wedding photography that tells your love story beautifully." },
  { name: "Pre-Wedding", image: preWedding, rating: "4.8", booked: "540+ Booked", description: "Romantic pre-wedding shoots in stunning locations across India and abroad." },
  { name: "Couple", image: couple, rating: "4.8", booked: "870+ Booked", description: "Intimate couple portraits that celebrate your unique chemistry and bond." },
  { name: "Corporate", image: corporate, rating: "4.7", booked: "320+ Booked", description: "Professional headshots and team photos that elevate your brand image." },
];
