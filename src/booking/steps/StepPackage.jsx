import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useBooking } from "../BookingContext";
import {
  BASE_SESSION,
  BUNDLE_SAVINGS_RATE,
  CUSTOM_ADDONS,
  PLANS,
} from "../packageData";

/**
 * Figma: Step 5 Package — Choose a Plan (1615:7929) and Build Your Own
 * (1615:8477 / 8828) with base session, bundle savings and total.
 */
const inr = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function StepPackage({ onBack, onNext }) {
  const { booking, set } = useBooking();
  const [tab, setTab] = useState("plan");
  const [addons, setAddons] = useState([]);

  const toggle = (name) =>
    setAddons((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );

  const { addonTotal, savings, total } = useMemo(() => {
    const chosen = CUSTOM_ADDONS.filter(
      (item) => !item.included && addons.includes(item.name)
    );
    const sum = chosen.reduce((acc, item) => acc + item.price, 0);
    const gross = BASE_SESSION.price + sum;
    const save = sum > 0 ? Math.round(gross * BUNDLE_SAVINGS_RATE) : 0;
    return { addonTotal: sum, savings: save, total: gross - save };
  }, [addons]);

  return (
    <div className="flex w-full flex-col items-start pb-16">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-[14px] leading-[20px] text-[#6a7282] transition-colors hover:text-[#f9a825]"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
        Back to Extras
      </button>

      <h2 className="pt-4 text-[30px] leading-9 font-bold text-[#1f2937]">
        Choose your package
      </h2>
      <p className="pt-2 text-[16px] leading-6 text-[#6a7282]">
        Pick a plan or build your own custom package
      </p>

      {/* tabs */}
      <div className="flex items-center gap-2 pt-8">
        {[
          { id: "plan", label: "Choose a Plan" },
          { id: "custom", label: "Build Your Own" },
        ].map((item) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`cursor-pointer rounded-full px-5 py-[10px] text-[14px] leading-[20px] font-semibold transition-colors ${
                active
                  ? "bg-[#f9a825] text-white"
                  : "border-[0.701px] border-solid border-[#e5e7eb] bg-white text-[#6a7282] hover:border-[#f9a825] hover:text-[#f9a825]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "plan" ? (
        <div className="grid w-full grid-cols-1 gap-4 pt-6 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const selected = booking.package === plan.name;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col items-start rounded-2xl border-[1.71px] border-solid bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] ${
                  plan.badge || selected ? "border-[#f9a825]" : "border-[#f3f4f6]"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f9a825] px-4 py-1 text-[11px] leading-[17px] font-bold whitespace-nowrap text-white">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-[20px] leading-7 font-bold text-[#1f2937]">
                  {plan.name}
                </h3>
                <p className="pt-1 text-[24px] leading-8 font-bold text-[#f9a825]">
                  {plan.price}
                </p>
                <p className="pt-1 text-[12px] leading-4 text-[#99a1af]">
                  {plan.delivery}
                </p>

                <ul className="flex w-full flex-col gap-[6px] pt-4">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-center gap-2">
                      {feature.included ? (
                        <Check className="size-[14px] shrink-0 text-[#00c950]" strokeWidth={2.5} />
                      ) : (
                        <X className="size-[14px] shrink-0 text-[#d1d5dc]" strokeWidth={2.5} />
                      )}
                      <span
                        className={`text-[14px] leading-[20px] ${
                          feature.included ? "text-[#1f2937]" : "text-[#d1d5dc]"
                        }`}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    set({ package: plan.name });
                    onNext?.();
                  }}
                  className={`mt-auto w-full cursor-pointer rounded-2xl py-[10px] text-center text-[14px] leading-[20px] font-bold transition-colors ${
                    plan.badge
                      ? "bg-[#f9a825] text-white hover:bg-[#e69a1f]"
                      : "bg-[#1f2937] text-white hover:bg-[#374151]"
                  }`}
                  style={{ marginTop: "24px" }}
                >
                  Select {plan.name}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full pt-6">
          <div className="flex w-full flex-col items-start gap-3 rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
            {CUSTOM_ADDONS.map((item) => {
              const on = item.included || addons.includes(item.name);
              return (
                <button
                  key={item.name}
                  type="button"
                  disabled={item.included}
                  onClick={() => toggle(item.name)}
                  className={`flex w-full items-center justify-between rounded-2xl border-[1.402px] border-solid p-4 text-left transition-colors ${
                    on
                      ? "border-[#f9a825] bg-[#fffbeb]"
                      : "cursor-pointer border-[#e5e7eb] bg-white hover:border-[#f9a825]"
                  } ${item.included ? "cursor-default" : ""}`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border-[1.402px] border-solid ${
                        on ? "border-[#f9a825] bg-[#f9a825]" : "border-[#d1d5dc]"
                      }`}
                    >
                      {on && <Check className="size-3 text-white" strokeWidth={3} />}
                    </span>
                    <span className="text-[14px] leading-[20px] font-medium text-[#1f2937]">
                      {item.name}
                    </span>
                    {item.included && (
                      <span className="rounded-full bg-[#22c55e] px-2 py-[2px] text-[10px] leading-[15px] font-semibold whitespace-nowrap text-white">
                        Included
                      </span>
                    )}
                  </span>
                  {!item.included && (
                    <span className="shrink-0 text-[14px] leading-[20px] font-semibold whitespace-nowrap text-[#1f2937]">
                      +{inr(item.price)}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="mt-2 w-full border-t-[0.701px] border-solid border-[#f3f4f6] pt-4">
              <div className="flex w-full items-center justify-between">
                <span className="text-[14px] leading-[20px] text-[#6a7282]">
                  {BASE_SESSION.label}
                </span>
                <span className="text-[14px] leading-[20px] font-medium text-[#1f2937]">
                  {inr(BASE_SESSION.price)}
                </span>
              </div>
              {savings > 0 && (
                <div className="flex w-full items-center justify-between pt-2">
                  <span className="text-[14px] leading-[20px] text-[#00a63e]">
                    Bundle Savings ({Math.round(BUNDLE_SAVINGS_RATE * 100)}%)
                  </span>
                  <span className="text-[14px] leading-[20px] font-medium text-[#00a63e]">
                    −{inr(savings)}
                  </span>
                </div>
              )}
              <div className="flex w-full items-center justify-between pt-3">
                <span className="text-[16px] leading-6 font-bold text-[#1f2937]">
                  Total
                </span>
                <span className="text-[20px] leading-7 font-bold text-[#f9a825]">
                  {inr(total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                set({ package: "Custom", total });
                onNext?.();
              }}
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#f9a825] py-3 text-center text-[16px] leading-6 font-bold text-white transition-colors hover:bg-[#e69a1f]"
            >
              Book Custom Package
              <ArrowRight className="size-4 shrink-0" strokeWidth={1.666} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
