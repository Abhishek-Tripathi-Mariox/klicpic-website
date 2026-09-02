import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { usePortal } from "./PortalContext";
import { ACCOUNT, TABS } from "./portalData";
import DashboardOverview from "./DashboardOverview";

/**
 * Figma: Customer Portal dashboard shell (1615:10258).
 * Greeting header with booking id and status, then the tab bar.
 *
 * Tabs currently implemented: Overview. The remaining tabs have Figma frames
 * (Payments 1615:11685 · Selections 1615:12026 · Deliverables 1615:12408 ·
 * Messages 1615:12707 · Profile 1615:13295 / 13847) and are not built yet.
 */
export default function PortalDashboard() {
  const { user, logout } = usePortal();
  const [tab, setTab] = useState("overview");

  return (
    <div className="w-full bg-[#fafafa] pb-16">
      {/* greeting */}
      <div className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start px-6 pt-10 pb-6">
          <div className="flex w-full flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col items-start">
              <p className="text-[13px] leading-[20px] text-[#99a1af]">
                Booking ID: {ACCOUNT.bookingId}
              </p>
              <h1 className="pt-1 text-[30px] leading-9 font-bold text-[#1f2937]">
                Hi, {user?.name ?? ACCOUNT.name}! 👋
              </h1>
              <p className="pt-1 text-[14px] leading-[20px] text-[#6a7282]">
                Welcome to your Klicpic dashboard
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#fffbeb] px-3 py-[6px] text-[12px] leading-4 font-bold whitespace-nowrap text-[#f59e0b]">
                {ACCOUNT.status}
              </span>
              <button
                type="button"
                onClick={logout}
                className="flex cursor-pointer items-center gap-2 rounded-full border-[0.57px] border-solid border-[#e5e7eb] px-3 py-[6px] text-[12px] leading-4 font-semibold text-[#6a7282] transition-colors hover:border-[#f9a825] hover:text-[#f9a825]"
              >
                <LogOut className="size-[13px] shrink-0" strokeWidth={1.666} />
                Logout
              </button>
            </div>
          </div>

          {/* tabs */}
          <div className="klicpic-rail mt-6 flex w-full items-center gap-1 overflow-x-auto border-b-[0.57px] border-solid border-[#f3f4f6]">
            {TABS.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 border-b-2 px-4 pb-3 text-[13px] leading-[20px] font-semibold transition-colors ${
                    active
                      ? "border-[#f9a825] text-[#f9a825]"
                      : "border-transparent text-[#99a1af] hover:text-[#6a7282]"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="flex size-[18px] items-center justify-center rounded-full bg-[#f9a825] text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        {tab === "overview" ? (
          <DashboardOverview onOpenTab={setTab} />
        ) : (
          <div className="rounded-2xl border-[0.57px] border-dashed border-[#e5e7eb] bg-white p-12 text-center">
            <p className="text-[14px] leading-[20px] text-[#6a7282]">
              The <strong className="font-bold text-[#1f2937]">{TABS.find((t) => t.id === tab)?.label}</strong>{" "}
              tab is designed in Figma but not implemented yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
