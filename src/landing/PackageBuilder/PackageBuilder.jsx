import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import SectionHeading from "../../components/SectionHeading";

/**
 * Figma: Klicpic mithu / Home — Customize Your Dream Package (1550:2783)
 * Add-on checklist on the left, live package summary card on the right.
 */
const BASE = { label: "Base Session (30 Photos)", price: 7999 };

const ADD_ONS = [
  { id: "photos", label: "30 Edited Photos (High-Res)", price: 0, included: true },
  { id: "album", label: "Premium Photo Album (30 pages)", price: 3500 },
  { id: "prints", label: "3 Framed Prints (10×12 inch)", price: 2500 },
  { id: "canvas", label: "Canvas Wall Art (24×36 inch)", price: 4000 },
  { id: "reel", label: "Instagram Reel (60 sec, edited)", price: 2000 },
  { id: "video", label: "Cinematic Video (3 min)", price: 6000 },
  { id: "usb", label: "Branded USB with RAW Files", price: 1500 },
];

const inr = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function PackageBuilder() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const chosen = useMemo(
    () => ADD_ONS.filter((addOn) => selected.includes(addOn.id)),
    [selected]
  );
  const total = useMemo(
    () => BASE.price + chosen.reduce((sum, addOn) => sum + addOn.price, 0),
    [chosen]
  );

  return (
    <section className="flex w-full flex-col items-center bg-[#fff7ed] px-4 py-16 sm:px-6 md:py-24">
      <div className="flex w-full max-w-[1440px] flex-col items-start">
        <SectionHeading
          eyebrow="Customize Your"
          title="Dream Package"
          subtitle="Build exactly what you want — pay only for what you love."
          subtitleClassName="text-[#6a7282] text-[16px]"
        />

        <div className="flex w-full justify-center pt-10 md:pt-16">
          <div className="grid w-full max-w-[1024px] grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Add-on list */}
            <div className="flex flex-col items-start gap-3">
              {ADD_ONS.map((addOn) => {
                const isOn = addOn.included || selected.includes(addOn.id);
                return (
                  <button
                    key={addOn.id}
                    type="button"
                    disabled={addOn.included}
                    onClick={() => toggle(addOn.id)}
                    className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-[20px] border-[1.402px] border-solid p-4 text-left transition-colors ${
                      isOn
                        ? "border-[#f9a825] bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]"
                        : "cursor-pointer border-[#e5e7eb] bg-[rgba(255,255,255,0.6)] hover:border-[#f9a825]"
                    } ${addOn.included ? "cursor-default" : ""}`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex size-[19.997px] shrink-0 items-center justify-center rounded-full border-[1.402px] border-solid ${
                          isOn
                            ? "border-[#f9a825] bg-[#f9a825]"
                            : "border-[#d1d5dc]"
                        }`}
                      >
                        {isOn && (
                          <Check className="size-[11.992px] text-white" strokeWidth={2.5} />
                        )}
                      </span>
                      <span className="text-[14px] leading-[20px] font-medium text-[#1f2937]">
                        {addOn.label}
                      </span>
                      {addOn.included && (
                        <span className="shrink-0 rounded-full bg-[#22c55e] px-2 py-[2px] text-[10px] leading-[15px] font-semibold whitespace-nowrap text-white">
                          Included
                        </span>
                      )}
                    </span>
                    {!addOn.included && (
                      <span className="text-[14px] leading-[20px] font-semibold whitespace-nowrap text-[#1f2937]">
                        +{inr(addOn.price)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="flex w-full flex-col items-start rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white p-6 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] sm:p-8">
                <h3 className="text-[20px] leading-7 font-bold text-[#1f2937]">
                  Your Package Summary
                </h3>

                <div className="flex w-full items-start justify-between gap-3 pt-6">
                  <span className="text-[14px] leading-[20px] text-[#6a7282]">
                    {BASE.label}
                  </span>
                  <span className="text-[14px] leading-[20px] font-medium whitespace-nowrap text-[#1f2937]">
                    {inr(BASE.price)}
                  </span>
                </div>

                {chosen.map((addOn) => (
                  <div
                    key={addOn.id}
                    className="flex w-full items-start justify-between gap-3 pt-3"
                  >
                    <span className="text-[14px] leading-[20px] text-[#6a7282]">
                      {addOn.label}
                    </span>
                    <span className="text-[14px] leading-[20px] font-medium whitespace-nowrap text-[#1f2937]">
                      {inr(addOn.price)}
                    </span>
                  </div>
                ))}

                <div className="w-full py-6">
                  <div className="flex w-full items-center justify-between border-t-[0.701px] border-solid border-[#f3f4f6] pt-4">
                    <span className="text-[16px] leading-6 font-bold text-[#1f2937]">
                      Total
                    </span>
                    <span className="text-[24px] leading-8 font-bold whitespace-nowrap text-[#f9a825]">
                      {inr(total)}
                    </span>
                  </div>
                </div>

                <Link
                  to="/book"
                  className="flex h-[55.994px] w-full items-center justify-center rounded-[20px] bg-[#f9a825] text-center text-[16px] leading-6 font-semibold text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#e69a1f]"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
