import React, { useState } from "react";
import BookingLayout from "./BookingLayout";
import { BookingProvider, useBooking } from "./BookingContext";
import StepType from "./steps/StepType";
import StepVibe from "./steps/StepVibe";
import StepDate from "./steps/StepDate";
import StepThemes from "./steps/StepThemes";
import StepProps from "./steps/StepProps";
import StepGowns from "./steps/StepGowns";
import StepLocation from "./steps/StepLocation";
import StepExtras from "./steps/StepExtras";
import StepPackage from "./steps/StepPackage";
import StepBook from "./steps/StepBook";
import StepSuccess from "./steps/StepSuccess";
import ThemeDetail from "./ThemeDetail";

/**
 * Klicpic booking wizard.
 * Figma frames: Step 1 Type 1550:11454 / 11817 · Step 2 Vibe 1550:12236 ·
 * Step 3 Details — date 1550:13236, themes 1550:14898 / 15939 ·
 * theme detail 1561:1996.
 *
 * Details sub-steps: Theme 1550:14898 / 15939 · Props 1552:16994 ·
 * Gowns 1552:17865 · Location 1615:3632 / 4011 / 4459 / 5001.
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
  "gowns",
  "location",
  "extras",
  "package",
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
  gowns: 3,
  location: 3,
  extras: 4,
  package: 5,
  book: 6,
  success: 6,
};

function Flow() {
  const { reset } = useBooking();
  const [screen, setScreen] = useState("type");
  const [openTheme, setOpenTheme] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  /** Figma shows KLP-527669; generated per session here. */
  const [requestId] = useState(
    () => `KLP-${Math.floor(100000 + Math.random() * 900000)}`
  );

  const go = (next) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          onNext={() => go("gowns")}
          onSkipAll={() => go("location")}
        />
      )}

      {screen === "gowns" && (
        <StepGowns
          onBack={() => go("props")}
          onNext={() => go("location")}
          onSkipAll={() => go("location")}
        />
      )}

      {screen === "location" && (
        <StepLocation
          onBack={() => go("gowns")}
          onNext={() => go("extras")}
          onSkipAll={() => go("extras")}
        />
      )}

      {screen === "extras" && (
        <StepExtras
          onBack={() => go("location")}
          onNext={() => go("package")}
          onSkip={() => go("package")}
        />
      )}

      {screen === "package" && (
        <StepPackage onBack={() => go("extras")} onNext={() => go("book")} />
      )}

      {screen === "book" && (
        <StepBook
          onBack={() => go("package")}
          onSubmit={(details) => {
            setSubmitted(details);
            go("success");
          }}
        />
      )}
    </BookingLayout>
  );
}

export default function BookingFlow() {
  return (
    <BookingProvider>
      <Flow />
    </BookingProvider>
  );
}
