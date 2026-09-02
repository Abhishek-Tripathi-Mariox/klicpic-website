import React from "react";
import LegalDocument from "./LegalDocument";
import {
  PRIVACY_CALLOUT,
  PRIVACY_LINKS,
  PRIVACY_META,
  PRIVACY_SECTIONS,
} from "./privacyData";

/** Figma: Klicpic mithu / Privacy (1616:21184) */
export default function Privacy() {
  return (
    <LegalDocument
      meta={PRIVACY_META}
      callout={PRIVACY_CALLOUT}
      sections={PRIVACY_SECTIONS}
      links={PRIVACY_LINKS}
    />
  );
}
