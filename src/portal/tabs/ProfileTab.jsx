import React, { useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  History,
  Undo2,
  Check,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { CARD } from "../portalStyles";
import MyBookingsPanel from "./MyBookingsPanel";
import RefundsPanel from "./RefundsPanel";
import ActivityPanel from "./ActivityPanel";
import { useApi } from "../../api/useApi";
import { fetchActivity, fetchRefunds } from "../../api/endpoints";

/**
 * Figma: Profile — Information 1615:12707, Security 1615:13295,
 * Notifications 1615:13847.
 *
 * The sub-navigation continues into My Bookings (1615:14441 · 16285 · 18251),
 * Refund Tracking (1615:15006) and Activity (1615:15635).
 *
 * Every frame shares one screen: a member header, a stats row, and a
 * sub-navigation that swaps the panel underneath. Built as one component with
 * a `section` state rather than one per frame, because that is what they are.
 */
const SECTIONS = [
  { id: "info", label: "Profile Info", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "bookings", label: "My Bookings", icon: CalendarDays, chevron: true },
  { id: "refunds", label: "Refund Tracking", icon: Undo2, dot: true },
  { id: "activity", label: "Activity", icon: History },
];

/** The shortcuts under the rail (1615:18460). */
const QUICK_ACTIONS = [
  { id: "bookings", label: "View Bookings", icon: CalendarDays },
  { id: "refunds", label: "Track Refund", icon: Undo2 },
  { id: "activity", label: "Activity Log", icon: History },
];

function Stat({ value, label }) {
  return (
    <div className={`${CARD} flex flex-col items-center px-4 py-5`}>
      <span className="text-[20px] leading-7 font-bold text-[#1f2937]">{value}</span>
      <span className="pt-1 text-center text-[12px] leading-4 text-[#99a1af]">{label}</span>
    </div>
  );
}

export default function ProfileTab({ customer, bookings = [], onLogout }) {
  // Sub-sections are addressable too — "#profile/refunds" opens one directly,
  // matching how the top-level tabs work.
  const sectionFromHash = () => {
    const id = window.location.hash.split("/")[1] || "";
    return SECTIONS.some((item) => item.id === id) ? id : "info";
  };

  const [section, setSection] = useState(sectionFromHash);

  useEffect(() => {
    const sync = () => setSection(sectionFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const openSection = (id) => {
    setSection(id);
    window.history.replaceState(null, "", id === "info" ? "#profile" : `#profile/${id}`);
  };

  // Refunds and activity are only fetched once the customer opens them.
  const [reload, setReload] = useState(0);
  const { data: refunds } = useApi(fetchRefunds, null, [reload]);
  const { data: activity } = useApi(fetchActivity, null, [reload]);
  const name = customer?.name || "Klicpic customer";
  const initials =
    name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "K";

  const completed = bookings.filter((booking) =>
    /deliver|complete/i.test(booking.status || "")
  ).length;
  const packages = new Set(
    bookings.map((booking) => booking.raw?.package).filter(Boolean)
  ).size;

  const fields = [
    { label: "Full Name", value: customer?.name || "—", icon: User },
    {
      label: "Phone Number",
      value: customer?.mobile ? `+91 ${customer.mobile}` : "—",
      icon: Phone,
    },
    { label: "Email Address", value: customer?.email || "—", icon: Mail },
    { label: "City", value: customer?.city || "—", icon: MapPin },
  ];

  return (
    <div className="w-full">
      <div className={`${CARD} flex flex-wrap items-center justify-between gap-4 p-5`}>
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#f9a825] text-[18px] leading-7 font-bold text-white">
            {initials}
          </span>
          <span className="flex min-w-0 flex-col items-start">
            <span className="text-[18px] leading-7 font-bold break-words text-[#1f2937]">{name}</span>
            {/* The frame's "Gold Member" tier was the same for everybody —
                there is no loyalty programme to be a member of. */}
            <span className="flex flex-wrap items-center gap-2 pt-[2px]">
              <span className="text-[12px] leading-4 text-[#99a1af]">
                {bookings.length} booking{bookings.length === 1 ? "" : "s"} with us
              </span>
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-full border-[0.57px] border-solid border-[#e5e7eb] px-4 text-[13px] leading-[18px] font-medium text-[#6a7282] transition-colors hover:border-[#f9a825] hover:text-[#f9a825]"
        >
          <LogOut className="size-4 shrink-0" strokeWidth={1.666} />
          Logout
        </button>
      </div>

      {/* Loyalty Points used to sit here as bookings × 280. There are no
          points, so there is no tile. */}
      <div className="grid grid-cols-3 gap-3 pt-4">
        <Stat value={bookings.length} label="Total Bookings" />
        <Stat value={completed} label="Completed" />
        <Stat value={packages} label="Packages Used" />
      </div>

      {/* 220px rail on the left, panel on the right (1615:18418). Below lg the
          rail becomes a sideways-scrolling strip above the panel, so the
          panel is not pushed a screen down on a phone. */}
      <div className="flex w-full flex-col gap-4 pt-6 lg:flex-row lg:items-start lg:gap-6">
        <nav className="klicpic-rail -mx-4 flex w-[calc(100%+2rem)] shrink-0 gap-2 overflow-x-auto px-4 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 lg:mx-0 lg:w-[220px] lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
          {SECTIONS.map((item) => {
            const active = item.id === section;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openSection(item.id)}
                className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl border-[1.14px] border-solid px-4 py-[10px] text-[14px] leading-[20px] font-semibold whitespace-nowrap transition-colors lg:mt-2 lg:w-full lg:py-3 lg:first:mt-0 ${
                  active
                    ? "border-[#f9a825] bg-[#fff8e1] text-[#f9a825]"
                    : "border-[#f3f4f6] bg-white text-[#6b7280] hover:border-[#f9a825] hover:text-[#f9a825]"
                }`}
              >
                <item.icon className="size-4 shrink-0" strokeWidth={1.666} />
                {item.label}
                {item.chevron && (
                  <ChevronRight className="ml-auto hidden size-4 shrink-0 lg:block" strokeWidth={1.666} />
                )}
                {item.dot && <span className="ml-auto size-2 rounded-full bg-[#ad46ff]" />}
              </button>
            );
          })}

          {/* The shortcuts repeat entries already in the strip, so they only
              show beside the full rail. */}
          <p className="hidden px-1 pt-6 text-[10px] leading-[15px] font-bold tracking-[1px] text-[#99a1af] uppercase lg:block">
            Quick Actions
          </p>
          <div className="hidden flex-col pt-3 lg:flex">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => openSection(action.id)}
                className={`mt-[6px] flex w-full cursor-pointer items-center gap-3 rounded-[20px] border-[0.57px] border-solid border-[#f3f4f6] bg-white px-4 py-[10px] text-[14px] leading-[20px] font-medium transition-colors first:mt-0 hover:border-[#f9a825] ${
                  action.id === section ? "text-[#f9a825]" : "text-[#6b7280] hover:text-[#f9a825]"
                }`}
              >
                <action.icon className="size-4 shrink-0" strokeWidth={1.666} />
                {action.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="min-w-0 flex-1">

      {section === "info" && (
        <div className={`${CARD} p-5 sm:p-6`}>
          <h3 className="text-[18px] leading-[27px] font-bold text-[#1f2937]">
            Profile Information
          </h3>
          <p className="pt-1 text-[14px] leading-[20px] text-[#99a1af]">
            These details come from your bookings — tell the team to change them.
          </p>

          <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.label}
                className="flex items-center gap-3 rounded-[20px] border-[0.57px] border-solid border-[#f3f4f6] px-4 py-3"
              >
                <field.icon className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
                <span className="flex min-w-0 flex-1 flex-col items-start">
                  <span className="text-[11px] leading-4 text-[#99a1af]">{field.label}</span>
                  <span className="max-w-full truncate text-[14px] leading-[20px] font-semibold text-[#1f2937]">
                    {field.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "security" && (
        <div className={`${CARD} p-5 sm:p-6`}>
          <h3 className="text-[18px] leading-[27px] font-bold text-[#1f2937]">Security</h3>
          <p className="pt-1 text-[14px] leading-[20px] text-[#99a1af]">
            Manage your account access
          </p>

          <div className="mt-5 flex items-center gap-3 rounded-[20px] border-[0.57px] border-solid border-[#dcfce7] bg-[#f0fdf4] px-4 py-3">
            <Check className="size-4 shrink-0 text-[#00a63e]" strokeWidth={2} />
            <span className="flex flex-col items-start">
              <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                Account Verified
              </span>
              <span className="text-[12px] leading-4 text-[#6a7282]">
                Your phone{customer?.mobile ? ` +91 ${customer.mobile}` : ""} is verified
                via OTP
              </span>
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-[20px] border-[0.57px] border-solid border-[#f3f4f6] px-4 py-3">
            <Shield className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
            <span className="flex min-w-0 flex-col items-start">
              <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                Linked Phone
              </span>
              <span className="text-[12px] leading-4 text-[#6a7282]">
                {customer?.mobile ? `+91 ${customer.mobile}` : "—"} · Primary login
              </span>
            </span>
            <span className="ml-auto shrink-0 rounded-full bg-[#dcfce7] px-2 py-[2px] text-[11px] leading-4 font-semibold text-[#00a63e]">
              Verified
            </span>
          </div>

          <div className="mt-6 rounded-[20px] border-[0.57px] border-solid border-[#fecaca] bg-[#fef2f2] p-4">
            <p className="text-[14px] leading-[20px] font-bold text-[#e7000b]">Danger Zone</p>
            <button
              type="button"
              onClick={onLogout}
              className="mt-3 flex w-full cursor-pointer items-center gap-2 rounded-[20px] border-[0.57px] border-solid border-[#fecaca] bg-white px-4 py-[10px] text-[13px] leading-[18px] font-semibold text-[#e7000b] transition-colors hover:bg-[#fef2f2]"
            >
              <LogOut className="size-4 shrink-0" strokeWidth={1.666} />
              Log out of all devices
            </button>
            <p className="flex items-center gap-2 pt-3 text-[12px] leading-4 text-[#99a1af]">
              <Trash2 className="size-[13px] shrink-0" strokeWidth={1.666} />
              Account deletion is permanent and cannot be undone — email us to request it.
            </p>
          </div>
        </div>
      )}

      {section === "bookings" && (
        <div>
          <MyBookingsPanel
            bookings={bookings}
            cancelRequests={(refunds?.refunds || []).map((refund) => ({
              bookingId: refund.bookingId,
            }))}
            onChanged={() => setReload((n) => n + 1)}
          />
        </div>
      )}

      {section === "refunds" && (
        <div>
          <RefundsPanel data={refunds} />
        </div>
      )}

      {section === "activity" && (
        <div>
          <ActivityPanel events={activity || []} />
        </div>
      )}

      {section === "notifications" && (
        <div className={`${CARD} p-5 sm:p-6`}>
          <h3 className="text-[18px] leading-[27px] font-bold text-[#1f2937]">
            Notifications
          </h3>
          <p className="pt-1 text-[14px] leading-[20px] text-[#99a1af]">
            How we keep you posted about your shoot
          </p>

          <div className="mt-5 flex items-center gap-3 rounded-[20px] border-[0.57px] border-solid border-[#f3f4f6] px-4 py-3">
            <Bell className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
            <span className="flex min-w-0 flex-col items-start">
              <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                WhatsApp
              </span>
              <span className="text-[12px] leading-4 break-words text-[#6a7282]">
                Quotations, payment links and shoot updates go to
                {customer?.mobile ? ` +91 ${customer.mobile}` : " your verified number"}
              </span>
            </span>
          </div>

          {customer?.email && (
            <div className="mt-3 flex items-center gap-3 rounded-[20px] border-[0.57px] border-solid border-[#f3f4f6] px-4 py-3">
              <Mail className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
              <span className="flex min-w-0 flex-col items-start">
                <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                  Email
                </span>
                <span className="max-w-full truncate text-[12px] leading-4 text-[#6a7282]">
                  {customer.email}
                </span>
              </span>
            </div>
          )}

          {/* The per-channel switches that used to be here were local state:
              turning WhatsApp off changed nothing, and the messages kept
              coming. Nothing in the CRM stores a preference, so there is no
              switch until something can act on it. */}
          <p className="flex items-start gap-2 pt-5 text-[12px] leading-4 text-[#99a1af]">
            <Bell className="mt-[1px] size-[13px] shrink-0" strokeWidth={1.666} />
            To change how we reach you — or to stop a channel — ask the team and
            they will update your record.
          </p>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
