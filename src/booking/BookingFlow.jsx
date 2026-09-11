import React, { useEffect, useState } from "react";
import { fetchOffer, resumeJourney } from "../api/endpoints";
import BookingLayout from "./BookingLayout";
import { BookingProvider, useBooking } from "./BookingContext";
import { JourneyProvider, useJourney } from "./JourneyContext";
import StepType from "./steps/StepType";
import StepVibe from "./steps/StepVibe";
import StepDate from "./steps/StepDate";
import StepThemes from "./steps/StepThemes";
import StepProps from "./steps/StepProps";
import StepLocation from "./steps/StepLocation";
import StepExtras from "./steps/StepExtras";
import StepPackage from "./steps/StepPackage";
import StepBook from "./steps/StepBook";
import StepSuccess from "./steps/StepSuccess";
import { submitBookingRequest } from "../api/endpoints";
import ThemeDetail from "./ThemeDetail";

/**
 * Klicpic booking wizard.
 * Figma frames: Step 1 Type 1550:11454 / 11817 · Step 2 Vibe 1550:12236 ·
 * Step 3 Details — date 1550:13236, themes 1550:14898 / 15939 ·
 * theme detail 1561:1996.
 *
 * Details sub-steps: Theme 1550:14898 / 15939 · Props 1552:16994 ·
 * Location 1615:3632 / 4011 / 5001. (The frames' Gowns sub-step, 1552:17865,
 * is gone — the CRM keeps gowns as props, so the Props step already lists
 * them and the extra step asked the same question twice.)
 *
 * Step 4 Extras 1615:5393 / 5956 (+ modals 1615:6539, 7254) ·
 * Step 5 Package 1615:7929 / 8477 / 8828 · Step 6 Book 1615:9205 ·
 * Success 1615:9520.
 */
const SCREENS = [
  "type",
  "vibe",
  "date",
  "themes",
  "themeDetail",
  "props",
  "location",
  "package",
  "extras",
  "book",
  "success",
];

const STEP_FOR_SCREEN = {
  type: 1,
  vibe: 2,
  date: 3,
  themes: 3,
  themeDetail: 3,
  props: 3,
  location: 3,
  package: 4,
  extras: 5,
  book: 6,
  success: 6,
};

