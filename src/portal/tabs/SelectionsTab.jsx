import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImageOff,
  Images,
  Loader2,
  RotateCcw,
  X,
} from "lucide-react";
import { CARD } from "../portalStyles";
import { fetchPortalSelections, savePortalSelections } from "../../api/endpoints";
import BookingSwitch from "./BookingSwitch";
import FitImage from "../../components/FitImage";
import { imageUrl } from "../../api/imageUrl";

/**
 * Selections — the photos the team shared from the shoot, for the customer to
 * pick which ones go on to editing. They are the booking's photoApprovals in
 * the CRM; every Select / Skip here is saved there straight away, so the team
 * sees the picks as they are made.
 */
const PAGE = 24;

const FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "To review" },
  { id: "approved", label: "Selected" },
  { id: "rejected", label: "Skipped" },
];

function Tile({ photo, onOpen, onSet, busy }) {
  const [broken, setBroken] = useState(false);
  const chosen = photo.status === "approved";
  const skipped = photo.status === "rejected";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] ${
        chosen ? "ring-2 ring-[#00c950] ring-offset-2" : skipped ? "opacity-60" : ""
      }`}
    >
      <button type="button" onClick={onOpen} className="block aspect-square w-full cursor-zoom-in bg-[#f3f4f6]">
        {broken ? (
          <span className="flex size-full flex-col items-center justify-center gap-2 px-3 text-center text-[11px] text-[#99a1af]">
            <ImageOff className="size-6" strokeWidth={1.4} />
            Preview unavailable
          </span>
        ) : (
          // The whole photo, never cropped: the customer is choosing which
          // shots to edit and has to see all of each one. React events
          // propagate, so the image's error reaches the wrapper's onError.
          <FitImage
            src={imageUrl(photo.thumb, 480)}
            alt={photo.name}
            onError={() => setBroken(true)}
            className="size-full"
          />
        )}
      </button>

      {(chosen || skipped) && (
        <span
          className={`absolute top-2 left-2 rounded-full px-2 py-[2px] text-[10px] font-bold text-white ${
            chosen ? "bg-[#00c950]" : "bg-[#6a7282]"
          }`}
        >
          {chosen ? "Selected" : "Skipped"}
        </span>
      )}

      {/* Below the photo rather than over it, so none of the shot is hidden. */}
      <div className="flex items-center gap-2 p-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => onSet(chosen ? "pending" : "approved")}
          aria-label={chosen ? `Unselect ${photo.name}` : `Select ${photo.name}`}
          className={`flex h-10 flex-1 cursor-pointer items-center justify-center gap-1 rounded-full text-[12px] font-bold transition-colors disabled:opacity-60 lg:h-8 ${
            chosen ? "bg-[#00c950] text-white" : "bg-[#f3f4f6] text-[#1f2937] hover:bg-[#f0fdf4]"
          }`}
        >
          <Check className="size-[14px]" strokeWidth={3} />
          {chosen ? "Selected" : "Select"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => onSet(skipped ? "pending" : "rejected")}
          aria-label={skipped ? `Undo skip ${photo.name}` : `Skip ${photo.name}`}
          className={`flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors disabled:opacity-60 lg:size-8 ${
            skipped ? "bg-[#6a7282] text-white" : "bg-[#f3f4f6] text-[#6a7282] hover:bg-[#fef2f2] hover:text-[#dc2626]"
          }`}
        >
          {skipped ? <RotateCcw className="size-[14px]" /> : <X className="size-[14px]" strokeWidth={3} />}
        </button>
      </div>
    </div>
  );
}

function Viewer({ photos, index, onClose, onMove, onSet }) {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onMove]);

  if (!photo) return null;
  const chosen = photo.status === "approved";
  const skipped = photo.status === "rejected";

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 px-4 py-16 sm:p-4" onClick={onClose}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-3 right-3 z-10 flex size-10 sm:top-5 sm:right-5 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
      >
        <X className="size-5" />
      </button>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); onMove(-1); }}
            className="absolute bottom-4 left-4 z-10 flex size-11 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); onMove(1); }}
            className="absolute right-4 bottom-4 z-10 flex size-11 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      <img
        src={imageUrl(photo.full, 1280)}
        alt={photo.name}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[64vh] w-auto max-w-full rounded-2xl object-contain sm:max-h-[76vh]"
      />

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4" onClick={(e) => e.stopPropagation()}>
        <span className="w-full text-center text-[13px] break-all text-white/60 sm:w-auto">
          {photo.name} · {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={() => onSet(photo, chosen ? "pending" : "approved")}
          className={`flex h-10 cursor-pointer items-center gap-1 rounded-full px-4 text-[13px] font-bold ${
            chosen ? "bg-[#00c950] text-white" : "bg-white text-[#1f2937]"
          }`}
        >
          <Check className="size-4" strokeWidth={3} /> {chosen ? "Selected" : "Select"}
        </button>
        <button
          type="button"
          onClick={() => onSet(photo, skipped ? "pending" : "rejected")}
          className={`flex h-10 cursor-pointer items-center gap-1 rounded-full px-4 text-[13px] font-bold ${
            skipped ? "bg-[#6a7282] text-white" : "bg-white/15 text-white"
          }`}
        >
          {skipped ? <RotateCcw className="size-4" /> : <X className="size-4" strokeWidth={3} />}
          {skipped ? "Undo skip" : "Skip"}
        </button>
      </div>
    </div>
  );
}

export default function SelectionsTab({ bookings, booking }) {
  const [bookingId, setBookingId] = useState(booking?.id || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(PAGE);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(null);

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
    fetchPortalSelections(bookingId)
      .then((result) => active && setData(result))
      .catch((cause) => active && setError(cause.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [bookingId]);

  useEffect(() => setLimit(PAGE), [filter, bookingId]);

  const photos = data?.photos || [];
  const shown = useMemo(
    () => (filter === "all" ? photos : photos.filter((photo) => photo.status === filter)),
    [photos, filter]
  );
  const counts = data?.counts || { total: 0, approved: 0, rejected: 0, pending: 0 };

  /** Saves at once; the screen changes first and reverts if the save fails. */
  const save = async (payload, optimistic) => {
    const before = data;
    setData((current) => current && { ...current, ...optimistic(current) });
    setBusy(true);
    setError("");
    try {
      const result = await savePortalSelections(bookingId, payload);
      setData(result);
    } catch (cause) {
      setData(before);
      setError(cause.message || "Couldn't save that — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const recount = (list) => ({
    total: list.length,
    approved: list.filter((p) => p.status === "approved").length,
    rejected: list.filter((p) => p.status === "rejected").length,
    pending: list.filter((p) => p.status === "pending").length,
  });

  const setOne = (photo, status) =>
    save({ status, photoIds: [photo.id] }, (current) => {
      const next = current.photos.map((p) => (p.id === photo.id ? { ...p, status } : p));
      return { photos: next, counts: recount(next) };
    });

  const selectRemaining = () => {
    if (!counts.pending) return;
    if (!window.confirm(`Select all ${counts.pending} photos you haven't reviewed yet?`)) return;
    save({ status: "approved", all: true }, (current) => {
      const next = current.photos.map((p) => (p.status === "pending" ? { ...p, status: "approved" } : p));
      return { photos: next, counts: recount(next) };
    });
  };

  const move = (step) =>
    setOpen((current) => (current === null ? null : (current + step + shown.length) % shown.length));

  if (!booking) {
    return (
      <div className={`${CARD} px-6 py-12 text-center text-[14px] text-[#6a7282]`}>
        Your photos will appear here once you have a booking.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className={`${CARD} flex flex-wrap items-center justify-between gap-4 p-5`}>
        <div>
          <h3 className="text-[18px] leading-7 font-bold text-[#1f2937]">Pick your favourites</h3>
          <p className="pt-1 text-[13px] leading-5 text-[#6a7282]">
            Select the photos you want edited. Each choice is saved straight away and our team sees it.
          </p>
        </div>
        <BookingSwitch bookings={bookings} value={bookingId} onChange={setBookingId} />
      </div>

      {loading && (
        <div className={`${CARD} flex items-center gap-3 px-6 py-10 text-[14px] text-[#6a7282]`}>
          <Loader2 className="size-5 animate-spin" /> Bringing your photos in from the studio's drive…
        </div>
      )}

      {!loading && error && (
        <p className="rounded-2xl border-[0.57px] border-solid border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#b91c1c]">
          {error}
        </p>
      )}

      {!loading && data && photos.length === 0 && (
        <div className={`${CARD} flex flex-col items-center px-6 py-14 text-center`}>
          <Images className="size-10 text-[#f9a825]" strokeWidth={1.4} />
          <p className="pt-3 text-[16px] font-bold text-[#1f2937]">No photos to pick yet</p>
          <p className="max-w-[420px] pt-1 text-[13px] leading-5 text-[#6a7282]">
            After your shoot, the team shares the photos here for you to choose the ones to edit.
            We'll let you know on WhatsApp when they're ready.
          </p>
        </div>
      )}

      {!loading && photos.length > 0 && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((item) => {
                const count = item.id === "all" ? counts.total : counts[item.id];
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`h-10 cursor-pointer rounded-full px-4 text-[13px] font-semibold transition-colors lg:h-auto lg:py-1.5 ${
                      active
                        ? "bg-[#f9a825] text-white"
                        : "border-[0.57px] border-solid border-[#e5e7eb] bg-white text-[#6a7282] hover:border-[#f9a825]"
                    }`}
                  >
                    {item.label} ({count})
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(data.folderLinks || []).slice(0, 1).map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 items-center gap-1 rounded-full border-[0.57px] border-solid border-[#e5e7eb] bg-white px-4 text-[13px] font-semibold text-[#1f2937] hover:border-[#f9a825] lg:h-auto lg:py-1.5"
                >
                  <ExternalLink className="size-[14px]" /> Open in Google Drive
                </a>
              ))}
              {counts.pending > 0 && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={selectRemaining}
                  className="h-10 cursor-pointer rounded-full bg-[#1f2937] px-4 text-[13px] font-bold text-white hover:bg-black disabled:opacity-60 lg:h-auto lg:py-1.5"
                >
                  Select all remaining ({counts.pending})
                </button>
              )}
            </div>
          </div>

          <p className="text-[12px] text-[#99a1af]">
            {counts.approved} selected · {counts.rejected} skipped · {counts.pending} to review
          </p>

          {shown.length === 0 ? (
            <p className={`${CARD} px-6 py-10 text-center text-[14px] text-[#6a7282]`}>Nothing here.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {shown.slice(0, limit).map((photo, index) => (
                <Tile
                  key={photo.id}
                  photo={photo}
                  busy={busy}
                  onOpen={() => setOpen(index)}
                  onSet={(status) => setOne(photo, status)}
                />
              ))}
            </div>
          )}

          {shown.length > limit && (
            <button
              type="button"
              onClick={() => setLimit((current) => current + PAGE)}
              className="w-full cursor-pointer rounded-2xl border-[1.4px] border-solid border-[#f9a825] py-3 text-[14px] font-bold text-[#f9a825] hover:bg-[#f9a825]/10"
            >
              Show more photos ({shown.length - limit} more)
            </button>
          )}
        </>
      )}

      {open !== null && (
        <Viewer photos={shown} index={open} onClose={() => setOpen(null)} onMove={move} onSet={setOne} />
      )}
    </div>
  );
}
