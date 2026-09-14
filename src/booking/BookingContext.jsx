import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * Wizard state for the Klicpic booking flow.
 * Figma: BookingLayout 1550:11461 — the summary sidebar reads from this, and
 * each step writes into it.
 */
const BookingContext = createContext(null);

/** "Save Progress" parks the wizard here so a reload can pick it back up. */
const STORAGE_KEY = "klicpic:booking";

function readSaved() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

/**
 * Nothing is chosen yet.
 *
 * The frames show a filled-in summary (Studio · Premium Album · ₹11,499) to
 * illustrate the design, but presenting those as the customer's choices — and
 * quoting a price for a booking with no package — is a promise we cannot keep.
 * The summary stays empty until they pick.
 */
const INITIAL = {
  shootType: null,
  /** The admin's exact "Type of Photoshoot" value, e.g. "Newborn Photoshoot". */
  shootTypeValue: null,
  vibe: null,
  theme: null,
  props: [],
  location: null,
  /** Where the shoot happens: a CRM studio branch, or an address we travel to. */
  locationType: null,
  studioId: null,
  studioName: "",
  customStudioAddress: "",
  customStudioMapLink: "",
  date: null,
  timeSlot: null,
  extras: null,
  extrasList: [],
  /** The chosen add-ons with their amounts — names alone cannot be priced. */
  extrasItems: [],
  package: null,
  /** The CRM package the customer picked, so the lead's request can name it exactly. */
  packageId: null,
  /** Kept so add-ons can re-price without re-reading the catalogue. */
  packagePrice: 0,
  coupon: null,
  /** True when the offer link they arrived on had expired. */
  couponFailed: false,
  total: 0,
};

/** "₹7,999" or 7999 → 7999. The catalogue mixes both. */
const asAmount = (value) =>
  typeof value === "number" ? value : Number(String(value || "").replace(/[^\d]/g, "")) || 0;

/**
 * What the booking costs, from what has actually been chosen.
 *
 * One place decides this, so the summary, the confirmation screen and the
 * request that reaches the CRM can never disagree.
 */
export function priceBooking({ packagePrice = 0, extras = [] } = {}) {
  const base = asAmount(packagePrice);
  const addOns = extras.reduce((sum, item) => sum + asAmount(item?.price ?? item), 0);
  // Nothing picked yet is 0, not a guess.
  return base + addOns;
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => ({ ...INITIAL, ...readSaved() }));

  const value = useMemo(
    () => ({
      booking,
      set: (patch) => setBooking((current) => ({ ...current, ...patch })),
      /** Replaces everything with a saved plan — the resume link's. */
      restore: (saved) => setBooking({ ...INITIAL, ...saved }),
      reset: () => {
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* private browsing — the in-memory reset below still applies */
        }
        setBooking(INITIAL);
      },
      /** Returns false when storage is unavailable so the UI can say so. */
      save: () => {
        try {
          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ ...booking, savedAt: Date.now() })
          );
          return true;
        } catch {
          return false;
        }
      },
    }),
    [booking]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside BookingProvider");
  return context;
}

/** The wizard steps, in the order the portal lists them. */
const JOURNEY_STEPS = [
  { label: "Shoot Type", done: (b) => Boolean(b.shootType) },
  { label: "Vibe", done: (b) => Boolean(b.vibe) },
  { label: "Theme", done: (b) => Boolean(b.theme) },
  { label: "Package", done: (b) => Boolean(b.package) },
  { label: "Extras", done: (b) => Boolean(b.extrasList?.length || b.extras) },
  { label: "Date & Time", done: (b) => Boolean(b.date && b.timeSlot) },
];

/**
 * What "Save Progress" actually parked, for the portal's Saved Journey card.
 * Returns null when there is nothing saved — the card should not claim a
 * journey the customer never started.
 */
export function readSavedJourney() {
  const saved = readSaved();
  if (!saved) return null;

  const steps = JOURNEY_STEPS.map((step) => ({
    label: step.label,
    done: step.done(saved),
  }));
  const done = steps.filter((step) => step.done).length;
  if (!done) return null;

  return { steps, done, total: steps.length, savedAt: saved.savedAt || null };
}
