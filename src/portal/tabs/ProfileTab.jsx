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

const NOTIFICATION_GROUPS = [
  {
    title: "WhatsApp",
    items: [
      {
        id: "whatsapp",
        label: "WhatsApp Notifications",
        hint: "All booking updates via WhatsApp",
        on: true,
      },
    ],
  },
  {
    title: "Alert Types",
    items: [
      {
        id: "booking",
        label: "Booking Alerts",
        hint: "Confirmations, reschedules, cancellations",
        on: true,
      },
      {
        id: "delivery",
        label: "Delivery Alerts",
        hint: "Exclusive deals, seasonal offers",
        on: true,
      },
    ],
  },
  {
    title: "Other Channels",
    items: [
      {
        id: "email",
        label: "Email Digest",
        hint: "Weekly summary to your email",
        on: false,
      },
      {
        id: "sms",
        label: "SMS Alerts",
        hint: "Critical updates via SMS (no spam)",
        on: false,
      },
    ],
  },
];

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-[2px] transition-colors ${
        on ? "bg-[#f9a825]" : "bg-[#e5e7eb]"
      }`}
    >
      <span
        className={`size-5 rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.2)] transition-transform ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

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
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(
      NOTIFICATION_GROUPS.flatMap((group) => group.items.map((item) => [item.id, item.on]))
    )
  );

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
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#f9a825] text-[18px] leading-7 font-bold text-white">
            {initials}
          </span>
          <span className="flex flex-col items-start">
            <span className="text-[18px] leading-7 font-bold text-[#1f2937]">{name}</span>
            <span className="flex flex-wrap items-center gap-2 pt-[2px]">
              <span className="rounded-full bg-[#fffbeb] px-2 py-[2px] text-[11px] leading-4 font-bold text-[#d08700]">
                🥇 Gold Member
              </span>
              <span className="text-[12px] leading-4 text-[#99a1af]">
                · {bookings.length} booking{bookings.length === 1 ? "" : "s"} with us
              </span>
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex cursor-pointer items-center gap-2 rounded-full border-[0.57px] border-solid border-[#e5e7eb] px-4 py-2 text-[13px] leading-[18px] font-medium text-[#6a7282] transition-colors hover:border-[#f9a825] hover:text-[#f9a825]"
        >
          <LogOut className="size-4 shrink-0" strokeWidth={1.666} />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
        <Stat value={bookings.length} label="Total Bookings" />
        <Stat value={completed} label="Completed" />
        <Stat value={`${bookings.length * 280} pts`} label="Loyalty Points" />
        <Stat value={packages} label="Packages Used" />
      </div>

      {/* 220px rail on the left, panel on the right (1615:18418). */}
      <div className="flex w-full flex-col gap-6 pt-6 lg:flex-row lg:items-start lg:gap-6">
        <nav className="flex w-full shrink-0 flex-col lg:w-[220px]">
          {SECTIONS.map((item) => {
            const active = item.id === section;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openSection(item.id)}
                className={`mt-2 flex w-full cursor-pointer items-center gap-3 rounded-2xl border-[1.14px] border-solid px-4 py-3 text-[14px] leading-[20px] font-semibold transition-colors first:mt-0 ${
                  active
                    ? "border-[#f9a825] bg-[#fff8e1] text-[#f9a825]"
                    : "border-[#f3f4f6] bg-white text-[#6b7280] hover:border-[#f9a825] hover:text-[#f9a825]"
                }`}
              >
                <item.icon className="size-4 shrink-0" strokeWidth={1.666} />
                {item.label}
                {item.chevron && (
                  <ChevronRight className="ml-auto size-4 shrink-0" strokeWidth={1.666} />
                )}
                {item.dot && <span className="ml-auto size-2 rounded-full bg-[#ad46ff]" />}
              </button>
            );
          })}

          <p className="px-1 pt-6 text-[10px] leading-[15px] font-bold tracking-[1px] text-[#99a1af] uppercase">
            Quick Actions
          </p>
          <div className="flex flex-col pt-3">
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
        <div className={`${CARD} p-6`}>
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
                <span className="flex min-w-0 flex-col items-start">
                  <span className="text-[11px] leading-4 text-[#99a1af]">{field.label}</span>
                  <span className="truncate text-[14px] leading-[20px] font-semibold text-[#1f2937]">
                    {field.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "security" && (
        <div className={`${CARD} p-6`}>
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
            <span className="flex flex-col items-start">
              <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                Linked Phone
              </span>
              <span className="text-[12px] leading-4 text-[#6a7282]">
                {customer?.mobile ? `+91 ${customer.mobile}` : "—"} · Primary login
              </span>
            </span>
            <span className="ml-auto rounded-full bg-[#dcfce7] px-2 py-[2px] text-[11px] leading-4 font-semibold text-[#00a63e]">
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
        <div className={`${CARD} p-6`}>
          <h3 className="text-[18px] leading-[27px] font-bold text-[#1f2937]">
            Notification Preferences
          </h3>
          <p className="pt-1 text-[14px] leading-[20px] text-[#99a1af]">
            Choose how you want to hear from us
          </p>

          {NOTIFICATION_GROUPS.map((group) => (
            <div key={group.title} className="pt-5">
              <p className="text-[11px] leading-4 font-bold tracking-[0.6px] text-[#99a1af] uppercase">
                {group.title}
              </p>
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="mt-3 flex items-center gap-3 rounded-[20px] border-[0.57px] border-solid border-[#f3f4f6] px-4 py-3"
                >
                  <Bell className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
                  <span className="flex min-w-0 flex-col items-start">
                    <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                      {item.label}
                    </span>
                    <span className="text-[12px] leading-4 text-[#99a1af]">{item.hint}</span>
                  </span>
                  <span className="ml-auto">
                    <Toggle
                      on={prefs[item.id]}
                      label={item.label}
                      onChange={(next) =>
                        setPrefs((current) => ({ ...current, [item.id]: next }))
                      }
                    />
                  </span>
                </div>
              ))}
            </div>
          ))}

          {/* Preferences are held in this session only — the CRM has no column
              for them yet, and pretending they were saved would be worse. */}
          <p className="flex items-center gap-2 pt-5 text-[12px] leading-4 text-[#99a1af]">
            <CalendarDays className="size-[13px] shrink-0" strokeWidth={1.666} />
            Changes apply to this session. Ask the team to update them permanently.
          </p>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