function Flow({ screen, setScreen }) {
  const { booking, set, reset, restore } = useBooking();
  const journeyApi = useJourney();
  // "Welcome back" after a resume link, or why the link could not restore.
  const [notice, setNotice] = useState("");

  // A visitor who clicked "Claim Offer" arrives at /book?offer=CODE. Resolve it
  // once, so the summary shows what they came for and the request records it.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("offer");
    if (!code) return undefined;

    let active = true;
    fetchOffer(code)
      .then((offer) => {
        if (!active || !offer) return;
        set({
          coupon: {
            id: offer.id,
            code: offer.code,
            title: offer.title,
            subtitle: offer.worth || offer.description,
          },
        });
      })
      .catch(() => {
        // An expired or mistyped code simply does not apply — the wizard
        // carries on rather than blocking the booking.
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openTheme, setOpenTheme] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // The backend returns the real reference; this placeholder only shows if the
  // request somehow reaches the success screen without one.
  const [requestId, setRequestId] = useState(
    () => `KLP-${Math.floor(100000 + Math.random() * 900000)}`
  );

  /**
   * The whole wizard lives on one route, so without a history entry per step
   * the browser's Back button leaves /book altogether — one tap and the
   * customer is back on the page they came from, answers and all. Each step
   * pushes its own entry; `replace` is for the hop that must not be
   * re-entered, i.e. landing on the success screen.
   */
  const go = (next, { replace = false } = {}) => {
    setScreen(next);
    // Keep whatever react-router already parked on this entry (it tracks its
    // own index there) and just add our step to it.
    const state = { ...(window.history.state || {}), bookingScreen: next };
    if (replace) window.history.replaceState(state, "");
    else window.history.pushState(state, "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Stamp the entry the customer arrived on, so Back from step 2 has
    // somewhere to land instead of falling out of the wizard.
    window.history.replaceState(
      { ...(window.history.state || {}), bookingScreen: "type" },
      ""
    );

    const onPopState = (event) => {
      const previous = event.state?.bookingScreen;
      if (!previous) return;
      setScreen(previous);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  /**
   * The WhatsApp reminder links to /book?resume=TOKEN. Restore what was saved
   * and land on the step they left, with that journey carried on — so the
   * team sees the same visit continue rather than a new one.
   */
  // Read once: the effect below takes it out of the address bar, and a
  // re-run of the effect must still know it.
  const [resumeToken] = useState(() => new URLSearchParams(window.location.search).get("resume"));

  useEffect(() => {
    const token = resumeToken;
    if (!token) return undefined;

    const params = new URLSearchParams(window.location.search);
    // Out of the address bar, so a refresh or a forwarded URL doesn't reuse it.
    params.delete("resume");
    const query = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`
    );

    let active = true;
    resumeJourney(token)
      .then((result) => {
        if (!active || !result) return;
        if (result.completed) {
          setNotice("You've already sent this booking request — our team will be in touch. You can start a new one below.");
          return;
        }
        restore(result.snapshot || {});
        journeyApi?.adopt({ id: result.id, token, saved: result.saved, name: result.name || "" });
        const first = (result.name || "").trim().split(/\s+/)[0];
        setNotice(`Welcome back${first ? `, ${first}` : ""} — your plan is just as you left it.`);
        const target = result.screen === "themeDetail" ? "themes" : result.screen;
        if (target && target !== "type" && SCREENS.includes(target)) go(target);
      })
      .catch(() => active && setNotice("That link has expired — let's start fresh."));

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Sends the whole wizard — the contact details from this step plus every
   * choice held in BookingContext — and only advances once the backend has it.
   * A failure keeps the customer on the form with their answers intact.
   */
  const sendRequest = async (details) => {
    setSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitBookingRequest({
        name: details.fullName,
        mobile: details.phone,
        email: details.email,
        city: details.city,
        whatsapp: details.whatsapp,
        message: details.notes,
        // The Lead stores the admin's value; the backend also normalises it.
        shootType: booking.shootTypeValue || booking.shootType,
        vibe: booking.vibe,
        theme: booking.theme,
        props: booking.props,
        location: booking.location,
        // A branch id books the real studio; an address books a shoot we
        // travel to — the same two shapes the admin panel supports.
        locationType: booking.locationType,
        studioId: booking.studioId,
        studio: booking.studioName,
        customStudioAddress: booking.customStudioAddress,
        customStudioMapLink: booking.customStudioMapLink,
        date: booking.date,
        timeSlot: booking.timeSlot,
        extrasList: booking.extrasList,
        extrasItems: booking.extrasItems,
        package: booking.package,
        packageId: booking.packageId,
        coupon: booking.coupon,
        // Lets the backend count the claim against the offer record.
        offerCode: booking.coupon?.code || booking.coupon?.id || null,
        total: booking.total,
        // Closes this visit's journey, so no reminder follows a finished request.
        journeyId: journeyApi?.journey?.id || null,
        journeyToken: journeyApi?.journey?.token || null,
      });

      journeyApi?.finish();
      if (result?.requestId) setRequestId(result.requestId);
      setSubmitted(details);
      go("success", { replace: true });
    } catch (cause) {
      setSubmitError(cause.message || "We couldn't send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (screen === "success") {
    return (
      <BookingLayout step={6} showSummary={false} showStepper={false}>
        <StepSuccess
          requestId={requestId}
          name={submitted?.fullName}
          onHome={() => {
            reset();
            go("type");
          }}
        />
      </BookingLayout>
    );
  }

  return (
    <BookingLayout step={STEP_FOR_SCREEN[screen]}>
      {notice && (
        <div className="mb-5 flex w-full items-start justify-between gap-3 rounded-2xl border-[0.57px] border-solid border-[#fee685] bg-[#fffbeb] px-4 py-3 text-[13px] leading-5 font-semibold text-[#973c00]">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss"
            className="shrink-0 cursor-pointer text-[#b45309] hover:text-[#1f2937]"
          >
            ✕
          </button>
        </div>
      )}

      {screen === "type" && <StepType onNext={() => go("vibe")} />}

      {screen === "vibe" && (
        <StepVibe onNext={() => go("date")} onBack={() => go("type")} />
      )}

      {screen === "date" && (
        <StepDate
          onNext={() => go("themes")}
          onRestart={() => {
            reset();
            go("type");
          }}
        />
      )}

      {screen === "themes" && (
        <StepThemes
          onBack={() => go("vibe")}
          onNext={() => go("props")}
          onOpenTheme={(theme) => {
            setOpenTheme(theme);
            go("themeDetail");
          }}
        />
      )}

      {screen === "themeDetail" && openTheme && (
        <ThemeDetail
          theme={openTheme}
          onBack={() => go("themes")}
          onSelect={() => go("themes")}
        />
      )}

      {screen === "props" && (
        <StepProps
          onBack={() => go("themes")}
          onNext={() => go("location")}
          onSkipAll={() => go("location")}
        />
      )}

      {screen === "location" && (
        <StepLocation
          onBack={() => go("props")}
          onNext={() => go("package")}
          onSkipAll={() => go("package")}
        />
      )}

      {screen === "package" && (
        <StepPackage onBack={() => go("location")} onNext={() => go("extras")} />
      )}

      {screen === "extras" && (
        <StepExtras
          onBack={() => go("package")}
          onNext={() => go("book")}
          onSkip={() => go("book")}
        />
      )}

      {screen === "book" && (
        <StepBook
          onBack={() => go("extras")}
          submitting={submitting}
          error={submitError}
          onSubmit={sendRequest}
        />
      )}
    </BookingLayout>
  );
}

export default function BookingFlow() {
  // Held here, above the journey, so every step change is recorded.
  const [screen, setScreen] = useState("type");

  return (
    <BookingProvider>
      <JourneyProvider screen={screen}>
        <Flow screen={screen} setScreen={setScreen} />
      </JourneyProvider>
    </BookingProvider>
  );
}
