import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../../components/SiteLayout";
import PolicyHero from "../../components/PolicyHero";

/**
 * Renders the shared legal-document layout used by Privacy (1616:21184) and
 * Terms (1616:21799): a tinted callout, numbered sections of bulleted rich
 * text, then a row of related links.
 */
const TONES = {
  amber: "border-[#fee685] bg-[#fffbeb] text-[#973c00]",
  blue: "border-[#bedbff] bg-[#eff6ff] text-[#193cb8]",
};

const LINK_TARGETS = {
  "Privacy Policy": "/privacy",
  "Terms of Service": "/terms",
  "Refund Policy": "/refund",
  FAQ: "/faq",
  "Contact Us": "/contact",
};

function RichText({ runs }) {
  return (
    <>
      {runs.map((run, index) =>
        run.b ? (
          <strong key={index} className="font-bold text-[#1f2937]">
            {run.t}
          </strong>
        ) : (
          <React.Fragment key={index}>{run.t}</React.Fragment>
        )
      )}
    </>
  );
}

export default function LegalDocument({ meta, callout, sections, links }) {
  return (
    <SiteLayout
    >
      <PolicyHero
        variant="legal"
        badge={meta.badge}
        title={meta.title}
        meta={meta.meta}
      />

      <section className="flex w-full flex-col items-center bg-white px-6 py-14">
        <div className="flex w-full max-w-[720px] flex-col items-start">
          {callout && (
            <div
              className={`w-full rounded-2xl border-[0.57px] border-solid p-5 text-[14px] leading-[22.75px] ${TONES[meta.tone]}`}
            >
              {callout.map((run, index) =>
                run.b ? (
                  <strong key={index} className="font-bold">
                    {run.t}
                  </strong>
                ) : (
                  <React.Fragment key={index}>{run.t}</React.Fragment>
                )
              )}
            </div>
          )}

          {sections.map((section) => (
            <div key={section.heading} className="w-full pt-10">
              {section.heading && (
                <h2 className="w-full border-b-[0.57px] border-solid border-[#f3f4f6] pb-2 text-[18px] leading-7 font-black text-[#1f2937]">
                  {section.heading}
                </h2>
              )}
              <div className="flex w-full flex-col items-start gap-[10px] pt-4">
                {section.items.map((item, index) =>
                  item.type === "li" ? (
                    <div key={index} className="flex w-full gap-3">
                      <span
                        aria-hidden
                        className="shrink-0 pt-[2px] text-[14px] leading-[22.75px] text-[#f9a825]"
                      >
                        •
                      </span>
                      <p className="text-[14px] leading-[22.75px] text-[#6a7282]">
                        <RichText runs={item.runs} />
                      </p>
                    </div>
                  ) : (
                    <p
                      key={index}
                      className="w-full text-[14px] leading-[22.75px] text-[#6a7282]"
                    >
                      <RichText runs={item.runs} />
                    </p>
                  )
                )}
              </div>
            </div>
          ))}

          <div className="mt-10 flex w-full flex-wrap items-start gap-4 border-t-[0.57px] border-solid border-[#e5e7eb] pt-8">
            {links.map((label) => (
              <Link
                key={label}
                to={LINK_TARGETS[label] ?? "/"}
                className="text-[14px] leading-[20px] text-[#99a1af] transition-colors hover:text-[#f9a825]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
