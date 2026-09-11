import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronDown, Clock, Loader2, Sparkles, X } from "lucide-react";
import { priceBooking, useBooking } from "../BookingContext";
import { matchPackages } from "../../api/endpoints";
import { imageUrl } from "../../api/imageUrl";
import FitImage from "../../components/FitImage";

/**
 * Package step — the studio's own packages from the CRM, ranked against what
 * the customer chose so far (shoot type, theme, gowns and props), with the
 * reasons printed on every card so "Best match" can be checked, not just
 * trusted.
 *
 * The frame's plans (Essential / Signature / Premium) and its "Build Your Own"
 * calculator were design copy with prices the studio never set; both are gone.
 * Add-ons are chosen on the next step, from the real product catalogue.
 */
const inr = (value) => `₹${(Number(value) || 0).toLocaleString("en-IN")}`;

const Mark = ({ ok }) =>
  ok === true ? (
    <Check className="size-[14px] shrink-0 text-[#00a63e]" strokeWidth={3} />
  ) : ok === "partial" ? (
    <span className="flex size-[14px] shrink-0 items-center justify-center text-[12px] font-black text-[#f59e0b]">~</span>
  ) : (
    <X className="size-[14px] shrink-0 text-[#d1d5dc]" strokeWidth={3} />
  );

