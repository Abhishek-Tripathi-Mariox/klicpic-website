import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquareQuote, Star } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import PageHeading from "../../components/PageHeading";
import Pagination from "../../components/Pagination";
import { useApi } from "../../api/useApi";
import { fetchReviews } from "../../api/endpoints";

/**
 * NOTE: there is no Figma frame for /reviews — it sits in the More menu
 * (1616:18859) beside About, Careers and Blog, and borrows the inner-page
 * heading and card styling.
 *
 * Every review here was written by a customer in the portal and published by
 * the team in Settings → Website CMS → Reviews. Nothing is bundled: a page of
 * made-up praise is exactly what this page must not be.
 */
const PAGE_SIZE = 12;

const DATE = { month: "short", year: "numeric" };

function Stars({ rating, size = 16 }) {
  return (
    <span className="flex items-center gap-[2px]" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          style={{ width: size, height: size }}
          className={
            value <= rating
              ? "shrink-0 fill-[#f9a825] text-[#f9a825]"
              : "shrink-0 fill-[#e5e7eb] text-[#e5e7eb]"
          }
          strokeWidth={1.2}
        />
      ))}
    </span>
  );
}

/** Average, count and the five-to-one bars; a bar filters the list. */
function Summary({ average, total, breakdown, active, onPick }) {
  return (
    <div className="grid w-full grid-cols-1 items-center gap-8 rounded-3xl border-[0.701px] border-solid border-[#f3f4f6] bg-white p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] sm:p-8 md:grid-cols-[220px_1fr]">
      <div className="flex flex-col items-center md:border-r-[0.701px] md:border-solid md:border-[#f3f4f6] md:pr-8">
        <p className="text-[56px] leading-[60px] font-bold text-[#1f2937]">
          {average ? average.toFixed(1) : "—"}
        </p>
        <div className="pt-2">
          <Stars rating={Math.round(average)} size={18} />
        </div>
        <p className="pt-2 text-[13px] leading-[20px] text-[#6a7282]">
          Based on {total} review{total === 1 ? "" : "s"}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = breakdown?.[stars] || 0;
          const share = total ? Math.round((count / total) * 100) : 0;
          const isActive = active === stars;
          return (
            <button
              key={stars}
              type="button"
              disabled={!count}
              onClick={() => onPick(isActive ? 0 : stars)}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors lg:py-1 ${
                isActive ? "bg-[#fff7ed]" : count ? "cursor-pointer hover:bg-[#fafafa]" : "cursor-default"
              }`}
            >
              <span className="flex w-10 shrink-0 items-center gap-1 text-[13px] font-semibold text-[#1f2937]">
                {stars}
                <Star className="size-3 fill-[#f9a825] text-[#f9a825]" strokeWidth={1.2} />
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#f3f4f6]">
                <span
                  className="block h-full rounded-full bg-[#f9a825]"
                  style={{ width: `${share}%` }}
                />
              </span>
              <span className="w-10 shrink-0 text-right text-[12px] text-[#99a1af]">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const meta = [review.city, review.shootType].filter(Boolean).join(" · ");
  const when = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-IN", DATE)
    : "";

  return (
    <article className="flex h-full flex-col items-start rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]">
      <div className="flex w-full items-center justify-between gap-3">
        <Stars rating={review.rating} />
        {when && <span className="text-[12px] text-[#99a1af]">{when}</span>}
      </div>

      {review.body ? (
        <p className="flex-1 pt-4 text-[14px] leading-[22px] text-[#4a5565]">
          “{review.body}”
        </p>
      ) : (
        <p className="flex-1 pt-4 text-[14px] leading-[22px] text-[#99a1af] italic">
          Rated {review.rating} out of 5.
        </p>
      )}

      <div className="flex w-full items-center gap-3 border-t-[0.701px] border-solid border-[#f3f4f6] pt-4 mt-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f9a825] text-[15px] font-bold text-white">
          {String(review.name || "K").trim().charAt(0).toUpperCase()}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[14px] leading-[20px] font-bold text-[#1f2937]">
            {review.name}
          </span>
          {meta && <span className="truncate text-[12px] leading-4 text-[#99a1af]">{meta}</span>}
        </span>
      </div>
    </article>
  );
}

export default function Reviews() {
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState(0);

  const { data, loading } = useApi(
    (options) =>
      fetchReviews({ page, limit: PAGE_SIZE, ...(rating ? { rating } : {}) }, options),
    null,
    [page, rating]
  );

  const reviews = data?.reviews || [];
  const total = data?.total || 0;
  const average = data?.average || 0;

  const pickRating = (next) => {
    setRating(next);
    setPage(1);
  };

  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteLayout>
      <section className="flex w-full flex-col items-center bg-[#fafafa] px-6 pb-24">
        <div className="flex w-full max-w-[1200px] flex-col items-center">
          <PageHeading
            eyebrow="Real Stories"
            title="Customer Reviews"
            subtitle={
              total
                ? `What ${total} ${total === 1 ? "family" : "families"} said after their Klicpic shoot`
                : "What families say after their Klicpic shoot"
            }
          />

          {!loading && total === 0 ? (
            <div className="flex w-full flex-col items-center rounded-3xl border-[1.4px] border-dashed border-[#e5e7eb] bg-white px-6 py-16 text-center">
              <MessageSquareQuote className="size-10 text-[#f9a825]" strokeWidth={1.4} />
              <p className="pt-4 text-[18px] leading-7 font-bold text-[#1f2937]">
                No reviews published yet
              </p>
              <p className="max-w-[420px] pt-2 text-[14px] leading-[22px] text-[#6a7282]">
                Reviews appear here once customers share them and our team has
                approved them.
              </p>
            </div>
          ) : (
            <>
              <Summary
                average={average}
                total={total}
                breakdown={data?.breakdown}
                active={rating}
                onPick={pickRating}
              />

              {rating > 0 && (
                <div className="flex w-full items-center justify-between pt-8">
                  <p className="text-[14px] text-[#6a7282]">
                    Showing {data?.matching || 0} {rating}-star review
                    {data?.matching === 1 ? "" : "s"}
                  </p>
                  <button
                    type="button"
                    onClick={() => pickRating(0)}
                    className="cursor-pointer text-[13px] font-semibold text-[#f9a825] hover:underline"
                  >
                    Show all
                  </button>
                </div>
              )}

              <div className="grid w-full grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              <Pagination
                page={page}
                pages={data?.pages || 1}
                total={data?.matching || 0}
                noun="reviews"
                onChange={changePage}
              />
            </>
          )}

          {/* Only signed-in customers can write one — the form lives in the portal. */}
          <div className="mt-16 flex w-full flex-col items-center rounded-3xl bg-[#1f2937] px-6 py-12 text-center">
            <p className="font-script text-[26px] leading-8 text-[#f9a825]">Had a shoot with us?</p>
            <p className="pt-1 text-[24px] leading-8 font-bold text-white sm:text-[28px] sm:leading-9">Share your experience</p>
            <p className="max-w-[460px] pt-3 text-[14px] leading-[22px] text-[rgba(255,255,255,0.6)]">
              Sign in with your phone number and leave a review from your
              dashboard. It appears here once our team approves it.
            </p>
            <Link
              to="/portal"
              className="mt-6 flex h-11 items-center rounded-full bg-[#f9a825] px-8 text-[14px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
