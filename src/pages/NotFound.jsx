import React from "react";
import { Link, useLocation } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";

/**
 * Catch-all route. Without this, an unknown path matches no <Route> and React
 * Router renders nothing — which is why /blog showed a blank page.
 */
export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <SiteLayout>
      <section className="flex w-full flex-col items-center bg-white px-6 py-28">
        <div className="flex w-full max-w-[520px] flex-col items-center text-center">
          <p className="font-script text-[36px] leading-10 text-[#f9a825]">
            Page not found
          </p>
          <h1 className="pt-2 text-[48px] leading-[52px] font-bold text-[#1f2937]">
            404
          </h1>
          <p className="pt-4 text-[14px] leading-[22px] text-[#6a7282]">
            We couldn't find{" "}
            <span className="font-semibold text-[#1f2937]">{pathname}</span>.
            It may have moved, or the link may be out of date.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
            <Link
              to="/"
              className="rounded-2xl bg-[#f9a825] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
            >
              Back to Home
            </Link>
            <Link
              to="/book"
              className="rounded-2xl border-[0.57px] border-solid border-[#e5e7eb] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:border-[#f9a825]"
            >
              Start Booking
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
