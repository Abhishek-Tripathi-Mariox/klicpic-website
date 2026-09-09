import React from "react";
import LegalDocument from "./LegalDocument";
import {
  TERMS_CALLOUT as LOCAL_TERMS_CALLOUT,
  TERMS_LINKS as LOCAL_TERMS_LINKS,
  TERMS_META as LOCAL_TERMS_META,
  TERMS_SECTIONS as LOCAL_TERMS_SECTIONS,
} from "./termsData";
import { useContent } from "../../api/useContent";

/** Figma: Klicpic mithu / Terms (1616:21799) */
export default function Terms() {
  // Live copy from the backend, falling back to what this build shipped.
  const { content } = useContent("legal-terms", {
    TERMS_CALLOUT: LOCAL_TERMS_CALLOUT,
    TERMS_LINKS: LOCAL_TERMS_LINKS,
    TERMS_META: LOCAL_TERMS_META,
    TERMS_SECTIONS: LOCAL_TERMS_SECTIONS,
  });
  const {
    TERMS_CALLOUT,
    TERMS_LINKS,
    TERMS_META,
    TERMS_SECTIONS,
  } = content;

  return (
    <LegalDocument
      meta={TERMS_META}
      callout={TERMS_CALLOUT}
      sections={TERMS_SECTIONS}
      links={TERMS_LINKS}
    />
  );
}
