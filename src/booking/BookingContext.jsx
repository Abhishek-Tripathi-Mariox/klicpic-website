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

/** Defaults shown in the Figma frames before the user picks anything. */
const INITIAL = {
  shootType: null,
  vibe: null,
  theme: null,
  props: [],
  gown: null,
  location: "Studio",
  date: null,
  timeSlot: null,
  extras: "Premium Album",
  extrasList: [],
  package: null,
  coupon: null,
  total: 11499,
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => ({ ...INITIAL, ...readSaved() }));

  const value = useMemo(
    () => ({
      booking,
      set: (patch) => setBooking((current) => ({ ...current, ...patch })),
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
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
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
