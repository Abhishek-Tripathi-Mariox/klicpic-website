import { useMemo } from "react";
import { fetchReviews } from "./endpoints";
import { useApi } from "./useApi";

/**
 * The public review wall, written by customers through the portal.
 *
 * Reviews are text and a star rating — the CRM has no avatar for a customer,
 * so the carousel's portrait comes from the bundled slide in the same position.
 * Until a real review exists, the bundled slides stand in; the section would
 * otherwise be an empty carousel on a marketing page.
 */
export function useReviews(fallback = []) {
  const { data, loading, error } = useApi(
    (options) => fetchReviews({ limit: 12 }, options),
    null,
    []
  );

  return useMemo(() => {
    const live = data?.reviews;
    if (!Array.isArray(live) || live.length === 0) {
      return { testimonials: fallback, total: 0, average: 0, live: false };
    }

    const testimonials = live.map((review, index) => {
      const dressing = fallback[index % Math.max(fallback.length, 1)] || {};
      return {
        quote: review.body ? `“${review.body}”` : dressing.quote || "",
        name: review.name,
        meta: [review.city, review.shootType].filter(Boolean).join(" · "),
        avatar: dressing.avatar,
        stars: review.rating,
      };
    });

    return { testimonials, total: data.total, average: data.average, live: true };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}
