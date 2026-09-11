import React, { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Film,
  Frame,
  Gift,
  HardDrive,
  Images,
  Loader2,
  PackageOpen,
  Sparkles,
  Video,
} from "lucide-react";
import { CARD } from "../portalStyles";
import { fetchPortalDeliverables } from "../../api/endpoints";
import BookingSwitch from "./BookingSwitch";

/**
 * Deliverables — what the customer receives for the booking and where each
 * item stands, from the CRM: the booking's delivery list (one row per quoted
 * item — album, reel, soft copies — each with its own Drive folder), or its
 * planned deliverables when no delivery list exists yet.
 *
 * The frame's five cards (Edited Photos, Premium Album, Instagram Reel,
 * Cinematic Video, Framed Prints) with stage labels like "Premium Only" were
 * the same for every customer; they are gone.
 */
const STATUS = {
  pending: { label: "Waiting", tone: "bg-[#f3f4f6] text-[#6a7282]", icon: Clock },
  in_progress: { label: "In progress", tone: "bg-[#fffbeb] text-[#b45309]", icon: Loader2 },
  complete: { label: "Ready", tone: "bg-[#dcfce7] text-[#00a63e]", icon: CheckCircle2 },
};

/** A glyph for the row, read from the item's name or type. */
const iconFor = (item) => {
  const text = `${item.kind} ${item.name}`.toLowerCase();
  if (/album|book/.test(text)) return BookOpen;
  if (/frame|canvas|print/.test(text)) return Frame;
  if (/reel/.test(text)) return Video;
  if (/video|film|cinematic|bts|behind/.test(text)) return Film;
  if (/raw|unedited|auesc/.test(text)) return HardDrive;
  if (/effect|special/.test(text)) return Sparkles;
  if (/photo|soft|edited|image/.test(text)) return Images;
  return Gift;
};

const specOf = (item) =>
  [
    item.quantity > 1 && `${item.quantity}`,
    item.size && item.size,
    item.pages && `${item.pages} pages`,
    item.duration && item.duration,
  ]
    .filter(Boolean)
    .join(" · ");

function Row({ item }) {
  const status = STATUS[item.status] || STATUS.pending;
  const Icon = iconFor(item);
  const StatusIcon = status.icon;
  const progress = item.quantity > 0 && item.uploaded > 0 ? Math.min(item.uploaded / item.quantity, 1) : null;

  return (
    <article className={`${CARD} flex flex-wrap items-center gap-4 p-4`}>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff7ed]">
        <Icon className="size-6 text-[#f9a825]" strokeWidth={1.6} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] leading-6 font-bold text-[#1f2937]">{item.name}</p>
        <p className="text-[12px] leading-4 text-[#99a1af]">
          {[specOf(item), item.uploaded > 0 && `${item.uploaded} file${item.uploaded === 1 ? "" : "s"} uploaded`]
            .filter(Boolean)
            .join(" · ") || "—"}
        </p>
        {progress !== null && item.status !== "complete" && (
          <span className="mt-2 block h-1.5 w-full max-w-[240px] overflow-hidden rounded-full bg-[#f3f4f6]">
            <span className="block h-full rounded-full bg-[#f9a825]" style={{ width: `${progress * 100}%` }} />
          </span>
        )}
      </div>

      <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-bold ${status.tone}`}>
        <StatusIcon className={`size-[13px] ${item.status === "in_progress" ? "animate-spin" : ""}`} />
        {status.label}
      </span>

      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 items-center gap-1 rounded-full bg-[#1f2937] px-4 text-[12px] font-bold text-white hover:bg-black"
        >
          <ExternalLink className="size-[13px]" /> Open
        </a>
      )}
    </article>
  );
}

export default function DeliverablesTab({ bookings, booking }) {
  const [bookingId, setBookingId] = useState(booking?.id || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId && booking?.id) setBookingId(booking.id);
  }, [booking?.id, bookingId]);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return undefined;
    }
    let active = true;
    setLoading(true);
    setError("");
    fetchPortalDeliverables(bookingId)
      .then((result) => active && setData(result))
      .catch((cause) => active && setError(cause.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [bookingId]);

  if (!booking) {
    return (
      <div className={`${CARD} px-6 py-12 text-center text-[14px] text-[#6a7282]`}>
        Your deliverables will appear here once you have a booking.
      </div>
    );
  }

  const counts = data?.counts || { total: 0, complete: 0 };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className={`${CARD} flex flex-wrap items-center justify-between gap-4 p-5`}>
        <div>
          <h3 className="text-[18px] leading-7 font-bold text-[#1f2937]">Your deliverables</h3>
          <p className="pt-1 text-[13px] leading-5 text-[#6a7282]">
            {data?.source === "planned"
              ? "What's planned for your shoot. Links appear here as each item is ready."
              : "Everything you receive, and where each item stands. Open an item once it's ready."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {counts.total > 0 && (
            <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-[12px] font-bold text-[#00a63e]">
              {counts.complete} of {counts.total} ready
            </span>
          )}
          <BookingSwitch bookings={bookings} value={bookingId} onChange={setBookingId} />
        </div>
      </div>

      {loading && (
        <div className={`${CARD} flex items-center gap-3 px-6 py-10 text-[14px] text-[#6a7282]`}>
          <Loader2 className="size-5 animate-spin" /> Loading your deliverables…
        </div>
      )}

      {!loading && error && (
        <p className="rounded-2xl border-[0.57px] border-solid border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#b91c1c]">
          {error}
        </p>
      )}

      {!loading && data && data.items.length === 0 && (
        <div className={`${CARD} flex flex-col items-center px-6 py-14 text-center`}>
          <PackageOpen className="size-10 text-[#f9a825]" strokeWidth={1.4} />
          <p className="pt-3 text-[16px] font-bold text-[#1f2937]">Nothing listed yet</p>
          <p className="max-w-[420px] pt-1 text-[13px] leading-5 text-[#6a7282]">
            Once your booking is confirmed, the team lists everything you'll receive here.
          </p>
        </div>
      )}

      {!loading && data && data.items.length > 0 && (
        <div className="flex flex-col gap-3">
          {data.items.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="rounded-2xl border-[0.57px] border-solid border-[#fee685] bg-[#fffbeb] px-5 py-4 text-[13px] leading-5 text-[#973c00]">
        💡 This page updates as the team uploads your files — check back here, or ask us on WhatsApp.
      </div>
    </div>
  );
}
