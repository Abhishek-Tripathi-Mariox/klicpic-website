/**
 * Figma: Klicpic mithu / About (1550:9523).
 * All copy is taken verbatim from the frame.
 */
import arjunMehta from "./assets/arjun-mehta.jpg";
import priyaSharma from "./assets/priya-sharma.jpg";
import rohanVerma from "./assets/rohan-verma.jpg";
import snehaKapoor from "./assets/sneha-kapoor.jpg";

export const STORY = [
  "Klicpic started in a 200 sq. ft. studio in Bangalore with one camera, two softboxes, and an obsession with perfect light. Founder Arjun Mehta quit his corporate job to pursue what he truly loved — capturing the raw emotion of families, couples, and new lives.",
  "Today we shoot from two studios — HSR Layout in Bengaluru and Nizampet in Hyderabad — and travel to homes and venues for select shoots. The spirit remains the same: every click matters.",
];

/**
 * Only what can be checked. "12,500+ Sessions Done" and "4.9 ★ Average
 * Rating" were invented — the studio has no published reviews at all — and
 * "3 Cities" was wrong: there are two studios, in two cities.
 */
export const STATS = [
  { value: "11 yrs", label: "In Business" },
  { value: "2", label: "Studios" },
];

/** icon keys map to lucide components in About.jsx */
export const VALUES = [
  { icon: "heart", title: "Passion First", text: "We treat every shoot as if it were our own family's memory." },
  { icon: "gem", title: "Craft Over Speed", text: "We never rush. Great photography requires patience and precision." },
  { icon: "smile", title: "Client Delight", text: "Your 5-star smile at delivery is the only metric that matters." },
  { icon: "users", title: "Team Spirit", text: "A collaborative studio where every artist brings their best." },
];

export const TEAM = [
  { name: "Arjun Mehta", role: "Founder & Lead Photographer", quote: '"Every frame is a promise."', image: arjunMehta },
  { name: "Priya Sharma", role: "Creative Director", quote: '"Light is everything."', image: priyaSharma },
  { name: "Rohan Verma", role: "Senior Photographer", quote: '"Candid moments last forever."', image: rohanVerma },
  { name: "Sneha Kapoor", role: "Album & Print Designer", quote: '"Design is memory made tangible."', image: snehaKapoor },
];

export const STUDIO = {
  address: "Studio 12, 4th Floor, MG Road, Bangalore — 560001",
  hours: "Mon – Sat · 10 AM – 7 PM · By appointment preferred",
};
