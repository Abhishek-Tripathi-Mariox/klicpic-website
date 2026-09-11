import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { usePortal } from "./PortalContext";
import { TABS } from "./portalData";
import DashboardOverview from "./DashboardOverview";
import PaymentsTab from "./tabs/PaymentsTab";
import DeliverablesTab from "./tabs/DeliverablesTab";
import SelectionsTab from "./tabs/SelectionsTab";
import MessagesTab from "./tabs/MessagesTab";
import ProfileTab from "./tabs/ProfileTab";
import { usePortalBookings } from "../api/usePortalBookings";

/**
 * Figma: Customer Portal dashboard shell (1615:10258).
 * Greeting header with booking id and status, then the tab bar.
 *
 * Every tab is built: Overview, Payments (1615:11685), Selections and
 * Deliverables (1615:12026), Messages (1615:12408) and Profile
 * (1615:12707 · 13295 · 13847).
 *
 * The bookings are fetched once here and passed down, so switching tabs does
 * not re-request them and every panel describes the same booking.
 */
export default function PortalDashboard() {
  const { user, logout } = usePortal();
  // The open tab lives in the URL hash, so a refresh keeps your place, the
  // back button works, and a link can point straight at one panel.
  const tabFromHash = () => {
    // "#profile/refunds" → the tab is the part before the slash; the panel
    // itself reads the rest.
    const id = window.location.hash.replace("#", "").split("/")[0];
    return TABS.some((item) => item.id === id) ? id : "overview";
  };

  const [tab, setTab] = useState(tabFromHash);

  useEffect(() => {
    const sync = () => setTab(tabFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const openTab = (id) => {
    setTab(id);
    // Drop any sub-section when switching tabs.
    window.history.replaceState(null, "", id === "overview" ? " " : `#${id}`);
  };

  const { bookings } = usePortalBookings([]);
  // Panels describe the most recent booking; Overview lets the customer pick.
  const booking = bookings[0]?.raw;

  return (
    <div className="w-full bg-[#fafafa] pb-16">
      {/* greeting — the frame puts this on a dark band, with the tab bar
          sitting in it and the active tab reading as a page behind it. */}
      <div className="w-full bg-[#1f2937]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start px-4 pt-8 sm:px-6 sm:pt-10">
          <div className="flex w-full flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col items-start">
              {/* The frame shows a booking id and a status pill. A customer
                  with no booking yet has neither, and inventing them tells
                  them a shoot is under way that is not. */}
              {booking?.bookingCode && (
                <p className="text-[14px] leading-[20px] font-semibold text-[#f9a825]">
                  Booking ID: {booking.bookingCode}
                </p>
              )}
              <h1 className="pt-1 text-[24px] leading-8 font-bold text-white sm:text-[30px] sm:leading-9">
                {/* A customer whose lead carries no name yet still gets a greeting. */}
                Hi{user?.name ? `, ${user.name}` : " there"}! 👋
              </h1>
              <p className="pt-1 text-[16px] leading-6 text-[rgba(255,255,255,0.6)]">
                Welcome to your Klicpic dashboard
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {booking?.status && (
                <span className="flex items-center gap-2 rounded-full border-[0.57px] border-solid border-[rgba(249,168,37,0.3)] bg-[rgba(249,168,37,0.15)] px-4 py-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: booking.statusColor || "#fdc700" }}
                  />
                  <span className="text-[14px] leading-[20px] font-semibold whitespace-nowrap text-[#f9a825]">
                    {booking.status}
                  </span>
                </span>
              )}
              <button
                type="button"
                onClick={logout}
                className="flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-[14px] leading-[20px] font-medium text-[rgba(255,255,255,0.6)] transition-colors hover:text-white"
              >
                <LogOut className="size-4 shrink-0" strokeWidth={1.666} />
                Logout
              </button>
            </div>
          </div>

          {/* tabs */}
          <div className="klicpic-rail -mx-4 mt-6 flex w-[calc(100%+2rem)] items-end gap-1 overflow-x-auto px-4 sm:mx-0 sm:mt-8 sm:w-full sm:px-0">
            {TABS.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openTab(item.id)}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-t-[20px] px-4 py-3 text-[14px] whitespace-nowrap sm:px-5 leading-[20px] font-semibold transition-colors ${
                    active
                      ? "bg-[#fafafa] text-[#f9a825]"
                      : "text-[rgba(255,255,255,0.6)] hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="flex size-4 items-center justify-center rounded-full bg-[#f9a825] text-[10px] leading-[14px] font-bold text-[#1f2937]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 pt-6 sm:px-6 sm:pt-8">
        {tab === "overview" && <DashboardOverview onOpenTab={openTab} />}
        {tab === "payments" && <PaymentsTab booking={booking} />}
        {/* The frame drew Selections and Deliverables alike (1615:12026); they
            are different things — photos to pick, and what is delivered. */}
        {tab === "selections" && <SelectionsTab bookings={bookings} booking={booking} />}
        {tab === "deliverables" && <DeliverablesTab bookings={bookings} booking={booking} />}
        {tab === "messages" && <MessagesTab />}
        {tab === "profile" && (
          <ProfileTab customer={user} bookings={bookings} onLogout={logout} />
        )}
      </div>
    </div>
  );
}
