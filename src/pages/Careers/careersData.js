/**
 * Careers content — Figma nodes 1550:9954 (list), 1550:10438 (expanded form)
 * and 1550:10988 (submitted). The three frames are one page in three states.
 *
 * Strings marked TRUNCATED were only available through Figma's metadata, which
 * clips node names at ~50 characters, and the Figma MCP server was unreachable
 * when this file was written. They are completed in the natural way and must be
 * checked against the frame before launch.
 */
export const HERO = {
  eyebrow: "Join the Team",
  title: "Work at Klicpic",
  // TRUNCATED in Figma metadata at: "We're building a world-class photography studio an"
  subtitle:
    "We're building a world-class photography studio and we want passionate people on the team.",
  /**
   * "12 Team Members" was invented — nothing in the CRM counts heads — and the
   * hardcoded "4 Open Roles" matched the live postings only by coincidence.
   * Both are gone; Careers.jsx counts the open roles from the live list and
   * renders whatever else stands here after them.
   */
  stats: [{ value: "Bangalore", label: "HQ" }],
};

export const BENEFITS = [
  {
    icon: "Sparkles",
    title: "Creative Freedom",
    description: "Bring your vision — we encourage experimentation.",
  },
  {
    icon: "TrendingUp",
    title: "Growth Mindset",
    // TRUNCATED at: "Training budgets, workshops, and mentorship includ"
    description: "Training budgets, workshops, and mentorship included.",
  },
  {
    icon: "Clock",
    title: "Flexible Work",
    description: "Hybrid & remote options for non-studio roles.",
  },
  {
    icon: "Wallet",
    title: "Competitive Pay",
    description: "Market-leading salaries + performance bonuses.",
  },
  {
    icon: "Camera",
    title: "Studio Access",
    description: "Free personal shoots for team members.",
  },
  {
    icon: "Heart",
    title: "Culture",
    // TRUNCATED at: "Monthly team outings, birthdays celebrated, no ego"
    description: "Monthly team outings, birthdays celebrated, no egos.",
  },
];

/**
 * Only the Senior Photographer card is expanded in the Figma frames, so it is
 * the only role whose description and requirements the design specifies. The
 * other three roles open straight to the application form.
 */
export const JOBS = [
  {
    id: "senior-photographer",
    title: "Senior Photographer",
    tags: ["Studio", "Full-time"],
    location: "Bangalore",
    commitment: "Full-time",
    description:
      "Lead photoshoots for families, maternity, and wedding clients. Manage a team of junior photographers and ensure consistent quality.",
    requirements: [
      "5+ years studio experience",
      "Proficiency in Lightroom & Capture One",
      "Strong portfolio in portrait/family photography",
      "Team leadership skills",
    ],
  },
  {
    id: "video-editor",
    title: "Video Editor & Reel Creator",
    tags: ["Post Production", "Full-time"],
    location: "Bangalore / Remote",
    commitment: "Full-time",
    description: null,
    requirements: [],
  },
  {
    id: "client-experience",
    title: "Client Experience Executive",
    tags: ["Customer Success", "Full-time"],
    location: "Bangalore",
    commitment: "Full-time",
    description: null,
    requirements: [],
  },
  {
    id: "social-media",
    title: "Social Media Manager",
    tags: ["Marketing", "Part-time / Contract"],
    location: "Remote",
    commitment: "Part-time / Contract",
    description: null,
    requirements: [],
  },
];

export const OPEN_APPLICATION = {
  title: "Don't see your role?",
  // TRUNCATED at: "Send us an open application — we're always looking"
  subtitle:
    "Send us an open application — we're always looking for great people.",
  email: "careers@klicpic.in",
};

/**
 * The page's own announcement strip is gone: "Rated 4.9/5 by 12,500+ happy
 * families" had no source — the site has no published reviews at all — and a
 * careers page is the last place to make a customer-facing claim. Careers now
 * shows the site-wide strip, like every other inner page.
 */