function PackageCard({ pkg, best, selected, onSelect }) {
  const included = (pkg.features || []).filter((feature) => feature.included !== false).slice(0, 4);
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-2xl border-[1.71px] border-solid bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] ${
        selected ? "border-[#f9a825]" : best ? "border-[#fcd34d]" : "border-transparent"
      }`}
    >
      {best && (
        <span className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-[#f9a825] px-3 py-1 text-[11px] font-black text-white shadow">
          <Sparkles className="size-3" strokeWidth={2.5} /> Best match
        </span>
      )}

      {/* Shown whole over its own blurred copy; a package with no photo keeps
          the dark gradient. */}
      <FitImage
        src={pkg.image ? imageUrl(pkg.image, 640) : ""}
        alt={pkg.name}
        tone="dark"
        className="h-[150px] w-full shrink-0 bg-gradient-to-br from-[#3f4550] to-[#1f2937]"
      >
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute right-4 bottom-3 left-4 flex items-end justify-between gap-3">
          <span className="min-w-0">
            <span className="block truncate text-[18px] leading-6 font-bold text-white">{pkg.name}</span>
            {pkg.duration && (
              <span className="flex items-center gap-1 text-[11px] text-white/70">
                <Clock className="size-3" /> {pkg.duration}
              </span>
            )}
          </span>
          <span className="shrink-0 text-[22px] leading-7 font-bold text-white">{pkg.priceLabel || inr(pkg.price)}</span>
        </div>
      </FitImage>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-3">
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f3f4f6]">
            <span
              className="block h-full rounded-full bg-[#f9a825]"
              style={{ width: `${Math.max(pkg.match.percent, 4)}%` }}
            />
          </span>
          <span className="text-[12px] font-bold text-[#1f2937]">{pkg.match.percent}% match</span>
        </div>

        <ul className="flex flex-col gap-1 pt-3">
          {pkg.match.reasons.map((reason) => (
            <li key={reason.text} className="flex items-start gap-2 text-[12px] leading-4 text-[#4a5565]">
              <span className="pt-[1px]">
                <Mark ok={reason.ok} />
              </span>
              {reason.text}
            </li>
          ))}
        </ul>

        {included.length > 0 && (
          <p className="pt-3 text-[11px] leading-4 text-[#99a1af]">
            Includes {included.map((feature) => feature.label).join(" · ")}
          </p>
        )}

        <button
          type="button"
          onClick={() => onSelect(pkg)}
          className={`mt-auto flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[20px] text-[13px] font-bold transition-colors ${
            selected
              ? "bg-[#00c950] text-white"
              : "mt-4 bg-[#f9a825] text-white hover:bg-[#e69a1f]"
          } ${selected ? "mt-4" : ""}`}
        >
          {selected && <Check className="size-4" strokeWidth={3} />}
          {selected ? "Selected — continue" : `Select ${pkg.name}`}
        </button>
      </div>
    </article>
  );
}

export default function StepPackage({ onBack, onNext }) {
  const { booking, set } = useBooking();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showOthers, setShowOthers] = useState(false);

  // Ranked against the choices already made; re-ranked if they change.
  const criteria = useMemo(
    () => ({
      shootType: booking.shootTypeValue || booking.shootType || "",
      theme: booking.theme || "",
      props: booking.props || [],
    }),
    [booking.shootTypeValue, booking.shootType, booking.theme, booking.props]
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    matchPackages(criteria)
      .then((result) => active && setData(result))
      .catch((cause) => active && setError(cause.message || "Could not load packages"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [criteria]);

  const packages = data?.packages || [];
  const best = packages.find((pkg) => pkg.id === data?.bestId) || null;
  const forType = packages.filter((pkg) => pkg.id !== best?.id && pkg.match.typeFit !== "none");
  const others = packages.filter((pkg) => pkg.id !== best?.id && pkg.match.typeFit === "none");

  const choose = (pkg) => {
    set({
      package: pkg.name,
      packageId: pkg.id,
      packagePrice: pkg.price,
      // Any add-ons already picked stay in the total.
      total: priceBooking({ packagePrice: pkg.price, extras: booking.extrasItems || [] }),
    });
    onNext?.();
  };

  const skip = () => {
    set({ package: null, packageId: null, packagePrice: 0, total: priceBooking({ packagePrice: 0, extras: booking.extrasItems || [] }) });
    onNext?.();
  };

  const c = data?.criteria;
  const matchedOn = [
    c?.shootType && c.shootType.replace(/ Photoshoot$/, ""),
    c?.theme && `${c.theme.name}${c.theme.tier ? ` (${c.theme.tier})` : ""}`,
    c?.gowns?.length && `${c.gowns.length} gown${c.gowns.length > 1 ? "s" : ""}`,
    c?.props && `${c.props} prop${c.props > 1 ? "s" : ""}`,
  ].filter(Boolean);

  return (
    <div className="flex w-full flex-col items-start pb-16">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-[14px] leading-[20px] text-[#6a7282] transition-colors hover:text-[#f9a825]"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
        Back to Location
      </button>

      <h2 className="pt-4 text-[26px] leading-8 font-bold text-[#1f2937] sm:text-[30px] sm:leading-9">Choose your package</h2>
      <p className="pt-2 text-[16px] leading-6 text-[#6a7282]">
        Our packages, ranked by how well each fits what you've picked
      </p>

      {matchedOn.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-[12px] font-semibold text-[#99a1af]">Matched on</span>
          {matchedOn.map((item) => (
            <span key={item} className="rounded-full bg-[#fff7ed] px-3 py-1 text-[12px] font-semibold text-[#c2410c]">
              {item}
            </span>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 pt-10 text-[#6a7282]">
          <Loader2 className="size-5 animate-spin" /> Finding your best package…
        </div>
      )}

      {!loading && error && (
        <p className="mt-6 w-full rounded-2xl border-[0.701px] border-solid border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#b91c1c]">
          We couldn't load the packages just now. You can continue — our team will suggest one when they call.
        </p>
      )}

      {!loading && !error && (
        <>
          {best ? (
            <div className="w-full pt-6 md:w-1/2">
              <PackageCard pkg={best} best selected={booking.packageId === best.id} onSelect={choose} />
            </div>
          ) : (
            packages.length > 0 && (
              <p className="mt-6 w-full rounded-2xl border-[0.701px] border-dashed border-[#e5e7eb] bg-white px-4 py-4 text-[13px] leading-5 text-[#6a7282]">
                We don't have a package set up for{" "}
                {c?.shootType ? c.shootType.replace(/ Photoshoot$/, "") : "this"} shoots yet. Continue without one and our team
                will put together a quote — or pick from our other packages below.
              </p>
            )
          )}

          {forType.length > 0 && (
            <>
              <h3 className="pt-8 text-[16px] font-bold text-[#1f2937]">More packages for your shoot</h3>
              <div className="grid w-full grid-cols-1 gap-4 pt-3 md:grid-cols-2">
                {forType.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} selected={booking.packageId === pkg.id} onSelect={choose} />
                ))}
              </div>
            </>
          )}

          {others.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowOthers((open) => !open)}
                className="mt-8 flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-[#6a7282] hover:text-[#f9a825]"
              >
                <ChevronDown className={`size-4 transition-transform ${showOthers ? "rotate-180" : ""}`} />
                {showOthers ? "Hide" : "Show"} other packages ({others.length})
              </button>
              {(showOthers || (!best && forType.length === 0)) && (
                <div className="grid w-full grid-cols-1 gap-4 pt-3 md:grid-cols-2">
                  {others.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} selected={booking.packageId === pkg.id} onSelect={choose} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}

      {!loading && (
        <button
          type="button"
          onClick={skip}
          className="cursor-pointer pt-8 text-[14px] leading-[20px] text-[#99a1af] transition-colors hover:text-[#f9a825]"
        >
          Not sure? Continue without a package — our team will suggest one
        </button>
      )}
    </div>
  );
}
