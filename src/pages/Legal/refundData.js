/**
 * Figma: Klicpic mithu / Refund (1616:22448).
 * All copy is taken verbatim from the frame.
 */
export const REFUND_META = {
  badge: "Legal",
  title: "Refund & Cancellation Policy",
  meta: "Last updated: 1 January 2026 · Applies to all bookings made from this date",
};

export const REFUND_CALLOUT = {
  label: "The short version:",
  text: " Your 30% booking advance is non-refundable as cash. However, cancellations made with sufficient notice qualify for studio credit. Rescheduling is easy — one free change, no stress.",
};

/** tone → icon bubble + badge colours, straight from the frame. */
export const CANCELLATION_TIERS = [
  {
    tone: "green",
    window: "7+ days before shoot",
    badge: "Full studio credit",
    detail:
      "100% of your advance is issued as a Klicpic Studio Credit valid for 12 months. No cash refund.",
  },
  {
    tone: "amber",
    window: "3–7 days before shoot",
    badge: "50% forfeited",
    detail:
      "50% of your advance is forfeited. The remaining 50% is issued as studio credit valid for 6 months.",
  },
  {
    tone: "red",
    window: "Within 48–72 hours",
    badge: "Fully forfeited",
    detail:
      "The full advance is non-refundable. No studio credit is issued for very late cancellations.",
  },
  {
    tone: "red",
    window: "No-show (day of shoot)",
    badge: "Fully forfeited",
    detail:
      "If you do not arrive within 30 minutes of your scheduled time without prior notice, the full advance is forfeited and the slot is released.",
  },
];

export const RESCHEDULE_ROWS = [
  {
    title: "1st reschedule",
    note: "If requested ≥72 hours before session",
    value: "Free",
  },
  {
    title: "2nd reschedule",
    note: "Any time before the session",
    value: "₹499 admin fee",
  },
  {
    title: "3rd+ reschedule",
    note: "Booking may be cancelled at our discretion",
    value: "₹999 per reschedule",
  },
  {
    title: "< 24 hours notice",
    note: "Standard cancellation policy applies",
    value: "Counted as cancellation",
  },
];

export const RESCHEDULE_FOOTNOTE =
  "Rescheduling is subject to slot availability. We cannot guarantee the same date or time will be available.";

export const BALANCE_POINTS = [
  "The 70% balance is due on or before the shoot day and is only charged if the session proceeds.",
  "If you cancel before the shoot and the balance has been paid, the balance is refunded in full regardless of notice period.",
  "Only the 30% advance is subject to forfeiture conditions above.",
];

export const SPECIAL_CIRCUMSTANCES = [
  {
    emoji: "🏥",
    title: "Medical Emergency",
    text: "If you or an immediate family member faces a verified medical emergency, we will offer a full free reschedule or full studio credit regardless of the notice period — no questions asked. Please inform us as soon as possible.",
  },
  {
    emoji: "🏢",
    title: "Studio Cancellation",
    text: "In the rare event Klicpic must cancel your booking (photographer illness, studio emergency, equipment failure), you receive a 100% refund of your advance + ₹500 Klicpic credit as an apology — processed within 5 business days.",
  },
  {
    emoji: "🌧️",
    title: "Weather / Outdoor Shoots",
    text: "For outdoor shoots, if weather conditions are unsuitable, we will reschedule free of charge or offer an indoor studio session at no extra cost. The choice is yours.",
  },
  {
    emoji: "📸",
    title: "Unsatisfied with Photos",
    text: "If you are genuinely unhappy with the results, please raise your concern within 7 days of delivery. We will review and offer targeted re-edits or, in serious cases, a partial studio credit. Refunds are not provided for subjective creative differences.",
  },
];

export const HOW_TO_STEPS = [
  "Log in to your Klicpic Dashboard and navigate to your active booking.",
  "Use the 'Add a Request' field to inform us of your cancellation or preferred new date.",
  "Alternatively, call or WhatsApp us at +91 98765 43210.",
  "You will receive a confirmation message within 2 hours during studio hours.",
  "Studio credit (if applicable) will be issued as a voucher code within 2 business days.",
];

export const REFUND_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "FAQ",
  "Contact Us",
];
