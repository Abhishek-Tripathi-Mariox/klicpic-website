/**
 * Figma: Gown Collection (1550:7268) — 8 gown cards.
 *
 * NOTE: the frame ships no photo for "Blush Maternity Wrap" (it renders as an
 * empty placeholder), so its `image` is null. "Deep Maroon Anarkali" reuses the
 * same photo as "Royal Blue Lehenga" in the design.
 */
import ivoryLaceBridalGown from "./assets/ivory-lace-bridal-gown.jpg";
import royalBlueLehenga from "./assets/royal-blue-lehenga.jpg";
import sageGreenBohoDrape from "./assets/sage-green-boho-drape.jpg";
import princessPinkTutu from "./assets/princess-pink-tutu.jpg";
import goldSequinEvening from "./assets/gold-sequin-evening.jpg";
import creamBohemianWrap from "./assets/cream-bohemian-wrap.jpg";

export const GOWN_FILTERS = [
  "All",
  "Maternity",
  "Wedding",
  "Birthday",
  "Ethnic",
  "Luxury",
];

export const GOWNS = [
  {
    name: "Blush Maternity Wrap",
    category: "Maternity",
    colour: "Blush",
    image: null,
    viewing: "5 viewing",
    status: "Available",
    size: "S-XXL",
    theme: "Maternity",
  },
  {
    name: "Ivory Lace Bridal Gown",
    category: "Wedding",
    colour: "Ivory",
    image: ivoryLaceBridalGown,
    viewing: "4 viewing",
    status: "Available",
    size: "XS-XL",
    theme: "Wedding",
  },
  {
    name: "Royal Blue Lehenga",
    category: "Ethnic",
    colour: "Royal Blue",
    image: royalBlueLehenga,
    viewing: "3 viewing",
    status: "Available",
    size: "S-XL",
    theme: "Pre-Wedding",
  },
  {
    name: "Sage Green Boho Drape",
    category: "Maternity",
    colour: "Sage Green",
    image: sageGreenBohoDrape,
    viewing: "3 viewing",
    status: "Booked",
    size: "XS-XXL",
    theme: "Maternity",
  },
  {
    name: "Princess Pink Tutu",
    category: "Kids",
    colour: "Pink",
    image: princessPinkTutu,
    viewing: "3 viewing",
    status: "Available",
    size: "1Y-8Y",
    theme: "Birthday",
  },
  {
    name: "Gold Sequin Evening",
    category: "Luxury",
    colour: "Gold",
    image: goldSequinEvening,
    viewing: "4 viewing",
    status: "Available",
    size: "XS-L",
    theme: "Luxury",
  },
  {
    name: "Cream Bohemian Wrap",
    category: "Maternity",
    colour: "Cream",
    image: creamBohemianWrap,
    viewing: "4 viewing",
    status: "Available",
    size: "XS-XL",
    theme: "Maternity",
  },
  {
    name: "Deep Maroon Anarkali",
    category: "Ethnic",
    colour: "Maroon",
    image: royalBlueLehenga,
    viewing: "5 viewing",
    status: "Booked",
    size: "S-XL",
    theme: "Family",
  },
];
