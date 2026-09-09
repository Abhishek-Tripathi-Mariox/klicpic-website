import { fetchAvailability } from "./endpoints";
import { useApi } from "./useApi";

/**
 * Real slot availability for one month, worked out by the backend from the
 * bookings already taken.
 *
 * `fallback` keeps the calendar drawn while the request is in flight, or if it
 * never lands — an availability grid that renders empty looks broken.
 */
export function useAvailability({ year, month }, fallback) {
  const { data, loading, error } = useApi(
    (options) => fetchAvailability({ year, month }, options),
    null,
    [year, month]
  );

  return { availability: data || fallback, loading, error, live: Boolean(data) };
}
