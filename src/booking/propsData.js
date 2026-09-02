/**
 * Figma: booking wizard — Props sub-step (1552:16994).
 * 20 props across five categories with their live-activity badges.
 */
import goldThrone from "./assets/props/gold-throne.jpg";
import victorianChair from "./assets/props/victorian-chair.jpg";
import woodenBench from "./assets/props/wooden-bench.jpg";
import swingSet from "./assets/props/swing-set.jpg";
import floralArch from "./assets/props/floral-arch.jpg";
import floralCrown from "./assets/props/floral-crown.jpg";
import petalShower from "./assets/props/petal-shower.jpg";
import roseWall from "./assets/props/rose-wall.jpg";
import fairyLights from "./assets/props/fairy-lights.jpg";
import neonSign from "./assets/props/neon-sign.jpg";
import candleSet from "./assets/props/candle-set.jpg";
import lanterns from "./assets/props/lanterns.jpg";
import wickerBasket from "./assets/props/wicker-basket.jpg";
import macramWall from "./assets/props/macram-wall.jpg";
import vintageMirror from "./assets/props/vintage-mirror.jpg";
import featherFan from "./assets/props/feather-fan.jpg";
import balloonArc from "./assets/props/balloon-arc.jpg";
import giantLetters from "./assets/props/giant-letters.jpg";
import confettiCannon from "./assets/props/confetti-cannon.jpg";
import smokeBombs from "./assets/props/smoke-bombs.jpg";

export const PROP_FILTERS = ["All", "Furniture", "Floral", "Lighting", "Accessories", "Fun"];

export const PROPS = [
  { name: "Gold Throne", category: "Furniture", image: goldThrone, viewing: "6 viewing", slots: "3 slots" },
  { name: "Victorian Chair", category: "Furniture", image: victorianChair, viewing: "5 viewing", slots: "\u26a1 2 slots" },
  { name: "Wooden Bench", category: "Furniture", image: woodenBench, viewing: "4 viewing" },
  { name: "Swing Set", category: "Furniture", image: swingSet, viewing: "6 viewing" },
  { name: "Floral Arch", category: "Floral", image: floralArch, viewing: "7 viewing", slots: "3 slots" },
  { name: "Floral Crown", category: "Floral", image: floralCrown, viewing: "6 viewing", slots: "\ud83d\udd25 1 slot left!" },
  { name: "Petal Shower", category: "Floral", image: petalShower, viewing: "4 viewing", slots: "3 slots" },
  { name: "Rose Wall", category: "Floral", image: roseWall, viewing: "5 viewing", slots: "\u26a1 2 slots" },
  { name: "Fairy Lights", category: "Lighting", image: fairyLights, viewing: "9 viewing", slots: "\ud83d\udd25 1 slot left!" },
  { name: "Neon Sign", category: "Lighting", image: neonSign, viewing: "7 viewing", slots: "3 slots" },
  { name: "Candle Set", category: "Lighting", image: candleSet, viewing: "2 viewing", slots: "\ud83d\udd25 1 slot left!" },
  { name: "Lanterns", category: "Lighting", image: lanterns, viewing: "4 viewing", slots: "3 slots" },
  { name: "Wicker Basket", category: "Accessories", image: wickerBasket, viewing: "3 viewing", slots: "3 slots" },
  { name: "Macram\u00e9 Wall", category: "Accessories", image: macramWall, viewing: "4 viewing", slots: "\u26a1 2 slots" },
  { name: "Vintage Mirror", category: "Accessories", image: vintageMirror, viewing: "2 viewing", slots: "3 slots" },
  { name: "Feather Fan", category: "Accessories", image: featherFan, viewing: "2 viewing", slots: "\u26a1 2 slots" },
  { name: "Balloon Arc", category: "Fun", image: balloonArc, viewing: "7 viewing", slots: "\u26a1 2 slots" },
  { name: "Giant Letters", category: "Fun", image: giantLetters, viewing: "2 viewing", slots: "\u26a1 2 slots" },
  { name: "Confetti Cannon", category: "Fun", image: confettiCannon, viewing: "6 viewing", slots: "\u26a1 2 slots" },
  { name: "Smoke Bombs", category: "Fun", image: smokeBombs, viewing: "4 viewing", slots: "\u26a1 2 slots" },
];
