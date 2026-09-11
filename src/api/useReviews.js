import { useMemo } from "react";
import { fetchReviews } from "./endpoints";
import { useApi } from "./useApi";

/**
 * Published reviews for the home carousel — written by customers in the portal
 * and approved by the team in Settings → Website CMS → Reviews.
 *
 * No stand-ins: until a review is published the section has nothing to show,
 * rather than a made-up quote. And no borrowed portraits — the CRM holds no
 * photo of the customer, so the card shows their initial instead of a stock
 * face next to a real person's name.
 */
export function useReviews() {
  const { data, loading } = useApi(
    (options) => fetchReviews({ limit: 12 }, options),
    null,
    []
  );

  return useMemo(() => {
    const live = Array.isArray(data?.reviews) ? data.reviews : [];

    const testimonials = live.map((review) => ({
      quote: review.body ? `“${review.body}”` : "",
      name: review.name,
      initial: String(review.name || "K").trim().charAt(0).toUpperCase(),
      meta: [review.city, review.shootType].filter(Boolean).join(" · "),
      stars: review.rating,
    }));

    return {
      testimonials,
      total: data?.total || 0,
      average: data?.average || 0,
      loading,
    };
  }, [data, loading]);
}
