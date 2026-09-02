import React, { useState } from "react";
import { Check, Clock, ExternalLink, MapPin } from "lucide-react";
import { useBooking } from "../BookingContext";
import DetailsShell from "../DetailsShell";
import {
  LOCATION_OPTIONS,
  OUTDOOR_CITY,
  OUTDOOR_FOOTNOTE,
  OUTDOOR_SPOTS,
  STUDIO_BRANCHES,
} from "../locationData";

/**
 * Figma: booking wizard — Location sub-step.
 * Collapsed 1615:3632; picking an option expands it —
 * Klicpic Studios 1615:4011, Outdoor 1615:4459, Your Venue 1615:5001.
 */
export default function StepLocation({ onBack, onNext, onSkipAll }) {
  const { booking, set } = useBooking();
  const [open, setOpen] = useState(null);
  const [branch, setBranch] = useState(null);
  const [spot, setSpot] = useState(null);

  const choose = (option) => {
    setOpen(option.id);
    set({ location: option.id === "studio" ? "Klicpic Studios" : option.name });
  };

  return (
    <DetailsShell
      index={3}
      hint="Location required to continue"
      backLabel="Gowns"
      nextLabel="Continue to Extras"
      canContinue={Boolean(open)}
      onBack={onBack}
      onNext={onNext}
      onSkipAll={onSkipAll}
      footNote={
        open
          ? "All required selections made ✓"
          : "Complete required selections to continue"
      }
    >
      <h3 className="pt-6 text-[16px] leading-6 font-bold text-[#1f2937]">
        Where would you like your shoot?
      </h3>

      <div className="flex w-full flex-col items-start gap-3 pt-4">
        {LOCATION_OPTIONS.map((option) => {
          const isOpen = open === option.id;
          return (
            <div
              key={option.id}
              className={`w-full overflow-hidden rounded-2xl border-[0.701px] border-solid transition-colors ${
                isOpen
                  ? "border-[#f9a825] bg-[#fffbeb]"
                  : "border-[#e5e7eb] bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => choose(option)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center gap-4 p-3 text-left"
              >
                <img
                  src={option.image}
                  alt={option.name}
                  className="size-[56px] shrink-0 rounded-xl object-cover"
                />
                <span className="flex min-w-0 flex-1 flex-col items-start">
                  <span className="flex items-center gap-2 text-[14px] leading-[20px] font-bold text-[#1f2937]">
                    {option.id === "studio" && "🏢"}
                    {option.id === "outdoor" && "🌳"}
                    {option.id === "venue" && "🏠"}
                    {option.name}
                  </span>
                  <span className="text-[12px] leading-4 text-[#6a7282]">
                    {option.tagline}
                  </span>
                  {option.link && (
                    <span className="flex items-center gap-1 pt-1 text-[11px] leading-4 font-semibold text-[#f9a825]">
                      <ExternalLink className="size-3 shrink-0" strokeWidth={1.666} />
                      {option.link}
                    </span>
                  )}
                </span>
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border-[1.4px] border-solid ${
                    isOpen ? "border-[#f9a825] bg-[#f9a825]" : "border-[#d1d5dc]"
                  }`}
                >
                  {isOpen && <Check className="size-[14px] text-white" strokeWidth={3} />}
                </span>
              </button>

              {/* Klicpic Studios — branch picker (1615:4011) */}
              {isOpen && option.id === "studio" && (
                <div className="border-t-[0.701px] border-solid border-[#fee685] px-3 pt-3 pb-4">
                  <p className="text-[12px] leading-4 font-bold text-[#1f2937]">
                    Choose a Studio Branch
                  </p>
                  <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2">
                    {STUDIO_BRANCHES.map((item) => {
                      const active = branch === item.name;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setBranch(item.name)}
                          className={`overflow-hidden rounded-xl border-[0.701px] border-solid bg-white text-left transition-colors ${
                            active ? "border-[#f9a825]" : "border-[#e5e7eb] hover:border-[#f9a825]"
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-[110px] w-full object-cover"
                          />
                          <span className="flex flex-col items-start p-3">
                            <span className="text-[13px] leading-[18px] font-bold text-[#1f2937]">
                              {item.name}
                            </span>
                            <span className="pt-1 text-[11px] leading-4 text-[#6a7282]">
                              {item.address}
                            </span>
                            <span className="flex items-center gap-3 pt-2">
                              <span className="flex items-center gap-1 text-[11px] leading-4 text-[#99a1af]">
                                <Clock className="size-3 shrink-0" strokeWidth={1.666} />
                                {item.hours}
                              </span>
                              <span className="rounded-full bg-[#fff7ed] px-2 py-[1px] text-[10px] leading-4 font-bold text-[#f9a825]">
                                {item.sets}
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {option.linkNote && (
                    <p className="pt-3 text-[11px] leading-4 text-[#99a1af]">
                      {option.linkNote}
                    </p>
                  )}
                </div>
              )}

              {/* Outdoor — nearby spots (1615:4459) */}
              {isOpen && option.id === "outdoor" && (
                <div className="border-t-[0.701px] border-solid border-[#fee685] px-3 pt-3 pb-4">
                  <p className="flex items-center gap-2 text-[12px] leading-4 font-bold text-[#1f2937]">
                    Nearby Parks & Locations
                    <span className="flex items-center gap-1 rounded-full bg-white px-2 py-[2px] text-[11px] font-semibold text-[#6a7282]">
                      <MapPin className="size-3 shrink-0" strokeWidth={1.666} />
                      {OUTDOOR_CITY}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2 lg:grid-cols-3">
                    {OUTDOOR_SPOTS.map((item) => {
                      const active = spot === item.name;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setSpot(item.name)}
                          className={`overflow-hidden rounded-xl border-[0.701px] border-solid bg-white text-left transition-colors ${
                            active ? "border-[#f9a825]" : "border-[#e5e7eb] hover:border-[#f9a825]"
                          }`}
                        >
                          <span className="relative block">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-[96px] w-full object-cover"
                            />
                            <span className="absolute top-2 left-2 rounded-full bg-[rgba(0,0,0,0.65)] px-2 py-[2px] text-[9px] leading-[13px] font-bold text-white">
                              {item.kind}
                            </span>
                          </span>
                          <span className="flex flex-col items-start p-3">
                            <span className="text-[13px] leading-[18px] font-bold text-[#1f2937]">
                              {item.name}
                            </span>
                            <span className="text-[11px] leading-4 font-semibold text-[#f9a825]">
                              {item.distance}
                            </span>
                            <span className="pt-1 text-[11px] leading-4 text-[#6a7282]">
                              {item.note}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="pt-3 text-[11px] leading-4 text-[#99a1af]">
                    {OUTDOOR_FOOTNOTE}
                  </p>
                </div>
              )}

              {/* Your Venue / Home (1615:5001) */}
              {isOpen && option.id === "venue" && (
                <div className="border-t-[0.701px] border-solid border-[#fee685] px-3 pt-3 pb-4">
                  <p className="text-[12px] leading-[18px] text-[#6a7282]">
                    {option.note}
                  </p>
                  <p className="mt-3 rounded-xl border-[0.701px] border-solid border-[#fee685] bg-white px-3 py-2 text-[11px] leading-4 font-semibold text-[#973c00]">
                    {option.charges}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DetailsShell>
  );
}
