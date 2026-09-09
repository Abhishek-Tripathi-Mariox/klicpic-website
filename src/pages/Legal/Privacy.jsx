import React from "react";
import LegalDocument from "./LegalDocument";
import {
  PRIVACY_CALLOUT as LOCAL_PRIVACY_CALLOUT,
  PRIVACY_LINKS as LOCAL_PRIVACY_LINKS,
  PRIVACY_META as LOCAL_PRIVACY_META,
  PRIVACY_SECTIONS as LOCAL_PRIVACY_SECTIONS,
} from "./privacyData";
import { useContent } from "../../api/useContent";

/** Figma: Klicpic mithu / Privacy (1616:21184) */
export default function Privacy() {
  // Live copy from the backend, falling back to what this build shipped.
  const { content } = useContent("legal-privacy", {
    PRIVACY_CALLOUT: LOCAL_PRIVACY_CALLOUT,
    PRIVACY_LINKS: LOCAL_PRIVACY_LINKS,
    PRIVACY_META: LOCAL_PRIVACY_META,
    PRIVACY_SECTIONS: LOCAL_PRIVACY_SECTIONS,
  });
  const {
    PRIVACY_CALLOUT,
    PRIVACY_LINKS,
    PRIVACY_META,
    PRIVACY_SECTIONS,
  } = content;

  return (
    <LegalDocument
      meta={PRIVACY_META}
      callout={PRIVACY_CALLOUT}
      sections={PRIVACY_SECTIONS}
      links={PRIVACY_LINKS}
    />
  );
}
