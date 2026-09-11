import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { startJourney, updateJourney } from "../api/endpoints";
import { useBooking } from "./BookingContext";

/**
 * The server's copy of this visit through the wizard.
 *
 * It starts when the customer moves past the first step and follows every
 * step after, so the team can see where people stop. It stays anonymous until
 * Save Progress adds a WhatsApp number — only then can the customer be sent a
 * link back, and only then does the reminder job consider them.
 *
 * Tracking never gets in the customer's way: a failed update is dropped, and
 * the wizard carries on exactly as before.
 */
const JourneyContext = createContext(null);

const JOURNEY_KEY = "klicpic:journey";

function readJourney() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(JOURNEY_KEY) || "null");
    return saved?.id && saved?.token ? saved : null;
  } catch {
    return null;
  }
}

function writeJourney(journey) {
  try {
    if (journey) window.localStorage.setItem(JOURNEY_KEY, JSON.stringify(journey));
    else window.localStorage.removeItem(JOURNEY_KEY);
  } catch {
    /* private browsing — the journey lasts as long as the tab */
  }
}

/** The choices only; savedAt is local bookkeeping. */
const snapshotOf = ({ savedAt, ...choices }) => choices;

export function JourneyProvider({ screen, children }) {
  const { booking } = useBooking();
  const [journey, setJourneyState] = useState(readJourney);

  // Updates run one after another, reading the latest wizard state when they
  // actually go — so a start still in flight is never raced by the next step.
  const journeyRef = useRef(journey);
  const bookingRef = useRef(booking);
  const screenRef = useRef(screen);
  const queue = useRef(Promise.resolve());
  bookingRef.current = booking;
  screenRef.current = screen;

  const setJourney = useCallback((next) => {
    journeyRef.current = next;
    writeJourney(next);
    setJourneyState(next);
  }, []);

  const push = useCallback(
    (extra = {}) => {
      const run = async () => {
        const payload = {
          screen: screenRef.current,
          snapshot: snapshotOf(bookingRef.current),
          ...extra,
        };
        const contact = extra.mobile ? { mobile: extra.mobile, name: extra.name || "" } : {};
        const current = journeyRef.current;

        if (current) {
          try {
            const result = await updateJourney(current.id, { token: current.token, ...payload });
            if (!result?.completed) {
              const next = { ...current, ...contact, saved: Boolean(result?.saved || current.saved) };
              setJourney(next);
              return next;
            }
          } catch (error) {
            if (error.message !== "journey_not_found") throw error;
          }
        }

        // Nothing yet, or the last one already ended in a request (or is gone):
        // start afresh — carrying the number they gave, so it is not lost.
        if (!extra.mobile && current?.mobile) {
          payload.mobile = current.mobile;
          payload.name = current.name || "";
          contact.mobile = current.mobile;
          contact.name = current.name || "";
        }
        const created = await startJourney(payload);
        const next = { id: created.id, token: created.token, saved: Boolean(created.saved), ...contact };
        setJourney(next);
        return next;
      };

      const pending = queue.current.then(run, run);
      queue.current = pending.catch(() => {});
      return pending;
    },
    [setJourney]
  );

  // A reload opens the wizard on step 1 again; that is not the customer going
  // back, so the first render records nothing — the journey keeps the step
  // they had reached. Only a real move from here on is recorded. (Compared
  // against the last screen seen rather than a first-render flag, which a
  // re-run of the effect would defeat.)
  const lastScreen = useRef(screen);

  useEffect(() => {
    if (screen === lastScreen.current) return;
    lastScreen.current = screen;
    if (screen === "success") return;
    // The first screen on its own is a page view, not a journey.
    if (screen === "type" && !journeyRef.current) return;
    push().catch(() => {});
  }, [screen, push]);

  const value = useMemo(
    () => ({
      journey,
      /** Save Progress: attaches the number (and name) to this journey. */
      saveContact: ({ name, mobile }) => push({ name, mobile }),
      /** Records the current state without changing anything else. */
      sync: () => push(),
      /** The resume link restored this journey. */
      adopt: (restored) => setJourney(restored),
      /** The request is in; the next visit is a new journey. */
      finish: () => setJourney(null),
    }),
    [journey, push, setJourney]
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

/** Null outside the wizard, so shared components can still render. */
export const useJourney = () => useContext(JourneyContext);

export { readJourney };
