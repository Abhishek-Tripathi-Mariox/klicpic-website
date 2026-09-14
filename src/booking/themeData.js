/**
 * Figma: booking wizard — Theme sub-step (1550:14898 / 15939).
 *
 * The bundled stand-in for the CRM's theme list: what the step shows while the
 * request is in flight, and if it never lands. Names, categories and pictures
 * only — the frame's "live activity" dressing ("13 viewing", TRENDING, "#18
 * booked in Bangalore this week") is gone. Nothing counts viewers or ranks
 * bookings by city, and the cities named are ones Klicpic has no studio in.
 * Leaving the fields here was not harmless either: useCatalog overlays a live
 * record on the bundled one of the same name, so any CRM theme that happened to
 * match picked the badges up as if they were its own.
 */
import royalBoho from "./assets/themes/royal-boho.jpg";
import desertBoho from "./assets/themes/desert-boho.jpg";
import forestBoho from "./assets/themes/forest-boho.jpg";
import moonlitBoho from "./assets/themes/moonlit-boho.jpg";
import floralDream from "./assets/themes/floral-dream.jpg";
import princessGarden from "./assets/themes/princess-garden.jpg";
import springBloom from "./assets/themes/spring-bloom.jpg";
import roseGarden from "./assets/themes/rose-garden.jpg";
import classicWhite from "./assets/themes/classic-white.jpg";
import timelessGrey from "./assets/themes/timeless-grey.jpg";
import pearlElegance from "./assets/themes/pearl-elegance.jpg";
import softIvory from "./assets/themes/soft-ivory.jpg";
import goldenHour from "./assets/themes/golden-hour.jpg";
import velvetRoyal from "./assets/themes/velvet-royal.jpg";
import palaceDreams from "./assets/themes/palace-dreams.jpg";
import regalCrimson from "./assets/themes/regal-crimson.jpg";
import sunlitMeadow from "./assets/themes/sunlit-meadow.jpg";
import oceanBreeze from "./assets/themes/ocean-breeze.jpg";
import gardenParty from "./assets/themes/garden-party.jpg";
import mountainMist from "./assets/themes/mountain-mist.jpg";
import fairyTale from "./assets/themes/fairy-tale.jpg";
import enchantedForest from "./assets/themes/enchanted-forest.jpg";
import celestialDreams from "./assets/themes/celestial-dreams.jpg";
import vintageDrama from "./assets/themes/vintage-drama.jpg";

export const THEME_FILTERS = ["All", "Boho", "Floral", "Classic", "Royal", "Outdoor", "Fantasy"];

export const THEMES = [
  { name: "Royal Boho", category: "Boho", image: royalBoho },
  { name: "Desert Boho", category: "Boho", image: desertBoho },
  { name: "Forest Boho", category: "Boho", image: forestBoho },
  { name: "Moonlit Boho", category: "Boho", image: moonlitBoho },
  { name: "Floral Dream", category: "Floral", image: floralDream },
  { name: "Princess Garden", category: "Floral", image: princessGarden },
  { name: "Spring Bloom", category: "Floral", image: springBloom },
  { name: "Rose Garden", category: "Floral", image: roseGarden },
  { name: "Classic White", category: "Classic", image: classicWhite },
  { name: "Timeless Grey", category: "Classic", image: timelessGrey },
  { name: "Pearl Elegance", category: "Classic", image: pearlElegance },
  { name: "Soft Ivory", category: "Classic", image: softIvory },
  { name: "Golden Hour", category: "Royal", image: goldenHour },
  { name: "Velvet Royal", category: "Royal", image: velvetRoyal },
  { name: "Palace Dreams", category: "Royal", image: palaceDreams },
  { name: "Regal Crimson", category: "Royal", image: regalCrimson },
  { name: "Sunlit Meadow", category: "Outdoor", image: sunlitMeadow },
  { name: "Ocean Breeze", category: "Outdoor", image: oceanBreeze },
  { name: "Garden Party", category: "Outdoor", image: gardenParty },
  { name: "Mountain Mist", category: "Outdoor", image: mountainMist },
  { name: "Fairy Tale", category: "Fantasy", image: fairyTale },
  { name: "Enchanted Forest", category: "Fantasy", image: enchantedForest },
  { name: "Celestial Dreams", category: "Fantasy", image: celestialDreams },
  { name: "Vintage Drama", category: "Fantasy", image: vintageDrama },
];
