import { useMemo } from "react";
import { fetchPortalBookings } from "./endpoints";
import { useApi } from "./useApi";

const DATE_FORMAT = { day: "2-digit", month: "short", year: "numeric" };

/**
 * The signed-in customer's real bookings, shaped for the dashboard's list.
 *
 * The backend returns the full record; the overview only shows a title, a
 * one-line reference and a status, so the mapping happens here rather than in
 * the component.
 */
export function usePortalBookings(fallback = []) {
  const { data, loading, error } = useApi(fetchPortalBookings, null, []);

  const bookings = useMemo(() => {
    if (!Array.isArray(data)) return fallback;
    if (data.length === 0) return [];

    return data.map((booking) => ({
      id: booking.id,
      title: booking.theme || booking.package || "Photoshoot",
      meta: [
        booking.bookingCode,
        booking.date
          ? new Date(booking.date).toLocaleDateString("en-GB", DATE_FORMAT)
          : "",
      ]
        .filter(Boolean)
        .join(" · "),
      status: booking.cancelled ? "Cancelled" : booking.status || "Pending",
      raw: booking,
    }));
    // fallback is a module constant in the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { bookings, loading, error, live: Array.isArray(data) };
}
