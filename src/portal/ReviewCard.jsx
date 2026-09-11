import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { fetchMyReview, saveMyReview } from "../api/endpoints";

/**
 * Lets a signed-in customer leave — or edit — their review.
 *
 * One review per customer, so this loads whatever they wrote before and saves
 * over it. The backend enforces the same rule; this only mirrors it so the
 * form arrives prefilled instead of looking blank to someone who already wrote.
 */
const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

/**
 * A review only reaches the website once the team publishes it, and an edit
 * goes back for another look — so the card says where it stands rather than
 * claiming "Published" the moment it is sent.
 */
const MODERATION = {
  pending: {
    label: "Awaiting approval",
    chip: "bg-[#eff6ff] text-[#1d4ed8]",
    note: "Thanks! It will appear on the website once our team approves it.",
  },
  published: {
    label: "Published",
    chip: "bg-[#dcfce7] text-[#00a63e]",
    note: "Live on the website. Editing it sends it back for approval.",
  },
  hidden: {
    label: "Not shown",
    chip: "bg-[#f3f4f6] text-[#6a7282]",
    note: "Our team chose not to show this one. You can update it and resubmit.",
  },
};

export default function ReviewCard({ bookings = [] }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [status, setStatus] = useState("loading");
  // Where the team has got to with it: pending, published or hidden.
  const [moderation, setModeration] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchMyReview()
      .then((review) => {
        if (!active) return;
        // The API envelope turns a null review into {}, so presence alone is
        // not enough — a real review always carries a rating.
        if (review?.rating) {
          setRating(review.rating || 0);
          setBody(review.body || "");
          setBookingId(review.bookingId || "");
          setModeration(review.status || "pending");
          setStatus("saved");
        } else {
          setStatus("idle");
        }
      })
      .catch(() => {
        if (active) setStatus("idle");
      });

    return () => {
      active = false;
    };
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!rating) {
      setError("Please choose a rating first.");
      return;
    }

    setStatus("saving");
    setError("");

    try {
      const saved = await saveMyReview({ rating, body, bookingId: bookingId || undefined });
      // Every save goes back to the team, including edits to a live review.
      setModeration(saved?.status || "pending");
      setStatus("saved");
    } catch (cause) {
      setStatus("idle");
      setError(cause.message);
    }
  };

  const shown = hover || rating;

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border-[0.57px] border-solid border-[#f3f4f6] bg-white p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] leading-[22px] font-bold text-[#1f2937]">
          {status === "saved" ? "Your Review" : "Leave a Review"}
        </h3>
        {status === "saved" && MODERATION[moderation] && (
          <span
            className={`rounded-full px-2 py-[2px] text-[10px] leading-4 font-semibold ${MODERATION[moderation].chip}`}
          >
            {MODERATION[moderation].label}
          </span>
        )}
      </div>

      <p className="pt-1 text-[12px] leading-[18px] text-[#99a1af]">
        {status === "saved"
          ? MODERATION[moderation]?.note || "Thanks — you can update it any time."
          : "Tell other families what your shoot was like. Our team reviews it before it goes on the website."}
      </p>

      <div className="flex flex-wrap items-center pt-4 lg:gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`${value} star${value > 1 ? "s" : ""}`}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHover(value)}
            className="cursor-pointer p-2 lg:p-[2px]"
          >
            <Star
              className={`size-6 transition-colors ${
                value <= shown ? "fill-[#f9a825] text-[#f9a825]" : "text-[#e5e7eb]"
              }`}
              strokeWidth={1.5}
            />
          </button>
        ))}
        {shown > 0 && (
          <span className="pl-2 text-[12px] leading-4 font-semibold text-[#6a7282]">
            {RATING_LABELS[shown]}
          </span>
        )}
      </div>

      {bookings.length > 0 && (
        <select
          value={bookingId}
          onChange={(event) => setBookingId(event.target.value)}
          className="mt-4 w-full cursor-pointer rounded-xl border-[0.57px] border-solid border-[#e5e7eb] bg-white px-3 py-[10px] text-[13px] leading-[18px] text-[#1f2937]"
        >
          <option value="">Which shoot? (optional)</option>
          {bookings.map((booking) => (
            <option key={booking.id} value={booking.id}>
              {booking.title} · {booking.meta}
            </option>
          ))}
        </select>
      )}

      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={3}
        maxLength={1000}
        placeholder="What did you enjoy most?"
        className="mt-3 w-full resize-none rounded-xl border-[0.57px] border-solid border-[#e5e7eb] px-3 py-2 text-[13px] leading-[18px] text-[#1f2937] placeholder:text-[#99a1af]"
      />

      {error && (
        <p className="pt-2 text-[12px] leading-4 font-semibold text-[#e7000b]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "saving" || status === "loading"}
        className="mt-3 h-10 w-full rounded-xl bg-[#f9a825] text-[13px] leading-[18px] font-bold text-white transition-colors enabled:cursor-pointer enabled:hover:bg-[#e69a1f] disabled:opacity-50"
      >
        {status === "saving"
          ? "Saving…"
          : status === "saved"
            ? "Update Review"
            : "Submit Review"}
      </button>
    </form>
  );
}
