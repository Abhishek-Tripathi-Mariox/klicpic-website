/**
 * Figma: booking wizard — Theme sub-step (1550:14898 / 15939).
 * 24 themes across six categories, with the live-activity badges from the frame.
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
  { name: "Royal Boho", category: "Boho", image: royalBoho, viewing: "13 viewing", trending: true, booked: "#18 booked in Bangalore this week" },
  { name: "Desert Boho", category: "Boho", image: desertBoho, viewing: "6 viewing", booked: "#9 booked in Pune this week" },
  { name: "Forest Boho", category: "Boho", image: forestBoho, booked: "#11 booked in Hyderabad this week" },
  { name: "Moonlit Boho", category: "Boho", image: moonlitBoho, booked: "#6 booked in Chennai this week" },
  { name: "Floral Dream", category: "Floral", image: floralDream, viewing: "14 viewing", trending: true, booked: "#22 booked in Bangalore this week" },
  { name: "Princess Garden", category: "Floral", image: princessGarden, viewing: "11 viewing", trending: true, booked: "#16 booked in Mumbai this week" },
  { name: "Spring Bloom", category: "Floral", image: springBloom, viewing: "8 viewing", booked: "#10 booked in Delhi this week" },
  { name: "Rose Garden", category: "Floral", image: roseGarden, viewing: "5 viewing", booked: "#7 booked in Pune this week" },
  { name: "Classic White", category: "Classic", image: classicWhite, viewing: "11 viewing", booked: "#13 booked in Mumbai this week" },
  { name: "Timeless Grey", category: "Classic", image: timelessGrey, viewing: "5 viewing", booked: "#5 booked in Chennai this week" },
  { name: "Pearl Elegance", category: "Classic", image: pearlElegance, viewing: "6 viewing", booked: "#8 booked in Bangalore this week" },
  { name: "Soft Ivory", category: "Classic", image: softIvory, viewing: "6 viewing", booked: "#6 booked in Hyderabad this week" },
  { name: "Golden Hour", category: "Royal", image: goldenHour, viewing: "15 viewing", trending: true, booked: "#24 booked in Bangalore this week" },
  { name: "Velvet Royal", category: "Royal", image: velvetRoyal, viewing: "9 viewing", booked: "#12 booked in Mumbai this week" },
  { name: "Palace Dreams", category: "Royal", image: palaceDreams, viewing: "14 viewing", trending: true, booked: "#19 booked in Delhi this week" },
  { name: "Regal Crimson", category: "Royal", image: regalCrimson, viewing: "7 viewing", booked: "#7 booked in Pune this week" },
  { name: "Sunlit Meadow", category: "Outdoor", image: sunlitMeadow, viewing: "12 viewing", booked: "#15 booked in Bangalore this week" },
  { name: "Ocean Breeze", category: "Outdoor", image: oceanBreeze, viewing: "8 viewing", booked: "#10 booked in Mumbai this week" },
  { name: "Garden Party", category: "Outdoor", image: gardenParty, viewing: "7 viewing", booked: "#9 booked in Chennai this week" },
  { name: "Mountain Mist", category: "Outdoor", image: mountainMist, viewing: "6 viewing", booked: "#5 booked in Hyderabad this week" },
  { name: "Fairy Tale", category: "Fantasy", image: fairyTale, viewing: "11 viewing", booked: "#14 booked in Bangalore this week" },
  { name: "Enchanted Forest", category: "Fantasy", image: enchantedForest, viewing: "7 viewing", booked: "#7 booked in Pune this week" },
  { name: "Celestial Dreams", category: "Fantasy", image: celestialDreams, viewing: "9 viewing", booked: "#10 booked in Mumbai this week" },
  { name: "Vintage Drama", category: "Fantasy", image: vintageDrama, viewing: "6 viewing", booked: "#6 booked in Delhi this week" },
];
