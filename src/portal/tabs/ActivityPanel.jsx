import React from "react";
import {
  CalendarCheck,
  Images,
  MessageSquare,
  Star,
  Undo2,
  Wallet,
  XCircle,
} from "lucide-react";
import { CARD } from "../portalStyles";

/**
 * Figma: Activity History (1615:15635).
 * A single timeline of everything that happened on the account, newest first.
 */
// Shared with the Overview tab's Recent Activity card, so one kind of event
// looks the same wherever it is shown.
export const ACTIVITY_ICONS = {
  booking: { icon: CalendarCheck, tone: "bg-[#dcfce7] text-[#00a63e]" },
  cancelled: { icon: XCircle, tone: "bg-[#fef2f2] text-[#e7000b]" },
  refund: { icon: Undo2, tone: "bg-[#faf5ff] text-[#7c3aed]" },
  "refund-done": { icon: Wallet, tone: "bg-[#dcfce7] text-[#00a63e]" },
  review: { icon: Star, tone: "bg-[#fffbeb] text-[#f9a825]" },
  delivery: { icon: Images, tone: "bg-[#eff6ff] text-[#155dfc]" },
  message: { icon: MessageSquare, tone: "bg-[#f3f4f6] text-[#6a7282]" },
};

/** "2 days ago" — the frame labels everything relatively. */
export function ago(value) {
  const then = new Date(value).getTime();
  if (!Number.isFinite(then)) return "";

  const days = Math.floor((Date.now() - then) / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  return new Date(then).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function ActivityPanel({ events = [] }) {
  return (
    <div className="w-full">
      <div className={`${CARD} p-6`}>
        <h3 className="text-[18px] leading-[27px] font-bold text-[#1f2937]">
          Activity History
        </h3>
        <p className="pt-1 text-[14px] leading-[20px] text-[#99a1af]">
          Everything that happened on your account
        </p>

        {events.length === 0 ? (
          <p className="py-8 text-center text-[13px] leading-[20px] text-[#99a1af]">
            Nothing here yet — your first booking will show up on this timeline.
          </p>
        ) : (
          <ol className="flex flex-col pt-5">
            {events.map((event, index) => {
              const { icon: Icon, tone } = ACTIVITY_ICONS[event.kind] || ACTIVITY_ICONS.message;
              return (
                <li
                  key={`${event.title}-${event.at}-${index}`}
                  className="flex items-start gap-3 border-b-[0.57px] border-solid border-[#f9fafb] py-3 last:border-b-0"
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full ${tone}`}
                  >
                    <Icon className="size-4" strokeWidth={1.666} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col items-start">
                    <span className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                      {event.title}
                    </span>
                    <span className="text-[12px] leading-4 text-[#99a1af]">{event.detail}</span>
                  </span>
                  <span className="shrink-0 text-[11px] leading-4 whitespace-nowrap text-[#99a1af]">
                    {ago(event.at)}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
