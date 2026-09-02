import React from "react";
import LegalDocument from "./LegalDocument";
import {
  TERMS_CALLOUT,
  TERMS_LINKS,
  TERMS_META,
  TERMS_SECTIONS,
} from "./termsData";

/** Figma: Klicpic mithu / Terms (1616:21799) */
export default function Terms() {
  return (
    <LegalDocument
      meta={TERMS_META}
      callout={TERMS_CALLOUT}
      sections={TERMS_SECTIONS}
      links={TERMS_LINKS}
    />
  );
}
